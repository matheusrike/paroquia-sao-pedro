import { UserController } from '@/controllers/User.controller';
import { UserService } from '@/services/User.service';
import { prisma } from '@prisma/client.prisma';
import { FastifyInstance } from 'fastify';

export class UserRouter {
	static userController = new UserController(new UserService(prisma));
	static registerRoutes(fastify: FastifyInstance) {
		fastify.get('/users', async (request, reply) => {
			this.userController.getUsers(reply);
		});

		fastify.get('/users/:id', async (request, reply) => {
			this.userController.getUserById(request, reply);
		});

		fastify.post('/users', async (request, reply) => {
			this.userController.createUser(request, reply);
		});

		fastify.put('/users/:id', async (request, reply) => {
			this.userController.updateUser(request, reply);
		});

		fastify.delete('/users/:id', async (request, reply) => {
			this.userController.deleteUser(request, reply);
		});
	}
}
