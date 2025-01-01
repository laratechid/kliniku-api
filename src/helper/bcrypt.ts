import bcrypt from "bcrypt";

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export function comparePassword(inputPassword: string, password: string) {
  return bcrypt.compare(inputPassword, password);
}
