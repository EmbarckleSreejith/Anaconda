import { Player, PlayerEvent } from "@lottiefiles/react-lottie-player";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

export const Home = () => {
  const [start, setStart] = useState(false);
  
  const startLottie = useRef(null);
  const handleStartButton = (e) => {
    setStart(true);
    startLottie.current.play();      
  };
  const navigate = useNavigate();
  return (
    <div className="home">
      <Player
        src="https://assets7.lottiefiles.com/packages/lf20_sbuqjgbj.json"
        className="lottie-home-snake"
        autoplay
        loop
        background="lightGreen"       
      />
      <div className={start ? "start-lottie-div" : "display-none"}>
        <Player
          src="https://assets2.lottiefiles.com/temp/lf20_JbbDjN.json"
          className="start-lottie"
          onEvent={(event) => {
            if (event === PlayerEvent.Complete) {
              navigate("/game");
            }
          }}
          ref={startLottie}
        />
      </div>
      <div className="start-game">
        <button className="start-buttom" onClick={(e) => handleStartButton(e)}>
          Start Game
        </button>
      </div>
    </div>
  );
};
