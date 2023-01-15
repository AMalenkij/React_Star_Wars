import getAPIFilms from "../../utils/getFilmsAPI.js";

export function PersonFilms (urlFilms) {
    const  films = getAPIFilms  (urlFilms)

/*        const content = films.map(film => <li key={film}> {film} </li>)*/

    return (
        <>
{/*            {films.title.map((film) =>
                <li key={film}>{film}</li>
            )}*/}
{/*            {films.isFetching && <span className="loading">Loading...</span>}*/}

        </>
    )
}

export default PersonFilms