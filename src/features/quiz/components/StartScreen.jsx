import styles from './questionScreen.module.css';

export const StartScreen = ( { numQuestions, dispatch } ) => {

    return (
        <div>
            <h3>Answer { numQuestions } questions to reach the top 1</h3>
            <button className={ styles.shineBtn } onClick={ () => dispatch( { type: 'quizStart' } ) }>Start Quiz</button>
        </div>
    );
};
