import axios from 'axios';
import { useQuery } from 'react-query';

export function getAPIFilms(url) {
  const { isLoading, error, data } = useQuery({
    queryKey: ['film', url],
    queryFn: () => axios(url).then((response) => {
      const links = response.data.films;
      axios.all(links).then(axios.spread((...responses) => {
        const newData = responses.map((response) => response.data);
        return newData;
      }));
    }),
    enabled: Boolean(url),
  });

  if (isLoading) {
    return 'Loading...';
  }

  if (error) {
    return `An error has occurred: ${error.message}`;
  }
}

export default getAPIFilms;
