const QUIZ_API_URL = "http://localhost:4000/questions";

const fetchQuestions = async () => {
    const response = await fetch( QUIZ_API_URL );

    if ( !response.ok ) {
        throw new Error( "Failed to fetch quiz questions" );
    }

    return response.json();
};

export const quizService = {
    fetchQuestions,
};