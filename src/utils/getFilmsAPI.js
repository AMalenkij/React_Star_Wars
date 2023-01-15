import axios from 'axios';
import {useQuery} from 'react-query';

export function getAPIFilms(links) {
    const {isLoading, error, data} = useQuery({
        queryKey: ['film', links],
        queryFn: () => axios.all(links.map((link) => axios.get(link))),
        enabled: Boolean(links),
    });

    if (isLoading) {
        return 'Loading...';
    }

    if (error) {
        return `An error has occurred: ${error.message}`;
    }
    return data.map((response) => response.data.title);
}

export default getAPIFilms;