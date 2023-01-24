import * as dotenv from "dotenv";
dotenv.config();

export enum Acces {
  READ = 1,
  WRITE = 2,
  LOCK = 4,
}

export class Config {
  private readonly config: {
    [key: string]: {
      value: any;
      mod: number;
      validate?: (val: any) => boolean;
    };
  };

  constructor(config: {
    [key: string]: {
      value: any;
      mod: number;
      validate?: (val: any) => boolean;
    };
  }) {
    this.config = config;
    this.parseEnv();
  }

  private parseEnv() {
    for (const key in this.config) {
      if (this.config.hasOwnProperty(key)) {
        const envValue = process.env[key]; //value from .env
        const { value, mod, validate } = this.config[key]; //config params

        //validation
        if (envValue !== undefined && envValue !== "") {
          if (validate && !validate(envValue)) {
            throw new Error(`Invalid value for ${key}: ${envValue}`);
          }
          this.config[key].value = envValue;
        } else if ((mod & Acces.READ) === 0) {
          throw new Error(`Missing value for ${key}`);
        }
      }
    }
  }

  public get<T>(key: string): T {
    const configValue = this.config[key];
    if (!configValue) {
      throw new Error(`Invalid config key: ${key}`);
    }
    if ((configValue.mod & Acces.READ) === 0) {
      throw new Error(`Cannot read config key: ${key}`);
    }
    return configValue.value as T;
  }

  public set<T>(key: string, value: T) {
    const configValue = this.config[key];
    if (!configValue) {
      throw new Error(`Invalid config key: ${key}`);
    }
    if ((configValue.mod & Acces.WRITE) === 0) {
      throw new Error(`Cannot write config key: ${key}`);
    }
    if (configValue.validate && !configValue.validate(value)) {
      throw new Error(`Invalid value for ${key}: ${value}`);
    }
    configValue.value = value;
  }
}
