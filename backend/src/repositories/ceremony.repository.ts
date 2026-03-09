import { createCeremony, findAllCeremonyFilters } from '@/schemas/ceremony.schema';
import { Ceremony } from '@prisma/generated/prisma/client';

export interface ICeremonyRepository {
    create(data: createCeremony): Promise<Ceremony | null>;
    findAll(filters: findAllCeremonyFilters): Promise<Ceremony[]>;
}