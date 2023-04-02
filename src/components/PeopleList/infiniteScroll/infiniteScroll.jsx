import React, {useEffect, useRef} from "react";
import {useInfiniteQuery, useQueryClient} from 'react-query';

import {getApi} from "../../utils/api.js";
import {API_PEOPLE} from "../../constants/Resources.js";
import {getPeopleId, getPeopleImg} from "../../services/getPeopleData.js";
import PeopleList from "../../components/PeopleList/PeopleList.jsx";
import styles from './PeoplePage.module.css'
import UiLoading from '../../components/UI/UiLoading/UiLoading.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx'

function PeoplePage() {

    const queryClient = useQueryClient();

    const {
        fetchNextPage,
        hasNextPage, // boolean indicating if there are more pages
        isFetchingNextPage, // boolean indicating if next page is being fetched
        isFetching,
        data,  // data returned from the API
        status,
        error,
        } = useInfiniteQuery(['people'],({ pageParam = 1 }) => 
        getApi(API_PEOPLE + pageParam),
        {
        getNextPageParam: (lastPage, pages) =>
        lastPage.length === 0 ? undefined : pages.length + 1,
        }
        );

        const useInfiniteQueryScrolling = async (container, callback, offset = 0) => {

            const callbackRef = useRef(() => callback);
        
            useEffect(() => {
              callbackRef.current = callback;
            }, [callback]);
        
            useEffect(() => {
              const onScroll = () => {
                const scrollContainer = container === document ? document.scrollingElement : container;
                if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.clientHeight - offset) {
                  callbackRef.current();
                }
              };
          
              container.addEventListener("scroll", onScroll, { passive: true });
              return () => container.removeEventListener("scroll", onScroll);
            }, [container, offset]);
          };

          useInfiniteQueryScrolling(document, () => {if (!isFetchingNextPage && !isFetching) {fetchNextPage();}}, 550);

    if (error) return <ErrorMessage error={error.message} />;
    if (status === 'loading') return <UiLoading />;

    const people = data?.pages.flatMap((pg, i) => (
        <React.Fragment key={i}>
            {pg.results.map(({ url, name }) => {
                const id = getPeopleId(url);
                const img = getPeopleImg(id);
                return <PeopleList key={id} name={name} url={img} id={id} />;
            })}
        </React.Fragment>
));

    return (
        <><div style={{minHeight : "110vh"}}> 
           <ul className={styles.list__container}>{people}</ul>
            <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
          </div>
        </>
    );
}
export default PeoplePage;