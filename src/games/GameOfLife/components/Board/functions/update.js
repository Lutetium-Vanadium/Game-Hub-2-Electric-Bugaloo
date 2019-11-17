export default boxes => {
    let newBoxes = [...boxes];

    for (let i = 0; i < boxes.length; i++) {
        for (let j = 0; j < boxes[i].length; j++) {
            // getting number of alive neighbours
            let aliveNeighbours = 0;

            if (i > 0 && j > 0) {
                aliveNeighbours += boxes[i - 1][j - 1] ? 1 : 0;
            }

            if (i > 0) {
                aliveNeighbours += boxes[i - 1][j] ? 1 : 0;
            }

            if (j > 0) {
                aliveNeighbours += boxes[i][j - 1] ? 1 : 0;
            }

            if (i < boxes.length - 1 && j < boxes[i].length - 1) {
                aliveNeighbours += boxes[i + 1][j + 1] ? 1 : 0;
            }

            if (i < boxes.length - 1) {
                aliveNeighbours += boxes[i + 1][j] ? 1 : 0;
            }

            if (j < boxes[i].length - 1) {
                aliveNeighbours += boxes[i][j + 1] ? 1 : 0;
            }

            if (i < boxes.length - 1 && j > 0) {
                aliveNeighbours += boxes[i + 1][j - 1] ? 1 : 0;
            }

            if (i > 0 && j < boxes[i].length - 1) {
                aliveNeighbours += boxes[i - 1][j + 1] ? 1 : 0;
            }

            if (boxes[i][j]) {
                boxes[i][j] = aliveNeighbours === 2 || aliveNeighbours === 3;
            } else {
                boxes[i][j] = aliveNeighbours === 3;
            }
        }
    }

    return newBoxes;
};
