import { promises as fs } from 'fs';
import { join } from 'path';
import { config } from '../config/config.js';
import { sanitizeFileName } from '../utils/fileUtils.js';

class FileService {
  constructor() {
    this.baseDir = config.output.baseDir;
  }

  async ensureDirectoryExists() {
    try {
      await fs.mkdir(this.baseDir, { recursive: true });
    } catch (error) {
      throw new Error(`Error al crear el directorio: ${error.message}`);
    }
  }

  /**
   * Genera un nombre de archivo descriptivo
   * @param {string} key - Clave del archivo de Figma
   * @param {string} description - Descripción del archivo
   * @returns {string} - Nombre de archivo generado
   */
  generateFileName(key, description = '') {
    const sanitizedDescription = description ? sanitizeFileName(description) : '';
    const fileName = sanitizedDescription 
      ? `${sanitizedDescription}-${key}.${config.output.fileFormat}`
      : `${key}.${config.output.fileFormat}`;
    
    return fileName;
  }

  async saveJson(fileKey, data, description = '') {
    try {
      await this.ensureDirectoryExists();
      const fileName = this.generateFileName(fileKey, description);
      const filePath = join(this.baseDir, fileName);
      
      await fs.writeFile(
        filePath,
        JSON.stringify(data, null, 2),
        'utf8'
      );
      
      return filePath;
    } catch (error) {
      throw new Error(`Error al guardar el archivo JSON: ${error.message}`);
    }
  }
}

export const fileService = new FileService(); 