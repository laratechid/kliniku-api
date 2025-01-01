import { FastifyInstance } from "fastify";
import { AppDataSource as DB } from "../../config/db";
import { UserDto } from "../../dto/user";
import { response } from "../../helper/response";
import { validation } from "../../helper/validation";
import { Req, Res } from "../../types/fastify";
import { UserRepository } from "../user/user.repository";
import { AuthService } from "./auth.service";
import { targetConstructorToSchema } from "class-validator-jsonschema";
import { LoginDto, RefreshTokenDto } from "../../dto/auth";
import { generateJwtToken } from "../../helper/fastify-jwt";
import {
  decodeRefreshToken,
  generateJwtRefreshToken,
  validateJwtRefreshToken,
} from "../../helper/jwt";
import { UserJwtPayload } from "../../types/jwt";

class Controller {
  private static authService = new AuthService(new UserRepository(DB));

  static async register(req: Req, res: Res) {
    const user = new UserDto();
    const dataValue = Object.assign(user, req.body);
    const { valid, msg } = await validation(dataValue);
    if (!valid) response(res, msg, 400);
    const { id, name, identifier, email } = await this.authService.register(
      res,
      dataValue,
    );
    const payload = { id, name, identifier, email };
    const token = generateJwtToken(req, payload);
    const refreshToken = generateJwtRefreshToken(payload);
    response(res, { token, refreshToken });
  }

  static async login(req: Req, res: Res) {
    const user = new LoginDto();
    const dataValue = Object.assign(user, req.body);
    const { valid, msg } = await validation(dataValue);
    if (!valid) response(res, msg, 400);
    const { id, name, identifier, email } = await this.authService.login(
      res,
      dataValue,
    );
    const payload = { id, name, identifier, email };
    const token = generateJwtToken(req, payload);
    const refreshToken = generateJwtRefreshToken(payload);
    response(res, { token, refreshToken });
  }

  static async refreshToken(req: Req, res: Res) {
    const user = new RefreshTokenDto();
    const dataValue = Object.assign(user, req.body);
    const { valid, msg } = await validation(dataValue);
    if (!valid) response(res, msg, 400);
    const validate = validateJwtRefreshToken(dataValue.refreshToken);
    if (!validate) response(res, "invalid refresh token credentials", 403);
    const decodedToken = decodeRefreshToken(dataValue.refreshToken);
    const { id, name, identifier, email } = decodedToken as UserJwtPayload;
    const payload = { id, name, identifier, email };
    const token = generateJwtToken(req, payload);
    const refreshToken = generateJwtRefreshToken(payload);
    response(res, { token, refreshToken });
  }
}

export function authRoutes(route: FastifyInstance) {
  route.post(
    "/register",
    { schema: { tags: ["Auth"], body: targetConstructorToSchema(UserDto) } },
    (req, res) => Controller.register(req, res),
  );
  route.post(
    "/login",
    { schema: { tags: ["Auth"], body: targetConstructorToSchema(LoginDto) } },
    (req, res) => Controller.login(req, res),
  );
  route.post(
    "/refreshToken",
    {
      schema: {
        tags: ["Auth"],
        body: targetConstructorToSchema(RefreshTokenDto),
      },
    },
    (req, res) => Controller.refreshToken(req, res),
  );
}
