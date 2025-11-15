import * as path from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import version from 'vite-plugin-package-version'
import svgr from 'vite-plugin-svgr'
import { webUpdateNotice } from '@plugin-web-update-notification/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    version(),
    webUpdateNotice({
      versionType: 'pkg_version',
      notificationProps: {
        title: 'New Version Available',
        description: 'A new version of this app is available. Please refresh to update.',
        buttonText: 'Refresh',
        dismissButtonText: 'Dismiss'
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  build: {
    sourcemap: true
  }
})
