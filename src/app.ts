import Fastify from 'fastify'
import { env } from './config/env'
import { mysqlInit } from './config/db'
import { Req, Res } from './types/fastify'
import { infoLog, successLog } from './helper/logger'
import { userRoutes } from './modules/user/user.route'
import { authRoutes } from './modules/auth/auth.route'

async function bootstrap() {
    const isConnected = await mysqlInit()
    if (!isConnected) process.exit()
    infoLog(`is database connected ? ${isConnected}`)
    const app = Fastify({ logger: true })
    app.get("/", (_: Req, res: Res) => res.send({ "status": "ok" }))
    app.register(userRoutes, { prefix: "/user" })
    app.register(authRoutes, { prefix: "/auth/google" })
    app.listen({ port: env.appPort }, ()=> successLog(`app running on port: ${env.appPort}`))
}

bootstrap()