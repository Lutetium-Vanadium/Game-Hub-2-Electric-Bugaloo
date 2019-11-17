import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import Icon from "./icons";

import "styles/home/home.css";
import "styles/animations/animations.css";

function Home({ history, backToHome = false }) {
    const [targetIndex, setTargetIndex] = useState(-1);
    const [styles, setStyles] = useState([]);
    const [animatedStyles, setAnimatedStyles] = useState([]);

    const goToApp = e => {
        // eslint-disable-next-line no-unused-vars
        let [index, location, _] = e.target.title.split(":");
        index = +index;
        setTargetIndex(index);

        setTimeout(() => {
            setTargetIndex(-1);
            history.push(location);
        }, 800);
    };

    useEffect(() => {
        const icons = document.querySelectorAll(".icon");
        let newStyles = [];
        let newAnimatedStyles = [];
        icons.forEach(icon => {
            let { left, top } = icon.getBoundingClientRect();
            // eslint-disable-next-line no-unused-vars
            let [_, __, bgColor] = icon.title.split(":");
            newStyles = [...newStyles, { left, top }];

            newAnimatedStyles = [
                ...newAnimatedStyles,
                {
                    left: 0,
                    top: 0,
                    backgroundColor: bgColor,
                    position: "absolute",
                    height: "100vh",
                    width: "100vw",
                    zIndex: 69
                }
            ];
        });
        setStyles(newStyles);
        setAnimatedStyles(newAnimatedStyles);
    }, []);

    return (
        <div className={`home ${backToHome ? "slide-in" : ""}`}>
            <h1 className="head">GameHub</h1>
            <div className="row">
                {games.slice(0, 5).map(({ id, title, name }, i) => (
                    <Icon
                        key={`game-${i}-${id}`}
                        onClick={goToApp}
                        style={
                            targetIndex === i ? animatedStyles[i] : styles[i]
                        }
                        innerClass={targetIndex === i ? "late-fade" : ""}
                        id={id}
                        title={title}
                        name={name || id}
                    />
                ))}
                <button className="icon">Temp</button>
                <button className="icon">Temp</button>
                <button className="icon">Temp</button>
            </div>
            <div className="row">
                <button className="icon">Temp</button>
                <button className="icon">Temp</button>
                <button className="icon">Temp</button>
                <button className="icon">Temp</button>
                <button className="icon">Temp</button>
            </div>
            <div className="foot">
                <p>More games will be added</p>
            </div>
        </div>
    );
}

export default withRouter(Home);

const games = [
    { id: "TicTacToe", title: "0:/TicTacToe:#191919" },
    { id: "GameOfLife", title: "1:/GameOfLife:#181C24", name: "Game of Life" }
];
