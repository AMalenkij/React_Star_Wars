import React, { useEffect } from "react";

import UiToggle from '../../components/UI/UiToggle/UiToggle.jsx';
import useToggleBtn from '../../hooks/useToggleBtn.js'
import useTypeNavigation from '../../utils/writingToLocalstorageToggle.js'
import LoadMore from '../../components/PeopleList/LoadMore/LoadMore.jsx'
import PageByPage from '../../components/PeopleList/PageByPage/PageByPage.jsx'

function PeoplePage() {

    const {typeNavigation ,setTypeNavigation} = useTypeNavigation()
    const [isChecked, handleToggle] = useToggleBtn(typeNavigation)

    useEffect(()=>{
        setTypeNavigation(isChecked)
    },[isChecked])

    return (
    <>
    <UiToggle isChecked={isChecked} handleToggle={handleToggle} />
    {isChecked ? <PageByPage /> : <LoadMore /> }
    
    </>
    );
}
export default PeoplePage;