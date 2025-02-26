import { format, isValid, parseISO, parse } from "date-fns";
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  getDate,
  getDay,
  getMonth,
  getYear,
} from "date-fns";

/**
 * @author Lusaib Latheef
 * @description Convert date from one format to another with parameter validation
 * @param {string} dateString - The date string to convert
 * @param {string} fromFormat - The format of the input date string
 * @param {string} toFormat - The desired output format
 * @returns {string|null} Formatted date string or null if validation fails
 * @throws {Error} If parameters are invalid
 *
 * @example
 * Convert from US to UK format
 * convertDateFormat('02/07/2024', 'MM/dd/yyyy', 'dd/MM/yyyy')
 * Returns: '07/02/2024'
 */
export const convertDateFormat = (dateString, fromFormat, toFormat) => {
  // Check if all parameters are provided
  if (!dateString || !fromFormat || !toFormat) {
    throw new Error(
      "All parameters are required: dateString, fromFormat, toFormat"
    );
  }

  // Check if parameters are strings
  if (
    typeof dateString !== "string" ||
    typeof fromFormat !== "string" ||
    typeof toFormat !== "string"
  ) {
    throw new Error("All parameters must be strings");
  }

  try {
    // Parse the date string using the fromFormat
    const parsedDate = parse(dateString, fromFormat, new Date());

    // Validate that parsing was successful
    if (!isValid(parsedDate)) {
      throw new Error(
        `Invalid date string "${dateString}" for format "${fromFormat}"`
      );
    }

    // Format the date to the target format
    return format(parsedDate, toFormat);
  } catch (error) {
    // Handle any parsing or formatting errors
    if (error.message.includes("Invalid date string")) {
      throw error;
    }
    throw new Error(`Invalid format pattern provided: ${error.message}`);
  }
};

/**
 * @author Lusaib Latheef
 * Format time using date-fns
 * @param {Date|string} date - Date object or valid date string
 * @returns {string} Formatted time in 24-hour format (HH:mm:ss)
 * @throws {Error} If invalid date is provided
 */
export const convertDateToTimeString = (date) => {
  if (!date) {
    throw new Error("Date parameter is required");
  }
  // If date is a string, parse it to a Date object
  const dateObj = typeof date === "string" ? parseISO(date) : date;

  if (!isValid(dateObj)) {
    throw new Error("Invalid date provided");
  }

  return format(dateObj, "HH:mm:ss");
};

/**
 * @author Lusaib Latheef
 * @description Generates a timestamp string in the format YYYYMMDDHHmmssSSS
 * @param {Date} [date] - Optional date object. If not provided, uses current date
 * @returns {string} Timestamp string (e.g., "20240207143045123")
 */
export const getCurrentTimestamp = (date = new Date()) => {
  try {
    // Using date-fns format with custom format string
    // y: year, M: month, d: day, H: hour, m: minute, s: second, S: millisecond
    return format(date, "yyyyMMddHHmmssSSS");
  } catch (error) {
    console.error("Error generating timestamp:", error);
    throw new Error("Failed to generate timestamp");
  }
};

/**
 * @author Lusaib Latheef
 * @description Calculate the difference between two dates in days, months, or years
 * @param {Date|string} date1 - First date (Date object or ISO string)
 * @param {Date|string} date2 - Second date (Date object or ISO string)
 * @param {'days'|'months'|'years'} [unit='days'] - Unit of measurement
 * @returns {number} Difference between dates in specified unit
 * @throws {Error} If dates are invalid or unit is not supported
 */
export function getDateDifference(date1, date2, unit = "days") {
  try {
    // Convert string dates to Date objects if necessary
    const firstDate = typeof date1 === "string" ? parseISO(date1) : date1;
    const secondDate = typeof date2 === "string" ? parseISO(date2) : date2;

    // Validate dates
    if (!isValid(firstDate) || !isValid(secondDate)) {
      throw new Error("Invalid date provided");
    }

    // Validate unit
    const validUnits = ["days", "months", "years"];
    if (!validUnits.includes(unit)) {
      throw new Error(`Invalid unit. Must be one of: ${validUnits.join(", ")}`);
    }

    // Calculate difference based on unit
    switch (unit) {
      //   case "days":
      //     return Math.abs(differenceInDays(firstDate, secondDate));
      case "months":
        return Math.abs(differenceInMonths(firstDate, secondDate));
      case "years":
        return Math.abs(differenceInYears(firstDate, secondDate));
      default:
        return Math.abs(differenceInDays(firstDate, secondDate));
    }
  } catch (error) {
    console.error("Error calculating date difference:", error);
    throw error;
  }
}

