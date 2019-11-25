import React, { useState } from "react";

import "styles/hamburger.css";

const isMobile = typeof window.orientation !== "undefined";

function DashBoard({
    height,
    numAlive,
    speed,
    width,
    setHeight,
    setNumAlive,
    setSpeed,
    setWidth
}) {
    const [values, setValues] = useState({ height, speed, width, numAlive });
    const [changed, setChanged] = useState(false);
    const [open, setOpen] = useState(!isMobile);

    const onChange = e => {
        let tempValues = { ...values };
        tempValues[e.target.name] = +e.target.value;
        setValues(tempValues);
        setChanged(true);
    };

    const restart = () => {
        setHeight(values.height);
        setNumAlive(values.numAlive);
        setSpeed(values.speed);
        setWidth(values.width);
        setChanged(false);
    };

    return (
        <div className="dashboard" style={{ height: open ? "100vh" : "20vw" }}>
            <div className="dashboard-head">
                {isMobile ? (
                    <div
                        className={`hamburger hamburger--collapse ${
                            open ? "is-active" : ""
                        }`}
                        onClick={() => setOpen(!open)}
                    >
                        <div className="hamburger-box">
                            <div className="hamburger-inner"></div>
                        </div>
                    </div>
                ) : null}
                <h2 style={{ marginBottom: 10 }}>Dash Board</h2>
            </div>
            <div style={{ display: open ? "flex" : "none" }} className="flex">
                <div>
                    <p>Height: {values.height}</p>
                    <input
                        type="range"
                        name="height"
                        value={values.height}
                        onChange={onChange}
                        min={5}
                        max={100}
                        className="rangeSlider"
                    />
                    <p>Num Alive: {values.numAlive}</p>
                    <input
                        type="range"
                        name="numAlive"
                        value={values.numAlive}
                        onChange={onChange}
                        min={10}
                        max={1000}
                        className="rangeSlider"
                    />
                    <p>Speed: {values.speed}</p>
                    <input
                        type="range"
                        name="speed"
                        value={values.speed}
                        onChange={onChange}
                        min={0.1}
                        max={3}
                        step={0.1}
                        className="rangeSlider"
                    />
                    <p>Width: {values.width}</p>
                    <input
                        type="range"
                        name="width"
                        value={values.width}
                        onChange={onChange}
                        min={9}
                        max={180}
                        className="rangeSlider"
                    />
                </div>
                <button
                    className="submit"
                    id={changed ? "" : "disabled"}
                    onClick={changed ? restart : null}
                >
                    Apply Changes
                </button>
            </div>
        </div>
    );
}

export default DashBoard;
