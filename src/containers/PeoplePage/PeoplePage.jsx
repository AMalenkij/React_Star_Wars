import {useState} from "react";
import {useQuery} from 'react-query';

import {getApiResource} from "../../utils/api.js";
import {SWAPI_PEOPLE} from "../../constants/Resources.js";
import {getPeopleId, getPeopleImg} from "../../services/getPeopleData.js";
import PeopleList from "../../components/PeopleList/PeopleList.jsx";
import Pagination from "./Pagination/Pagination.jsx";
import styles from './PeoplePage.module.css'

export function PeoplePage () { 
    
    const [page, setPage] = useState(1)
 
    const {isLoading, error, data, isPreviousData} = useQuery({
        queryKey: ['people', page],
        queryFn: () => getApiResource(SWAPI_PEOPLE, page),
        keepPreviousData: true,
    });

    if (isLoading) return 'Loading...';

    if (error) return `An error has occurred: ${error.message}`;

    const people = data.results.map(({url, name}) => {
        const id = getPeopleId(url)
        const img = getPeopleImg(id)

        return <PeopleList key={id} name={name} url={img} id={id}/>
        })

    return (
        <>
        <Pagination setPage={setPage} page={page} nextPage={data.next} isPrevDt={isPreviousData}/>
        <ul className={styles.list__container}>{people}</ul>
        </>
    )
}

export default PeoplePage;