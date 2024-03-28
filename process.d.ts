declare namespace NodeJS {
  export interface ProcessEnv {
    PROJECT_URL?: string;
    JWTSECRET?: string;
    JWTEXPIRESIN?: string;
  }
}
