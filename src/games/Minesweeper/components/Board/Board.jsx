import React, { useState, useEffect } from "react";

import { initBoxes, initBoxValues, revealZeros, revealAround, revealAll } from "./functions";
import Row from "./Row";

function Board({ width, height, numBombs, resetter, dead, setDead, win, setWin }) {
    const [boxes, setBoxes] = useState(initBoxValues(initBoxes(width, height, numBombs)));
    const [boxSize, setBoxSize] = useState(0);
    const [boxesClicked, setBoxesClicked] = useState(0);
    const [flagged, setFlagged] = useState(0);

    const die = () => {
        setBoxes(revealAll(boxes));
        setDead(true);
    };

    const reset = () => {
        setBoxes(initBoxValues(initBoxes(width, height, numBombs)));
        setDead(false);
        setBoxesClicked(0);
        let maxHeight = 0.85;
        let maxWidth = typeof window.orientation !== "undefined" ? 1 : 0.7;

        setBoxSize(
            height / width > (window.innerHeight * maxHeight) / (window.innerWidth * maxWidth)
                ? (window.innerHeight * maxHeight) / height
                : (maxWidth * window.innerWidth) / width
        );
    };

    const openBox = (e, i, j) => {
        let newBoxesClicked = boxesClicked;
        if (dead) return;
        e.preventDefault();
        let newBoxes = [...boxes];
        if (e.type === "click" && newBoxes[i][j].isFlag === false) {
            if (newBoxes[i][j].isOpen) {
                let tempBoxes, dead;
                [tempBoxes, dead, newBoxesClicked] = revealAround(newBoxes, i, j);
                if (dead) {
                    die();
                    return;
                } else {
                    newBoxes = tempBoxes;
                }
            } else {
                if (newBoxes[i][j].numAround === -1) {
                    die();
                    return;
                } else if (newBoxes[i][j].numAround === 0) {
                    newBoxesClicked += 1;
                    [newBoxes, newBoxesClicked] = revealZeros(newBoxes, i, j);
                } else {
                    newBoxes[i][j].isOpen = true;
                    newBoxesClicked += 1;
                }
            }
        } else if (e.type === "contextmenu") {
            newBoxes[i][j].isFlag = !newBoxes[i][j].isFlag;
            if (newBoxes[i][j].isFlag) {
                newBoxesClicked += 1;
                setFlagged(flagged + 1);
            } else {
                newBoxesClicked -= 1;
                setFlagged(flagged - 1);
            }
        }
        if (newBoxesClicked === width * height) {
            setWin(true);
        }
        setBoxes(newBoxes);
        setBoxesClicked(newBoxesClicked);
    };

    useEffect(() => {
        let maxHeight = 0.85;
        let maxWidth = typeof window.orientation !== "undefined" ? 1 : 0.7;

        setBoxSize(
            height / width > (window.innerHeight * maxHeight) / (window.innerWidth * maxWidth)
                ? (window.innerHeight * maxHeight) / height
                : (maxWidth * window.innerWidth) / width
        );
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (resetter > 0) {
            reset();
        }
        // eslint-disable-next-line
    }, [resetter]);

    return (
        <div className="board">
            <div className="scoreboard">
                <p>Bombs Flagged: {flagged}</p>
                <p>Bombs Remaining: {numBombs - flagged}</p>
            </div>
            <div className="main-board">
                {boxes.map((item, i) => (
                    <Row
                        key={`row${i}`}
                        openBox={openBox}
                        boxes={item}
                        size={boxSize}
                        row_num={i}
                        dead={dead}
                        win={win}
                    />
                ))}
            </div>
        </div>
    );
}

export default Board;
