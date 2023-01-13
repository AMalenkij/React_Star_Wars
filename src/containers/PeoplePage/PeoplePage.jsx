import {getApiResource} from "../../utils/network.js";
import {useEffect, useState} from "react";
import {API_PEOPLE} from "../../constants/Resources.js";
import {getPeopleId, getPeopleImg} from "../../services/getPeopleData.js";
import PeopleList from "../../components/PeopleList/PeopleList.jsx";
import {withErrorApi} from "../../hoc-helpers/withErrorApi.jsx";
import peopleList from "../../components/PeopleList/PeopleList.jsx";
import Pagination from "./Pagination/Pagination.jsx";

const PeoplePage = ({ setErrorApi }) => {
    const [people, setPeople] = useState(null)
    const [page, setPage] = useState(1)
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);

    const getResource = async (url, page) => {
        const res = await getApiResource(url, page)
        if (res) {
            const peopleList = res.results.map(({ name, url }) => {
                const id = getPeopleId(url)
                const img = getPeopleImg(id)

                return {id, name, img}
            })

            setPeople(peopleList);
            setPrevPage(res.previous)
            setNextPage(res.next)
            setErrorApi(false);
        } else {
            setErrorApi(true);
        }
    }

    useEffect(() => {
        getResource(API_PEOPLE, page)

    }, [page])

    const nextPg = () => setPage(prev => prev + 1)
    const prevPg = () => setPage(prev => prev - 1)

    return (
            <>
            < Pagination prevPg={prevPg} nextPg={nextPg} prevPage={prevPage} nextPage={nextPage}/>
            {people && <PeopleList people={people} />}
            </>
            )
}

export default withErrorApi(PeoplePage);