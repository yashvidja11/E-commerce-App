import CryptoJS from 'crypto-js';

const SECRET_KEY = '#₹ecom$jdjdrmrj@'; 

export function encryptData(data: any): string {
  const encrypted = CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  return encrypted;
}

export function decryptData(encryptedData: any): string {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY).toString(CryptoJS.enc.Utf8);
  return decrypted;
}