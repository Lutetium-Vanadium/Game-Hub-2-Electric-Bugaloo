import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { keys, WIDTH, HEIGHT, FPS, BLOCK_SIZE } from "./constants";

import "styles/snake/snake.css";

let startX = Math.floor(WIDTH / 2);
let startY = Math.floor(HEIGHT / 2);

function Snake() {
    const [ctx, setCtx] = useState(null);
    const [velocity, setVelocity] = useState([1, 0]);
    const [updater, setUpdater] = useState(0);
    const [snake, setSnake] = useState(
        [startX, startY],
        [startX - 1, startY - 1],
        [startX - 2, startY - 1]
    );

    const exit = () => {
        // TODO add exit
        console.log("exit");
    };

    const restart = () => {
        setUpdater((updater + 1) % 10);
        setVelocity([1, 0]);
        setSnake(
            [startX, startY],
            [startX - 1, startY - 1],
            [startX - 2, startY - 1]
        );
    };

    const draw = snake => {
        console.log({ ctx });
        if (ctx === null) return;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        snake.forEach(block => {
            console.log({ block });
            ctx.fillRect(
                block[0] * BLOCK_SIZE,
                block[1] * BLOCK_SIZE,
                BLOCK_SIZE,
                BLOCK_SIZE
            );
        });
    };

    const frame = () => {
        let newX = (snake[0][0] + velocity[0]) % WIDTH;
        let newY = (snake[0][1] + velocity[1]) % HEIGHT;

        let newSnake = [...snake];

        for (let i = newSnake.length - 1; i > 0; i++) {
            newSnake[i] = newSnake[i - 1];
        }

        newSnake[0] = [newX, newY];

        setSnake(newSnake);
        draw(newSnake);
    };

    useEffect(() => {
        let canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d");
        setCtx(context);

        context.beginPath();
        context.fillStyle = "rgb(200, 200, 200)";

        draw(snake);

        document.addEventListener("keydown", keydown => {
            switch (keydown.keyCode) {
                case keys.UP:
                    setVelocity([0, -1]);
                    break;
                case keys.DOWN:
                    setVelocity([0, 1]);
                    break;
                case keys.RIGHT:
                    setVelocity([-1, 0]);
                    break;
                case keys.LEFT:
                    setVelocity([1, 0]);
                    break;
                default:
                    break;
            }
        });

        restart();
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            frame();
        }, 100000 / FPS);
        return () => {
            window.clearTimeout(timer);
        };
        // eslint-disable-next-line
    }, [updater, snake]);

    return (
        <div className="Snake">
            <canvas
                width={(9 * window.innerWidth) / 10}
                height={(9 * window.innerHeight) / 10}
                className="board"
            ></canvas>
            <button className="exit" onClick={exit}>
                Exit
            </button>
        </div>
    );
}

export default withRouter(Snake);
