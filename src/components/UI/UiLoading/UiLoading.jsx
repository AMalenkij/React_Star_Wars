import { useState, useEffect } from 'react';

import loaderBlack from './img/loader-black.svg';
import loaderWhite from './img/loader-white.svg';
import loaderBlue from './img/loader-blue.svg';

import '../index.css';
import styles from './UiLoading.module.css';

const UiLoading = ({
    theme='white',
    isShadow=true,
    classes
}) => {
    const [loaderIcon, setLoaderIcon] = useState(null);

    useEffect(() => {
        switch (theme) {
            case 'black': setLoaderIcon(loaderBlack); break;
            case 'white': setLoaderIcon(loaderWhite); break;
            case 'blue': setLoaderIcon(loaderBlue); break;
            default: setLoaderIcon(loaderBlack);
        }
    }, []);

    return (
        <img
            className={styles.loader}
            src={loaderIcon}
            alt="Loader"
        />
    )
}


export default UiLoading;