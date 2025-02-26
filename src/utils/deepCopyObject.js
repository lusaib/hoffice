/**
 * Lusaib Latheef - 13-08/2023
 * Function to deep copy an object or an array .
 * @param {Object | Array} obj 
 * @returns {Object | Array} - returns the new copy object .
 */
export default function deepCopy(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  let copy;

  if (obj instanceof File) {
    // Handle File objects
    copy = new File([obj], obj.name, { type: obj.type });
  } else if (obj instanceof Date) {
    // Handle Date objects
    copy = new Date(obj);
  } else if (Array.isArray(obj)) {
    // Handle arrays
    copy = [];
    for (let i = 0; i < obj.length; i++) {
      copy.push(deepCopy(obj[i]));
    }
  } else {
    // Handle objects
    copy = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        copy[key] = deepCopy(obj[key]);
      }
    }
  }

  return copy;
}