/**
 * @author Lusaib Latheef
 * Formats a date according to the specified format string
 * @param {Date|string} date - Date object or ISO date string to format
 * @param {string} [formatStr='dd/MM/yyyy'] - Format string using date-fns patterns
 * @returns {string} Formatted date string
 * @throws {Error} If the date is invalid
 *
 * Common format patterns:
 * - dd/MM/yyyy -> 07/02/2024
 * - MMM d, yyyy -> Feb 7, 2024
 * - MMMM d, yyyy -> February 7, 2024
 * - yyyy-MM-dd -> 2024-02-07
 * - d MMMM yyyy -> 7 February 2024
 */
export const formatDate = (date, formatStr = "dd/MM/yyyy") => {
  try {
    // Convert string dates to Date objects if necessary
    const dateObj = typeof date === "string" ? parseISO(date) : date;

    // Validate the date
    if (!isValid(dateObj)) {
      throw new Error("Invalid date provided");
    }

    return format(dateObj, formatStr);
  } catch (error) {
    console.error("Error formatting date:", error);
    throw error;
  }
};

/**
 * @author Lusaib Latheef
 * Converts a date string to a JavaScript Date object
 * @param {string} dateString - Date string to parse
 * @param {string} [format] - Optional format string for non-ISO dates
 * @returns {Date} JavaScript Date object
 * @throws {Error} If the date string is invalid or can't be parsed
 *
 * @example
 * ISO format (no format string needed)
 * parseDateString('2024-02-07') // Returns Date object
 *
 * Custom formats
 * parseDateString('07/02/2024', 'dd/MM/yyyy')
 * parseDateString('07-02-2024', 'dd-MM-yyyy')
 * parseDateString('February 7, 2024', 'MMMM d, yyyy')
 */
export const parseDateString = (dateString, format) => {
  try {
    if (!dateString) {
      throw new Error("Date string is required");
    }

    let date;

    // If format is provided, use parse with the specified format
    if (format) {
      date = parse(dateString, format, new Date());
    } else {
      // Try parsing as ISO date first
      date = parseISO(dateString);
    }

    // Validate the parsed date
    if (!isValid(date)) {
      throw new Error(`Unable to parse date string: ${dateString}`);
    }

    return date;
  } catch (error) {
    console.error("Error parsing date:", error);
    throw error;
  }
};

/**
 * @author Lusaib Latheef
 * Extracts various date components into an object
 * @param {Date|string} date - Date object or ISO date string
 * @returns {Object} Object containing date components
 * @property {number} dayOfMonth - Day of the month (1-31)
 * @property {string} dayName - Full name of the day (Monday, Tuesday, etc.)
 * @property {string} dayNameShort - Short name of the day (Mon, Tue, etc.)
 * @property {number} monthNumber - Month number (1-12)
 * @property {string} monthName - Full name of the month (January, February, etc.)
 * @property {string} monthNameShort - Short name of the month (Jan, Feb, etc.)
 * @property {number} year - Full year (e.g., 2024)
 * @property {number} dayOfWeek - Day of week number (0-6, 0 is Sunday)
 * @throws {Error} If the date is invalid
 */
export const getDateComponents = (date) => {
  try {
    // Convert string dates to Date objects if necessary
    const dateObj = typeof date === "string" ? parseISO(date) : date;

    // Validate the date
    if (!isValid(dateObj)) {
      throw new Error("Invalid date provided");
    }

    return {
      // Day information
      dayOfMonth: getDate(dateObj),
      dayName: format(dateObj, "EEEE"),
      dayNameShort: format(dateObj, "EEE"),
      dayOfWeek: getDay(dateObj),

      // Month information
      monthNumber: getMonth(dateObj) + 1, // Adding 1 as getMonth() returns 0-11
      monthName: format(dateObj, "MMMM"),
      monthNameShort: format(dateObj, "MMM"),

      // Year information
      year: getYear(dateObj),

      // ISO formatted string
      isoString: dateObj.toISOString(),
    };
  } catch (error) {
    console.error("Error getting date components:", error);
    throw error;
  }
};
