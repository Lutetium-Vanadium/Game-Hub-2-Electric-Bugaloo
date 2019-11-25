const revealAll = boxes => {
    let newBoxes = [...boxes];

    console.log({ newBoxes });

    newBoxes.forEach(row => {
        row.forEach(box => {
            box.isOpen = true;
            if (box.numAround === 0) {
                box.text = "";
            }
        });
    });

    // for (const row in newBoxes) {
    //     console.log({ row });
    //     for (const box in row) {
    //         console.log({ box });

    //     }
    // }

    return newBoxes;
};

export default revealAll;
