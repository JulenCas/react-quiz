import { useEffect, useReducer } from 'react';
import { StartScreen, QuestionScreen, Main } from "../features/quiz";
import { Header } from '../shared/components/Header';
import { PropagateLoader } from 'react-spinners';
import { FinishScreen } from '../features/quiz/components/FinishScreen';

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  // 'loading', 'error', 'ready', 'active', 'finished';
  status: 'loading',
  points: 0,
  answer: null,
  secondsRemaining: 180
};

function reducer( state, action ) {
  switch ( action.type ) {
    // data load ----------------->
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataError':
      return { ...state, status: 'error' };

    // quiz states ----------------->
    case 'quizStart':
      return { ...state, status: 'active', secondsRemaining: 180 };
    case 'answerQuestion':
      return { ...state, answer: action.payload };
    case 'addScore':
      return action.payload
        ? { ...state, points: state.points + state.questions[state.currentQuestionIndex].points }
        : state;
    case 'nextQuestion':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        answer: null,
      };
    case 'resetQuiz':
      return {
        ...state,
        currentQuestionIndex: 0,
        answer: null,
        status: 'ready',
      };
    case 'finishQuiz':
      return {
        ...state,
        status: 'finished',
      };

    case "tick":
      return { ...state, secondsRemaining: state.secondsRemaining - 1 };

    case "timeUp":
      return { ...state, status: "finished" };

    default:
      throw new Error( `Unknown action type: ${action.type}` );
  }
};

export const App = () => {

  const [{ questions, status, currentQuestionIndex, answer, points, secondsRemaining }, dispatch] = useReducer( reducer, initialState );

  const numQuestions = questions.length;

  useEffect( () => {
    fetch( 'http://localhost:4000/questions' )
      .then( response => response.json() )
      .then( data => dispatch( { type: 'dataReceived', payload: data } ) )
      .catch( () => dispatch( { type: 'dataError' } ) );
  }, [] );

  useEffect( () => {
    if ( status !== "active" ) return;

    const id = setInterval( () => dispatch( { type: "tick" } ), 1000 );
    return () => clearInterval( id );
  }, [status, dispatch] );

  useEffect( () => {
    if ( status !== "active" ) return;
    if ( secondsRemaining === 0 ) dispatch( { type: "timeUp" } );
  }, [secondsRemaining, status, dispatch] );

  return (
    <div className='app'>
      <Header secondsRemaining={ secondsRemaining } />
      <Main>
        { status === 'loading' && <PropagateLoader color="#36d7b7" /> }
        { status === 'error' && <p>Error</p> }
        { status === 'ready' && <StartScreen numQuestions={ numQuestions } dispatch={ dispatch } /> }
        { status === 'active' && <QuestionScreen question={ questions[currentQuestionIndex] } questionsLength={ questions.length } currentQuestion={ currentQuestionIndex } dispatch={ dispatch } answer={ answer } points={ points } /> }
        { status === 'finished' && <FinishScreen points={ points } dispatch={ dispatch } /> }
      </Main>
    </div>
  );
};
