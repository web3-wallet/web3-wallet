declare namespace NodeJS {
  interface ProcessEnv {
    readonly IS_LOCAL: 'true' | undefined;
  }
}
