import { R2UploadSingle } from "../../service/r2";
import { Res } from "../../types/fastify";
import { response } from "../../helper/response";

export class UploadService {
  static async uploadSingleImage(
    res: Res,
    data: Buffer,
    fileName: string,
    contentType: string,
  ) {
    try {
      return await R2UploadSingle(data, fileName, contentType);
    } catch (error) {
      response(res, error, 500);
    }
  }
}
