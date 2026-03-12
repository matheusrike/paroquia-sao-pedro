import { DaysOfWeek } from '@/entities/catechism-class.entity';
import { User } from '@/entities/user.entity';
import { ICatechismClassRepository } from '@/repositories/catechism-class.repository';
import { IUserRepository } from '@/repositories/user.repository';
import {
	CreateCatechismClass,
	FindAllCatechismClassFilters,
	UpdateCatechismClass,
} from '@/schemas/catechism-class.schema';

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

	public async update(id: string, data: UpdateCatechismClass) {
		const existingClass = await this.CatechismClassRepository.findById(id);

		if (!existingClass) {
			throw new Error('Class not found');
		}

		const newClassData = { ...existingClass, ...data };

		await this.validateCatechist(newClassData.catechistId);
		this.checkAgeConsistency(newClassData.minAge, newClassData.maxAge);
		await this.checkAvailabilityConflicts(newClassData, id);

		return this.CatechismClassRepository.update(id, data);
	}

	private async validateCatechist(catechistId: string): Promise<User> {
		// Verifica se o usuario e um catequista valido
		const catechist = await this.UserRepository.findById(catechistId);

		if (!catechist || catechist.role !== 'CATECHIST') {
			throw new Error('Catechist not found');
		}

		return catechist;
	}

	private checkAgeConsistency(minAge: number, maxAge: number): void {
		// verifica se as idades estao consistentes
		if (minAge <= 0 || minAge > maxAge) {
			throw new Error('Inconsistency in the provided age ranges');
		}
	}

	private async checkAvailabilityConflicts(
		data: {
			status: boolean;
			dayOfWeek: DaysOfWeek;
			startTime: Date;
			endTime: Date;
			location: string;
			catechistId: string;
		},
		excludeId?: string,
	) {
		const existingClass = await this.CatechismClassRepository.findConflict(
			data,
			excludeId,
		);

		if (existingClass) throw new Error('Conflict with existing class');
	}
}
