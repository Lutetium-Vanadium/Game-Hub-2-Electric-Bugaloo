export default (width, height, numAlive) => {
    // generating all the boxes
    let l = [];

    for (let i = 0; i < height; i++) {
        let innerL = [];
        for (let j = 0; j < width; j++) {
            innerL.push(false);
        }
        l.push(innerL);
    }

    // generating random alive boxes
    let i = 0;
    while (i < numAlive) {
        let x = Math.floor(Math.random() * width);
        let y = Math.floor(Math.random() * height);
        if (!l[y][x]) {
            l[y][x] = true;
            i++;
        }
    }

    return l;
};
