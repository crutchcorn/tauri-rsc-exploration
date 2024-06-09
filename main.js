import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {parseArgs} from "util";

import 'next/dist/server/lib/cpu-profile.js'
import {startServer} from 'next/dist/server/lib/start-server.js'
import {printAndExit} from 'next/dist/server/lib/utils.js'
import {getReservedPortExplanation, isPortIsReserved} from 'next/dist/lib/helpers/get-reserved-port.js'

const args = parseArgs( {
    options: {
        dev: {
            type: 'boolean',
            short: 'd',
            default: false
        }
    },
    // Remove the path, the node executable, and the `--`
    args: process.argv.slice(3)
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const host = "localhost"
const port = 3000
let keepAliveTimeout = 300

if (isPortIsReserved(port)) {
    printAndExit(getReservedPortExplanation(port), 1)
}

const isDev = !!args.values?.['dev'];

await startServer({
    dir: __dirname,
    isDev: isDev,
    hostname: host,
    port,
    keepAliveTimeout,
})
