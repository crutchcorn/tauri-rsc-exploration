import {
    copyFileSync
} from 'fs';
import {resolve, dirname} from "path";
import { fileURLToPath } from 'url';
import {execa} from "execa";

const __dirname = dirname(fileURLToPath(import.meta.url));

let extension = '';
if (process.platform === 'win32') {
    extension = '.exe';
}

async function main() {
    const rustInfo = (await execa('rustc', ['-vV'])).stdout;
    const targetTriple = /host: (\S+)/g.exec(rustInfo)[1];
    if (!targetTriple) {
        console.error('Failed to determine platform target triple');
    }
    copyFileSync(process.execPath, resolve(__dirname, `../vendor/its-node-${targetTriple}${extension}`))
}

main().catch((e) => {
    throw e;
});