export type UserRole = 'MEMBER' | 'CATECHUMEN' | 'CATECHIST' | 'ADMIN';

export interface User {
	id: string;
	name: string;
	email: string;
	phone: string;
	cpf?: string | null;
	birthDate?: Date | null;
	role: UserRole;
	status: string;
	createdAt: Date;
	updatedAt: Date;
}
