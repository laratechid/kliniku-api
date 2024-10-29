import Fastify from 'fastify'
import { env } from './config/env'
import { mysqlInit } from './config/db'
import { Res } from './types/fastify'
import { infoLog, successLog } from './helper/logger'
import { userRoutes } from './modules/user/user.route'
import { authRoutes } from './modules/auth/auth.route'
import { response } from './helper/response'
import cookie from '@fastify/cookie'
import { clinicRoutes } from './modules/clinic/clinic.route'

async function bootstrap() {
    const isConnected = await mysqlInit()
    if (!isConnected) process.exit()
    infoLog(`is database connected ? ${isConnected}`)
    const app = Fastify({ logger: true })
    app.register(cookie)
    app.get("/", (_, res: Res) => response(res, 'ok'))

    app.register(userRoutes, { prefix: "/user" })
    app.register(authRoutes, { prefix: "/auth/google" })
    app.register(clinicRoutes, { prefix: "/clinic" })

    app.listen({ port: env.appPort }, ()=> successLog(`app running on port: ${env.appPort}`))
}

bootstrap()