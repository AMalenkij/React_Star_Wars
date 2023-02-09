import { useState} from 'react';
import {useQuery} from 'react-query';

import SearchPageInfo from '../../components/SearchPage/SearchPageInfo/SearchPageInfo.jsx';
import UiInput from '../../components/UI/UiInput/UiInput.jsx';
import styles from './SearchPage.module.css';
import {getApi} from "../../utils/api.js";
import {useDebounce} from "../../utils/debounce.js";
import {API_SEARCH} from "../../constants/Resources.js";
import {getPeopleId, getPeopleImg} from "../../services/getPeopleData.js";
import UiLoading from '../../components/UI/UiLoading/UiLoading.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx'

function SearchPage () {

     const [inputSearchValue, setInputSearchValue] = useState('')
     const debounceValue = useDebounce(inputSearchValue, 500);

     const urlPeople = API_SEARCH + debounceValue;
 
     const {isLoading, error, data, isPreviousData, isFetching} = useQuery({
         queryKey: ['search', debounceValue],
         queryFn: () => getApi(urlPeople),
         keepPreviousData: true,
     },{
          enabled:!!debounceValue
     });
 
     if (isLoading) return <UiLoading/>
     if (error) return <ErrorMessage error={error.message}/>
    
     const handleInputChange = (value) => {
          setInputSearchValue(value)
     }

     const people = data?.results?.map(({url, name}) => {
          const id = getPeopleId(url)
          const img = getPeopleImg(id)
  
          return <SearchPageInfo key={id} name={name} url={img} id={id}/>
          })   
     
     return (
          <>
          <h1 className="header__text">Search</h1>
          <UiInput
                value={inputSearchValue}
                handleInputChange={handleInputChange}
                placeholder="Input character's name"
            />
          <ul className={styles.list__container}>{people}</ul>
          </>
     )
}

export default SearchPage;