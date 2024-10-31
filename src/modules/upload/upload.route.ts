import { FastifyInstance } from "fastify";
import { Req, Res } from "../../types/fastify";
import { UploadService } from "./upload.service";
import { response } from "../../helper/response";

class UploadRoute {
    static async upload(req: Req, res: Res) {
        const file = await req.file()
        const buffer = await file.toBuffer()
        const fileName = file.filename
        const contentType = file.mimetype
        const data = await UploadService.uploadSingleImage(
            res,
            buffer,
            fileName,
            contentType
        )
        return response(res, data)
    }
}

export function uploadRoutes(route: FastifyInstance) {
    route.post("/", async (req: Req, res: Res) => await UploadRoute.upload(req, res))
}