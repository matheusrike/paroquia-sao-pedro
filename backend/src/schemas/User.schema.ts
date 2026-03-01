import { z } from 'zod';

export enum UserRole {
	ADMIN = 'ADMIN',
	MEMBER = 'MEMBER',
	CATECHUMEN = 'CATECHUMEN',
	CATECHIST = 'CATECHIST',
}

export const UserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    phone: z.string(),
    cpf: z.string().optional(),
    birthDate: z.date().optional(),
    role: z.enum(UserRole),
    status: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date().optional()
});

export type User = z.infer<typeof UserSchema>;