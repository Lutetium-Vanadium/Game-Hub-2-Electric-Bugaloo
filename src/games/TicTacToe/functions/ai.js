const randint = (start, stop) => {
    return start + Math.round(Math.random() * stop);
};

const choice = array => {
    return array[Math.floor(Math.random() * array.length)];
};

const getWin = (player, boxes) => {
    for (let i = 0; i < 9; i += 3) {
        if (
            boxes[i] === player &&
            boxes[i + 1] === player &&
            boxes[i + 2] === -1
        ) {
            return i + 2;
        }
        if (
            boxes[i] === player &&
            boxes[i + 2] === player &&
            boxes[i + 1] === -1
        ) {
            return i + 1;
        }
        if (
            boxes[i + 2] === player &&
            boxes[i + 1] === player &&
            boxes[i] === -1
        ) {
            return i;
        }
    }

    for (let i = 0; i < 3; i++) {
        if (
            boxes[i] === player &&
            boxes[i + 3] === player &&
            boxes[i + 6] === -1
        ) {
            return i + 6;
        }
        if (
            boxes[i] === player &&
            boxes[i + 6] === player &&
            boxes[i + 3] === -1
        ) {
            return i + 3;
        }
        if (
            boxes[i + 6] === player &&
            boxes[i + 3] === player &&
            boxes[i] === -1
        ) {
            return i;
        }
    }

    if (boxes[0] === player && boxes[4] === player && boxes[8] === -1) {
        return 8;
    }
    if (boxes[0] === player && boxes[8] === player && boxes[4] === -1) {
        return 4;
    }
    if (boxes[4] === player && boxes[8] === player && boxes[0] === -1) {
        return 0;
    }

    if (boxes[2] === player && boxes[4] === player && boxes[6] === -1) {
        return 6;
    }
    if (boxes[2] === player && boxes[6] === player && boxes[4] === -1) {
        return 4;
    }
    if (boxes[4] === player && boxes[6] === player && boxes[2] === -1) {
        return 2;
    }

    return -1;
};

export default (boxes, hardness) => {
    // seeing if bot can win
    let winBox = getWin(2, boxes);
    if (winBox !== -1) {
        return winBox;
    }

    //seeing if player can win
    winBox = getWin(1, boxes);
    if (winBox !== -1) {
        return winBox;
    }

    let edge_list = [];
    let corner_list = [];

    if (boxes[4] === -1) {
        return 4;
    }

    for (let i = 1; i < 8; i += 2) {
        if (boxes[i] === -1) {
            edge_list.push(i);
        }
    }

    [0, 2, 6, 8].forEach(i => {
        if (boxes[i] === -1) {
            corner_list.push(i);
        }
    });

    let rand = randint(0, 99);
    rand %= 2;

    if ((hardness === 2 && rand === 1) || hardness === 3) {
        console.log("T1");
        if (
            ((boxes[1] === boxes[6]) === 1 || (boxes[2] === boxes[3]) === 1) &&
            boxes[0] === -1
        ) {
            return 0;
        }
        if (
            ((boxes[0] === boxes[5]) === 1 || (boxes[1] === boxes[8]) === 1) &&
            boxes[2] === -1
        ) {
            return 2;
        }
        if (
            ((boxes[0] === boxes[7]) === 1 || (boxes[5] === boxes[8]) === 1) &&
            boxes[6] === -1
        ) {
            return 6;
        }
        if (
            ((boxes[2] === boxes[7]) === 1 || (boxes[5] === boxes[6]) === 1) &&
            boxes[8] === -1
        ) {
            return 8;
        }
    }

    if ((hardness === 2 && rand === 0) || hardness === 3) {
        console.log("T2");
        if ((boxes[1] === boxes[3]) === 1 && boxes[0] === -1) {
            return 0;
        }
        if ((boxes[1] === boxes[5]) === 1 && boxes[2] === -1) {
            return 2;
        }
        if ((boxes[3] === boxes[7]) === 1 && boxes[6] === -1) {
            return 6;
        }
        if ((boxes[5] === boxes[7]) === 1 && boxes[8] === -1) {
            return 8;
        }
    }

    console.log("hello");

    if (boxes[4] !== 1) {
        if (edge_list.length) {
            return choice(edge_list);
        }
        if (corner_list.length) {
            return choice(corner_list);
        }
    } else {
        if (corner_list.length) {
            return choice(corner_list);
        }
        if (edge_list.length) {
            return choice(edge_list);
        }
    }
};
