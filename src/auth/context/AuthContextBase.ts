import { createContext, useContext } from 'react';
import type { User } from 'firebase/auth';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isGuest: boolean;
  enterAsGuest: () => void;
  clearGuest: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isGuest: false,
  enterAsGuest: () => {},
  clearGuest: () => {},
});
export const useAuth = () => useContext(AuthContext);
