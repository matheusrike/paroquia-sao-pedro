import { z } from 'zod';

export const createCatechismClassSchema = z.object({
	minAge: z.coerce.number().int().min(0),
	maxAge: z.coerce.number().int().min(0),
	dayOfWeek: z.enum(['MON', 'THU', 'WED', 'TUE', 'FRI', 'SAT', 'SUN'], {
		error: 'invalid day of week (use MON, TUE, WED, THU, FRI, SAT or SUN)',
	}),
	startTime: z.iso.time({ precision: -1, error: 'Invalid Hour (use HH:MM)' }),
	endTime: z.iso.time({ precision: -1, error: 'Invalid Hour (use HH:MM)' }),
	location: z.string(),
	catechistId: z.uuid({ version: 'v7', error: 'Invalid Catechist ID' }),
});

export type CreateCatechismClass = z.infer<typeof createCatechismClassSchema>;

export const findAllCatechismClassFiltersSchema = z.object({
	catechistId: z
		.uuid({ version: 'v7', error: 'Invalid Catechist ID' })
		.optional(),
	status: z.boolean().optional(),
	startTime: z.iso
		.time({ precision: -1, error: 'Invalid Hour (use HH:MM)' })
		.optional(),
	endTime: z.iso
		.time({ precision: -1, error: 'Invalid Hour (use HH:MM)' })
		.optional(),
	dayOfWeek: z.enum(['MON', 'THU', 'WED', 'TUE', 'FRI', 'SAT', 'SUN'], {
		error: 'invalid day of week (use MON, TUE, WED, THU, FRI, SAT or SUN)',
	}),
});

export type FindAllCatechismClassFilters = z.infer<
	typeof findAllCatechismClassFiltersSchema
>;
