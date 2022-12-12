import {getApiResource} from "../../utils/network.js";
import {useEffect, useState} from "react";
import {API_PEOPLE} from "../../constants/api.js";
import {getPeopleId, getPeopleImg} from "../../services/getPeopleData.js";

const PeoplePage = () => {
    const [people, setPeople] = useState(null)

    const getResource = async (url) => {
        const res = await getApiResource(url)

        const peopleList = res.results.map(({name, url}) => {
            const id = getPeopleId(url)
            const img = getPeopleImg(id)
            return {id, name, img}
        })
        setPeople(peopleList)
    }

    useEffect(() => {
        getResource(API_PEOPLE)
    }, [])

    return (
        <>
            {people &&
                <ul>
                    {people.map(({id, name, img}) =>
                        <li key={name}>
                            <img src={img} alt={name} />
                            <p>{name}</p>
                        </li>
                    )}
                </ul>
            }
        </>
    )
}

export default PeoplePage