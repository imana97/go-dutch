import swRequest from './sw-request';

export const getCurrentUser = async (token: string) => {
  return swRequest('GET', 'get_current_user', token);
};
