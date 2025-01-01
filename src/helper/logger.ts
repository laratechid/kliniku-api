import signale from "signale";

export const successLog = (msg: string | number | object) =>
  signale.success(msg);
export const infoLog = (msg: string | number | object) => signale.info(msg);
export const errorLog = (msg: string | number | object) => signale.error(msg);
