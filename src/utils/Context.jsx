import {useEffect} from "react";
import {createContext, useCotext, useState} from "react";

export const FavoriteContext = createContext();

export function FavoriteProvider(props) {

    const [favorite, setFavorite] = useState([]);

    const addToFavorites = (id, imgSrc, namePeople) => {
        setFavorite((prev) => [...prev, {id, imgSrc, namePeople}]);
    };

    const delFromFavorites = id => {
        setFavorite(prev => prev.filter(p => p.id !== id));
    };

    useEffect(() => {
        const res = sessionStorage.getItem('favorite')
        if (res) {
            setFavorite(JSON.parse(res))
        }
    }, [])


    useEffect(() => {
        sessionStorage.setItem('favorite', JSON.stringify(favorite))
    }, [favorite])

    return (
        <FavoriteContext.Provider value={{favorite, addToFavorites, delFromFavorites}}>
            {props.children}
        </FavoriteContext.Provider>
    )

}

export default FavoriteProvider