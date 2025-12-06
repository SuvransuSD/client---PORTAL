const { spawn } = require('child_process');
const path = require('path');

const command = process.argv[2]; // 'start' or 'build'

if (!command) {
    console.error('Please specify a command (start or build)');
    process.exit(1);
}

// Set the OpenSSL legacy provider flag in the environment
process.env.NODE_OPTIONS = '--openssl-legacy-provider';

const scriptPath = path.resolve(__dirname, 'node_modules', 'react-scripts', 'bin', 'react-scripts.js');

console.log(`Running react-scripts ${command} with --openssl-legacy-provider...`);

const child = spawn('node', [scriptPath, command], {
    stdio: 'inherit',
    env: process.env // Ensure the child process inherits the modified environment
});

child.on('close', (code) => {
    process.exit(code);
});
