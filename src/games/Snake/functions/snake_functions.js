const commitLivent = snake => {
    const [headX, headY] = snake[0];

    for (let i = 1; i < snake.length; i++) {
        if (snake[i][0] === headX && snake[i][1] === headY) {
            return true;
        }
    }

    return false;
};

export default commitLivent;
