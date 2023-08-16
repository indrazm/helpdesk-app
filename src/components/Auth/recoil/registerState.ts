import { atom } from 'recoil';
import { TUser, Role } from '../schema/userSchema';

export const registerState = atom<TUser>({
  key: 'registerState',
  default: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: Role.USER,
  },
});
