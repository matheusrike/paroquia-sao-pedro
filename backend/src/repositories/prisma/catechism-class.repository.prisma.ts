import {
	CreateCatechismClass,
	FindAllCatechismClassFilters,
} from '@/schemas/catechism-class.schema';
import { CatechismClass, DaysOfWeek } from '@/entities/catechism-class.entity';
import { ICatechismClassRepository } from '../catechism-class.repository';
import { prisma } from '@prisma/client';

// Classe que implementa os métodos das operações relacionadas as turmas
export class CatechismClassRepositoryPrisma implements ICatechismClassRepository {
	create(
		data: CreateCatechismClass & { status: boolean },
	): Promise<CatechismClass | null> {
		return prisma.catechismClass.create({
			data: data,
		});
	}

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
	): Promise<CatechismClass | null> {
		return prisma.catechismClass.findFirst({
			where: {
				id: { not: excludeId },
				dayOfWeek: params.dayOfWeek,
				status: params.status,
				AND: [
					{
						OR: [
							{ location: params.location },
							{ catechistId: params.catechistId },
						],
					},
					{ startTime: { lt: params.endTime } },
					{ endTime: { gt: params.startTime } },
				],
			},
		});
	}

	findAll(
		filters: FindAllCatechismClassFilters,
	): Promise<CatechismClass[] | null> {
		return prisma.catechismClass.findMany({
			where: filters,
		});
	}

	findById(id: string): Promise<CatechismClass | null> {
		return prisma.catechismClass.findUnique({
			where: { id },
		});
	}

	update(
		id: string,
		data: Omit<Partial<CatechismClass>, 'id' | 'updatedAt' | 'createdAt'>,
	): Promise<CatechismClass | null> {
		return prisma.catechismClass.update({
			where: { id },
			data,
		});
	}
}
