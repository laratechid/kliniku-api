import { JwtPayload } from "jsonwebtoken";

export interface UserJwtPayload extends JwtPayload{
    id: number,
    name?: string,
    identifier?: string,
    email?: string
}