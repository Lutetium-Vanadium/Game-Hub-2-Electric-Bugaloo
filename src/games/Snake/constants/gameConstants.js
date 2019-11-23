const height = 64;

const size = window.innerHeight / height;

const width = Math.round((8 * window.innerWidth) / 10 / size);

const startX = Math.floor(width / 2);
const startY = Math.floor(height / 2);

export default {
    WIDTH: width,
    HEIGHT: height,
    FPS: 20,
    GRID_BLOCK_SIZE: size,
    INITIAL_SNAKE: [
        [startX, startY],
        [startX - 1, startY],
        [startX - 2, startY],
        [startX - 3, startY]
    ],
    PADDING: size / 20,
    BLOCK_SIZE: (9 * size) / 10
};
