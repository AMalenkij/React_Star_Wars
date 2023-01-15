import axios from 'axios';
import { useQuery } from 'react-query';
import { BAASE_URL } from '../constants/Resources.js';

export function getAPIResource(baseURL = BAASE_URL, url) {
  const { isLoading, error, data } = useQuery({
    queryKey: ['people', url],
    queryFn: () => axios({
      baseURL,
      url,
    }).then((res) => res.data),
  });

  if (isLoading) return 'Loading...';

  if (error) return `An error has occurred: ${error.message}`;

  return data;
}
export default getAPIResource;
