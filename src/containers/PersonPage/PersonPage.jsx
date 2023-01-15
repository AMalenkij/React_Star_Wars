import {useParams} from 'react-router';
import {getAPIResource} from '../../utils/getAPI.js';
import {getAPIFilms} from '../../utils/getFilmsAPI';
import {API_PEOPLE, BAASE_URL, SWAPI_PEOPLE} from '../../constants/Resources.js';
import styles from './PersonPage.module.css';
import {getPeopleImg} from '../../services/getPeopleData.js';
import {PersonLinkBack} from '../../components/PersonLinkBack/PersonLinkBack.jsx';

import PersonFilms from "../../components/PersonFilms/PersonFilms.jsx";
import {useState} from "react";

function PersonPage() {

    const {id} = useParams();

    const urlPeople = `${SWAPI_PEOPLE}/${id}/`;

    const personPhoto = getPeopleImg(id);
    const data = getAPIResource(BAASE_URL, urlPeople);


    const arr = [
    "https://swapi.dev/api/films/1/",
    "https://swapi.dev/api/films/2/",
    "https://swapi.dev/api/films/3/",
    "https://swapi.dev/api/films/6/",
]
    const results = getAPIFilms(arr)
    console.log(results)

    return (
        <>
            <PersonFilms urlFilms={arr}/>
            <PersonLinkBack/>
            <div className={styles.wrapper__main}>
                <span className={styles.person__name}>{data.name}</span>
                <div className={styles.container__main}>
                    <div className={styles.container}>
                        <img className={styles.photo} src={personPhoto} alt={data.name}/>
                    </div>
                    <div className={styles.wrapper}>
                        <ul className={styles.list__container}>
                            <li className={styles.list__item}>
                                <span className={styles.item__title}> Height: </span>
                                {data.height}
                            </li>
                            <li className={styles.list__item}>
                                <span className={styles.item__title}>Mass: </span>
                                {data.mass}
                            </li>
                            <li className={styles.list__item}><span
                                className={styles.item__title}>Hair Color: </span>{data.hair_color}
                            </li>
                            <li className={styles.list__item}>
                                <span className={styles.item__title}>Skin Color: </span>
                                {data.skin_color}
                            </li>
                            <li className={styles.list__item}>
                                <span className={styles.item__title}>Eye Color: </span>
                                {data.eye_color}
                            </li>
                            <li className={styles.list__item}>
                                <span className={styles.item__title}>Birth Year: </span>
                                {data.birth_year}
                            </li>
                            <li className={styles.list__item}>
                                <span className={styles.item__title}>Gender: </span>
                                {data.gender}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PersonPage;
