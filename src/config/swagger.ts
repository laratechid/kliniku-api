import { FastifyDynamicSwaggerOptions } from "@fastify/swagger";

export const swaggerConfig: FastifyDynamicSwaggerOptions = {
    swagger: {
        info: {
            title: 'KliniKu API Documentation',
            version: '1.0.0'
        },
        consumes: ['application/json'],
        produces: ['application/json'],
        schemes: ["http", "https"],
        securityDefinitions: {
            BearerAuth: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
                description: 'Enter your bearer token in the format **Bearer <token>**'
            }
        },
        security: [{ BearerAuth: [] }]
    }
}