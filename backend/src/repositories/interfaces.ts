import {
	CreateCatechismClass,
	FindAllCatechismClassFilters,
} from '@/schemas/catechism-class.schema';
import {
	CatechismClass,
	DaysOfWeek,
	User,
} from '@prisma/generated/prisma/client';

// Interface com os métodos das operações relacionadas aos usuários
export interface IUserRepository {
	findById(id: string): Promise<User | null>;
}

// Interface com os métodos das operações relacionadas as turmas
export interface ICatechismClassRepository {
	create(
		data: CreateCatechismClass & { status: boolean },
	): Promise<CatechismClass | null>;
	findAll(
		filters: FindAllCatechismClassFilters,
	): Promise<CatechismClass | null>;
	findConflict(params: {
		dayOfWeek: DaysOfWeek;
		startTime: Date;
		endTime: Date;
		status: boolean;
		location: string;
		catechistId: string;
	}): Promise<CatechismClass | null>;
}
