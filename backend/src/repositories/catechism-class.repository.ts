import {
	CreateCatechismClass,
	FindAllCatechismClassFilters,
	UpdateCatechismClass,
} from '@/schemas/catechism-class.schema';
import { CatechismClass, DaysOfWeek } from '@/entities/catechism-class.entity';

// Interface com os métodos das operações relacionadas as turmas
export interface ICatechismClassRepository {
	create(
		data: CreateCatechismClass & { status: boolean },
	): Promise<CatechismClass | null>;

	findAll(
		filters: FindAllCatechismClassFilters,
	): Promise<CatechismClass[] | null>;

	findById(id: string): Promise<CatechismClass | null>;

	findConflict(
		params: {
			dayOfWeek: DaysOfWeek;
			startTime: Date;
			endTime: Date;
			status: boolean;
			location: string;
			catechistId: string;
		},
		excludeId?: string,
	): Promise<CatechismClass | null>;

	update(
		id: string,
		data: UpdateCatechismClass,
	): Promise<CatechismClass | null>;
}
