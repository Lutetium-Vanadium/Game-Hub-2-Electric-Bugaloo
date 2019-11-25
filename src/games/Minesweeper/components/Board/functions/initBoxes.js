export default (width, height, numBombs) => {
    // generating all the boxes
    let l = [];

    for (let i = 0; i < height; i++) {
        let innerL = [];
        for (let j = 0; j < width; j++) {
            innerL.push({ isOpen: false, isFlag: false, numAround: 0, text: "" });
        }
        l.push(innerL);
    }

    // generating random alive boxes
    let i = 0;
    while (i < numBombs) {
        let x = Math.floor(Math.random() * width);
        let y = Math.floor(Math.random() * height);
        if (!l[y][x].isBomb) {
            l[y][x].numAround = -1;
            i++;
        }
    }

    return l;
};
