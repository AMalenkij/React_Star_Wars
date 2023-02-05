import { useState, useEffect, useCallback } from 'react';
import SearchPageInfo from '../../components/SearchPage/SearchPageInfo/SearchPageInfo.jsx'
import styles from './SearchPage.module.css';

function SearchPage () {
     return (
          <>
          <h1 className="header__text">Search</h1>


          <SearchPageInfo/>
          </>
     )
}

export default SearchPage;