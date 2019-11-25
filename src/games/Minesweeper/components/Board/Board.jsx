import React, { useState, useEffect } from "react";

import {
    initBoxes,
    initBoxValues,
    revealZeros,
    revealAround,
    revealAll
} from "./functions";
import Row from "./Row";

function Board(props) {
    const [boxes, setBoxes] = useState(
        initBoxes(props.width, props.height, props.numBombs)
    );
    const [boxSize, setBoxSize] = useState(0);
    const [dead, setDead] = useState(false);

    const die = () => {
        setBoxes(revealAll(boxes));
        setDead(true);
    };

    const reset = () => {
        setBoxes(initBoxes(props.width, props.height, props.numBombs));
        setDead(false);
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
        let maxHeight = 0.8;
        let maxWidth = typeof window.orientation !== "undefined" ? 1 : 0.7;

        setBoxSize(
            props.height / props.width >
                (window.innerHeight * maxHeight) /
                    (window.innerWidth * maxWidth)
                ? (window.innerHeight * maxHeight) / props.height
                : (maxWidth * window.innerWidth) / props.width
        );

        setBoxes(initBoxValues(boxes));
        // eslint-disable-next-line
    }, []);

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
