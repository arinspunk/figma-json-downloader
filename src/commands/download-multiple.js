import { Command } from 'commander';
import { figmaService } from '../services/figmaService.js';
import { fileService } from '../services/fileService.js';
import { promises as fs } from 'fs';

const program = new Command('download-multiple');

program
  .description('Descarga múltiples archivos de Figma desde un archivo de configuración')
  .requiredOption('-c, --config <path>', 'Ruta al archivo de configuración JSON')
  .action(async (options) => {
    try {
      // Leer el archivo de configuración
      const configContent = await fs.readFile(options.config, 'utf8');
      const config = JSON.parse(configContent);

      if (!Array.isArray(config.files)) {
        throw new Error('El archivo de configuración debe contener un array de "files"');
      }

      console.log(`Iniciando descarga de ${config.files.length} archivos...`);

      // Descargar cada archivo
      for (const file of config.files) {
        try {
          console.log(`\nDescargando archivo: ${file.key}`);
          
          let data;
          if (file.nodes && file.nodes.length > 0) {
            data = await figmaService.getFileNodes(file.key, file.nodes);
          } else {
            data = await figmaService.getFile(file.key);
          }

          const filePath = await fileService.saveJson(file.key, data, file.description);
          console.log(`✓ Archivo guardado en: ${filePath}`);
        } catch (error) {
          console.error(`✗ Error al descargar ${file.key}: ${error.message}`);
          // Continuar con el siguiente archivo
          continue;
        }
      }

      console.log('\nProceso de descarga completado.');
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

export default program; 