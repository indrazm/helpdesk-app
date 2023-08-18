import { atom } from 'recoil';
import { Category, Status, Priority } from '@prisma/client';
import { TTicket } from '../schema/ticketSchema';

export const ticketState = atom<TTicket>({
  key: 'ticketState',
  default: {
    id: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: '',
    description: '',
    category: Category.BUG,
    status: Status.OPEN,
    priority: Priority.LOW,
    attachements: [],
    assigneeId: '',
    userId: '',
  },
});
