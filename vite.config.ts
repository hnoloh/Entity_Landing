import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        admin: path.resolve(__dirname, 'admin.html'),
        unsubscribe: path.resolve(__dirname, 'unsubscribe.html')
      }
    }
  },
  plugins: [
    {
      name: 'api-register-middleware',
      async configureServer(server) {
        // En desarrollo, reenviamos las peticiones API al requestHandler de nuestro backend runtime
        // para que funcione npm run dev sin necesidad de levantar dos servidores.
        // En producción, el frontend se conectará al servidor de Node.js independiente.
        const { requestHandler } = await import('./src/server.ts');
        
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.startsWith('/api/')) {
            // @ts-expect-error - Vite middleware types are slightly incompatible with native http types
            requestHandler(req, res).catch(next);
          } else {
            next();
          }
        });
      }
    }
  ],
  test: {
    fileParallelism: false
  }
});
