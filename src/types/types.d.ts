declare namespace React {
  export interface EventTarget {
    name: string;
    value: string;
    htmlFor: string;
  }
}

declare namespace NodeJS {
  export interface ProcessEnv {
    REACT_APP_API_URL: string;
    REACT_APP_API_HOST: string;
  }
}
