import {useParams} from 'react-router';
import {useQuery} from 'react-query';
import React, {Suspense} from 'react';

import {SWAPI_PEOPLE} from '../../constants/Resources.js';
import styles from './PersonPage.module.css';
import {getPeopleImg} from '../../services/getPeopleData.js';
import {getApi}  from '../../utils/api.js';
import PersonInfo from '../../components/PersonPage/PersonInfo/PersonInfo.jsx';
import PersonLinkBack from '../../components/PersonPage/PersonLinkBack/PersonLinkBack.jsx';
import PersonPhoto from '../../components/PersonPage/PersonPhoto/PersonPhoto.jsx';
import UiLoading from '../../components/UI/UiLoading/UiLoading.jsx';

const PersonFilms =  React.lazy (() => import ('../../components/PersonPage/PersonFilms/PersonFilms.jsx'));

export function PersonPage() {

    const {id} = useParams();
    const urlPeople = `${SWAPI_PEOPLE}/${id}/`;
    const personPhoto = getPeopleImg(id);

    const {isLoading, error, data, isPreviousData} = useQuery({
        queryKey: ['people', id],
        queryFn: () => getApi(urlPeople),
        keepPreviousData: true,
    });

    if (isLoading) return 'Loading...';
    if (error) return `An error has occurred: ${error.message}`;

    return (
        <>
        <PersonLinkBack/>
        <div className={styles.wrapper}>
            <span className={styles.person__name}>{data.name}</span>
            <div className={styles.container}>
                <PersonPhoto personPhoto={personPhoto} personName={data.name} id={id} />
                <PersonInfo data={data}/>
                <Suspense fallback={<UiLoading/>}>
                <PersonFilms urls={data.films} id={id} />
                </Suspense>
            </div>
        </div>
        </>
    );
}

export default PersonPage;
