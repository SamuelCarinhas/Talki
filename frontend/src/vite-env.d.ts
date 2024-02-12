/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_WEBSOCKET: string
    readonly VITE_API: string
    readonly VITE_HOST: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}