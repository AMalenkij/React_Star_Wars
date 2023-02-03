import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

export const FavoriteContext = createContext ();

export function FavoriteProvider (props) {

     // const initialFavorite = []	

     // const getInitialState = () => {
     //      const res = sessionStorage.getItem('favorite')
     //      return res ? JSON.parse(res):initialFavorite;
     // }
 
     // const res = sessionStorage.getItem('favorite')


     const [favorite, setFavorite] = useState([]);
     
     const addToFavorites = (id, imgSrc, namePeople) => {
          setFavorite((prev) => [...prev, {id, imgSrc, namePeople}]);
     };
     
     const delFromFavorites = id => {
          setFavorite(prev => prev.filter(p => p.id !== id));
     };

     useEffect(() => {
          const res = sessionStorage.getItem('favorite')
          // console.log(JSON.parse(res))
          if (res) {
               setFavorite(JSON.parse(res))
          }
     },[])


     useEffect (() => {
          sessionStorage.setItem('favorite', JSON.stringify(favorite))
     },[favorite])

     return (
     <FavoriteContext.Provider value={{favorite, addToFavorites, delFromFavorites}}>
     {props.children}
     </FavoriteContext.Provider>
     )

}

export default FavoriteProvider