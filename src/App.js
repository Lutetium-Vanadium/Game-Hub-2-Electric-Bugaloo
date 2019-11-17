import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import { TicTacToe, GameOfLife, Snake } from "games";
import Home from "Home";

import "styles/App.css";

function App() {
    // use to control animations
    const [backToHome, setBackToHome] = useState(false);

    const returnToHome = () => {
        setBackToHome(true);
        setTimeout(() => {
            setBackToHome(false);
        }, 400);
    };

    return (
        <div className="App">
            <Switch>
                <Route
                    path="/TicTacToe"
                    render={() => <TicTacToe returnToHome={returnToHome} />}
                />
                <Route
                    path="/GameOfLife"
                    render={() => <GameOfLife returnToHome={returnToHome} />}
                />
                <Route path="/" component={Snake} />
            </Switch>
            {backToHome ? <Home backToHome={true} /> : null}
        </div>
    );
}

export default App;
