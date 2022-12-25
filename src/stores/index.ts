import type { User } from '@auth0/auth0-react';
import { atom } from 'nanostores';

export const userStore = atom<
  | {
      error: Error | undefined;
      isLoading: boolean;
      isAuthenticated: boolean;
      user: User | undefined;
    }
  | undefined
>();

export default { userStore };
