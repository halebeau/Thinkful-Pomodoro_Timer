import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import Focus from "./Focus";
import Break from "./Break";
import PlayPause from "./PlayPause";
import SubTitle from "./Session";

function Pomodoro() {
  const initialStates = {
    sessionCountdown: 0,

    ariaValue: 0,
  };

  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);
  const [sessionCountdown, setSessionCountdown] = useState(
    initialStates.sessionCountdown
  );
  const [sessionActive, setSessionActive] = useState(false);
  const [ariaValue, setAriaValue] = useState(initialStates.ariaValue);
  const [elapsed, setElapsed] = useState(0);

  // ToDo: Allow the user to adjust the focus and break duration.
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [focusSessionActive, setFocusSessionActive] = useState(false);
  const [breakLeft, setBreakLeft] = useState(0);

  const [stopButton, setStopButton] = useState(true);
  const [disableButton, setDisableButton] = useState(true);

  /**
   * Update the session state with new state after each tick of the interval.
   * @param prevState
   *  the previous session state
   * @returns
   *  new session state with timing information updated.
   */

  function nextTick(prevState) {
    const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
    return {
      ...prevState,
      timeRemaining,
    };
  }

  /**
   * Higher order function that returns a function to update the session state with the next session type upon timeout.
   * @param focusDuration
   *    the current focus duration
   * @param breakDuration
   *    the current break duration
   * @returns
   *  function to update the session state.
   */
  function nextSession(focusDuration, breakDuration) {
    /**
     * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
     */
    return (currentSession) => {
      if (currentSession.label === "Focusing") {
        return {
          label: "On Break",
          timeRemaining: breakDuration * 60,
        };
      }
      return {
        label: "Focusing",
        timeRemaining: focusDuration * 60,
      };
    };
  }

  function handleStop() {
    setIsTimerRunning(false);
    setStopButton(true);
    setSession(null);
    setDisableButton(false);
    setFocusSessionActive(false);
    setSessionActive(false);
    setElapsed(0);
  }

  useInterval(
    () => {
      setBreakLeft(breakLeft + 1);
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        setSession(nextSession(focusDuration, breakDuration));
      }
      setSession(nextTick);
      const left = session.timeRemaining;
      if (session.label === "Focusing") {
        setAriaValue(
          (100 * (focusDuration * 60 - left)) / (focusDuration * 60)
        );
      } else {
        setAriaValue(
          (100 * (breakDuration * 60 - left)) / (breakDuration * 60)
        );
      }
    },
    isTimerRunning ? 1000 : null
  );

  useInterval(() => {
    if (session && session.timeRemaining) {
      return setElapsed(elapsed + 1);
    }
  }, 1000);

  /**
   * Called whenever the play/pause button is clicked.
   */
  function handlePlayPauseClick() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            setDisableButton(false);
            setSessionCountdown(sessionActive);
            setSessionActive(true);
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  return (
    <div className="pomodoro">
      <Break
        breakDuration={breakDuration}
        setBreakDuration={setBreakDuration}
        isTimerRunning={isTimerRunning}
      />
      <Focus
        focusDuration={focusDuration}
        setFocusDuration={setFocusDuration}
        isTimerRunning={isTimerRunning}
      />
      <PlayPause
        isTimerRunning={isTimerRunning}
        handleStop={handleStop}
        focusDuration={focusDuration}
        breakDuration={breakDuration}
        focusSessionActive={focusSessionActive}
        focusDuration={focusDuration}
        sessionCountdown={sessionCountdown}
        handlePlayPauseClick={handlePlayPauseClick}
        ariaValue={ariaValue}
        sessionActive={sessionActive}
      />
      <SubTitle
        sessionActive={sessionActive}
        ariaValue={ariaValue}
        session={session}
        focusDuration={focusDuration}
        breakDuration={breakDuration}
        focusSessionActive={focusSessionActive}
        sessionCountdown={sessionCountdown}
      />
    </div>
  );
}

export default Pomodoro;