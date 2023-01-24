import { Config, Acces } from "./config";

export const RABBITMQ = {
  RABBITMQ_HOST: {
    value: "localhost", // default values
    mod: Acces.READ | Acces.WRITE, // access mods
    validate: (val: string) => val.length > 0, // validator
  },
  RABBITMQ_PORT: {
    value: undefined as unknown as number,
    mod: Acces.READ,
  },
  RABBITMQ_USER: {
    value: undefined as unknown as string,
    mod: Acces.WRITE,
  },
  RABBITMQ_PASSWORD: {
    value: undefined as unknown as string,
    mod: Acces.LOCK,
  },
  RABBITMQ_SECRET: {
    value: "DEFAULT_SECRET",
    mod: Acces.READ | Acces.WRITE,
  },
};

const config = new Config(RABBITMQ);

console.log(config.get("RABBITMQ_HOST")); // Output: 'rabbitmq.example.com'
console.log(config.get("RABBITMQ_PORT")); // Output: 5672
console.log(config.get("RABBITMQ_SECRET")); // Output: DEFAULT_SECRET

config.set("RABBITMQ_SECRET", "NEW_SECRET");
console.log(config.get("RABBITMQ_SECRET")); // Output: 'NEW_SECRET'
