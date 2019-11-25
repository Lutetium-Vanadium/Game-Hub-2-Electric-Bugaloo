import React from "react";

export default function Row({ boxes, size }) {
    return (
        <div className="row">
            {boxes.map((isAlive, i) => (
                <div
                    key={`box${i}`}
                    style={{
                        backgroundColor: isAlive
                            ? "rgb(40, 90, 240)"
                            : "transparent",
                        height: size,
                        width: size,
                        transition: "background-color 200ms linear"
                    }}
                ></div>
            ))}
        </div>
    );
}
