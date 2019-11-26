import { revealZeros } from ".";

const revealAround = (boxes, i, j) => {
    let newBoxes = [...boxes];
    let dead = false;

    if (i > 0 && j > 0 && newBoxes[i - 1][j - 1].isFlag === false) {
        newBoxes[i - 1][j - 1].isOpen = true;
        if (newBoxes[i - 1][j - 1].numAround === -1) {
            dead = true;
        }
        if (newBoxes[i - 1][j - 1].numAround === 0) {
            newBoxes = revealZeros(newBoxes, i - 1, j - 1);
        }
    }

    if (i > 0 && newBoxes[i - 1][j].isFlag === false) {
        newBoxes[i - 1][j].isOpen = true;
        if (newBoxes[i - 1][j].numAround === -1) {
            dead = true;
        }
        if (newBoxes[i - 1][j].numAround === 0) {
            newBoxes = revealZeros(newBoxes, i - 1, j);
        }
    }

    if (
        i > 0 &&
        j < newBoxes[i].length - 1 &&
        newBoxes[i - 1][j + 1].isFlag === false
    ) {
        newBoxes[i - 1][j + 1].isOpen = true;
        if (newBoxes[i - 1][j + 1].numAround === -1) {
            dead = true;
        }
        if (newBoxes[i - 1][j + 1].numAround === 0) {
            newBoxes = revealZeros(newBoxes, i - 1, j + 1);
        }
    }

    if (j > 0 && newBoxes[i][j - 1].isFlag === false) {
        newBoxes[i][j - 1].isOpen = true;
        if (newBoxes[i][j - 1].numAround === -1) {
            dead = true;
        }
        if (newBoxes[i][j - 1].numAround === 0) {
            newBoxes = revealZeros(newBoxes, i, j - 1);
        }
    }

    if (j < newBoxes[i].length - 1 && newBoxes[i][j + 1].isFlag === false) {
        newBoxes[i][j + 1].isOpen = true;
        if (newBoxes[i][j + 1].numAround === -1) {
            dead = true;
        }
        if (newBoxes[i][j + 1].numAround === 0) {
            newBoxes = revealZeros(newBoxes, i, j + 1);
        }
    }

    if (
        i < newBoxes.length - 1 &&
        j > 0 &&
        newBoxes[i + 1][j - 1].isFlag === false
    ) {
        newBoxes[i + 1][j - 1].isOpen = true;
        if (newBoxes[i + 1][j - 1].numAround === -1) {
            dead = true;
        }
        if (newBoxes[i + 1][j - 1].numAround === 0) {
            newBoxes = revealZeros(newBoxes, i + 1, j - 1);
        }
    }

    if (i < newBoxes.length - 1 && newBoxes[i + 1][j].isFlag === false) {
        newBoxes[i + 1][j].isOpen = true;
        if (newBoxes[i + 1][j].numAround === -1) {
            dead = true;
        }
        if (newBoxes[i + 1][j].numAround === 0) {
            newBoxes = revealZeros(newBoxes, i + 1, j);
        }
    }

    if (
        i < newBoxes.length - 1 &&
        j < newBoxes[i].length - 1 &&
        newBoxes[i + 1][j + 1].isFlag === false
    ) {
        newBoxes[i + 1][j + 1].isOpen = true;
        if (newBoxes[i + 1][j + 1].numAround === -1) {
            dead = true;
        }
        if (newBoxes[i + 1][j + 1].numAround === 0) {
            newBoxes = revealZeros(newBoxes, i + 1, j + 1);
        }
    }

    return [newBoxes, dead];
};

export default revealAround;
