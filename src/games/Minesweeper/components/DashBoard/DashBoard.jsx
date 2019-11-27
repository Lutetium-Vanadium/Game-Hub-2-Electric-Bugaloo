import React, { useState } from "react";

export default function DashBoard({
    dead,
    win,
    setDimensions,
    setNumBombs,
    width,
    height,
    numBombs,
    restart
}) {
    const [values, setValues] = useState({ numBombs, width, height });

    const applyChanges = () => {
        setDimensions({ width: values.width, height: values.height });
        setNumBombs(values.numBombs);
        restart();
    };

    const onChange = e => {
        let newValues = { ...values };
        newValues[e.target.name] = e.target.value;
        setValues(newValues);
    };

    const changed =
        width !== values.width || height !== values.height || numBombs !== values.numBombs;

    return (
        <div className={`dashboard ${dead ? "dead" : ""} ${win ? "win" : ""}`}>
            <button
                className={`${dead ? "dead-button" : ""} ${win ? "win-button" : ""}`}
                onClick={restart}
            >
                Restart
            </button>
            <div>
                <p>Width: {values.width}</p>
                <input
                    type="range"
                    name="width"
                    value={values.width}
                    onChange={onChange}
                    min={5}
                    max={60}
                    className="rangeSlider"
                />
            </div>
            <div>
                <p>Height: {values.height}</p>
                <input
                    type="range"
                    name="height"
                    value={values.height}
                    onChange={onChange}
                    min={5}
                    max={50}
                    className="rangeSlider"
                />
            </div>
            <div>
                <p>Number of Bombs: {values.numBombs}</p>
                <input
                    type="range"
                    name="numBombs"
                    value={values.numBombs}
                    onChange={onChange}
                    min={10}
                    max={300}
                    className="rangeSlider"
                />
            </div>
            <button
                className={`apply-changes ${changed ? "" : "deactivated"} ${
                    dead ? "dead-button" : ""
                } ${win ? "win-button" : ""}`}
                onClick={changed ? applyChanges : null}
            >
                Apply Changes
            </button>
        </div>
    );
}
