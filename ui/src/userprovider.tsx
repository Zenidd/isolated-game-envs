import React, { createContext, useState } from 'react'; // Added useState here

type UserContextType = {
  userEmail: string;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
};


const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserProvider({ children }: UserProviderProps) {
    const [userEmail, setUserEmail] = useState<string>('');

    return (
        <UserContext.Provider value={{ userEmail, setUserEmail }}>
            {children}
        </UserContext.Provider>
    );
}


export { UserContext };
