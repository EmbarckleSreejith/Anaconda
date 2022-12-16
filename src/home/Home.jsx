import { Player, PlayerEvent } from "@lottiefiles/react-lottie-player";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";

import "./styles.scss";

export const Home = () => {
  const [start, setStart] = useState(false);
  const [open,setOpen] = useState(false);
  const startLottie = useRef(null);
  const [isMultiPlayer,setIsMultiPlayer] = useState(false);

  const navigate = useNavigate();

  const handleSinglePlayer = () => {
    setIsMultiPlayer(false)
    setStart(true);
    startLottie.current.play();      
  };
  const handleMultiplayer = () =>{
    // setIsMultiPlayer(true)
    // setStart(false);
    // startLottie.current.play();   
    navigate('/form');
  }
  const handleOpen =()=>{
    setOpen(true);
  }
  const handleClose=()=>{    
    setOpen(false);
  }
  return (
    <div className="home">
      <Player
        src="https://assets7.lottiefiles.com/packages/lf20_sbuqjgbj.json"
        className="lottie-home-snake"
        autoplay
        loop
        background="lightGreen"       
      />
      <div className={start ? "start-lottie-div" : "display-none" }>
        <Player
          src="https://assets2.lottiefiles.com/temp/lf20_JbbDjN.json"
          className="start-lottie"
          onEvent={(event) => {
            if (event === PlayerEvent.Complete) {
              navigate("/game",{state:isMultiPlayer});
            }
          }}
          ref={startLottie}
        />
      </div>
      <div className="start-game">
        <button className="start-buttom" onClick={handleOpen}>
          Start Game
        </button>
      </div>

       {/* ****************modal************** */}


      <div className={open ?"modal-box": "display-none"} >
        <div className="cross-box">
          <IoCloseOutline onClick={handleClose} />
        </div>
        <div className="dialouge-box-container">
          <div className="dialouge-box">
            <button className="button-single" onClick={handleSinglePlayer}>Single Player</button>
            <button className="button-multy" onClick={handleMultiplayer} >Multi Player</button>
          </div>
        </div>
      </div>
    </div>
  );
};
