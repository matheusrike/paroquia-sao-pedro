import { UserSchema } from '@/schemas/User.schema';
import { UserService } from '@/services/User.service';
import { FastifyReply, FastifyRequest } from 'fastify';

export class UserController {
	constructor(private userService: UserService) {}

	public async getUsers(reply: FastifyReply) {
		const users = await this.userService.getUsers();
		reply.status(200).send(users);
	}

	public async getUserById(request: FastifyRequest, reply: FastifyReply) {
		const { id } = request.params as { id: string };
		const user = await this.userService.getUserById(id);
		if (!user) {
			reply.status(404).send({ message: "User not found" });
			return;
		}
		reply.status(200).send(user);
	}

	public async createUser(request: FastifyRequest, reply: FastifyReply) {
		const userData = UserSchema.parse(request.body);
		await this.userService.createUser(userData);
		reply.status(201).send({ message: "User created successfully" });
	}

	public async updateUser(request: FastifyRequest, reply: FastifyReply) {
		const { id } = request.params as { id: string };
		const userData = UserSchema.partial().parse(request.body);
		await this.userService.updateUser(id, userData);
		reply.status(200).send({ message: "User updated successfully" });
	}

	public async deleteUser(request: FastifyRequest, reply: FastifyReply) {
		const { id } = request.params as { id: string };
		await this.userService.deleteUser(id);
		reply.status(200).send({ message: "User deleted successfully" });
	}
}
