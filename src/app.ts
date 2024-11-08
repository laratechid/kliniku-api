import { env } from './config/env'
import { mysqlInit } from './config/db'
import { successLog } from './helper/logger'
import { userRoutes } from './modules/user/user.route'
import { authRoutes } from './modules/auth/auth.route'
import cookie from '@fastify/cookie'
import { clinicRoutes } from './modules/clinic/clinic.route'
import { polyClinicRoutes } from './modules/polyclinic/polyclinic.route'
import { initSocketIO } from './service/socket.io'
import fastifyMultipart from '@fastify/multipart';
import fastify from 'fastify'
import { uploadRoutes } from './modules/upload/upload.route'
import { queueRoutes } from './modules/queue/queue.route'
import { rootRoutes } from './modules/_root/root.route'
import { reviewRoutes } from './modules/review/review.route'
import swagger from "@fastify/swagger"
import swaggerUI from '@fastify/swagger-ui'

async function bootstrap() {
    await mysqlInit()
    const app = fastify({ logger: true })
    initSocketIO(app)

    app.register(swagger, {
        swagger: {
            info: {
                title: 'KliniKu API Documentation',
                version: '1.0.0'
            },
            consumes: ['application/json'],
            produces: ['application/json']
        }
    })

    app.register(swaggerUI, {
        routePrefix: '/docs',
        // swaggerOptions: {
        //     url: '/swagger.json'
        // },
        // staticCSP: true,
    })

    app.register(cookie)
    app.register(fastifyMultipart)
    app.register(rootRoutes, { prefix: "/" })
    app.register(userRoutes, { prefix: "/user" })
    app.register(queueRoutes, { prefix: "/queue" })
    app.register(clinicRoutes, { prefix: "/clinic" })
    app.register(uploadRoutes, { prefix: "/upload" })
    app.register(authRoutes, { prefix: "/auth/google" })
    app.register(polyClinicRoutes, { prefix: "/polyclinic" })
    app.register(reviewRoutes, { prefix: "/review" })
    app.listen({ port: env.appPort }, () => successLog(`app running on port: ${env.appPort}`))
}

bootstrap()