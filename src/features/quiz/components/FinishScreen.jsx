import styles from './questionScreen.module.css';

export const FinishScreen = ( { points, onRestart } ) => {
    return (
        <>
            <h2>Quiz Finished!</h2>
            <p>Your Score: { points }</p>
            <button className={ styles.shineBtn } onClick={ onRestart }>Restart Quiz</button>
        </>
    );
};
