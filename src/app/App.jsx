import { StartScreen, QuestionScreen, Main } from "../features/quiz";
import { Header } from '../shared/components/Header';
import { PropagateLoader } from 'react-spinners';
import { FinishScreen } from '../features/quiz/components/FinishScreen';

import { useQuiz } from "../features/quiz/hooks/useQuiz";
import { QUIZ_STATUS } from "../features/quiz/state/quizReducer";

export const App = () => {
  const { state, status, numQuestions, currentQuestion, actions } = useQuiz();
  const { currentQuestionIndex, answer, points, secondsRemaining } = state;

  return (
    <div className='app'>
      <Header secondsRemaining={ secondsRemaining } />
      <Main>
        { status === QUIZ_STATUS.LOADING && <PropagateLoader color="#36d7b7" /> }
        { status === QUIZ_STATUS.ERROR && <p>Error</p> }
        { status === QUIZ_STATUS.READY && <StartScreen numQuestions={ numQuestions } onStart={ actions.startQuiz } /> }
        { status === QUIZ_STATUS.ACTIVE && currentQuestion && (
          <QuestionScreen
            question={ currentQuestion }
            questionsLength={ numQuestions }
            currentQuestion={ currentQuestionIndex }
            onReset={ actions.resetQuiz }
            onNext={ actions.goToNextQuestion }
            onFinish={ actions.finishQuiz }
            onAnswer={ actions.handleAnswerQuestion }
            answer={ answer }
            points={ points }
          />
        ) }
        { status === QUIZ_STATUS.FINISHED && <FinishScreen points={ points } onRestart={ actions.resetQuiz } /> }
      </Main>
    </div>
  );
};
