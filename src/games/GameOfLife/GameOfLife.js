import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import Board from "./components/Board";
import DashBoard from "./components/DashBoard";

import "styles/gameoflife/gameoflife.css";

function GameOfLIfe({ history }) {
    const [speed, setSpeed] = useState(1.5);
    const [numAlive, setNumAlive] = useState(132);
    const [width, setWidth] = useState(40);
    const [height, setHeight] = useState(25);
    const [backToHome, setBackToHome] = useState(false);

    const exit = () => {
        setBackToHome(true);
        history.push("/");
    };

    return (
        <div className="GameOfLife">
            <div className="main-page">
                <DashBoard
                    width={width}
                    height={height}
                    numAlive={numAlive}
                    speed={speed}
                    setWidth={setWidth}
                    setHeight={setHeight}
                    setNumAlive={setNumAlive}
                    setSpeed={setSpeed}
                />
                <Board
                    width={width}
                    height={height}
                    numAlive={numAlive}
                    speed={speed}
                    backToHome={backToHome}
                />
            </div>
            <button className="exit" onClick={exit}>
                Exit
            </button>
        </div>
    );
}

export default withRouter(GameOfLIfe);
