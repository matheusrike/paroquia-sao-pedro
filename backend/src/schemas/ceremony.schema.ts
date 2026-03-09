import { z } from 'zod';

export const createCeremonySchema = z.object({
    scheduledDate: z.date(),
    people: z.array(z.uuid()),
    documents: z.array(z.uuid()),
});

export type createCeremony = z.infer<typeof createCeremonySchema>;

export const findAllCeremonyFiltersSchema = z.object({
    scheduledDate: z.date().optional(),
    status: z.enum(['PENDING', 'UNDER_REVIEW', 'APPROVED', 'COMPLETED', 'CANCELED']).optional(),
});

export type findAllCeremonyFilters = z.infer<typeof findAllCeremonyFiltersSchema>;  

// enum CeremonyStatus {
//   PENDING
//   UNDER_REVIEW
//   APPROVED
//   COMPLETED
//   CANCELED
// }

// model Ceremony {
//   id            String         @id @default(uuid())
//   scheduledDate DateTime
//   status        CeremonyStatus
//   createdAt     DateTime       @default(now())
//   updatedAt     DateTime       @updatedAt

//   people    CeremonyPerson[]
//   documents CeremonyDocument[]

//   @@map("ceremonies")
// }