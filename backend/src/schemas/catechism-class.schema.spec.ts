import { describe, expect, it } from 'vitest';
import { createCatechismClassSchema } from './tests/catechism-class.schema';

describe('Create Catechism Class Schema', () => {
	it('should be able to validate a correct catechism class data', () => {
		const data = {
			minAge: 10,
			maxAge: 12,
			dayOfWeek: 'SAT',
			startTime: '08:00',
			endTime: '09:30',
			location: 'Sala 01',
			catechistId: '018b3f11-0000-7000-8000-000000000000', // UUID v7 válido
		};

		const result = createCatechismClassSchema.safeParse(data);

		expect(result.success).toBe(true);
	});

	it('should not be able to validate with an invalid day of week', () => {
		const data = {
			minAge: 10,
			maxAge: 12,
			dayOfWeek: 'INVALID_DAY',
			startTime: '08:00',
			endTime: '09:30',
			location: 'Sala 01',
			catechistId: '018b3f11-0000-7000-8000-000000000000',
		};

		const result = createCatechismClassSchema.safeParse(data);

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0].message).toBe(
				'invalid day of week (use MON, TUE, WED, THU, FRI, SAT or SUN)',
			);
		}
	});

	it('should not be able to validate with negative ages', () => {
		const data = {
			minAge: -1,
			maxAge: 12,
			dayOfWeek: 'SAT',
			startTime: '08:00',
			endTime: '09:30',
			location: 'Sala 01',
			catechistId: '018b3f11-0000-7000-8000-000000000000',
		};

		const result = createCatechismClassSchema.safeParse(data);

		expect(result.success).toBe(false);
	});

	it('should not be able to validate with invalid time format', () => {
		const data = {
			minAge: 10,
			maxAge: 12,
			dayOfWeek: 'SAT',
			startTime: '8:00', // Faltando o 0 inicial
			endTime: '09:300', // Dígito extra
			location: 'Sala 01',
			catechistId: '018b3f11-0000-7000-8000-000000000000',
		};

		const result = createCatechismClassSchema.safeParse(data);

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0].message).toBe(
				'Invalid Hour (use HH:MM)',
			);
		}
	});

	it('should not be able to validate with invalid UUID version (not v7)', () => {
		const data = {
			minAge: 10,
			maxAge: 12,
			dayOfWeek: 'SAT',
			startTime: '08:00',
			endTime: '09:30',
			location: 'Sala 01',
			catechistId: '550e8400-e29b-41d4-a716-446655440000', // UUID v4 válido, mas não v7
		};

		const result = createCatechismClassSchema.safeParse(data);

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0].message).toBe('Invalid Catechist ID');
		}
	});
});
