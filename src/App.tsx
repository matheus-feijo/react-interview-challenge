import { useState } from "react";

interface IClick {
  x: number;
  y: number;
}

function App() {
  const [clicks, setClicks] = useState<IClick[]>([]);

  const handleClickScreen = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const clickFilter = clicks.filter((click) => {
      const { x, y } = click;

      if (Math.abs(x - e.pageX) > 20 || Math.abs(y - e.pageY) > 20) {
        return click;
      }

      return null;
    });

    if (clickFilter.length !== clicks.length) {
      setClicks(clickFilter);
      return;
    }

    setClicks([...clickFilter, { x: e.pageX, y: e.pageY }]);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "aliceblue",
      }}
      onClick={handleClickScreen}
    >
      {clicks.map((click, ind) => {
        return (
          <p key={ind}>
            X:{click.x} | Y:{click.y}
          </p>
        );
      })}

      {clicks.map((click, ind) => {
        return (
          <div
            key={ind}
            style={{
              backgroundColor: "red",
              position: "absolute",
              top: click.y,
              left: click.x,
              width: 15,
              height: 15,
              borderRadius: "999px",
            }}
          ></div>
        );
      })}
    </div>
  );
}

export default App;
