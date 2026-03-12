import { ICatechismClassRepository } from '@/repositories/catechism-class.repository';
import { IUserRepository } from '@/repositories/user.repository';
import { CatechismClassService } from '@/services/catechism-class.service';
import {
	CreateCatechismClass,
	UpdateCatechismClass,
} from '@/schemas/catechism-class.schema';
import { User } from '@/entities/user.entity';
import { CatechismClass } from '@/entities/catechism-class.entity';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { buildDateWithTime } from '@/utils/convert-date-with-time';

// Criando mocks baseados nas interfaces dos repositórios
const mockUserRepository: IUserRepository = {
	findById: vi.fn(),
};

const mockCatechismClassRepository: ICatechismClassRepository = {
	create: vi.fn(),
	findConflict: vi.fn(),
	findAll: vi.fn(),
	findById: vi.fn(),
	update: vi.fn(),
};

describe('CatechismClassService.create', () => {
	let service: CatechismClassService;

	// Dados de exemplo para os testes
	const catechistMock: User = {
		id: 'catechist-id',
		name: 'Catechist Name',
		role: 'CATECHIST',
		email: 'test@gmail.com',
		birthDate: new Date(),
		cpf: '000.000.000-00',
		phone: '123456789',
		status: 'true',
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const classInput: CreateCatechismClass = {
		catechistId: 'catechist-id',
		dayOfWeek: 'MON',
		startTime: buildDateWithTime('09:00'),
		endTime: buildDateWithTime('10:00'),
		location: 'Room 1',
		minAge: 7,
		maxAge: 7,
	};

	beforeEach(() => {
		// Limpa todos os mocks antes de cada teste
		vi.clearAllMocks();
		// Instancia o serviço injetando os repositórios falsos
		service = new CatechismClassService(
			mockUserRepository,
			mockCatechismClassRepository,
		);
	});

	it('should create a catechism class successfully', async () => {
		// Arrange: Configura o comportamento dos mocks
		mockUserRepository.findById.mockResolvedValue(catechistMock);
		mockCatechismClassRepository.findConflict.mockResolvedValue(null);
		const createdClass = {
			...classInput,
			id: 'class-id',
			status: true,
			startTime: classInput.startTime,
			endTime: classInput.endTime,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		mockCatechismClassRepository.create.mockResolvedValue(createdClass);

		// Act: Executa o método a ser testado
		const result = await service.create(classInput);

		// Assert: Verifica os resultados
		expect(result).toBeDefined();
		expect(mockUserRepository.findById).toHaveBeenCalledWith(
			classInput.catechistId,
		);
		expect(mockCatechismClassRepository.findConflict).toHaveBeenCalledWith(
			{
				status: true,
				dayOfWeek: classInput.dayOfWeek,
				startTime: classInput.startTime,
				endTime: classInput.endTime,
				location: classInput.location,
				catechistId: classInput.catechistId,
				maxAge: classInput.maxAge,
				minAge: classInput.minAge,
			},
			undefined,
		);
		expect(mockCatechismClassRepository.create).toHaveBeenCalledWith({
			...classInput,
			status: true,
		});
	});

	it('should throw an error if catechist is not found', async () => {
		// Arrange
		mockUserRepository.findById.mockResolvedValue(null);

		// Act & Assert
		await expect(service.create(classInput)).rejects.toThrow(
			'Catechist not found',
		);
	});

	it('should throw an error if user is not a catechist', async () => {
		// Arrange
		mockUserRepository.findById.mockResolvedValue({
			...catechistMock,
			role: 'USER',
		});

		// Act & Assert
		await expect(service.create(classInput)).rejects.toThrow(
			'Catechist not found',
		);
	});

	it('should throw an error for invalid age range (minAge <= 0)', async () => {
		// Arrange
		mockUserRepository.findById.mockResolvedValue(catechistMock);

		// Act & Assert
		await expect(
			service.create({ ...classInput, minAge: 0 }),
		).rejects.toThrow('Inconsistency in the provided age ranges');
	});

	it('should throw an error for invalid age range (minAge > maxAge)', async () => {
		// Arrange
		mockUserRepository.findById.mockResolvedValue(catechistMock);

		// Act & Assert
		await expect(
			service.create({ ...classInput, minAge: 9, maxAge: 7 }),
		).rejects.toThrow('Inconsistency in the provided age ranges');
	});

	it('should throw a conflict error if a class already exists at the same time and place', async () => {
		// Arrange
		mockUserRepository.findById.mockResolvedValue(catechistMock);
		mockCatechismClassRepository.findConflict.mockResolvedValue({
			...classInput,
			id: 'existing-class-id',
			status: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		// Act & Assert
		await expect(service.create(classInput)).rejects.toThrow(
			'Conflict with existing class',
		);
		expect(mockCatechismClassRepository.create).not.toHaveBeenCalled();
	});
});

describe('CatechismClassService.update', () => {
	let service: CatechismClassService;

	const existingClass: CatechismClass = {
		id: 'class-id',
		catechistId: 'catechist-id',
		dayOfWeek: 'MON',
		startTime: buildDateWithTime('09:00'),
		endTime: buildDateWithTime('10:00'),
		location: 'Room 1',
		minAge: 7,
		maxAge: 7,
		status: true,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const catechistMock: User = {
		id: 'catechist-id',
		name: 'Catechist Name',
		role: 'CATECHIST',
		email: 'test@gmail.com',
		birthDate: new Date(),
		cpf: '000.000.000-00',
		phone: '123456789',
		status: 'true',
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	beforeEach(() => {
		vi.clearAllMocks();
		service = new CatechismClassService(
			mockUserRepository,
			mockCatechismClassRepository,
		);
	});

	it('should update a catechism class successfully', async () => {
		// Arrange
		const updateData: UpdateCatechismClass = { location: 'Room 2' };
		mockCatechismClassRepository.findById.mockResolvedValue(existingClass);
		mockUserRepository.findById.mockResolvedValue(catechistMock);
		mockCatechismClassRepository.findConflict.mockResolvedValue(null);
		mockCatechismClassRepository.update.mockResolvedValue({
			...existingClass,
			location: 'Room 2',
		});

		// Act
		const result = await service.update('class-id', updateData);

		// Assert
		expect(result.location).toBe('Room 2');
		expect(mockCatechismClassRepository.findById).toHaveBeenCalledWith(
			'class-id',
		);
		expect(mockCatechismClassRepository.findConflict).toHaveBeenCalledWith(
			expect.any(Object),
			'class-id',
		);
		expect(mockCatechismClassRepository.update).toHaveBeenCalledWith(
			'class-id',
			updateData,
		);
	});

	it('should throw an error if class to update is not found', async () => {
		mockCatechismClassRepository.findById.mockResolvedValue(null);

		await expect(service.update('invalid-id', {})).rejects.toThrow(
			'Class not found',
		);
	});

	it('should validate catechist if catechistId is updated', async () => {
		const updateData: UpdateCatechismClass = {
			catechistId: 'new-catechist-id',
		};
		mockCatechismClassRepository.findById.mockResolvedValue(existingClass);
		mockUserRepository.findById.mockResolvedValue(null); // Catequista não encontrado

		await expect(service.update('class-id', updateData)).rejects.toThrow(
			'Catechist not found',
		);
	});

	it('should throw an error if update results in age inconsistency', async () => {
		const updateData: UpdateCatechismClass = { minAge: 10, maxAge: 8 }; // min > max
		mockCatechismClassRepository.findById.mockResolvedValue(existingClass);
		mockUserRepository.findById.mockResolvedValue(catechistMock);

		await expect(service.update('class-id', updateData)).rejects.toThrow(
			'Inconsistency in the provided age ranges',
		);
	});

	it('should throw an error if update results in a conflict', async () => {
		const updateData: UpdateCatechismClass = {
			startTime: buildDateWithTime('11:00'),
		};
		mockCatechismClassRepository.findById.mockResolvedValue(existingClass);
		mockUserRepository.findById.mockResolvedValue(catechistMock);
		mockCatechismClassRepository.findConflict.mockResolvedValue({
			id: 'other-class-id',
		} as any);

		await expect(service.update('class-id', updateData)).rejects.toThrow(
			'Conflict with existing class',
		);
	});
});

describe('CatechismClassService.findAll', () => {
	let service: CatechismClassService;

	beforeEach(() => {
		vi.clearAllMocks();
		service = new CatechismClassService(
			mockUserRepository,
			mockCatechismClassRepository,
		);
	});

	it('should call repository.findAll with correct filters', async () => {
		// Arrange
		const filters = {
			status: true,
			dayOfWeek: 'MON',
		};
		const mockResponse = [
			{
				id: 'class-id',
				status: true,
				dayOfWeek: 'MON',
				startTime: new Date(),
				endTime: new Date(),
				location: 'Room 1',
				catechistId: 'catechist-id',
				minAge: 7,
				maxAge: 7,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		];
		mockCatechismClassRepository.findAll.mockResolvedValue(mockResponse);

		// Act
		const result = await service.findAll(filters);

		// Assert
		expect(mockCatechismClassRepository.findAll).toHaveBeenCalledWith(
			filters,
		);
		expect(result).toEqual(mockResponse);
	});

	it('should call repository.findAll without filters', async () => {
		// Arrange
		const filters = {};
		mockCatechismClassRepository.findAll.mockResolvedValue([]);

		// Act
		await service.findAll(filters);

		// Assert
		expect(mockCatechismClassRepository.findAll).toHaveBeenCalledWith(
			filters,
		);
	});
});
