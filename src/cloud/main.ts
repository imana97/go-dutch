import { getCurrentUser } from '../service/splitwise/api';

Parse.Cloud.define('sw-current-user', async (request: any) => {
  const token = request.params.token;
  if (!token) return false;
  return getCurrentUser(token);
});
