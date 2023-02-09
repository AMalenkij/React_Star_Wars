import {useEffect, useRef} from 'react';

import '../index.css';
import styles from './UiVideo.module.css';


function UiVideo({src, playbackRate = 1.0}) {


    const videoRef = useRef(null);

    useEffect(() => {
        videoRef.current.playbackRate = playbackRate;
    }, [playbackRate]);

    return (
        <video
            loop
            autoPlay
            muted
            ref={videoRef}
            className={styles.video}
        >
            <source src={src}/>
        </video>
    )

}

export default UiVideo