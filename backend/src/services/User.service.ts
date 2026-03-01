import { User, UserRole } from '@/schemas/User.schema';
import { PrismaClient } from '@prisma/generated/prisma/client';


export class UserService {
	constructor(private prisma: PrismaClient) {}
	public async getUsers(): Promise<User[]> {
		const users = await this.prisma.user.findMany();
		return users.map(user => {
			return {
				...user,
				cpf: user.cpf || undefined,
				birthDate: user.birthDate ? new Date(user.birthDate) : undefined,
				updatedAt: user.updatedAt ? new Date(user.updatedAt) : undefined,
				role: user.role as UserRole
			}
		})
	}

	public async getUserById(id: string): Promise<User | null> { 
		const user = await this.prisma.user.findUnique({
			where: { id }
		})
		if (!user) return null;
		return {
			...user,
			cpf: user.cpf || undefined,
			birthDate: user.birthDate ? new Date(user.birthDate) : undefined,
			updatedAt: user.updatedAt ? new Date(user.updatedAt) : undefined,
			role: user.role as UserRole
		}
	}

    public async createUser(data: User): Promise<void> {
		await this.prisma.user.create({
			data
		})
	}

	public async updateUser(id: string, data: Partial<User>): Promise<void> {
		await this.prisma.user.update({
			where: { id },
			data
		})
	}
	
	public async deleteUser(id: string): Promise<void> {
		await this.prisma.user.delete({
			where: { id }
		})
	}
	
}
