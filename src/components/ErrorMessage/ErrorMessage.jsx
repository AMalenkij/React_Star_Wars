import styles from './ErrorMessage.module.css';
import video from './video/han-solo.mp4';
import UiVideo from '../UI/UiVideo/UiVideo.jsx';

function ErrorMessage() {
    return (
        <>
            <p className={styles.text}>
                The dark side of the force has won. <br />
                We cannot display data.<br />
                Come back when we fix everything
            </p>

            <UiVideo src={video}/>
        </>
    )
}

export default ErrorMessage;