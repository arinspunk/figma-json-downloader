import axios from 'axios';
import { config } from '../config/config.js';

class FigmaService {
  constructor() {
    this.client = axios.create({
      baseURL: config.figma.apiUrl,
      headers: {
        'X-Figma-Token': config.figma.accessToken
      }
    });
  }

  async getFile(fileKey) {
    try {
      const response = await this.client.get(`/files/${fileKey}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener el archivo de Figma: ${error.message}`);
    }
  }

  async getFileNodes(fileKey, nodeIds) {
    try {
      const response = await this.client.get(`/files/${fileKey}/nodes?ids=${nodeIds.join(',')}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener los nodos de Figma: ${error.message}`);
    }
  }
}

export const figmaService = new FigmaService(); 