import {Await, useParams} from 'react-router';
import {useQuery} from 'react-query';
import React, {Suspense, useState, useContext} from 'react';

import {FavoriteContext} from '../../utils/Context.jsx';
import {SWAPI_PEOPLE} from '../../constants/Resources.js';
import styles from './PersonPage.module.css';
import {getPeopleImg} from '../../services/getPeopleData.js';
import {getApi}  from '../../utils/api.js';
import PersonInfo from '../../components/PersonPage/PersonInfo/PersonInfo.jsx';
import PersonLinkBack from '../../components/PersonPage/PersonLinkBack/PersonLinkBack.jsx';
import PersonPhoto from '../../components/PersonPage/PersonPhoto/PersonPhoto.jsx';
import UiLoading from '../../components/UI/UiLoading/UiLoading.jsx';
import { useEffect } from 'react';

const PersonFilms =  React.lazy (() => import ('../../components/PersonPage/PersonFilms/PersonFilms.jsx'));

export function PersonPage() {
    const [inFavorites, setInFavorites] = useState(false)
    const {favorite} = useContext(FavoriteContext)
    const {id} = useParams();
    const urlPeople = `${SWAPI_PEOPLE}/${id}/`;
    const personPhoto = getPeopleImg(id);

    useEffect(() => {
        (async () => {
        if (data) {
        setInFavorites(favorite.some((item) => item.namePeople === data.name));
        }
        })();
        }, [favorite]);

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
                <PersonPhoto personPhoto={personPhoto} personName={data.name} inFavorites={inFavorites} setInFavorites={setInFavorites} id={id} />
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
