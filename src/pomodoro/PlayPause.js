import React from "react";
import classNames from "../utils/class-names";

function PlayPause({
isTimerRunning,
handleStop,
disableButton,
handlePlayPauseClick,
sessionActive,
}) {
return (
   <div>
   <div className="row">
      <div className="col">
         <div
         className="btn-group btn-group-lg mb-2"
         role="group"
         aria-label="Timer controls"
         >
         <button
            type="button"
            className="btn btn-primary"
            data-testid="play-pause"
            title="Start or pause timer"
            onClick={handlePlayPauseClick}
         >
            <span
               className={classNames({
               oi: true,
               "oi-media-play": !isTimerRunning,
               "oi-media-pause": isTimerRunning,
               })}
            />
         </button>
         {/* TODO: Implement stopping the current focus or break session. and disable the stop button when there is no active session */}
         {/* TODO: Disable the stop button when there is no active session */}
         <button
            type="button"
            className="btn btn-secondary"
            data-testid="stop"
            title="Stop the session"
            onClick={handleStop}
            disabled={!sessionActive}
         >
            <span className="oi oi-media-stop" />
         </button>
         </div>
      </div>
   </div>
   </div>
);
}
export default PlayPause;