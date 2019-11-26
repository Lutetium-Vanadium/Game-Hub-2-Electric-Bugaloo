import React, { useState, useEffect } from "react";

import {
    initBoxes,
    initBoxValues,
    revealZeros,
    revealAround,
    revealAll
} from "./functions";
import Row from "./Row";

function Board({ width, height, numBombs, resetter, dead, setDead }) {
    const [boxes, setBoxes] = useState(
        initBoxValues(initBoxes(width, height, numBombs))
    );
    const [boxSize, setBoxSize] = useState(0);

    const die = () => {
        setBoxes(revealAll(boxes));
        setDead(true);
    };

    const reset = () => {
        setBoxes(initBoxValues(initBoxes(width, height, numBombs)));
        setDead(false);
        let maxHeight = 0.9;
        let maxWidth = typeof window.orientation !== "undefined" ? 1 : 0.7;

        setBoxSize(
            height / width >
                (window.innerHeight * maxHeight) /
                    (window.innerWidth * maxWidth)
                ? (window.innerHeight * maxHeight) / height
                : (maxWidth * window.innerWidth) / width
        );
    };

    const openBox = (e, i, j) => {
        if (dead) return;
        e.preventDefault();
        let newBoxes = [...boxes];
        if (e.type === "click") {
            if (newBoxes[i][j].isOpen) {
                let [tempBoxes, dead] = revealAround(newBoxes, i, j);
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
                    newBoxes = revealZeros(newBoxes, i, j);
                } else {
                    newBoxes[i][j].isOpen = true;
                }
            }
        } else if (e.type === "contextmenu") {
            newBoxes[i][j].isFlag = !newBoxes[i][j].isFlag;
        }
        setBoxes(newBoxes);
    };

    useEffect(() => {
        let maxHeight = 0.9;
        let maxWidth = typeof window.orientation !== "undefined" ? 1 : 0.7;

        setBoxSize(
            height / width >
                (window.innerHeight * maxHeight) /
                    (window.innerWidth * maxWidth)
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
            <div className="main-board">
                {boxes.map((item, i) => (
                    <Row
                        key={`row${i}`}
                        openBox={openBox}
                        boxes={item}
                        size={boxSize}
                        row_num={i}
                        dead={dead}
                    />
                ))}
            </div>
        </div>
    );
}

export default Board;
