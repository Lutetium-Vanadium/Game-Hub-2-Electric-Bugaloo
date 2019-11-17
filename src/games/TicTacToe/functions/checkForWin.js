export default (owners, player) => {
    return (
        (owners[0] === player &&
            owners[1] === player &&
            owners[2] === player) ||
        (owners[3] === player &&
            owners[4] === player &&
            owners[5] === player) ||
        (owners[6] === player &&
            owners[7] === player &&
            owners[8] === player) ||
        (owners[0] === player &&
            owners[4] === player &&
            owners[8] === player) ||
        (owners[2] === player &&
            owners[4] === player &&
            owners[6] === player) ||
        (owners[0] === player &&
            owners[3] === player &&
            owners[6] === player) ||
        (owners[1] === player &&
            owners[4] === player &&
            owners[7] === player) ||
        (owners[2] === player && owners[5] === player && owners[8] === player)
    );
};
