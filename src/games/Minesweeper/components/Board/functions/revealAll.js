const revealAll = boxes => {
    let newBoxes = [...boxes];

    newBoxes.forEach(row => {
        row.forEach(box => {
            box.isOpen = true;
            if (box.numAround === 0) {
                box.text = "";
            }
        });
    });

    return newBoxes;
};

export default revealAll;
