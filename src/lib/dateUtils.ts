import { toZonedTime, fromZonedTime, format as formatTZ } from 'date-fns-tz';
import { format } from 'date-fns';

const TIMEZONE = 'America/Cuiaba';

/**
 * Get current date in Cuiaba timezone
 */
export function getCurrentDateInCuiaba(): Date {
  return toZonedTime(new Date(), TIMEZONE);
}

/**
 * Convert a date string to Cuiaba timezone
 */
export function toDateInCuiaba(dateString: string): Date {
  return toZonedTime(new Date(dateString + 'T12:00:00'), TIMEZONE);
}

/**
 * Format date for database storage (YYYY-MM-DD) in Cuiaba timezone
 */
export function formatDateForDB(date: Date): string {
  const zonedDate = toZonedTime(date, TIMEZONE);
  return format(zonedDate, 'yyyy-MM-dd');
}

/**
 * Get today's date formatted for input fields (YYYY-MM-DD)
 */
export function getTodayFormatted(): string {
  return formatDateForDB(getCurrentDateInCuiaba());
}

/**
 * Parse date string from database considering Cuiaba timezone
 */
export function parseDateFromDB(dateString: string): Date {
  // Database stores YYYY-MM-DD, we need to parse it in Cuiaba timezone
  return toZonedTime(new Date(dateString + 'T12:00:00'), TIMEZONE);
}
