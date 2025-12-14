import { useCallback, useEffect, useMemo, useReducer } from "react";
import { quizService } from "../services/quizService";
import { initialState, QUIZ_ACTIONS, QUIZ_STATUS, quizReducer } from "../state/quizReducer";

const isTimerActive = ( status ) => status === QUIZ_STATUS.ACTIVE;

export const useQuiz = () => {
    const [state, dispatch] = useReducer( quizReducer, initialState );
    const { questions, status, currentQuestionIndex, secondsRemaining } = state;

    const numQuestions = useMemo( () => questions.length, [questions] );
    const currentQuestion = useMemo( () => questions[currentQuestionIndex] || null, [currentQuestionIndex, questions] );

    const startQuiz = useCallback( () => dispatch( { type: QUIZ_ACTIONS.QUIZ_START } ), [] );

    const handleAnswerQuestion = useCallback( ( selectedIndex, isCorrect ) => {
        dispatch( { type: QUIZ_ACTIONS.ANSWER_QUESTION, payload: selectedIndex } );
        dispatch( { type: QUIZ_ACTIONS.ADD_SCORE, payload: isCorrect } );
    }, [] );

    const goToNextQuestion = useCallback( () => dispatch( { type: QUIZ_ACTIONS.NEXT_QUESTION } ), [] );

    const finishQuiz = useCallback( () => dispatch( { type: QUIZ_ACTIONS.FINISH_QUIZ } ), [] );

    const resetQuiz = useCallback( () => dispatch( { type: QUIZ_ACTIONS.RESET_QUIZ } ), [] );

    useEffect( () => {
        const loadQuestions = async () => {
            try {
                const data = await quizService.fetchQuestions();
                dispatch( { type: QUIZ_ACTIONS.DATA_RECEIVED, payload: data } );
            } catch ( error ) {
                console.error( error );
                dispatch( { type: QUIZ_ACTIONS.DATA_ERROR } );
            }
        };

        loadQuestions();
    }, [] );

    useEffect( () => {
        if ( !isTimerActive( status ) ) return undefined;

        const id = setInterval( () => dispatch( { type: QUIZ_ACTIONS.TICK } ), 1000 );
        return () => clearInterval( id );
    }, [status] );

    useEffect( () => {
        if ( !isTimerActive( status ) ) return;
        if ( secondsRemaining === 0 ) dispatch( { type: QUIZ_ACTIONS.TIME_UP } );
    }, [secondsRemaining, status] );

    return {
        state,
        status,
        numQuestions,
        currentQuestion,
        actions: {
            startQuiz,
            handleAnswerQuestion,
            goToNextQuestion,
            finishQuiz,
            resetQuiz,
        },
    };
};