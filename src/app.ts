import { env } from './config/env'
import { mysqlInit } from './config/db'
import { Res } from './types/fastify'
import { successLog } from './helper/logger'
import { userRoutes } from './modules/user/user.route'
import { authRoutes } from './modules/auth/auth.route'
import { response } from './helper/response'
import cookie from '@fastify/cookie'
import { clinicRoutes } from './modules/clinic/clinic.route'
import { polyClinicRoutes } from './modules/polyclinic/polyclinic.route'
import { initSocketIO } from './service/socket.io'
import fastify from 'fastify'

async function bootstrap() {
    await mysqlInit()
    const app = fastify({ logger: true })
    initSocketIO(app)
    app.get("/", (_, res: Res) => response(res, 'ok'))
    app.register(cookie)
    app.register(userRoutes, { prefix: "/user" })
    app.register(authRoutes, { prefix: "/auth/google" })
    app.register(clinicRoutes, { prefix: "/clinic" })
    app.register(polyClinicRoutes, { prefix: "/polyclinic" })
    app.listen({ port: env.appPort }, () => successLog(`app running on port: ${env.appPort}`))
}

bootstrap()