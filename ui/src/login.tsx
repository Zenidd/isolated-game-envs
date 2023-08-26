// login.tsx

import React, { useContext } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { UserContext } from './userprovider'; // Updated import path

export function Login({ user }: WithAuthenticatorProps) {
  const context = useContext(UserContext);
  
  if (!context) {
      console.error("UserContext is not available.");
      return null; // or some error component
  }

  const { setUserEmail } = context;
  const userEmail = user?.attributes?.email;

  setUserEmail(userEmail);

  return (
      <div>
          <h1>Logged successfully</h1>
      </div>
  );
}


export default withAuthenticator(Login);
