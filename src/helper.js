/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */
const RED_SHADE = '#FF7276';

function vibrate(duration) {
    return navigator.vibrate(duration);
}
const makeBlackWhite = (box) => {
    var current_row = Number(box.getAttribute('row'));
    var current_col = Number(box.getAttribute('col'));
    // if addtion of row and col is even then make the background black
    if ((current_row + current_col) % 2 == 0) {
        box.style.backgroundColor = "#837E7E";
        // full opacity 
    } else {
        box.style.backgroundColor = "black";
        // full opacity 
    }
}


const updateBoxValues = (row, col, selected_places, total_cols, total_rows) => {

    for (var i = 0; i < total_rows; i++) {
        selected_places[i][col] = true;
    }
    for (var i = 0; i < total_cols; i++) {
        selected_places[row][i] = true;
    }
    // update all diagonals selected
    var x = row;
    var y = col;
    while (x >= 0 && y >= 0) {
        selected_places[x][y] = true;
        x--;
        y--;
    }
    x = row;
    y = col;
    while (x < total_rows && y >= 0) {
        selected_places[x][y] = true;
        x++;
        y--;
    }
    x = row;
    y = col;
    while (x >= 0 && y < total_cols) {
        selected_places[x][y] = true;
        x--;
        y++;
    }
    x = row;
    y = col;
    while (x < total_rows && y < total_cols) {
        selected_places[x][y] = true;
        x++;
        y++;
    }
}

const turnAllBoxesAsRed = (boxes, selected_places) => {
    boxes.forEach((box) => {
        makeBlackWhite(box);
    })
    for (var i = 0; i < selected_places.length; i++) {
        // console.log(selected_places[i])
        for (var j = 0; j < selected_places[i].length; j++) {
            if (selected_places[i][j]) {
                boxes.forEach((box) => {
                    if (box.getAttribute("row") == i && box.getAttribute('col') == j) {
                        box.style.backgroundColor = RED_SHADE;
                    }
                })
            }
        }
    }
}

var updateColorsOfBoxes = (selected_location, boxes, selected_places, total_cols, total_rows) => {
    console.log(selected_places)
    if (selected_location.length > 0) {
        for (var i = 0; i < selected_location.length; i++) {
            updateBoxValues(selected_location[i][0], selected_location[i][1], selected_places, total_cols, total_rows)
        }
    } else {
        boxes.forEach((box) => {
            makeBlackWhite(box);
        })
    }

}

export { updateColorsOfBoxes, turnAllBoxesAsRed, vibrate };

