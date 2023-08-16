import { z } from 'zod';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export const userSchema = z.object({
  id: z.string().nullable(),
  firstName: z.string().min(1, { message: 'First Name is required' }),
  lastName: z.string().min(1, { message: 'Last Name is required' }),
  email: z.string().email({ message: 'Invalid Email' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  role: z.nativeEnum(Role).default(Role.USER),
});

export type TUser = z.infer<typeof userSchema>;
