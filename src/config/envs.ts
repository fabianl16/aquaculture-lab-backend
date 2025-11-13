import 'dotenv/config';

import * as joi from 'joi';


interface EnVars {
    BACKEND_PORT: number;
    RABBITMQ_HOST: string;
    RABBITMQ_GATEWAY_QUEUE: string;
    RABBITMQ_SIMULATIONS_QUEUE: string;
    RABBITMQ_SERVICE: string;
    RABBITMQ_USERNAME: string;
    RABBITMQ_PASSWORD: string;
    RABBITMQ_PORT: number,
    REDIS_CLIENT: string,
    REDIS_HOST: string,
    REDIS_PORT: number
}


const envVarsSchema = joi.object({
    BACKEND_PORT: joi.number().required(),
    REDIS_PORT: joi.number().required(),
    RABBITMQ_HOST: joi.string().required(),
    REDIS_CLIENT: joi.string().required(),
    REDIS_HOST: joi.string().required(),
    RABBITMQ_GATEWAY_QUEUE: joi.string().required(),
    RABBITMQ_SIMULATIONS_QUEUE: joi.string().required(),
    RABBITMQ_SERVICE: joi.string().required(),
    RABBITMQ_USERNAME: joi.string().required(),
    RABBITMQ_PASSWORD: joi.string().required(),
    RABBITMQ_PORT: joi.number().default(5672),
}).unknown();

const { error, value } = envVarsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnVars = value;

const rabbitmqUrl = `amqp://${envVars.RABBITMQ_USERNAME}:${envVars.RABBITMQ_PASSWORD}@${envVars.RABBITMQ_HOST}:${envVars.RABBITMQ_PORT}`;
const redisUrl = `redis://${envVars.REDIS_HOST}:${envVars.REDIS_PORT}`

export const envs = {
    nestJsPort: envVars.BACKEND_PORT,
    redisUrl,
    rabbitmqUrl,
    redisClient: envVars.REDIS_CLIENT,
    rabbitmqGatewayQueue: envVars.RABBITMQ_GATEWAY_QUEUE,
    rabbitmqSimulationsQueue: envVars.RABBITMQ_SIMULATIONS_QUEUE,
    rabbitmqService: envVars.RABBITMQ_SERVICE,
}
