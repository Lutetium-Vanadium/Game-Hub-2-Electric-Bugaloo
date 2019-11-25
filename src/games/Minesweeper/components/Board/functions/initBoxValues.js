const initBoxValues = boxes => {
    const size = [boxes.length, boxes[0].length];
    let newBoxes = [...boxes];
    for (let i = 0; i < boxes.length; i++) {
        for (let j = 0; j < boxes[i].length; j++) {
            if (boxes[i][j].numAround !== -1) {
                let c = 0;
                if (
                    i < size[0] - 1 &&
                    j < size[1] - 1 &&
                    newBoxes[i + 1][j + 1].numAround === -1
                ) {
                    c += 1;
                }
                if (
                    i < size[0] - 1 &&
                    j > 0 &&
                    newBoxes[i + 1][j - 1].numAround === -1
                ) {
                    c += 1;
                }
                if (
                    i > 0 &&
                    j < size[1] - 1 &&
                    newBoxes[i - 1][j + 1].numAround === -1
                ) {
                    c += 1;
                }
                if (i > 0 && j > 0 && newBoxes[i - 1][j - 1].numAround === -1) {
                    c += 1;
                }
                if (i < size[0] - 1 && newBoxes[i + 1][j].numAround === -1) {
                    c += 1;
                }
                if (j < size[1] - 1 && newBoxes[i][j + 1].numAround === -1) {
                    c += 1;
                }
                if (i > 0 && newBoxes[i - 1][j].numAround === -1) {
                    c += 1;
                }
                if (j > 0 && newBoxes[i][j - 1].numAround === -1) {
                    c += 1;
                }

                newBoxes[i][j].numAround = c;
                newBoxes[i][j].text = c + "";
            }
        }
    }

    return newBoxes;
};

export default initBoxValues;
