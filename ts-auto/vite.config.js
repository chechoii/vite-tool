import { defineConfig } from 'vite';

export default defineConfig({
    css:{
        modules:{
            // generateScopedName:''
        }
    },
    build:{
        outDir:'dist'
    }
})