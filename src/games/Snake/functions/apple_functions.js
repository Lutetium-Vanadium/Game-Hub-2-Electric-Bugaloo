import { WIDTH, HEIGHT } from "../constants";

export const generateApple = () => {
    let x = Math.floor(Math.random() * WIDTH);
    let y = Math.floor(Math.random() * HEIGHT);

    return [x, y];
};

export const appleEaten = (snake, apples) => {
    let eaten = -1;
    let [headX, headY] = snake[0];
    for (let i = 0; i < apples.length; i++) {
        if (headX === apples[i][0] && headY === apples[i][1]) {
            eaten = i;
            break;
        }
    }

    return eaten;
};
