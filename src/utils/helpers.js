import path from 'path';
import { fileURLToPath } from 'url';

export const __dirnameBuild = (importMetaUrl) => path.dirname(fileURLToPath(importMetaUrl));
