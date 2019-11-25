import React, { useState } from "react";
import { Link } from "react-router-dom";

import { init, checkForWin, ai } from "./functions";

import "styles/tictactoe/tictactoe.css";

function TicTacToe() {
    const [boxes, setBoxes] = useState(init());
    const [hardness, setHardness] = useState(1);
    const [singlePlayer, setSinglePlayer] = useState(true);
    const [turn, setTurn] = useState(1);
    const [won, setWon] = useState(-1);

    const reset = () => {
        setBoxes(init());
        setTurn(1);
        setWon(-1);
    };

    const handleClick = i => {
        if (won > 0 || boxes[i] > 0 || turn > 9) {
            return;
        }

        let tempBoxes = [...boxes];
        tempBoxes[i] = ((turn + 1) % 2) + 1;

        let winner = checkForWin(tempBoxes, 1) ? 1 : won;

        if (singlePlayer && winner !== 1) {
            let move = ai(tempBoxes, hardness);
            tempBoxes[move] = 2;
            setTurn(turn + 2);
        } else {
            let newTurn = turn + 1;
            setTurn(newTurn);
        }

        setBoxes(tempBoxes);

        winner = checkForWin(tempBoxes, 2) ? 2 : winner;
        setWon(winner);
    };

    const changeHardness = difficulty => {
        reset();
        setHardness(difficulty);
    };

    const changePlayerMode = () => {
        reset();
        setSinglePlayer(!singlePlayer);
    };

    return (
        <div className="tictactoe">
            <div className="dashboard">
                <button className="main" onClick={changePlayerMode}>
                    {singlePlayer ? "Two player" : "Single Player"}
                </button>
                <button
                    className={singlePlayer ? "easy" : "deactivated"}
                    id={hardness === 1 ? "selected" : ""}
                    onClick={() => changeHardness(1)}
                >
                    Easy
                </button>
                <button
                    className={singlePlayer ? "medium" : "deactivated"}
                    id={hardness === 2 ? "selected" : ""}
                    onClick={() => changeHardness(2)}
                >
                    Medium
                </button>
                <button
                    className={singlePlayer ? "hard" : "deactivated"}
                    id={hardness === 3 ? "selected" : ""}
                    onClick={() => changeHardness(3)}
                >
                    Hard
                </button>
                <p>Changing difficulty will restart the board</p>
            </div>
            <div className="main">
                <p>TicTacToe</p>
                <div className="grid">
                    {boxes.map((owner, i) => (
                        <Box
                            key={i}
                            owner={owner}
                            i={i}
                            handleClick={handleClick}
                            hardness={singlePlayer ? hardness : -1}
                        />
                    ))}
                </div>
                <p style={{ opacity: won > 0 ? 1 : 0 }}>
                    Player {won} is the winner
                </p>
            </div>
            <div className="side">
                <h3
                    style={{
                        opacity: singlePlayer ? 1 : 0,
                        color:
                            hardness === 1
                                ? "green"
                                : hardness === 2
                                ? "orange"
                                : "red"
                    }}
                >
                    Difficulty:{" "}
                    {hardness === 1
                        ? "easy"
                        : hardness === 2
                        ? "medium"
                        : "hard"}
                </h3>
                <button className="reset" onClick={reset}>
                    Reset
                </button>
                <Link to="/" className="exit">
                    Exit
                </Link>
            </div>
        </div>
    );
}

export default TicTacToe;

function Box({ owner, i, handleClick, hardness }) {
    const onClick = () => {
        handleClick(i);
    };

    const text = owner === -1 ? "" : owner === 1 ? "o" : "x";

    let secondaryColor = "red";
    if (hardness === 1) {
        secondaryColor = "green";
    } else if (hardness === 2) {
        secondaryColor = "orange";
    }

    return (
        <div onClick={onClick}>
            <p style={{ color: owner === 1 ? "blue" : secondaryColor }}>
                {text}
            </p>
        </div>
    );
}
