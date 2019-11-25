import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Board, DashBoard } from "./components";

import "styles/minesweeper/minesweeper.css";

export default function Minesweeper() {
    const [dimensions, setDimensions] = useState({ width: 10, height: 10 });
    const [numBombs, setNumBombs] = useState(16);

    return (
        <div className="minesweeper">
            <Board {...dimensions} numBombs={numBombs} />
            <DashBoard
                setDimensions={setDimensions}
                setNumBombs={setNumBombs}
            />
            <Link to="/" className="exit">
                Exit
            </Link>
        </div>
    );
}
