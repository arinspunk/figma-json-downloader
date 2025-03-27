#!/usr/bin/env node

import downloadProgram from './commands/download.js';
import downloadMultipleProgram from './commands/download-multiple.js';

// Combinar los comandos
downloadProgram.addCommand(downloadMultipleProgram);

// Ejecutar el programa
downloadProgram.parse(process.argv); 