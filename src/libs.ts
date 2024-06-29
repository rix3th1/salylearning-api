export function exclude<T, Key extends keyof T>(obj: T, ...keys: Key[]) {
  for (const key of keys) {
    // Delete the key from the object
    delete obj[key];
  }
  return obj;
}

import * as crypto from 'crypto';

// Función para generar un código aleatorio alfanumérico de 10 caracteres en mayúsculas
function generateRandomCode(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

// Función para firmar un código recibido o generar uno si no se proporciona
export function signCode(receivedCode?: string): string {
  if (receivedCode && !/^[A-Z0-9]{10}$/.test(receivedCode)) {
    throw new Error('El código recibido no tiene el formato correcto');
  }

  // Si no se recibe un código, se genera uno
  const codeToSign = receivedCode || generateRandomCode();

  // Generar un código aleatorio de 10 caracteres
  const randomCode = generateRandomCode();

  // Concatenar el código a firmar y el código aleatorio
  const combinedCode = codeToSign + randomCode;

  // Crear un hash del código combinado
  const hash = crypto.createHash('sha256').update(combinedCode).digest('hex');

  // Convertir el hash a un código alfanumérico de 10 caracteres en mayúsculas
  const alphanumericHash = hash
    .replace(/[^A-Z0-9]/gi, '')
    .substring(0, 10)
    .toUpperCase();

  return alphanumericHash;
}
