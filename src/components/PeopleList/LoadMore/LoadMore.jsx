import React from "react";
import {useInfiniteQuery, useQueryClient} from 'react-query';
import InfiniteScrollComponent from "react-infinite-scroll-component"

import {getApi} from "../../../utils/api.js";
import {API_PEOPLE} from "../../../constants/Resources.js";
import {getPeopleId, getPeopleImg} from "../../../services/getPeopleData.js";
import PeopleList from "../PeopleList.jsx";
import styles from './LoadMore.module.css'
import UiLoading from '../../UI/UiLoading/UiLoading.jsx';
import ErrorMessage from '../../ErrorMessage/ErrorMessage.jsx'

function LoadMore () {

    const queryClient = useQueryClient();

    const {
        fetchNextPage,
        hasNextPage,        // boolean indicating if there are more pages
        isFetchingNextPage, // boolean indicating if next page is being fetched
        data,               // data returned from the API
        status,
        error,
        } = useInfiniteQuery(['people'],({ pageParam = 1 }) => 
        getApi(API_PEOPLE + pageParam),
        {
        getNextPageParam: (lastPage, pages) =>
        lastPage.next === null ? undefined : pages.length + 1,
        }
        );

    if (error) return <ErrorMessage error={error.message} />;
    if (status === 'loading') return <UiLoading />;

    const people = data?.pages.flatMap((pg, i) => (
        <React.Fragment key={i}>
            {pg.results.map(({ url, name}) => {
                const id = getPeopleId(url)
                const img = getPeopleImg(id)
                return <PeopleList key={id} name={name} url={img} id={id} />;
            })}
        </React.Fragment>
));
    return (
      <>            
            <InfiniteScrollComponent
                style={{minHeight : "105vh"}}
                dataLength={people.length}
                next={fetchNextPage}
                hasMore={hasNextPage}
                loader={isFetchingNextPage && <UiLoading />}
                endMessage={<p className={styles.text}>All people have been loaded</p>}
            >
                <ul className={styles.list__container}>{people}</ul>
            </InfiniteScrollComponent>
        </>
    );
}
export default LoadMore