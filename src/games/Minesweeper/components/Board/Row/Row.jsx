import React from "react";

export default function Row({ openBox, boxes, size, row_num, dead }) {
    // const openBox = i => {
    //     console.log({ i, row_num });
    // };

    return (
        <div className="row">
            {boxes.map(({ isOpen, isFlag, numAround, text }, i) => {
                let className;
                if (isOpen) {
                    className = numAround === -1 ? "bomb" : "";
                } else {
                    className = isFlag ? "flag-box" : "regular-box";
                }

                return (
                    <div
                        key={`box${i}`}
                        onClick={e => openBox(e, row_num, i)}
                        onContextMenu={e => openBox(e, row_num, i)}
                        style={{
                            height: (8.5 * size) / 10,
                            width: (8.5 * size) / 10,
                            margin: (3.5 * size) / 40,
                            borderRadius: (3.5 * size) / 40,
                            fontSize: size / 2
                            // background: numAround === -1 ? "red" : ""
                        }}
                        className={`${className} ${dead ? "dead" : ""}`}
                    >
                        {isOpen ? text : ""}
                    </div>
                );
            })}
        </div>
    );
}
