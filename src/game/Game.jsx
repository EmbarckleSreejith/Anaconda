import { useContext, useEffect, useRef, useState } from "react";
import { Food } from "./food";
import { Snake1, Snake2 } from "./snake";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.scss";
import { useStore } from "../store/Store";
export const Game = () => {
  const [snake1, setSnake1] = useState([
    [0, 0],
    [0, 2],
    [0, 4],
  ]);
  const [snake2, setSnake2] = useState([
    [98, 94],
    [98, 96],
    [98, 98],
  ]);
  const [play, setPlay] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [speed, setSpeed] = useState(500);
  const [timeoutId, setTimeoutId] = useState(0);
  
  const increaseBy = 2;
  
  // ++++++++++ Food ++++++++++ //
  const randomFood = () => {
    setSpeed(speed - 2);
    const x = Math.floor((Math.random() * 98) / 2) * 2;
    const y = Math.floor((Math.random() * 98) / 2) * 2;
    return [x, y];
  };
  const [food, setFood] = useState(randomFood);
  const currentDirection = useRef("Right");
  const nextDirection = useRef("Right");

  // ++++++++ Snake ++++++++ //
  // Direction//
  useEffect(() => {
    const onKeyDown = (e) => {
      switch (e.keyCode) {
        case 39: {
          if (!["Right", "Left"].includes(currentDirection.current)) {
            nextDirection.current = "Right";
          }
          break;
        }
        case 37: {
          if (!["Right", "Left"].includes(currentDirection.current)) {
            nextDirection.current = "Left";
          }
          break;
        }
        case 40: {
          if (!["Down", "Up"].includes(currentDirection.current)) {
            nextDirection.current = "Down";
          }
          break;
        }
        case 38: {
          if (!["Down", "Up"].includes(currentDirection.current)) {
            nextDirection.current = "Up";
          }
          break;
        }
        default:
          break;
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // snake move //

  const snakeMove = (snake) => {
    let dots = [...snake];
    let head = dots[dots.length - 1];
    switch (nextDirection.current) {
      case "Right":
        if (head[1] > 96) {
          head = [head[0], 0];
        } else {
          head = [head[0], head[1] + increaseBy];
        }
        break;
      case "Left":
        if (head[1] <= 0) {
          head = [head[0], 98];
        } else {
          head = [head[0], head[1] - increaseBy];
        }
        break;
      case "Up":
        if (head[0] <= 0) {
          head = [98, head[1]];
        } else {
          head = [head[0] - increaseBy, head[1]];
        }
        break;
      case "Down":
        if (head[0] >= 98) {
          head = [-increaseBy, head[1]];
        } else {
          head = [head[0] + increaseBy, head[1]];
        }
        break;
      default:
        break;
    }

    if (
      snake.find((oldDot) => oldDot[0] === head[0] && oldDot[1] === head[1])
    ) {
      gameOver();
    } else {
      dots.push(head);
      head[0] === food[0] && head[1] === food[1]
        ? setFood(randomFood())
        : dots.shift();
      setSnake1([...dots]);
      currentDirection.current = nextDirection.current;
    }
  };

  //Game Over //
  const gameOver = () => {
    alert("gameOver");
    navigate("/");
  };

  useEffect(() => {
    if (!play) {      
      clearTimeout(timeoutId);     
      setTimeoutId(setTimeout(() => snakeMove(snake1), speed));
    }   
  }, [snake1, play]);

  

  return (
    <div className="game">
      <div className="game-box">
        <Snake1 snake={snake1} />
        {location.state ? <Snake2 snake={snake2}/> :null}
        <Food food={food} />
      </div>
      <div className="controlers">
        <button className="play-button" onClick={() => setPlay(!play)}>
          Pause
        </button>
      </div>
    </div>
  );
};
