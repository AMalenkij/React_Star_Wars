import axios from 'axios';
import {useQuery} from 'react-query';

export function getAPIFilms(url) {
    const {isLoading, error, data} = useQuery({
        queryKey: ['film', url],
        queryFn: () => axios(url).then((response) => {
            const links = response.data.films;
            const requests = links.map(link => axios.get(link));

            return axios.all(requests).then(axios.spread((...responses) => {
                return responses.map((response) => response.data.title);
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

    return data;
}

export default getAPIFilms;