import React from "react";

function Subtitle({ session, secondsToDuration }) {
/* TODO: Update message below correctly format the time remaining in the current session */

return (
   <p className="lead" data-testid="session-sub-title">
   {secondsToDuration(session?.timeRemaining)} remaining
   </p>
);
}

export default Subtitle;
