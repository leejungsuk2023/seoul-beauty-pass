/**
 * Generate a unique booking reference in format: BBG-YYYY-XXXX
 * Example: BBG-2026-4521
 */
export function generateBookingRef(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
  return `BBG-${year}-${random}`;
}

/**
 * Generate a default surgery date (30 days from now)
 */
export function getDefaultSurgeryDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
}
