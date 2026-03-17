#!/usr/bin/env node

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exec } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;
const ROOT = path.join(__dirname, '../'); // Go up to project root

const server = http.createServer((req, res) => { 
  
  
  if (req.url === '/favicon.ico') {
    // Point this to wherever the file actually is
    // If it's in /images, use path.join(ROOT, 'images/favicon.ico')
    const faviconPath = path.join('assets/favicon.ico'); 

    fs.readFile(faviconPath, (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end();
      }
      res.writeHead(200, { 'Content-Type': 'image/x-icon' });
      res.end(data);
    });
    return;
  }
  // Simple router to serve playground files and your source code
  let filePath = req.url === '/' 
    ? path.join(ROOT, 'playground/index.html') 
    : path.join(ROOT, req.url);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("File not found");
      return;
    }
    
    // Set content type for JS modules
    if (filePath.endsWith('.js')) res.setHeader('Content-Type', 'application/javascript');
    
    res.writeHead(200);
    res.end(data);
  });
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`Sutairu Playground running at ${url}`);
  
  // Automatically open the browser
  const start = (process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open');
  exec(`${start} ${url}`);
});