import {
	CreateCatechismClass,
	FindAllCatechismClassFilters,
} from '@/schemas/catechism-class.schema';
import { CatechismClass, DaysOfWeek } from '@prisma/generated/prisma/client';

// Interface com os métodos das operações relacionadas as turmas
export interface ICatechismClassRepository {
	create(
		data: CreateCatechismClass & { status: boolean },
	): Promise<CatechismClass | null>;

	findAll(
		filters: FindAllCatechismClassFilters,
	): Promise<CatechismClass[] | null>;

	findConflict(params: {
		dayOfWeek: DaysOfWeek;
		startTime: Date;
		endTime: Date;
		status: boolean;
		location: string;
		catechistId: string;
	}): Promise<CatechismClass | null>;
}
