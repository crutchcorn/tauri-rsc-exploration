import 'next/dist/server/lib/cpu-profile.js'
import {startServer} from 'next/dist/server/lib/start-server.js'
import {printAndExit} from 'next/dist/server/lib/utils.js'
import {getReservedPortExplanation, isPortIsReserved,} from 'next/dist/lib/helpers/get-reserved-port.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const host = "localhost"
const port = 3000
let keepAliveTimeout = 300

if (isPortIsReserved(port)) {
    printAndExit(getReservedPortExplanation(port), 1)
}

await startServer({
    dir: __dirname,
    isDev: false,
    hostname: host,
    port,
    keepAliveTimeout,
})
