import { useEffect, useState } from "react";
import useSound from "use-sound";
import polyphia from "../assets/polyphia.mp3";
import {
  AiFillPlayCircle,
  AiFillPauseCircle,
  AiFillRead,
} from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import "./Player.css"


export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { pause, duration, sound }] = useSound(polyphia);

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
      <img className="music-cover" src="https://picsum.photos/200/200" />
      <div>
        <h3 className="title">Polyphia</h3>
        <p className="subtitle">Playing God</p>
      </div>
      <div>
        <button className="play-btn">
          <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
            <BiSkipPrevious />
          </IconContext.Provider>
        </button>
        {!isPlaying ? (
          <button className="play-btn" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <AiFillPlayCircle />
            </IconContext.Provider>
          </button>
        ) : (
          <button className="play-btn" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
        )}
        <button className="play-btn">
          <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
            <BiSkipNext />
          </IconContext.Provider>
        </button>
      </div>
    </div>
  );
}
