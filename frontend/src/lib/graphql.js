export const parseError = ({ graphQLErrors = [] }, defaultMsg) => {
  const error = graphQLErrors[0];
  if (error && error.extensions.code === 'INTERNAL_SERVER_ERROR') {
    return 'Unable to complete operation due to a server error';
  }
  if (error && error.extensions.code === 'CUSTOM_ERROR') {
    return error.message;
  }
  return defaultMsg || 'An error has occured';
};
