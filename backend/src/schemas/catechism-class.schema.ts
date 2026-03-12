import { buildDateWithTime } from '@/utils/convert-date-with-time';
import { z } from 'zod';

export const createCatechismClassSchema = z.object({
	minAge: z.coerce.number().int().min(0),
	maxAge: z.coerce.number().int().min(0),
	dayOfWeek: z.enum(['MON', 'THU', 'WED', 'TUE', 'FRI', 'SAT', 'SUN'], {
		error: 'invalid day of week (use MON, TUE, WED, THU, FRI, SAT or SUN)',
	}),
	startTime: z.iso
		.time({ precision: -1, error: 'Invalid Hour (use HH:MM)' })
		.transform((startTime) => buildDateWithTime(startTime)),
	endTime: z.iso
		.time({ precision: -1, error: 'Invalid Hour (use HH:MM)' })
		.transform((endTime) => buildDateWithTime(endTime)),
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
		.transform((startTime) => buildDateWithTime(startTime))
		.optional(),
	endTime: z.iso
		.time({ precision: -1, error: 'Invalid Hour (use HH:MM)' })
		.transform((endTime) => buildDateWithTime(endTime))
		.optional(),
	dayOfWeek: z
		.enum(['MON', 'THU', 'WED', 'TUE', 'FRI', 'SAT', 'SUN'], {
			error: 'invalid day of week (use MON, TUE, WED, THU, FRI, SAT or SUN)',
		})
		.optional(),
});

export type FindAllCatechismClassFilters = z.infer<
	typeof findAllCatechismClassFiltersSchema
>;

export const updateCatechismClassSchema = createCatechismClassSchema
	.partial()
	.extend({
		status: z
			.boolean({ error: 'Invalid status (use true or false)' })
			.optional(),
	});

export type UpdateCatechismClass = z.infer<typeof updateCatechismClassSchema>;
