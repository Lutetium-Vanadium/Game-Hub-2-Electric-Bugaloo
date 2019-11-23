import React from "react";
import { withRouter } from "react-router-dom";

import Icon from "./icons";

import "styles/home/home.css";
import "styles/animations/animations.css";

function Home({ history }) {
    const goToApp = e => {
        let location = e.target.title;
        history.push(location);
    };

    return (
        <div className={`home`}>
            <h1 className="head">GameHub</h1>
            <div className="row">
                {games.slice(0, 5).map(({ id, title, name }, i) => (
                    <Icon
                        key={`game-${i}-${id}`}
                        onClick={goToApp}
                        id={id}
                        title={title}
                        name={name || id}
                    />
                ))}
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
    { id: "TicTacToe", title: "/TicTacToe" },
    { id: "GameOfLife", title: "/GameOfLife", name: "Game of Life" },
    { id: "Snake", title: "/Snake" }
];
