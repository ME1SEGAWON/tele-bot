console.log('✅ Iniciando...')

import { join, dirname } from 'path'
import { createRequire } from 'module';
import { fileURLToPath } from 'url'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts';
import { createInterface } from 'readline'
import yargs from 'yargs'
import { Octokit } from "@octokit/rest";
import chokidar from 'chokidar';
import fs from 'fs';
import path from 'path';
import debounce from 'lodash.debounce';

// Konfigurasi GitHub
const token = "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"
const octokit = new Octokit({ auth: token });
const owner = 'ME1SEGAWON';
const repo = 'tele-bot';

async function checkBranchExists() {
  try {
    const { data: refData } = await octokit.git.getRef({
      owner,
      repo,
      ref: 'heads/main',
    });
    console.log('Branch exists:', refData.ref);
  } catch (error) {
    if (error.status === 404) {
      console.error('Branch tidak ditemukan, periksa nama branch atau buat branch baru di GitHub.');
    } else {
      console.error('Error:', error.message);
    }
  }
}

checkBranchExists();

let changes = [];

// Fungsi untuk melakukan commit dan push ke GitHubgjf
async function commitChanges() {
  if (changes.length === 0) return;

  try {
    const { data: refData } = await octokit.git.getRef({
      owner,
      repo,
      ref: 'heads/main',
    });

    const { data: commitData } = await octokit.git.getCommit({
      owner,
      repo,
      commit_sha: refData.object.sha,
    });

    const blobs = await Promise.all(changes.map(async ({ filePath, content }) => {
      return octokit.git.createBlob({
        owner,
        repo,
        content,
        encoding: 'utf-8',
      });
    }));

    const tree = await octokit.git.createTree({
      owner,
      repo,
      base_tree: commitData.tree.sha,
      tree: blobs.map((blob, index) => ({
        path: path.join(path.dirname(changes[index].filePath), path.basename(changes[index].filePath)), // Menyimpan file sesuai dengan struktur folder asal
        mode: '100644',
        type: 'blob',
        sha: blob.data.sha,
      })),
    });

    const newCommit = await octokit.git.createCommit({
      owner,
      repo,
      message: 'Batch commit',
      tree: tree.data.sha,
      parents: [commitData.sha],
    });

    await octokit.git.updateRef({
      owner,
      repo,
      ref: 'heads/main',
      sha: newCommit.data.sha,
    });

    console.log('Batch commit successful');
    changes = []; // Clear changes after commit
  } catch (error) {
    console.error('Failed to commit changes:', error);
  }
}

const debouncedCommit = debounce(commitChanges, 5000, { 'maxWait': 10000 });

// Memantau perubahan pada direktori
const watcher = chokidar.watch('.', { ignored: /(^|[\/\\])\../ });

let changeCount = 0;
let timer;

function resetChanges() {
  changes = [];
  changeCount = 0;
} 

watcher.on('change', (filePath) => {
  console.log(`File ${filePath} telah berubah`);
  const content = fs.readFileSync(filePath, 'utf8');
  changes.push({ filePath, content });
  changeCount++;

  if (changeCount >= 3) {
    clearTimeout(timer);
    debouncedCommit();
    resetChanges(); 
  } else {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (changeCount > 0) {
        debouncedCommit();
        resetChanges();
      }
    }, 10000);
  }
});

console.log('Memantau perubahan file...');
// https://stackoverflow.com/a/50052194
const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname) // Bring in the ability to create the 'require' methos
const { name, author } = require(join(__dirname, './package.json')) // https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js
const { say } = cfonts
const rl = createInterface(process.stdin, process.stdout)

say('Dylux FG98', {
  font: 'pallet',
  align: 'center',
  gradient: ['red', 'magenta']
})
say(`dylux-bot By FG98 Ig: @fg98_ff`, {
  font: 'console',
  align: 'center',
  gradient: ['cyan', 'magenta']
})

var isRunning = false
/**
 * Start a js file
 * @param {String} file `path/to/file`
 */
function start(file) {
  if (isRunning) return
  isRunning = true
  let args = [join(__dirname, file), ...process.argv.slice(2)]
  say([process.argv[0], ...args].join(' '), {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']
  })
  setupMaster({
    exec: args[0],
    args: args.slice(1),
  })
  let p = fork()
  p.on('message', data => {
    console.log('[RECEIVED]', data)
    switch (data) {
      case 'reset':
        p.process.kill()
        isRunning = false
        start.apply(this, arguments)
        break
      case 'uptime':
        p.send(process.uptime())
        break
    }
  })
  //---
 p.on('exit', (_, code) => {
    isRunning = false
    console.error('❎ Ocurrió un error inesperado:', code)
    if (code === 0) return
    watchFile(args[0], () => {
      unwatchFile(args[0])
      start(file)
    })
  })
  //----
  let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
  if (!opts['test'])
    if (!rl.listenerCount()) rl.on('line', line => {
      p.emit('message', line.trim())
    })
  // console.log(p
}

start('main.js')
//watchAllDirectories()
//watchSessionsDirectory()

