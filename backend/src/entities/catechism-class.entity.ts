export type DaysOfWeek = 'MON' | 'THU' | 'WED' | 'TUE' | 'FRI' | 'SAT' | 'SUN';

export interface CatechismClass {
	id: string;
	minAge: number;
	maxAge: number;
	dayOfWeek: DaysOfWeek;
	startTime: Date;
	endTime: Date;
	location: string;
	status: boolean;
	catechistId: string;
	createdAt: Date;
	updatedAt: Date;
}
