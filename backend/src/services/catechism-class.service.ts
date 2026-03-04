import {
	ICatechismClassRepository,
	IUserRepository,
} from '@/repositories/interfaces';
import {
	CreateCatechismClass,
	FindAllCatechismClassFilters,
} from '@/schemas/catechism-class.schema';

export class CatechismClassService {
	constructor(
		private UserRepository: IUserRepository,
		private CatechismClassRepository: ICatechismClassRepository,
	) {}

	public async create(data: CreateCatechismClass) {
		// Verifica se o usuario e um catequista valido
		const catechist = await this.UserRepository.findById(data.catechistId);

		if (!catechist || catechist.role !== 'CATECHIST') {
			throw new Error('Catechist not found');
		}

		// verifica se as idades estao corretas
		if (data.minAge <= 0 || data.maxAge > data.minAge) {
			throw new Error('Inconsistency in the provided age ranges');
		}

		// Verifica a disponibilidade da sala, catequista e se ha conflitos de horarios
		const params = {
			status: true,
			dayOfWeek: data.dayOfWeek,
			startTime: data.startTime,
			endTime: data.endTime,
			location: data.location,
			catechistId: data.catechistId,
		};

		const existingClass =
			await this.CatechismClassRepository.findConflict(params);

		if (existingClass) throw new Error('Conflict with existing class');

		return this.CatechismClassRepository.create({ ...data, status: true });
	}

	async findAll(filters: FindAllCatechismClassFilters) {
		return this.CatechismClassRepository.findAll(filters);
	}
}
