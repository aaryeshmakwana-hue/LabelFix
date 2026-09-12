/**
 * Standardized download filename generator for LabelFix tools.
 * Generates dynamic, filesystem-safe filenames with local download timestamps.
 */

/**
 * Returns a real local timestamp string formatted as YYYY-MM-DD_HH-mm-ss
 */
export const getDownloadTimestamp = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
};

/**
 * Sanitizes a store/account name for filesystem safety.
 * Removes characters that are unsafe across Windows, macOS, and Linux filesystems.
 */
export const sanitizeAccountName = (accountName?: string): string => {
  if (!accountName || !accountName.trim()) {
    return 'Store';
  }
  // Remove dangerous filesystem characters and collapse spaces/underscores
  const cleaned = accountName
    .trim()
    .replace(/[/\\?%*:|"<>]/g, '') // remove illegal path characters
    .replace(/\s+/g, '_')          // convert spaces to underscores
    .replace(/[^a-zA-Z0-9_-]/g, '') // keep alphanumeric, underscore, hyphen
    .replace(/_+/g, '_')           // deduplicate underscores
    .replace(/^_+|_+$/g, '');      // trim leading/trailing underscores

  return cleaned || 'Store';
};

/**
 * MEESHO:
 * Format: LabelFix_(MeeshoAccountName)_YYYY-MM-DD_HH-mm-ss.pdf
 * Example: LabelFix_RajwadiRatna_2026-09-11_20-45-12.pdf
 */
export const getMeeshoDownloadFileName = (accountName?: string): string => {
  const safeName = sanitizeAccountName(accountName);
  const timestamp = getDownloadTimestamp();
  return `LabelFix_${safeName}_${timestamp}.pdf`;
};

/**
 * FLIPKART:
 * Format: Flipkart_LabelFix_YYYY-MM-DD_HH-mm-ss.pdf
 * Example: Flipkart_LabelFix_2026-09-11_20-45-12.pdf
 */
export const getFlipkartDownloadFileName = (): string => {
  const timestamp = getDownloadTimestamp();
  return `Flipkart_LabelFix_${timestamp}.pdf`;
};

/**
 * AMAZON:
 * Format: Amazon_LabelFix_YYYY-MM-DD_HH-mm-ss.pdf
 * Example: Amazon_LabelFix_2026-09-11_20-45-12.pdf
 */
export const getAmazonDownloadFileName = (): string => {
  const timestamp = getDownloadTimestamp();
  return `Amazon_LabelFix_${timestamp}.pdf`;
};
