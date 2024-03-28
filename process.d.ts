declare namespace NodeJS {
  export interface ProcessEnv {
    DEV_PROJECT_URL?: string;
    PROD_PROJECT_URL?: string;
    JWTSECRET?: string;
    JWTEXPIRESIN?: string;
    SENDGRID_API_KEY?: string;
    EMAIL_SENDER?: string;
    NAME_SENDER?: string;
  }
}
