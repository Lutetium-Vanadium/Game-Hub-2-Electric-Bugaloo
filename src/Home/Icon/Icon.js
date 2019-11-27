import React from "react";

export default function Icon({ onClick, style, id, title, name = null }) {
    return (
        <button
            id={id}
            style={style}
            title={title}
            onClick={onClick}
            className="icon"
        >
            <div title={title}>
                <img
                    src={require(`pictures/${id}Icon.png`)}
                    alt={id}
                    className="iconImg"
                    title={title}
                />
                <p className="iconName" title={title}>
                    {name || id}
                </p>
            </div>
        </button>
    );
}
