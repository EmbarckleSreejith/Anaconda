import { useEffect, useState } from "react";
import { Food } from "./food";
import { Snake } from "./snake";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import { useCallback } from "react";
import { writeInFirebase } from '../firebase/config';
let move = false;
export const Game = () => {
  const [snake, setSnake] = useState([
    [0, 0],
    [0, 2],
    [0, 4],
  ]);
  const [play, setPlay] = useState(false);
  const navigate = useNavigate();
  const [speed, setSpeed] = useState(500);
  const [intervalId, setIntervalId] = useState(0);

  const increaseBy = 2;

  // ++++++++++ Food ++++++++++ //
  const randomFood = () => {
    setSpeed(speed - 2);
    const x = Math.floor((Math.random() * 98) / 2) * 2;
    const y = Math.floor((Math.random() * 98) / 2) * 2;
    return [x, y];
  };
  const [food, setFood] = useState(randomFood);
  const [direction, setDirection] = useState("Right");

  // ++++++++ Snake ++++++++ //
  // Direction//
  useEffect(() => {
    const onKeyDown = (e) => {      
      if (move) {
        move = false;
        switch (e.keyCode) {
          case 39: {
            if (!["Right", "Left"].includes(direction)) {
              setDirection("Right");
            }
            break;
          }
          case 37: {
            if (!["Right", "Left"].includes(direction)) {
              setDirection("Left");
            }
            break;
          }
          case 40: {
            if (!["Down", "Up"].includes(direction)) {
              setDirection("Down");
            }
            break;
          }
          case 38: {
            if (!["Down", "Up"].includes(direction)) {
              setDirection("Up");
            }
            break;
          }
          default:
            break;
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [direction]);

  // snake move //

  const snakeMove = useCallback(
    (snake) => {
      let dots = [...snake];
      let head = dots[dots.length - 1];
      switch (direction) {
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
      if (direction) {
        dots.push(head);
        head[0] === food[0] && head[1] === food[1]
          ? setFood(randomFood())
          : dots.shift();
        setSnake([...dots]);
      }
    },
    [direction]
  );

  //Game Over //
  const gameOver = () => {
    alert("gameOver");
    navigate("/");
    console.log("gameOver");
  };

  // checking collapse //
  const checkCollapse = () => {
    let dots = [...snake];
    let head = dots[dots.length - 1];
    dots.pop();
    dots.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        gameOver();
      }
    });
  };

  useEffect(() => {
    writeInFirebase();
    if (!play) {
      checkCollapse();
      clearTimeout(intervalId);
      move = true;
      setIntervalId(setTimeout(() => snakeMove(snake), speed));
    }
  }, [snake, play]);

  return (
    <div className="game">
      <div className="game-box">
        <Snake snake={snake} />
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
