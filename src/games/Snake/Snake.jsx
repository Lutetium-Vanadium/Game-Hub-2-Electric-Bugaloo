import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
    keys,
    WIDTH,
    HEIGHT,
    FPS,
    BLOCK_SIZE,
    INITIAL_SNAKE,
    PADDING,
    GRID_BLOCK_SIZE
} from "./constants";
import { generateApple, appleEaten, commitLivent } from "./functions";

import "styles/snake/snake.css";

let apples = [generateApple()];

function Snake() {
    const [ctx, setCtx] = useState(null);
    const [velocity, setVelocity] = useState([1, 0]);
    const [updater, setUpdater] = useState(0);
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [paused, setPaused] = useState(false);
    const [alive, setAlive] = useState(true);

    const restart = () => {
        setAlive(true);
        setUpdater((updater + 1) % 10);
        setVelocity([1, 0]);
        setSnake(INITIAL_SNAKE);
    };

    const draw = (array, isApple, context = null) => {
        if (context === null) context = ctx;

        context.fillStyle = isApple ? "rgb(255, 0, 0)" : "rgb(240, 240, 240)";

        array.forEach(block => {
            context.fillRect(
                block[0] * GRID_BLOCK_SIZE + PADDING,
                block[1] * GRID_BLOCK_SIZE + PADDING,
                BLOCK_SIZE,
                BLOCK_SIZE
            );
        });
    };

    const frame = () => {
        let newX = (snake[0][0] + velocity[0] + WIDTH) % WIDTH;
        let newY = (snake[0][1] + velocity[1] + HEIGHT) % HEIGHT;

        let newSnake = [...snake];

        for (let i = newSnake.length - 1; i > 0 && i < 50; i--) {
            newSnake[i] = newSnake[i - 1];
        }

        newSnake[0] = [newX, newY];
        setSnake(newSnake);

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        draw(apples, true);
        draw(newSnake);

        const apple = appleEaten(snake, apples);
        if (apple >= 0) {
            let newApples = [...apples];
            newApples[apple] = generateApple();
            if (snake.length % 10 === 0) {
                newApples = [...newApples, generateApple()];
            }

            console.log({ newApples });

            setSnake([...snake, snake[snake.length - 1]]);
            apples = newApples;
        }

        if (commitLivent(snake)) {
            setAlive(false);
        }
    };

    const keydownHandler = keydown => {
        switch (keydown.keyCode) {
            case keys.UP:
                setVelocity([0, -1]);
                break;
            case keys.DOWN:
                setVelocity([0, 1]);
                break;
            case keys.RIGHT:
                setVelocity([1, 0]);
                break;
            case keys.LEFT:
                setVelocity([-1, 0]);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        let canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d");
        setCtx(context);

        context.beginPath();
        context.fillStyle = "rgb(240, 240, 240)";

        draw(snake, false, context);

        document.addEventListener("keydown", keydownHandler);

        return () => {
            document.removeEventListener("keydown", keydownHandler);
        };
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (ctx && !paused && alive) {
            const timer = setTimeout(() => {
                frame();
            }, 1000 / FPS);
            return () => {
                window.clearTimeout(timer);
            };
        }
        // eslint-disable-next-line
    }, [snake, ctx, paused, alive]);

    return (
        <div className="Snake">
            <canvas
                width={(8 * window.innerWidth) / 10}
                height={window.innerHeight}
                className="board"
            ></canvas>
            <div className="sidebar" id={!alive ? "dead" : ""}>
                <button
                    onClick={alive ? () => setPaused(!paused) : null}
                    className={!alive ? "deactivated" : ""}
                >
                    {paused ? "Unpause" : "pause"}
                </button>
                <button
                    onClick={restart}
                    className={`restart ${!alive ? "dead" : ""}`}
                >
                    Restart
                </button>
                <Link className="exit" to="/">
                    Exit
                </Link>
            </div>
        </div>
    );
}

export default Snake;
