import React from "react";
import classNames from "../utils/class-names";
import { secondsToDuration } from "../utils/duration";

function Session({
ariaValue,
breakDuration,
focusDuration,
sessionActive,
focusSessionActive,
session,
sessionCountdown,
}) {
return (
   <div>
   {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
   <div
      className={classNames({
         "row mb-2": sessionActive,
         //"d-none": !sessionActive,
      })}
   >
      <div className="col">
         {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
         {sessionActive && (
         <h2 data-testid="session-title">
            {session && session.label} for{" "}
            {(
               "0" +
               (session.label.toLowerCase().indexOf("ocus") > 0
               ? focusDuration
               : breakDuration)
            ).substr(-2)}
            :00 minutes
         </h2>
         )}
         {/* TODO: Update message below to include time remaining in the current session */}
         {sessionActive && (
         <p className="lead" data-testid="session-sub-title">
            {secondsToDuration(session?.timeRemaining)} remaining
         </p>
         )}
      </div>
   </div>
   <div className="row mb-2">
      <div className="col">
         {/* TODO: Display when session is active*/}
         <div
         className={classNames({
            progress: sessionActive,
            //"d-none": !sessionActive,
         })}
         style={{ height: "20px" }}
         >
         <div
            className="progress-bar"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={ariaValue} // TODO: Increase aria-valuenow as elapsed time increases
            style={{ width: `${ariaValue}%` }} // TODO: Increase width % as elapsed time increases
         />
         </div>
      </div>
   </div>
   </div>
);
}

export default Session;