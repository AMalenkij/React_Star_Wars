import styles from './ErrorMessage.module.css';
import video from './video/han-solo.mp4';
import UiVideo from '../UI/UiVideo/UiVideo.jsx';

function ErrorMessage({error}) {
    return (
        <>
            <p className={styles.text}>
                The dark side of the force has won. <br />
                We cannot display data.<br />
                Come back when we fix everything
            </p>
            {error ? 
                <>
                    <p className={styles.text}>An error has occurred:</p>
                    <p className={styles.text_error}>{error}</p> 
                </>
            : null}

            <UiVideo src={video}/>
        </>
    )
}

export default ErrorMessage;