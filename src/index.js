/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-loop-statement */
const CHESS_BOARD = document.getElementById('board');
console.log(CHESS_BOARD);
const RED_SHADE = '#EA3C52';
const SELECTED_BOXES = 8;
const TOTAL_BOXES = SELECTED_BOXES * SELECTED_BOXES;

/* create a board on html */
const createBoard = (SELECTED_BOXES) => {
    for (let i = 0; i < SELECTED_BOXES; i++) {
        for (let j = 0; j < SELECTED_BOXES; j++) {
            const BOX = document.createElement('div');
            BOX.className = 'box';
            BOX.style.backgroundColor = 'black';
            /* if the row and col addition is even then make the background black */
            if ((i + j) % 2 === 0) {
                BOX.style.backgroundColor = 'white';
            }
            BOX.style.gridColumn = j + 1;
            BOX.style.gridRow = i + 1;
            BOX.title = i + 1 + ',' + Number(j + 1);
            BOX.setAttribute('selected', 'false');
            BOX.setAttribute('row', Number(i));
            BOX.setAttribute('col', j);
            CHESS_BOARD.appendChild(BOX);
        }
    }
}
createBoard(SELECTED_BOXES);
