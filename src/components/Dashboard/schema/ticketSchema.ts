import { z } from 'zod';
import { Category, Status, Priority } from '@prisma/client';

export const ticketSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  title: z.string(),
  description: z.string(),
  category: z.nativeEnum(Category),
  status: z.nativeEnum(Status),
  priority: z.nativeEnum(Priority),
  attachements: z.array(z.string()),
  assigneeId: z.string(),
  userId: z.string(),
});

export type TTicket = z.infer<typeof ticketSchema>;
