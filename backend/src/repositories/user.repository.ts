import { User } from '@prisma/generated/prisma/client';

// Interface com os métodos das operações relacionadas aos usuários
export interface IUserRepository {
	findById(id: string): Promise<User | null>;
}
