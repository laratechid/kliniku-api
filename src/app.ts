import fastify from 'fastify'
import fastifyMultipart from '@fastify/multipart';
import swagger from "@fastify/swagger"
import swaggerUI from '@fastify/swagger-ui'
import cookies from '@fastify/cookie'
import fJwt from '@fastify/jwt'
import { env } from './config/env'
import { mysqlInit } from './config/db'
import { successLog } from './helper/logger'
import { oauthRoutes } from './modules/auth/oauth.route'
import { clinicRoutes } from './modules/clinic/clinic.route'
import { polyClinicRoutes } from './modules/polyclinic/polyclinic.route'
import { initSocketIO } from './service/socket.io'
import { uploadRoutes } from './modules/upload/upload.route'
import { queueRoutes } from './modules/queue/queue.route'
import { rootRoutes } from './modules/_root/root.route'
import { reviewRoutes } from './modules/review/review.route'
import { swaggerConfig } from './config/swagger'
import { bookRoutes } from './modules/book/book.route';
import { authRoutes } from './modules/auth/auth.route';

async function bootstrap() {
  await mysqlInit()
  const app = fastify({ logger: true })
  initSocketIO(app)

  app.register(fJwt, { secret: env.jwtSecret })

  app.register(cookies)
  app.register(fastifyMultipart)
  app.register(swagger, { ...swaggerConfig })
  app.register(swaggerUI, { routePrefix: '/docs' })
  app.register(rootRoutes, { prefix: "/" })
  app.register(queueRoutes, { prefix: "/queue" })
  app.register(authRoutes, { prefix: "/auth" })
  app.register(bookRoutes, { prefix: "/book" })
  app.register(clinicRoutes, { prefix: "/clinic" })
  app.register(uploadRoutes, { prefix: "/upload" })

  app.register(oauthRoutes, { prefix: "/auth/google" })
  app.register(polyClinicRoutes, { prefix: "/polyclinic" })
  app.register(reviewRoutes, { prefix: "/review" })
  app.listen({ port: env.appPort },
    () => successLog(`app running on port: ${env.appPort}`))
}

bootstrap()