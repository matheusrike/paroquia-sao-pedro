import { DaysOfWeek } from '@/entities/catechism-class.entity';
import { User } from '@/entities/user.entity';
import { ICatechismClassRepository } from '@/repositories/catechism-class.repository';
import { IUserRepository } from '@/repositories/user.repository';
import {
	CreateCatechismClass,
	FindAllCatechismClassFilters,
} from '@/schemas/catechism-class.schema';
import { Id } from '@/schemas/common.schema';

export class CatechismClassService {
	constructor(
		private UserRepository: IUserRepository,
		private CatechismClassRepository: ICatechismClassRepository,
	) {}

	public async create(data: CreateCatechismClass) {
		await this.validateCatechist(data.catechistId);
		this.checkAgeConsistency(data.minAge, data.maxAge);
		await this.checkAvailabilityConflicts({ ...data, status: true });

		return this.CatechismClassRepository.create({ ...data, status: true });
	}

	public async findAll(filters: FindAllCatechismClassFilters) {
		return this.CatechismClassRepository.findAll(filters);
	}

	private async validateCatechist(catechistId: Id): Promise<User> {
		// Verifica se o usuario e um catequista valido
		const catechist = await this.UserRepository.findById(catechistId);

		if (!catechist || catechist.role !== 'CATECHIST') {
			throw new Error('Catechist not found');
		}

		return catechist;
	}

	private checkAgeConsistency(minAge: number, maxAge: number): void {
		// verifica se as idades estao consistentes
		if (minAge <= 0 || maxAge > minAge) {
			throw new Error('Inconsistency in the provided age ranges');
		}
	}

	private async checkAvailabilityConflicts(data: {
		status: boolean;
		dayOfWeek: DaysOfWeek;
		startTime: Date;
		endTime: Date;
		location: string;
		catechistId: Id;
	}) {
		const existingClass =
			await this.CatechismClassRepository.findConflict(data);

		if (existingClass) throw new Error('Conflict with existing class');
	}
}
