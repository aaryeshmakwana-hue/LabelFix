import React from 'react';
import {
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  BookOpen,
  Printer,
  ShieldCheck,
  Zap,
  Layers,
  Crop,
  Store,
} from 'lucide-react';
import { AppRoute } from '../utils/router';

interface ToolExplanationSectionProps {
  tool?: 'meesho' | 'flipkart' | 'amazon';
  toolType?: 'meesho' | 'flipkart' | 'amazon';
  onNavigate?: (route: AppRoute) => void;
}

export const ToolExplanationSection: React.FC<ToolExplanationSectionProps> = ({
  tool,
  toolType,
  onNavigate,
}) => {
  const activeTool = tool || toolType || 'meesho';
  const handleNavigate = (route: AppRoute) => {
    if (onNavigate) {
      onNavigate(route);
    }
  };

  if (activeTool === 'meesho') {
    return (
      <section id="why-meesho-tool" className="mt-12 pt-10 border-t border-white/10 space-y-10">
        {/* Header & Benefit Statement */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#c9a57b]/10 border border-[#c9a57b]/20 text-[#c9a57b] text-xs font-semibold mb-3">
            <Store className="w-3.5 h-3.5" />
            <span>Why This Tool Exists</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Why Use Meesho Promotional Label?
          </h2>
          <p className="text-base text-[#c9a57b] font-medium mt-2">
            Add a short promotional or customer message to your Meesho shipping label without changing the original label information.
          </p>
          <div className="space-y-3 mt-4 text-sm text-white/70 leading-relaxed">
            <p>
              The Meesho Promotional Label tool allows ecommerce sellers to add a short promotional, review, or store follow message directly into the available whitespace on their Meesho shipping-label PDFs. Standard labels downloaded from the Meesho Supplier Panel often leave empty blank space below the invoice section, and this tool helps you put that space to productive use.
            </p>
            <p>
              When configured with your store link, the tool automatically generates and places a crisp store QR code alongside your courteous thank-you note. This makes it easy for customers to notice your store, follow your catalog, or leave verified product reviews once their package arrives.
            </p>
            <p>
              Most importantly, this tool is designed specifically for preparing Meesho shipping labels for 4×6 thermal printing without altering any original shipping information. Courier barcodes, AWB numbers, customer delivery addresses, and logistics routing data remain completely untouched and razor-sharp.
            </p>
          </div>
        </div>

        {/* 2-Column Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 space-y-3">
            <div className="flex items-center space-x-2 text-white font-semibold text-sm">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>The Problem Sellers Face</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              Standard Meesho supplier labels downloaded from the Meesho Supplier Panel include the shipping label and the customer invoice on one page. Below the invoice summary table, there is often empty white space. When printed onto standard 4×6 inch thermal labels, this unused area remains blank, representing a missed opportunity to communicate with your buyer.
            </p>
            <p className="text-xs text-white/60 leading-relaxed">
              Manually editing PDFs with general graphics programs risks shifting courier barcodes, degrading vector line clarity, or violating courier scanning margins.
            </p>
          </div>

          <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 space-y-3">
            <div className="flex items-center space-x-2 text-white font-semibold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>What LabelFix Does</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              The LabelFix Meesho tool inspects the structure of your Meesho PDF page, identifies the ending of the tax invoice table and legal disclaimers, and places your store promotional note and scannable QR code strictly into verified dead whitespace.
            </p>
            <p className="text-xs text-white/60 leading-relaxed">
              The original shipping label, AWB barcode, logistics routing identifiers, and customer delivery address remain 100% unaltered with crisp vector clarity.
            </p>
          </div>
        </div>

        {/* Practical Benefits Checklist */}
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-6 sm:p-8">
          <h3 className="text-base font-bold text-white mb-4">
            Practical Benefits for Meesho Sellers
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-white/70">
            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#c9a57b] flex-shrink-0 mt-0.5" />
              <span>Use unused label space for a short, courteous post-purchase message.</span>
            </div>
            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#c9a57b] flex-shrink-0 mt-0.5" />
              <span>Encourage customers to follow your shop or leave a verified product review.</span>
            </div>
            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#c9a57b] flex-shrink-0 mt-0.5" />
              <span>Communicate simple customer care or thank-you information directly on the parcel.</span>
            </div>
            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#c9a57b] flex-shrink-0 mt-0.5" />
              <span>Zero courier interference: official shipping information remains completely preserved.</span>
            </div>
            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#c9a57b] flex-shrink-0 mt-0.5" />
              <span>Ready for 4×6 inch direct thermal roll printing with 1:1 vector sharpness.</span>
            </div>
            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#c9a57b] flex-shrink-0 mt-0.5" />
              <span>100% in-browser processing: no customer addresses or orders are uploaded to external servers.</span>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-white/40 italic">
            Note: LabelFix provides this tool as a seller convenience utility. It does not promise or guarantee specific review quantities, seller ratings, or sales increases. Always follow marketplace policies and ensure courier barcodes remain clear and unscratched.
          </div>
        </div>

        {/* Step-by-Step Flow */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">
            How to Use Meesho Promotional Label
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#111111] border border-white/5 rounded-xl p-4 space-y-2">
              <div className="w-6 h-6 rounded-full bg-[#c9a57b]/20 text-[#c9a57b] font-bold text-xs flex items-center justify-center">
                1
              </div>
              <h4 className="text-xs font-semibold text-white">Upload Meesho PDF</h4>
              <p className="text-[11px] text-white/50 leading-relaxed">
                Drop your unedited PDF batch downloaded directly from the Meesho Supplier Panel.
              </p>
            </div>
            <div className="bg-[#111111] border border-white/5 rounded-xl p-4 space-y-2">
              <div className="w-6 h-6 rounded-full bg-[#c9a57b]/20 text-[#c9a57b] font-bold text-xs flex items-center justify-center">
                2
              </div>
              <h4 className="text-xs font-semibold text-white">Configure Store Info</h4>
              <p className="text-[11px] text-white/50 leading-relaxed">
                Enter your public Meesho store link and select your preferred customer note template.
              </p>
            </div>
            <div className="bg-[#111111] border border-white/5 rounded-xl p-4 space-y-2">
              <div className="w-6 h-6 rounded-full bg-[#c9a57b]/20 text-[#c9a57b] font-bold text-xs flex items-center justify-center">
                3
              </div>
              <h4 className="text-xs font-semibold text-white">Inspect 4×6 Preview</h4>
              <p className="text-[11px] text-white/50 leading-relaxed">
                Verify the placement in real time to ensure the promotional section stays strictly below invoice lines.
              </p>
            </div>
            <div className="bg-[#111111] border border-white/5 rounded-xl p-4 space-y-2">
              <div className="w-6 h-6 rounded-full bg-[#c9a57b]/20 text-[#c9a57b] font-bold text-xs flex items-center justify-center">
                4
              </div>
              <h4 className="text-xs font-semibold text-white">Instant Download & Print</h4>
              <p className="text-[11px] text-white/50 leading-relaxed">
                Click Download immediately after processing or send directly to your 4×6 thermal printer.
              </p>
            </div>
          </div>
        </div>

        {/* Helpful Cross-Links */}
        <div className="bg-[#111111] border border-white/5 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-white">Need more details or printer instructions?</span>
            <p className="text-[11px] text-white/50">Explore related seller guides and thermal printer configuration tips.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleNavigate('guides')}
              className="inline-flex items-center space-x-1.5 text-xs text-[#c9a57b] hover:text-white transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Read the Meesho promotional label guide</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => handleNavigate('flipkart-label-crop')}
              className="inline-flex items-center space-x-1.5 text-xs text-blue-400 hover:text-white transition-colors cursor-pointer"
            >
              <Crop className="w-3.5 h-3.5" />
              <span>Learn how to prepare Flipkart shipping labels</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (activeTool === 'flipkart') {
    return (
      <section id="why-flipkart-tool" className="mt-12 pt-10 border-t border-white/10 space-y-10">
        {/* Header & Benefit Statement */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
            <Crop className="w-3.5 h-3.5" />
            <span>Why This Tool Exists</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Why Use Flipkart Label Crop?
          </h2>
          <p className="text-base text-blue-400 font-medium mt-2">
            Crop the shipping label from your Flipkart PDF to isolate the label area for clean 4×6 thermal printing.
          </p>
          <div className="space-y-3 mt-4 text-sm text-white/70 leading-relaxed">
            <p>
              Flipkart shipping-label PDFs often contain the shipping label together with tax invoices or unused page space on a single A4 sheet. Standard 4×6 thermal label printers only require the shipping-label portion, not the entire A4 page.
            </p>
            <p>
              Cropping helps isolate the actual shipping-label area, producing a cleaner PDF optimized for 4×6 thermal roll printing. Removing unnecessary invoice and blank space makes labels significantly easier to print, peel, and apply.
            </p>
            <p>
              Crucially, the original shipping label information, courier barcodes, tracking numbers, and recipient address remain completely intact with sharp vector clarity.
            </p>
          </div>
        </div>

        {/* 2-Column Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 space-y-3">
            <div className="flex items-center space-x-2 text-white font-semibold text-sm">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>The Problem Sellers Face</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              When downloading order labels from Flipkart Seller Hub, the platform frequently produces documents where the shipping label takes up only part of the A4 page, while the tax invoice and empty space occupy the rest.
            </p>
            <p className="text-xs text-white/60 leading-relaxed">
              Sending this full A4 document directly to a 4×6 thermal roll printer either shrinks the text so small that courier barcode scanners struggle, or wastes expensive thermal sticker paper printing tax invoices that are stored electronically anyway.
            </p>
          </div>

          <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 space-y-3">
            <div className="flex items-center space-x-2 text-white font-semibold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>What LabelFix Does</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              The LabelFix Flipkart Label Crop tool automatically identifies and crops the shipping-label portion from your Flipkart PDF batch, standardizing the output into clean, thermal-ready 4×6 inch pages.
            </p>
            <p className="text-xs text-white/60 leading-relaxed">
              It preserves 1:1 vector quality for tracking barcodes, routing codes, and recipient addresses while omitting unnecessary invoice sections and blank margins.
            </p>
          </div>
        </div>

        {/* Practical Benefits Checklist */}
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-6 sm:p-8">
          <h3 className="text-base font-bold text-white mb-4">
            Key Benefits for Flipkart Sellers
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-white/70">
            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>Removes unnecessary invoice and blank space from the label output.</span>
            </div>
            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>Produces a cleaner, crisp shipping-label PDF ready for 4×6 thermal printers.</span>
            </div>
            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>Helps avoid printing the entire A4 page when only the shipping label is needed.</span>
            </div>
            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>Original barcodes, AWB numbers, and customer addresses remain sharp and intact.</span>
            </div>
            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>Handles multi-page batches efficiently right inside your browser.</span>
            </div>
            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>Immediate Download and Print buttons conveniently placed right above the preview.</span>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-white/40 italic">
            Disclaimer: LabelFix is an independent seller utility. LabelFix is not affiliated with, endorsed by, or sponsored by Flipkart.
          </div>
        </div>

        {/* Step-by-Step Flow */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">
            How to Crop Flipkart Shipping Labels
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#111111] border border-white/5 rounded-xl p-4 space-y-2">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold text-xs flex items-center justify-center">
                1
              </div>
              <h4 className="text-xs font-semibold text-white">Upload Flipkart PDF</h4>
              <p className="text-[11px] text-white/50 leading-relaxed">
                Export your label PDF from Flipkart Seller Hub and upload it directly.
              </p>
            </div>
            <div className="bg-[#111111] border border-white/5 rounded-xl p-4 space-y-2">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold text-xs flex items-center justify-center">
                2
              </div>
              <h4 className="text-xs font-semibold text-white">Review Auto-Crop</h4>
              <p className="text-[11px] text-white/50 leading-relaxed">
                The smart boundary detector highlights the shipping label. Adjust handles if needed.
              </p>
            </div>
            <div className="bg-[#111111] border border-white/5 rounded-xl p-4 space-y-2">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold text-xs flex items-center justify-center">
                3
              </div>
              <h4 className="text-xs font-semibold text-white">Process Batch</h4>
              <p className="text-[11px] text-white/50 leading-relaxed">
                Click "Apply & Process Crop" to apply standard boundaries across all pages in the PDF.
              </p>
            </div>
            <div className="bg-[#111111] border border-white/5 rounded-xl p-4 space-y-2">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold text-xs flex items-center justify-center">
                4
              </div>
              <h4 className="text-xs font-semibold text-white">Immediate Download</h4>
              <p className="text-[11px] text-white/50 leading-relaxed">
                Download the cropped PDF instantly from the top results bar or print directly.
              </p>
            </div>
          </div>
        </div>

        {/* Helpful Cross-Links */}
        <div className="bg-[#111111] border border-white/5 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-white">Looking for other marketplace utilities?</span>
            <p className="text-[11px] text-white/50">Easily switch between independent tools for each marketplace.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleNavigate('guides')}
              className="inline-flex items-center space-x-1.5 text-xs text-blue-400 hover:text-white transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Learn how to prepare Flipkart shipping labels</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => handleNavigate('amazon-label-crop')}
              className="inline-flex items-center space-x-1.5 text-xs text-amber-400 hover:text-white transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>See how Smart Amazon Label works</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  // activeTool === 'amazon'
  return (
    <section id="why-amazon-tool" className="mt-12 pt-10 border-t border-white/10 space-y-10">
      {/* Header & Benefit Statement */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-3">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>Why This Tool Exists</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Why Use Smart Amazon Label?
        </h2>
        <p className="text-base text-amber-300 font-medium mt-2">
          Keep SKU and quantity visible on the shipping label to make packing easier.
        </p>
        <div className="space-y-3 mt-4 text-sm text-white/70 leading-relaxed">
          <p>
            The Smart Amazon Label tool processes Amazon shipping-label PDFs and pairs shipping-label pages with their related invoice pages to extract SKU and item quantity information.
          </p>
          <p>
            It then places the extracted SKU and quantity neatly into the designated blank area of the shipping label, making packing and order identification substantially easier for warehouse and dispatch teams.
          </p>
          <p>
            By keeping the ordered items and quantities clearly readable directly on the parcel label, sellers can pick and pack orders with confidence without having to keep separate paper invoices in hand.
          </p>
        </div>
      </div>

      {/* 2-Column Problem & Solution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 space-y-3">
          <div className="flex items-center space-x-2 text-white font-semibold text-sm">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>The Problem Sellers Face</span>
          </div>
          <p className="text-xs text-white/60 leading-relaxed">
            Amazon shipping label batches group shipping labels together with multi-page tax invoices. When packing boxes in a busy fulfillment area, packers often have to cross-reference multiple invoice pages or manually write item SKUs and quantities onto the package using marker pens.
          </p>
          <p className="text-xs text-white/60 leading-relaxed">
            This constant context switching slows down packing velocity, increases warehouse picking errors, and leads to wrong items being shipped to customers.
          </p>
        </div>

        <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 space-y-3">
          <div className="flex items-center space-x-2 text-white font-semibold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>What LabelFix Does</span>
          </div>
          <p className="text-xs text-white/60 leading-relaxed">
            The Smart Amazon Label tool scans the sequence of your Amazon PDF, pairs each shipping label with its associated tax invoice pages, and extracts the SKU names and ordered quantities.
          </p>
          <p className="text-xs text-white/60 leading-relaxed">
            It then places readable <span className="text-amber-300 font-mono font-semibold">(SKU) | Qty</span> text safely into the designated horizontal blank band on the shipping label while automatically excluding the tax invoice sheets from the final print stream.
          </p>
        </div>
      </div>

      {/* Practical Benefits Checklist */}
      <div className="bg-[#141414] border border-white/5 rounded-2xl p-6 sm:p-8">
        <h3 className="text-base font-bold text-white mb-4">
          Key Benefits for Amazon Sellers
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-white/70">
          <div className="flex items-start space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>Helps packing staff immediately identify which item and quantity belong in each box.</span>
          </div>
          <div className="flex items-start space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>Makes SKU and quantity visible directly on the shipping label surface.</span>
          </div>
          <div className="flex items-start space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>Reduces the need to repeatedly check another screen or physical paper invoice during packing.</span>
          </div>
          <div className="flex items-start space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>Can make order fulfillment and packaging significantly faster for sellers handling multiple orders.</span>
          </div>
          <div className="flex items-start space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>Keeps original Amazon shipping-label dimensions and courier barcodes completely intact.</span>
          </div>
          <div className="flex items-start space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>Added information is placed strictly within the designated horizontal blank whitespace area.</span>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-white/40 italic">
          Disclaimer: LabelFix is an independent seller utility. Amazon does not officially require or endorse LabelFix's added SKU/quantity notation; this feature is provided purely as an operational convenience for sellers to accelerate internal warehouse packing.
        </div>
      </div>

      {/* Step-by-Step Flow */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white">
          How to Add SKU and Quantity to Amazon Shipping Labels
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#111111] border border-white/5 rounded-xl p-4 space-y-2">
            <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center">
              1
            </div>
            <h4 className="text-xs font-semibold text-white">Upload Amazon Batch</h4>
            <p className="text-[11px] text-white/50 leading-relaxed">
              Export shipping labels with invoices from Amazon Seller Central and upload the PDF.
            </p>
          </div>
          <div className="bg-[#111111] border border-white/5 rounded-xl p-4 space-y-2">
            <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center">
              2
            </div>
            <h4 className="text-xs font-semibold text-white">Automatic Pairing</h4>
            <p className="text-[11px] text-white/50 leading-relaxed">
              The engine automatically pairs labels with invoice pages and extracts item SKUs & quantities.
            </p>
          </div>
          <div className="bg-[#111111] border border-white/5 rounded-xl p-4 space-y-2">
            <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center">
              3
            </div>
            <h4 className="text-xs font-semibold text-white">Inspect Preview</h4>
            <p className="text-[11px] text-white/50 leading-relaxed">
              Check the formatted (SKU) | Qty text in the designated horizontal whitespace band.
            </p>
          </div>
          <div className="bg-[#111111] border border-white/5 rounded-xl p-4 space-y-2">
            <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center">
              4
            </div>
            <h4 className="text-xs font-semibold text-white">Immediate Download</h4>
            <p className="text-[11px] text-white/50 leading-relaxed">
              Download the prepared PDF from the top banner above the preview with invoices filtered out.
            </p>
          </div>
        </div>
      </div>

      {/* Helpful Cross-Links */}
      <div className="bg-[#111111] border border-white/5 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-white">Want to learn more about label workflows?</span>
          <p className="text-[11px] text-white/50">Read detailed guides and answers to frequently asked questions.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => handleNavigate('guides')}
            className="inline-flex items-center space-x-1.5 text-xs text-amber-400 hover:text-white transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>See how Amazon SKU and quantity labeling works</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => handleNavigate('faq')}
            className="inline-flex items-center space-x-1.5 text-xs text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>View shipping label printing FAQ</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </section>
  );
};
