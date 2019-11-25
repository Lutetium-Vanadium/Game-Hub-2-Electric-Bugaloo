import React, { useState, useEffect } from "react";

import { initBoxes, updateBoxes } from "./functions";
import Row from "./Row";

let renders = 1;

function Board(props) {
    const [boxes, setBoxes] = useState(
        initBoxes(props.width, props.height, props.numAlive)
    );
    const [boxSize, setBoxSize] = useState(0);
    const [intervalInstances, setIntervalInstances] = useState([]);
    const [update, setUpdate] = useState(0);
    const [pause, setPause] = useState(false);
    const [mounted, setMounted] = useState(false);

    const reset = () => {
        renders = 1;
        clearAllIntervals();
        setUpdate((update + 1) % 10);
        setBoxes(initBoxes(props.width, props.height, props.numAlive));
        setPause(false);
        setMounted(false);
    };

    const pauseClick = () => {
        if (pause) {
            setUpdate(update + 1);
        } else {
            clearAllIntervals();
        }
        setPause(!pause);
    };

    const clearAllIntervals = () => {
        for (let i = 0; i < intervalInstances.length; i++) {
            clearInterval(intervalInstances[0]);
        }
        setIntervalInstances([]);
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
        let interval = setInterval(() => {
            setBoxes(updateBoxes(boxes));
            renders += 1;
        }, 500 / props.speed);
        setIntervalInstances([...intervalInstances, interval]);
        setMounted(true);
        // eslint-disable-next-line
    }, [update]);

    useEffect(() => {
        if (mounted) {
            reset();
        }
        // eslint-disable-next-line
    }, [props.speed, props.width, props.height, props.numAlive]);

    useEffect(() => {
        if (props.backToHome) {
            renders = 0;
            clearAllIntervals();
        }
        // eslint-disable-next-line
    }, [props.backToHome]);

    return (
        <div className="board">
            <div className="main-board">
                {boxes.map((item, i) => (
                    <Row key={`row${i}`} boxes={boxes[i]} size={boxSize} />
                ))}
            </div>
            <div className="footer">
                <button onClick={reset}>Reset</button>
                <p>Renders: {renders}</p>
                <button onClick={pauseClick}>
                    {pause ? "Unpause" : "Pause"}
                </button>
            </div>
        </div>
    );
}

export default Board;
