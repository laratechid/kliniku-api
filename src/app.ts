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
import fastifyMultipart from '@fastify/multipart';
import fastify from 'fastify'
import { uploadRoutes } from './modules/upload/upload.route'
import { queueRoutes } from './modules/queue/queue.route'

async function bootstrap() {
    await mysqlInit()
    const app = fastify({ logger: true })
    initSocketIO(app)

    app.get("/", (_, res: Res) => response(res, 'ok'))
    app.register(cookie)
    app.register(fastifyMultipart)
    app.register(userRoutes, { prefix: "/user" })
    app.register(queueRoutes, { prefix: "/queue" })
    app.register(clinicRoutes, { prefix: "/clinic" })
    app.register(uploadRoutes, { prefix: "/upload" })
    app.register(authRoutes, { prefix: "/auth/google" })
    app.register(polyClinicRoutes, { prefix: "/polyclinic" })
    app.listen({ port: env.appPort }, () => successLog(`app running on port: ${env.appPort}`))
}

bootstrap()