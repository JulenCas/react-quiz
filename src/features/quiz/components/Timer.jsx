export const Timer = ( { secondsRemaining } ) => {
    const mins = String( Math.floor( secondsRemaining / 60 ) ).padStart( 2, "0" );
    const secs = String( secondsRemaining % 60 ).padStart( 2, "0" );

    return (
        <div className="timer">
            { mins }:{ secs }
        </div>
    );
};
