declare namespace NodeJS {
  export interface ProcessEnv {
    DEV_PROJECT_URL?: string;
    PROD_PROJECT_URL?: string;
    JWT_SECRET?: string;
    JWT_EXPIRES_IN?: string;
    JWT_EXPIRES_IN_RP?: string;
    SENDGRID_API_KEY?: string;
    EMAIL_SENDER?: string;
    NAME_SENDER?: string;
    CLD_CLOUD_NAME?: string;
    CLD_API_KEY?: string;
    CLD_API_SECRET?: string;
  }
}
