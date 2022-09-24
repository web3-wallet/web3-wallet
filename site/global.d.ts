declare global {
  const __CLIENT__: boolean;
  const __SERVER__: boolean;
  const __DEV__: boolean;
  const __BASE_PATH__: string;

  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production';
      /**
       * if you are trying to run the site in your local machine
       * you should crate a `site/.env.local` file and set IS_LOCAL
       * to true in `site/.env.local`.
       */
      readonly IS_LOCAL: 'true' | undefined;
    }
  }
}

/**
 * Don't remove the empty export
 */
export {};
