import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

export const config = {
  figma: {
    accessToken: process.env.FIGMA_ACCESS_TOKEN,
    apiUrl: 'https://api.figma.com/v1'
  },
  output: {
    baseDir: process.env.OUTPUT_DIR || 'figma-json',
    fileFormat: 'json'
  }
}; 