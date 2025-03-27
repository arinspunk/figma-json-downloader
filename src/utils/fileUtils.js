/**
 * Sanitiza un string para usarlo como nombre de archivo
 * @param {string} str - String a sanitizar
 * @returns {string} - String sanitizado
 */
export function sanitizeFileName(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Reemplaza caracteres no alfanuméricos con guiones
    .replace(/^-+|-+$/g, '') // Elimina guiones al inicio y final
    .trim();
} 