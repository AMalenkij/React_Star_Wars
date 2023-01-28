import axios from 'axios';
import {useQuery} from 'react-query';
import { getConcurrentApi } from '../../../utils/api';

import styles from './PersonFilms.module.css';

export function PersonFilms ({urls, id}) {

    const {isLoading, error, data} = useQuery({
        queryKey: ['film', id],
        queryFn: () => getConcurrentApi(urls),
    });

    if (isLoading) {
        return 'Loading...';
    }

    if (error) {
        return `An error has occurred: ${error.message}`;
    }

    return(
<>
<div className={styles.wrapper}>
                <ul className={styles.list__container}>
                {data.sort((a, z) => a.episode_id - z.episode_id)
                .map(({ title, episode_id }) =>
                <li className={styles.list__item} key={episode_id}>
                    <span className={styles.item__episode}>Episode {episode_id}</span>
                    <span className={styles.item__colon}> : </span>
                    <span className={styles.item__title}>{title}</span>
                </li>
                )
                }
                </ul>
            </div>
</>
        )
}



export default PersonFilms