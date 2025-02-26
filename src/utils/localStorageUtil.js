// Encryption key (change this to your own secret key)
const encryptionKey = 0xab;

export default function localStorageUtil(key, value) {
  // Check if localStorage is supported by the browser
  if (typeof Storage === "undefined") {
    console.error("localStorage is not supported in this browser.");
    return;
  }

  // Encrypt value with XOR
  function encrypt(value) {
    let encryptedValue = "";
    for (let i = 0; i < value.length; i++) {
      encryptedValue += String.fromCharCode(
        value.charCodeAt(i) ^ encryptionKey
      );
    }
    return encryptedValue;
  }

  // Decrypt value with XOR
  function decrypt(encryptedValue) {
    let decryptedValue = "";
    for (let i = 0; i < encryptedValue.length; i++) {
      decryptedValue += String.fromCharCode(
        encryptedValue.charCodeAt(i) ^ encryptionKey
      );
    }
    return decryptedValue;
  }

  // Set value to localStorage
  if (typeof value !== "undefined") {
    try {
      const encryptedValue = encrypt(JSON.stringify(value));
      localStorage.setItem(key, encryptedValue);
    } catch (error) {
      console.error("Error setting value in localStorage:", error);
    }
  }

  // Get value from localStorage
  else {
    try {
      const encryptedValue = localStorage.getItem(key);
      const decryptedValue = encryptedValue ? decrypt(encryptedValue) : null;
      return decryptedValue ? JSON.parse(decryptedValue) : null;
    } catch (error) {
      console.error("Error getting value from localStorage:", error);
      return null;
    }
  }
}
