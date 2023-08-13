//login.tsx

import { withAuthenticator } from '@aws-amplify/ui-react';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';

export function Login({ signOut, user, updateAuthStatus }: WithAuthenticatorProps & { updateAuthStatus: Function }) {
  const userEmail = user?.attributes?.email;

  // Call the updateAuthStatus function from App component
  // to update authentication status and user email
  updateAuthStatus(true, userEmail);
  return (
    <div>
      <h1> Logged succesfully</h1>
    </div>
  );
}

export default withAuthenticator(Login);
