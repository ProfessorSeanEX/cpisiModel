const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const http = require('http');

const PORT = 8080;
const PROJECT_ROOT = '/media/seanje-lenox-wise/Project/cpisiModel';
const SANDBOX_DIR = path.join(PROJECT_ROOT, '.sandbox');

// Ensure .sandbox exists
if (!fs.existsSync(SANDBOX_DIR)) {
    fs.mkdirSync(SANDBOX_DIR, { recursive: true });
}

const CAPTURE_FILE = path.join(SANDBOX_DIR, 'MOBILE_CAPTURE.adoc');
const SIGN_FILE = path.join(SANDBOX_DIR, 'MOBILE_SIGN.omni');

// 1. Create HTTP Server for Static Files (index.html)
const server = http.createServer((req, res) => {
    let filePath = path.join(PROJECT_ROOT, '03_tov/a-ladder/gate/index.html');
    if (fs.existsSync(filePath)) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fs.readFileSync(filePath));
    } else {
        res.writeHead(404);
        res.end('Gate Index Not Found');
    }
});

// 2. Create WebSocket Server on the same port
const wss = new WebSocket.Server({ server });

console.log(`0.0 YASHAR: Gate Substrate Online`);
console.log(`WEB: http://localhost:${PORT}`);
console.log(`WS: ws://localhost:${PORT}`);
console.log(`SANDBOX: ${SANDBOX_DIR}`);

wss.on('connection', (ws) => {
    console.log('MOBILE SYNC: Connection Established');
    
    // Initial Stream from .sandbox
    streamFile(ws, 'VOID:', CAPTURE_FILE);
    
    // Watch .sandbox for changes
    const sandboxWatcher = fs.watch(SANDBOX_DIR, (event, filename) => {
        if (filename === 'MOBILE_CAPTURE.adoc') {
            streamFile(ws, 'VOID:', CAPTURE_FILE);
        }
    });
    
    ws.on('message', (message) => {
        const data = message.toString();
        if (data.startsWith('SIGN:')) {
            const value = data.split(':')[1];
            handleSign(value);
        }
        // Handle incoming raw text from phone to .sandbox
        if (data.startsWith('TEXT:')) {
            const content = data.substring(5);
            fs.writeFileSync(CAPTURE_FILE, content);
        }
    });
    
    ws.on('close', () => {
        sandboxWatcher.close();
        console.log('MOBILE SYNC: Connection Terminated');
    });
});

function streamFile(ws, prefix, filePath) {
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        ws.send(`${prefix}${content}`);
    }
}

function handleSign(value) {
    const timestamp = new Date().toISOString();
    const entry = `SIGN: [${value}] | TIMESTAMP: ${timestamp}\n`;
    fs.appendFileSync(SIGN_FILE, entry);
    console.log(`THE SEAL: Sign ${value} recorded in .sandbox`);
}

server.listen(PORT);
