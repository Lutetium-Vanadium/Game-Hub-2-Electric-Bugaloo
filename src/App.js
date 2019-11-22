import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { TicTacToe, GameOfLife } from "games";
import Home from "Home";

import "styles/App.css";

function App() {
    let location = useLocation();

    return (
        <TransitionGroup className="App">
            <CSSTransition
                key={location.key}
                classNames={
                    location.pathname === "/" ? "slide-right" : "slide-left"
                }
                timeout={700}
            >
                <Switch location={location}>
                    <Route path="/TicTacToe" component={TicTacToe} />
                    <Route path="/GameOfLife" component={GameOfLife} />
                    <Route path="/" component={Home} />
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    );
}

export default App;
