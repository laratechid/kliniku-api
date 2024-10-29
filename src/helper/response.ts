import { Res } from "../types/fastify"

class Response {
    statusCode: number
    message: any
    constructor(status: number, message: any) {
        this.statusCode = status,
        this.message = message
    }
}
class ResponsePaginate {
    statusCode: number
    message: any
    total: number
    totalPage: number
    isHasNextPage: boolean
    constructor(status: number, message: any, total: number, totalPage: number, isHasNextPage: boolean) {
        this.statusCode = status,
        this.message = message
        this.total = total
        this.totalPage = totalPage
        this.isHasNextPage = isHasNextPage
    }
}

export function response(res: Res, message: any, statusCode?: number) {
    const r = new Response(statusCode ?? 200, message)
    res.status(r.statusCode).send(r)
}

export function responsePaginate(res: Res, data: any[], total: number, page: number, limit: number) {
    const totalRows = total
    const totalPage = Math.ceil(total / limit)
    const isHasNextPage = page < totalPage 
    const r = new ResponsePaginate(200, data, totalRows, totalPage, isHasNextPage)
    res.status(r.statusCode).send(r)
}