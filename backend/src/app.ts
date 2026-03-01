import { fastify } from 'fastify';
import { env } from './env';

import { UserRouter } from '@/routes/User.route';

const app = fastify();

UserRouter.registerRoutes(app);


app.listen({
	port: env.PORT,
});

console.log(`Server running on http://localhost:${env.PORT}`);
