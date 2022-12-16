import "./styles.scss";

export const Snake1 = ({ snake }) => {
  return (
    <div className="snake">
      {snake.map((dot, i) => {
        let style = {
          top: `${dot[0]}%`,
          left: `${dot[1]}%`,
        };
        return (
          <div className="snake-dot" key={`snakeDot1${i}`} style={style}></div>
        );
      })}
    </div>
  );
};

export const Snake2 = ({ snake }) => {
  return (
    <div className="snake">
      {snake.map((dot, i) => {
        let style = {
            top: `${dot[0]}%`,
            left: `${dot[1]}%`,
        };
        return <div className="snake-dot" style={style} key={`snakeDots2${i}`}></div>;
      })}
    </div>
  );
};
