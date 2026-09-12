import React, { useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { AccountProvider, useAccounts } from './context/AccountContext';
import { LabelDetectionResult, ProcessedBatchResult } from './types';
import { analyzePDFPage, build4x6PrintReadyPDF } from './utils/pdfEngine';
import { generateSampleMeeshoPDF } from './utils/sampleMeeshoGenerator';
import { isDebugMode } from './utils/debugMode';
import { useAppRoute, AppRoute, scrollToTop } from './utils/router';

import { DEFAULT_ACCOUNTS } from './data/defaultAccounts';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { FlipkartToolView } from './components/FlipkartToolView';
import { AmazonToolView } from './components/AmazonToolView';
import { AllToolsPage } from './components/AllToolsPage';
import { GuidesPage } from './components/GuidesPage';
import { FAQPage } from './components/FAQPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsPage } from './components/TermsPage';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import { UploadArea } from './components/UploadArea';
import { SafetyChecklist } from './components/SafetyChecklist';
import { LabelPreview } from './components/LabelPreview';
import { AccountManagerModal } from './components/AccountManagerModal';
import { TemplateManagerModal } from './components/TemplateManagerModal';
import { SettingsModal } from './components/SettingsModal';
import { AcceptanceTestsModal } from './components/AcceptanceTestsModal';
import { HelpModal } from './components/HelpModal';
import { ArrowLeft, Store, RefreshCw, CheckCircle2, Download, Printer } from 'lucide-react';
import { ToolExplanationSection } from './components/ToolExplanationSection';
import { getMeeshoDownloadFileName } from './utils/downloadNaming';

function MainApp() {
  const { accounts, activeAccount } = useAccounts();
  const [currentRoute, navigateTo] = useAppRoute();

  // PDF Data & Analysis state (for Meesho Promotional Label processor)
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [pdfFileName, setPdfFileName] = useState<string>('');
  const [detectionResults, setDetectionResults] = useState<LabelDetectionResult[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Batch Processing state
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progressCurrent, setProgressCurrent] = useState<number>(0);
  const [processedResult, setProcessedResult] = useState<ProcessedBatchResult | null>(null);

  // Performance tracking: avoid duplicate PDF re-analysis when loading
  const lastAnalyzedBytesRef = React.useRef<Uint8Array | null>(null);
  const lastAnalyzedAccountRef = React.useRef(activeAccount);

  // Clean up blob URL when processedResult changes or unmounts to prevent memory leaks
  useEffect(() => {
    return () => {
      if (processedResult?.pdfUrl) {
        URL.revokeObjectURL(processedResult.pdfUrl);
      }
    };
  }, [processedResult?.pdfUrl]);

  // Modals state
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [accountEditMode, setAccountEditMode] = useState(false);
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [acceptanceTestsModalOpen, setAcceptanceTestsModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  // Global scroll-to-top on route change so new page always starts at top
  useEffect(() => {
    scrollToTop();
  }, [currentRoute]);

  // Keep the browser title and meta description stable as LabelFix across all routes
  useEffect(() => {
    document.title = 'LabelFix — Simple Tools for E-commerce Shipping Labels';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Simple tools for e-commerce shipping labels: thermal-ready 4×6 label processing, promotional overlays, and marketplace cropping for Meesho, Flipkart, and Amazon sellers.'
      );
    }
  }, [currentRoute]);

  // First Visit Experience for Meesho: If entering Meesho tool without saved accounts, prompt setup
  useEffect(() => {
    if (currentRoute === 'meesho-promotional-label' && accounts.length === 0) {
      setAccountEditMode(false);
      setAccountModalOpen(true);
    }
  }, [accounts.length, currentRoute]);

  // Re-run detection and auto-processing when active account/template changes so output reflects latest settings
  useEffect(() => {
    if (!pdfBytes) return;

    // Skip if this exact PDF and account combination was already analyzed and processed
    if (
      pdfBytes === lastAnalyzedBytesRef.current &&
      activeAccount === lastAnalyzedAccountRef.current
    ) {
      return;
    }
    lastAnalyzedBytesRef.current = pdfBytes;
    lastAnalyzedAccountRef.current = activeAccount;

    const accountToUse = activeAccount || DEFAULT_ACCOUNTS[0];

    const reanalyzeAndProcess = async () => {
      setIsProcessing(true);
      setProgressCurrent(0);
      try {
        const loadingTask = pdfjsLib.getDocument({ data: pdfBytes.slice() });
        const pdfDoc = await loadingTask.promise;
        const numPages = pdfDoc.numPages;

        const results: LabelDetectionResult[] = [];
        for (let i = 1; i <= numPages; i++) {
          const page = await pdfDoc.getPage(i);
          const detection = await analyzePDFPage(page, i - 1, accountToUse);
          results.push(detection);
        }
        setDetectionResults(results);

        const result = await build4x6PrintReadyPDF(
          pdfBytes,
          accountToUse,
          (current, _total) => {
            setProgressCurrent(current);
          },
          results
        );
        setProcessedResult(result);
      } catch (err) {
        console.error('Error re-processing PDF with updated account settings:', err);
      } finally {
        setIsProcessing(false);
      }
    };

    reanalyzeAndProcess();
  }, [activeAccount, pdfBytes]);

  const handlePdfLoaded = async (bytes: Uint8Array, fileName: string) => {
    // Revoke previous URL to prevent memory leaks
    if (processedResult?.pdfUrl) {
      try {
        URL.revokeObjectURL(processedResult.pdfUrl);
      } catch (_) {}
    }

    setIsLoading(true);
    setIsProcessing(true);
    setProgressCurrent(0);
    setPdfBytes(bytes);
    setPdfFileName(fileName);
    setProcessedResult(null);
    setCurrentIndex(0);

    const accountToUse = activeAccount || DEFAULT_ACCOUNTS[0];

    // Mark as analyzed immediately so activeAccount useEffect does not duplicate processing
    lastAnalyzedBytesRef.current = bytes;
    lastAnalyzedAccountRef.current = activeAccount;

    try {
      const loadingTask = pdfjsLib.getDocument({ data: bytes.slice() });
      const pdfDoc = await loadingTask.promise;
      const numPages = pdfDoc.numPages;

      const results: LabelDetectionResult[] = [];
      for (let i = 1; i <= numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const detection = await analyzePDFPage(page, i - 1, accountToUse);
        results.push(detection);
      }
      setDetectionResults(results);

      // Automatic processing: invoke the existing build4x6PrintReadyPDF engine reusing precomputed results
      const result = await build4x6PrintReadyPDF(
        bytes,
        accountToUse,
        (current, _total) => {
          setProgressCurrent(current);
        },
        results
      );

      setProcessedResult(result);
    } catch (err) {
      console.error('Error processing loaded Meesho PDF:', err);
    } finally {
      setIsLoading(false);
      setIsProcessing(false);
    }
  };

  const handleLoadSample = async (count: number, type: 'single' | 'mixed' | 'tall' = 'single') => {
    setIsLoading(true);
    try {
      const sampleBytes = await generateSampleMeeshoPDF(count, type);
      const name =
        count === 1
          ? `Sample_Meesho_${type === 'tall' ? 'Tall' : 'Standard'}_Label.pdf`
          : `Sample_Meesho_Batch_${count}_Labels.pdf`;
      await handlePdfLoaded(sampleBytes, name);
    } catch (err) {
      console.error('Error generating sample:', err);
      setIsLoading(false);
      setIsProcessing(false);
    }
  };

  const handleDownloadMeesho = () => {
    if (!processedResult?.pdfUrl) return;
    const downloadName = getMeeshoDownloadFileName(activeAccount?.accountName);
    const a = document.createElement('a');
    a.href = processedResult.pdfUrl;
    a.download = downloadName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePrintMeesho = () => {
    if (!processedResult?.pdfUrl) return;
    const printWindow = window.open(processedResult.pdfUrl, '_blank');
    if (printWindow) {
      printWindow.focus();
    }
  };

  const currentDetection = detectionResults[currentIndex];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col font-sans text-[#d1d1d1] antialiased selection:bg-[#c9a57b] selection:text-black">
      {/* Universal Header with LabelFix Brand & Multi-tool Navigation */}
      <Header
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onOpenAccountModal={(editMode = false) => {
          setAccountEditMode(editMode);
          setAccountModalOpen(true);
        }}
        onOpenTemplateModal={() => setTemplateModalOpen(true)}
        onOpenSettingsModal={() => setSettingsModalOpen(true)}
        onOpenAcceptanceTestsModal={() => setAcceptanceTestsModalOpen(true)}
        onOpenHelpModal={() => setHelpModalOpen(true)}
      />

      {/* Route Views */}
      {currentRoute === 'home' && (
        <HomePage
          onNavigate={navigateTo}
          onOpenHelpModal={() => setHelpModalOpen(true)}
        />
      )}

      {currentRoute === 'flipkart-label-crop' && (
        <FlipkartToolView
          onNavigate={navigateTo}
          onOpenHelpModal={() => setHelpModalOpen(true)}
        />
      )}

      {currentRoute === 'amazon-label-crop' && (
        <AmazonToolView
          onNavigate={navigateTo}
          onOpenHelpModal={() => setHelpModalOpen(true)}
        />
      )}

      {currentRoute === 'tools' && (
        <AllToolsPage onNavigate={navigateTo} />
      )}

      {currentRoute === 'guides' && (
        <GuidesPage onNavigate={navigateTo} />
      )}

      {currentRoute === 'faq' && (
        <FAQPage onNavigate={navigateTo} />
      )}

      {currentRoute === 'about' && (
        <AboutPage onNavigate={navigateTo} />
      )}

      {currentRoute === 'contact' && (
        <ContactPage onNavigate={navigateTo} />
      )}

      {currentRoute === 'privacy-policy' && (
        <PrivacyPolicyPage onNavigate={navigateTo} />
      )}

      {currentRoute === 'terms' && (
        <TermsPage onNavigate={navigateTo} />
      )}

      {currentRoute === 'meesho-promotional-label' && (
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Tool Navigation Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
            <div className="flex items-center space-x-3">
              <button
                id="back-to-tools-btn"
                onClick={() => navigateTo('home')}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                title="Back to Home"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-base sm:text-lg font-bold text-white tracking-wide">
                    Meesho Promotional Label
                  </h1>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#c9a57b]/15 text-[#c9a57b] border border-[#c9a57b]/25 rounded-full">
                    4×6 Thermal
                  </span>
                </div>
                <p className="text-xs text-white/40">
                  Add your store promotion and QR code to Meesho labels.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs text-white/40">
              <span className="hidden md:inline">Workflow:</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#141414] border border-white/5 text-white/60 font-medium">
                Upload → Customize → Preview → Print
              </span>
            </div>
          </div>

          {/* Meesho Workspace Layout: Sidebar + Main Area (Upload → Status/Actions → Preview) */}
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Left Sidebar: Account Details, Store Link, QR code, Customization */}
            <Sidebar
              onOpenAccountModal={(editMode = false) => {
                setAccountEditMode(editMode);
                setAccountModalOpen(true);
              }}
              onOpenTemplateModal={() => setTemplateModalOpen(true)}
              onOpenSettingsModal={() => setSettingsModalOpen(true)}
              onLoadSample={handleLoadSample}
              loadedCount={detectionResults.length}
            />

            {/* Main Area: Upload → Processing Status / Action Bar → Live Preview */}
            <div className="flex-1 w-full space-y-5 min-w-0">
              {/* Step 1: Upload PDF */}
              <UploadArea
                onFileLoaded={handlePdfLoaded}
                isLoading={isLoading || isProcessing}
                loadedFileName={pdfFileName}
                totalLabelsCount={detectionResults.length}
              />

              {/* Internal Developer / Debug Mode Only: Safety Verification & Audit */}
              {isDebugMode() && currentDetection && (
                <SafetyChecklist
                  detection={currentDetection}
                  totalCount={detectionResults.length}
                  currentIndex={currentIndex}
                />
              )}

              {/* Processing Status Bar — Immediately Above Preview */}
              {isProcessing && (
                <div className="bg-[#141414] border border-[#c9a57b]/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-in fade-in">
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#c9a57b]/10 text-[#c9a57b] flex items-center justify-center flex-shrink-0">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-white truncate">
                        Processing your Meesho shipping labels...
                      </h3>
                      <p className="text-xs text-white/50 truncate">
                        {progressCurrent > 0 && detectionResults.length > 0
                          ? `Formatting label ${progressCurrent} of ${detectionResults.length} with promotional QR...`
                          : 'Analyzing layout and generating print-ready 4×6 thermal PDF...'}
                      </p>
                    </div>
                  </div>
                  {detectionResults.length > 0 && (
                    <span className="text-xs font-mono font-bold text-[#c9a57b] bg-[#c9a57b]/10 px-3 py-1.5 rounded-full border border-[#c9a57b]/20 flex-shrink-0">
                      {Math.round((progressCurrent / Math.max(1, detectionResults.length)) * 100)}%
                    </span>
                  )}
                </div>
              )}

              {/* Successful Processing Action Bar — Immediately Above Preview */}
              {processedResult && !isProcessing && (
                <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-in fade-in">
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-white truncate">
                        {processedResult.totalCount} {processedResult.totalCount === 1 ? 'Label' : 'Labels'} Ready for Thermal Printing
                      </h3>
                      <p className="text-xs text-white/50 truncate">
                        Vector 4×6 print-ready PDF generated with store QR & promotional message
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2.5 w-full sm:w-auto flex-shrink-0">
                    <button
                      id="meesho-main-download-btn"
                      onClick={handleDownloadMeesho}
                      className="flex-1 sm:flex-none px-4 py-2.5 bg-[#c9a57b] hover:bg-[#d9b58b] text-black font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all shadow-sm active:scale-95 whitespace-nowrap cursor-pointer"
                    >
                      <Download className="w-4 h-4 flex-shrink-0" />
                      <span>Download PDF</span>
                    </button>
                    <button
                      id="meesho-main-print-btn"
                      onClick={handlePrintMeesho}
                      className="flex-1 sm:flex-none px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all active:scale-95 whitespace-nowrap cursor-pointer"
                      title="Direct Thermal Print"
                    >
                      <Printer className="w-4 h-4 flex-shrink-0" />
                      <span>Print Directly</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Live 4×6 Canvas Label Preview */}
              <LabelPreview
                pdfBytes={pdfBytes}
                detectionResults={detectionResults}
                currentIndex={currentIndex}
                onPageChange={(idx) => setCurrentIndex(idx)}
                isLoading={isLoading}
                isProcessing={isProcessing}
                progressCurrent={progressCurrent}
                processedResult={processedResult}
                onDownload={handleDownloadMeesho}
                onPrint={handlePrintMeesho}
              />
            </div>
          </div>

          {/* Why This Tool Exists & SEO Content Section */}
          <ToolExplanationSection toolType="meesho" onNavigate={navigateTo} />
        </main>
      )}

      {/* Site-wide Universal Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Global Modals (for Meesho tool and platform configuration) */}
      <AccountManagerModal
        isOpen={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
        editMode={accountEditMode}
      />

      <TemplateManagerModal
        isOpen={templateModalOpen}
        onClose={() => setTemplateModalOpen(false)}
      />

      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
      />

      <AcceptanceTestsModal
        isOpen={acceptanceTestsModalOpen}
        onClose={() => setAcceptanceTestsModalOpen(false)}
      />

      <HelpModal
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AccountProvider>
      <MainApp />
    </AccountProvider>
  );
}
