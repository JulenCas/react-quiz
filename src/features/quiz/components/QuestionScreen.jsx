import { Options } from "./Options";
import styles from "./questionScreen.module.css";

const classes = [styles.shineBtn, styles.fadeIn].filter( Boolean ).join( " " );

export const QuestionScreen = ( { question, questionsLength, currentQuestion, dispatch, answer, points } ) => {

    console.log( 'points', points );

    return (
        <>
            <h3>{ question.question }</h3>

            { <Options question={ question } dispatch={ dispatch } answer={ answer } /> }
            <div className={ styles.btnRow }>
                <button className={ classes } onClick={ () => dispatch( { type: 'resetQuiz' } ) }>Reset Quiz</button>
                <p>{ currentQuestion + 1 } / { questionsLength }</p>
                { currentQuestion + 1 >= questionsLength
                    ? <button className={ classes } disabled={ answer === null } onClick={ () => dispatch( { type: 'finishQuiz' } ) }>Finish</button>
                    : <button className={ classes } disabled={ answer === null } onClick={ () => dispatch( { type: 'nextQuestion' } ) }>Next <span>→</span></button>
                }
            </div>
        </>
    );
};
