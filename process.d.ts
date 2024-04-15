declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL?: string;
    DEV_PROJECT_URL?: string;
    PROD_PROJECT_URL?: string;
    JWT_SECRET?: string;
    JWT_EXPIRESIN?: string;
    JWT_EXPIRESIN_RP?: string;
    JWT_EXPIRESIN_AC?: string;
    GMAIL_USER?: string;
    GMAIL_PASS?: string;
    GMAIL_SENDER?: string;
    CLD_CLOUD_NAME?: string;
    CLD_API_KEY?: string;
    CLD_API_SECRET?: string;
  }
}
