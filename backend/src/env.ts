import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
	NODE_ENV: z.enum(['DEV', 'TEST', 'PROD']).default('DEV'),
	PORT: z.coerce.number().default(3333),
	POSTGRES_DB: z.string(),
	POSTGRES_USER: z.string(),
	POSTGRES_PASSWORD: z.string(),
	DATABASE_URL: z.string(),
});

export const env = envSchema.parse(process.env);
