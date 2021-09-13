import React from "react";
import Subtitle from "./Subtitle";
import ProgressBar from "./ProgressBar";

function Title({
  session,
  minutesToDuration,
  focusDuration,
  secondsToDuration,
  breakDuration,
}) {
  if (session) {
    return (
      <>
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
            <h2 data-testid="session-title">
              {session.label} for{" "}
              {minutesToDuration(
                session.label === "Focusing" ? focusDuration : breakDuration
              )}{" "}
              minutes
            </h2>
            <Subtitle session={session} secondsToDuration={secondsToDuration} />
          </div>
        </div>
        <ProgressBar
          session={session}
          focusDuration={focusDuration}
          breakDuration={breakDuration}
        />
      </>
    );
  } else {
    return null;
  }
}

export default Title;