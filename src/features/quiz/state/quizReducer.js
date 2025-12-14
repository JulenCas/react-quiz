export const QUIZ_STATUS = {
    LOADING: "loading",
    ERROR: "error",
    READY: "ready",
    ACTIVE: "active",
    FINISHED: "finished",
};

export const QUIZ_ACTIONS = {
    DATA_RECEIVED: "dataReceived",
    DATA_ERROR: "dataError",
    QUIZ_START: "quizStart",
    ANSWER_QUESTION: "answerQuestion",
    ADD_SCORE: "addScore",
    NEXT_QUESTION: "nextQuestion",
    RESET_QUIZ: "resetQuiz",
    FINISH_QUIZ: "finishQuiz",
    TICK: "tick",
    TIME_UP: "timeUp",
};

export const QUIZ_DURATION = 120;

export const initialState = {
    questions: [],
    currentQuestionIndex: 0,
    status: QUIZ_STATUS.LOADING,
    points: 0,
    answer: null,
    secondsRemaining: QUIZ_DURATION,
};

export const quizReducer = ( state, action ) => {
    switch ( action.type ) {
        case QUIZ_ACTIONS.DATA_RECEIVED:
            return { ...state, questions: action.payload, status: QUIZ_STATUS.READY };

        case QUIZ_ACTIONS.DATA_ERROR:
            return { ...state, status: QUIZ_STATUS.ERROR };

        case QUIZ_ACTIONS.QUIZ_START:
            return { ...state, status: QUIZ_STATUS.ACTIVE, secondsRemaining: QUIZ_DURATION };

        case QUIZ_ACTIONS.ANSWER_QUESTION:
            return { ...state, answer: action.payload };

        case QUIZ_ACTIONS.ADD_SCORE:
            return action.payload
                ? { ...state, points: state.points + state.questions[state.currentQuestionIndex].points }
                : state;

        case QUIZ_ACTIONS.NEXT_QUESTION:
            return {
                ...state,
                currentQuestionIndex: state.currentQuestionIndex + 1,
                answer: null,
            };

        case QUIZ_ACTIONS.RESET_QUIZ:
            return {
                ...state,
                currentQuestionIndex: 0,
                answer: null,
                status: QUIZ_STATUS.READY,
            };

        case QUIZ_ACTIONS.FINISH_QUIZ:
            return {
                ...state,
                status: QUIZ_STATUS.FINISHED,
            };

        case QUIZ_ACTIONS.TICK:
            return { ...state, secondsRemaining: state.secondsRemaining - 1 };

        case QUIZ_ACTIONS.TIME_UP:
            return { ...state, status: QUIZ_STATUS.FINISHED };

        default:
            throw new Error( `Unknown action type: ${action.type}` );
    }
};