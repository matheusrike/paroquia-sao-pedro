import {
	CreateCatechismClass,
	FindAllCatechismClassFilters,
} from '@/schemas/tests/catechism-class.schema';
import { buildDateWithTime } from '@/utils/convert-date-with-time';
import { PrismaClient } from '@prisma/generated/prisma/client';

export class CatechismClassService {
	constructor(private database: PrismaClient) {}

	async create(data: CreateCatechismClass) {
		const startTime = buildDateWithTime(data.startTime);
		const endTime = buildDateWithTime(data.endTime);

		// Verifica se o usuario e um catequista valido
		const catechist = await this.database.user.findUnique({
			where: { id: data.catechistId },
		});

		if (!catechist || catechist.role !== 'CATECHIST') {
			throw new Error('Catechist not found');
		}

		// verifica se as idades estao corretas
		if (data.minAge <= 0 || data.maxAge > data.minAge) {
			throw new Error('Inconsistency in the provided age ranges');
		}

		// Verifica a disponibilidade do horario
		const existingClass = await this.database.catechismClass.findFirst({
			where: {
				dayOfWeek: data.dayOfWeek,
				location: data.location,
				status: true,
				AND: [
					{ startTime: { lt: endTime } },
					{ endTime: { gt: startTime } },
				],
			},
		});

		if (existingClass) throw new Error('Conflict with existing class');

		return this.database.catechismClass.create({
			data: {
				...data,
				status: true,
				startTime: buildDateWithTime(data.startTime),
				endTime: buildDateWithTime(data.endTime),
			},
		});
	}

	async findAll(filters: FindAllCatechismClassFilters) {
		return this.database.catechismClass.findMany({ where: filters });
	}
}
