const revealZeros = (boxes, i, j) => {
    let size = [boxes.length, boxes[0].length];
    let newBoxes = [...boxes];
    let queue = [[i, j]];

    newBoxes[i][j].text = "";
    newBoxes[i][j].isOpen = true;
    let check = false;

    while (queue.length > 0) {
        let [x, y] = queue.pop(0);
        if (newBoxes[x][y].text === "" && check) {
            continue;
        }

        if (x > 0) {
            newBoxes[x - 1][y].isOpen = true;
            if (newBoxes[x - 1][y].numAround === 0) {
                queue.push([x - 1, y]);
            }
        }

        if (y > 0) {
            newBoxes[x][y - 1].isOpen = true;
            if (newBoxes[x][y - 1].numAround === 0) {
                queue.push([x, y - 1]);
            }
        }

        if (x < size[0] - 1) {
            newBoxes[x + 1][y].isOpen = true;
            if (newBoxes[x + 1][y].numAround === 0) {
                queue.push([x + 1, y]);
            }
        }

        if (y < size[1] - 1) {
            newBoxes[x][y + 1].isOpen = true;
            if (newBoxes[x][y + 1].numAround === 0) {
                queue.push([x, y + 1]);
            }
        }

        if (x < size[0] - 1 && y < size[1] - 1) {
            newBoxes[x + 1][y + 1].isOpen = true;
            if (newBoxes[x + 1][y + 1].numAround === 0) {
                queue.push([x + 1, y + 1]);
            }
        }

        if (x < size[0] - 1 && y > 0) {
            newBoxes[x + 1][y - 1].isOpen = true;
            if (newBoxes[x + 1][y - 1].numAround === 0) {
                queue.push([x + 1, y - 1]);
            }
        }

        if (x > 0 && y < size[1] - 1) {
            newBoxes[x - 1][y + 1].isOpen = true;
            if (newBoxes[x - 1][y + 1].numAround === 0) {
                queue.push([x - 1, y + 1]);
            }
        }

        if (x > 0 && y > 0) {
            newBoxes[x - 1][y - 1].isOpen = true;
            if (newBoxes[x - 1][y - 1].numAround === 0) {
                queue.push([x - 1, y - 1]);
            }
        }

        newBoxes[x][y].text = "";
        check = true;
    }

    return newBoxes;
};

export default revealZeros;
