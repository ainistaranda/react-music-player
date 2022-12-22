import { useEffect, useState } from "react";
import useSound from "use-sound";
// import polyphia from "../assets/polyphia.mp3";
import lofi from "../assets/lofi.mp3";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import "./Player.css";

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { pause, duration, sound }] = useSound(lofi);
  const [currTime, setCurrTime] = useState({ min: "", sec: "" }); // current position of the audio in minutes and seconds
  const [time, setTime] = useState({ min: "", sec: "" });
  const [seconds, setSeconds] = useState(); // current position of the audio in seconds

  useEffect(() => {
    if (duration) {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      setTime({
        min: min,
        sec: secRemain,
      });
    }
  }, [isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([])); // setting the seconds state with the current state
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min,
          sec,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  const playingButton = () => {
    if (isPlaying) {
      pause(); // pause audio
      setIsPlaying(false);
    } else {
      play(); //play audio
      setIsPlaying(true);
    }
  };

  return (
    <div className="component">
      <h2> Playing Now</h2>
      <img
        className="music-cover"
        src="https://source.unsplash.com/random/?city,night"
        alt="random city at night from unsplash"
      />
      <div>
        <h3 className="title">Afternoon Jazz Lofi</h3>
        <p className="subtitle">Lofi Girl</p>
      </div>
      <div>
        <div className="time">
          <p>
            {currTime.min}:{currTime.sec}
          </p>
          <p>
            {time.min}:{time.sec}
          </p>
        </div>
        <input
          type="range"
          min="0"
          max={duration / 1000}
          default="0"
          value={seconds}
          className="timeline"
          onChange={(e) => {
            sound.seek([e.target.value]);
          }}
        />
      </div>
      <div>
        <button className="play-btn">
          <IconContext.Provider value={{ size: "3em", color: "253646" }}>
            <BiSkipPrevious />
          </IconContext.Provider>
        </button>
        {!isPlaying ? (
          <button className="play-btn" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#ecd444" }}>
              <AiFillPlayCircle />
            </IconContext.Provider>
          </button>
        ) : (
          <button className="play-btn" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#ecd444" }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
        )}
        <button className="play-btn">
          <IconContext.Provider value={{ size: "3em", color: "#253646" }}>
            <BiSkipNext />
          </IconContext.Provider>
        </button>
      </div>
    </div>
  );
}
