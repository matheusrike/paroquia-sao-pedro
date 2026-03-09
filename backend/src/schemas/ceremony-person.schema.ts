import { z } from 'zod';

export const createCeremonyPersonSchema = z.object({
    name: z.string(),
    cpf: z.string(),
    phone: z.string(),
    address: z.string(),
    gender: z.string(),
    type: z.enum(['GROOM', 'BRIDE']),
    ceremonyId: z.string(),
});





// enum CeremonyPersonType {
//   GROOM
//   BRIDE
// }


// model CeremonyPerson {
//   id         String             @id @default(uuid())
//   ceremonyId String
//   name       String
//   cpf        String
//   phone      String
//   address    String
//   gender     String
//   type       CeremonyPersonType
//   createdAt  DateTime           @default(now())
//   updatedAt  DateTime           @updatedAt

//   ceremony Ceremony @relation(fields: [ceremonyId], references: [id])

//   @@map("ceremony_people")
// }