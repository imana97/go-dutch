import axios from 'axios';
import splitwiseConfig from '../../config/splitwise-config';

export default async (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  resource: string,
  token: string,
  data?: any,
): Promise<any> => {
  const response = await axios(splitwiseConfig.baseUrl + resource, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return JSON.stringify(response.data);
};
