import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Board, DashBoard } from "./components";

import "styles/minesweeper/minesweeper.css";

export default function Minesweeper() {
    const [dimensions, setDimensions] = useState({ width: 10, height: 10 });
    const [numBombs, setNumBombs] = useState(16);
    const [resetter, setResetter] = useState(0);
    const [dead, setDead] = useState(false);
    const [win, setWin] = useState(false);

    const restart = () => {
        setResetter(resetter + 1);
        setDead(false);
        setWin(false);
    };

    return (
        <div className="minesweeper">
            <Board
                {...dimensions}
                numBombs={numBombs}
                resetter={resetter}
                dead={dead}
                win={win}
                setDead={setDead}
                setWin={setWin}
            />
            <DashBoard
                setDimensions={setDimensions}
                setNumBombs={setNumBombs}
                numBombs={numBombs}
                {...dimensions}
                restart={restart}
                dead={dead}
                win={win}
            />
            <Link to="/" className="exit">
                Exit
            </Link>
        </div>
    );
}
