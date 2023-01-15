import {useParams} from 'react-router';
import {useQuery} from 'react-query';
import axios from 'axios';
import {getAPIResource} from '../../utils/getAPI.js';
import {getAPIFilms} from '../../utils/getFilmsAPI';
import {API_PEOPLE, BAASE_URL, SWAPI_PEOPLE} from '../../constants/Resources.js';
import styles from './PersonPage.module.css';
import {getPeopleImg} from '../../services/getPeopleData.js';
import {PersonLinkBack} from '../../components/PersonLinkBack/PersonLinkBack.jsx';

function PersonPage() {
    const {id} = useParams();

    const urlPeople = `${SWAPI_PEOPLE}/${id}/`;

    const personPhoto = getPeopleImg(id);
    const data = getAPIResource(BAASE_URL, urlPeople);

    const getFilm = getAPIFilms('https://swapi.dev/api/people/10/');
    console.log(getFilm)


    return (
        <>
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
