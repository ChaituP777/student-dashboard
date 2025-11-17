import CryptoJS from "crypto-js";

const SECRET_KEY = "mysecretkey12345";

export const encryptData = (data) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  return { encryptedData: ciphertext };
};

export const decryptData = (response) => {
  if (!response?.encryptedData) return response;

  const bytes = CryptoJS.AES.decrypt(response.encryptedData, SECRET_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);

  try {
    return JSON.parse(decrypted);
  } catch (err) {
    console.error("Decryption failed", err);
    return null;
  }
};
