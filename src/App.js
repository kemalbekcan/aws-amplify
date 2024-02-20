import './App.css';
import { useAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigation = useNavigate();
  const { authStatus } = useAuthenticator(context => [context.authStatus]);

  useEffect(() => {
    if (authStatus === 'authenticated') {
      navigation('/home');
    }
  })

  return (
    <div className="App">
      <header className="App-header">
        {authStatus === 'configuring' && 'Loading...'}
        {authStatus !== 'authenticated' && <Authenticator />}
      </header>
    </div>
  );
}

export default App;
