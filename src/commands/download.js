import { Command } from 'commander';
import { figmaService } from '../services/figmaService.js';
import { fileService } from '../services/fileService.js';

const program = new Command();

program
  .name('figma-json-downloader')
  .description('CLI para descargar JSON de diseños de Figma')
  .version('1.0.0');

program
  .command('download')
  .description('Descarga el JSON de un archivo de Figma')
  .requiredOption('-k, --key <key>', 'Clave del archivo de Figma')
  .option('-n, --nodes <nodes...>', 'IDs de nodos específicos a descargar')
  .option('-d, --description <description>', 'Descripción del archivo')
  .action(async (options) => {
    try {
      console.log(`Descargando archivo de Figma con clave: ${options.key}`);
      
      let data;
      if (options.nodes && options.nodes.length > 0) {
        data = await figmaService.getFileNodes(options.key, options.nodes);
      } else {
        data = await figmaService.getFile(options.key);
      }

      const filePath = await fileService.saveJson(options.key, data, options.description);
      console.log(`Archivo guardado exitosamente en: ${filePath}`);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

export default program; 