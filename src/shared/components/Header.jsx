import { Timer } from "../../features/quiz/components/Timer";
import styles from "./header.module.css";

export const Header = ( { secondsRemaining } ) => {
    return (
        <header>
            <h1>The Quizzer</h1>
            <Timer secondsRemaining={ secondsRemaining } />
        </header>
    );
};
