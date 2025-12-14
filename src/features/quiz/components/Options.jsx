import styles from "./options.module.css";

export const Options = ( { question, onAnswer, answer } ) => {

    const handleAnswerQuestion = ( index, isCorrect ) => {
        onAnswer( index, isCorrect );
    };

    return (
        <div>
            { question.options.map( ( option, index ) => {
                const isAnswered = answer !== null;
                const isSelected = answer === index;
                const isCorrect = index === question.correctOption;

                const classes = [
                    styles.optionBtn,
                    styles.fadeIn,
                    isAnswered
                        ? isCorrect
                            ? styles.correct
                            : styles.incorrect
                        : "",
                    isSelected ? styles.answered : ""
                ]
                    .filter( Boolean )
                    .join( " " );

                return (
                    <button
                        key={ option }
                        className={ classes }
                        onClick={ () => handleAnswerQuestion( index, isCorrect ) }
                        disabled={ isAnswered }
                    >
                        { option }
                    </button>
                );
            } ) }
        </div>
    );
};
