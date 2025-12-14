import styles from './questionScreen.module.css';

export const StartScreen = ( { numQuestions, onStart } ) => {

    return (
        <div>
            <h3>Answer { numQuestions } questions to reach the top 1</h3>
            <button className={ styles.shineBtn } onClick={ onStart }>Start Quiz</button>
        </div>
    );
};
