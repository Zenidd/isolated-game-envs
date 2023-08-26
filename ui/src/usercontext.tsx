// UserContext.tsx

import { createContext } from 'react';

type UserContextType = {
  userEmail: string | null;
  setUserEmail: (email: string | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
