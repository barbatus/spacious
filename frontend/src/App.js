import { ApolloProvider } from '@apollo/client';

import { client } from './apollo-config';
import { Router } from './modules/routes';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  );
}

export default App;
