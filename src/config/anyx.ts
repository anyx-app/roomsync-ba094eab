export type AnyxConfig = {
  serverUrl?: string;
  projectId?: string;
  apiKey?: string; // only used in server/test contexts
};

function readImportMetaEnv(): Partial<AnyxConfig> {
  const env = (import.meta as any).env || {};
  return {
    serverUrl: env.VITE_ANYX_SERVER_URL,
    projectId: env.VITE_ANYX_PROJECT_ID,
    apiKey: env.ANYX_COMMON_API_KEY,
  };
}

function readProcessEnv(): Partial<AnyxConfig> {
  const env = (typeof process !== "undefined" ? (process as any).env : {}) || {};
  return {
    serverUrl: env.VITE_ANYX_SERVER_URL || env.ANYX_SERVER_URL,
    projectId: env.VITE_ANYX_PROJECT_ID || env.ANYX_PROJECT_ID,
    apiKey: env.ANYX_COMMON_API_KEY,
  };
}

export function getAnyxConfig(): AnyxConfig {
  // Process env first (SSR/tests), then import.meta.env (Vite runtime)
  const fromProcess = readProcessEnv();
  const fromImportMeta = readImportMetaEnv();
  return { ...fromProcess, ...fromImportMeta };
}


