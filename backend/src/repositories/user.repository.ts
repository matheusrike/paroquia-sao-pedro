import { User } from '@/entities/user.entity';

// Interface com os métodos das operações relacionadas aos usuários
export interface IUserRepository {
	findById(id: string): Promise<User | null>;
}
