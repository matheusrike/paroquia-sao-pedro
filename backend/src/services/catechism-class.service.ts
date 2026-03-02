import {
	CreateCatechismClass,
	FindAllCatechismClassFilters,
} from '@/schemas/tests/catechism-class.schema';
import { PrismaClient } from '@prisma/generated/prisma/client';

export class CatechismClassService {
	constructor(private database: PrismaClient) {}

	async create(data: CreateCatechismClass) {
		const catechist = await this.database.user.findUnique({
			where: { id: data.catechistId },
		});

		if (!catechist || catechist.role !== 'CATECHIST') {
			throw new Error('Catechist not found');
		}

		return this.database.catechismClass.create({
			data: { ...data, status: true },
		});
	}

	async findAll(filters: FindAllCatechismClassFilters) {
		return this.database.catechismClass.findMany({ where: filters });
	}
}
