import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import fs from 'node:fs';
import path from 'node:path';

function localFileApiPlugin() {
  return {
    name: 'local-file-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method === 'POST' && req.url === '/api/save-json') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const { filename, content } = data;
              if (filename === 'members.json' || filename === 'events.json') {
                const filePath = path.resolve(process.cwd(), filename);
                fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify({ success: true }));
              } else {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid filename' }));
              }
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig({
  output: 'static',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    plugins: [localFileApiPlugin()]
  }
});
