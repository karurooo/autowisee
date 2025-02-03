import { Session, User, WeakPassword } from '@supabase/supabase-js';
// types/auth.types.ts
import { z } from 'zod';

export type AuthResponse = {
  user: User | null;
  session: Session | null;
};

export type SignInResponse = AuthResponse & {
  weakPassword?: WeakPassword | null;
};

export type AuthError = {
  message: string;
  status?: number;
};
