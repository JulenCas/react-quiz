import { Options } from "./Options";
import styles from "./questionScreen.module.css";

const classes = [styles.shineBtn, styles.fadeIn].filter( Boolean ).join( " " );

export const QuestionScreen = ( { question, questionsLength, currentQuestion, onReset, onAnswer, onNext, onFinish, answer, points } ) => {
    const isLastQuestion = currentQuestion + 1 >= questionsLength;
    const handleNextStep = () => {
        if ( isLastQuestion ) {
            onFinish();
            return;
        }

        onNext();
    };

    return (
        <>
            <h3>{ question.question }</h3>

            { <Options question={ question } onAnswer={ onAnswer } answer={ answer } /> }
            <div className={ styles.btnRow }>
                <button className={ classes } onClick={ onReset }>Reset Quiz</button>
                <p>{ currentQuestion + 1 } / { questionsLength }</p>
                <button className={ classes } disabled={ answer === null } onClick={ handleNextStep }>
                    { isLastQuestion ? "Finish" : <>Next <span>→</span></> }
                </button>
            </div>
        </>
    );
};
