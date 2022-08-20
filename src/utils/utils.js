const RED_SHADE = '#EA3C52'

function vibrate(duration) {
    if (navigator.vibrate) {
        navigator.vibrate(duration);
    }
}
const makeBlackWhite = (box) => {
    var current_row = Number(box.getAttribute('row'));
    var current_col = Number(box.getAttribute('col'));
    // if addtion of row and col is even then make the background black
    if ((current_row + current_col) % 2 == 0) {
        box.style.backgroundColor = "white";
        // full opacity
        box.style.opacity = "1";
    } else {
        box.style.backgroundColor = "black";
        // full opacity
        box.style.opacity = "1";
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
                        box.style.opacity = "0.5";
                    }
                })
            }
        }
    }
}
const winningMessage = (selected_location) => {
    // length of selected location is the score
    var total_score = document.getElementById("score");
    total_score.innerHTML = 8 - selected_location.length;
    // if the length of selected location is equal to 8;
    if (selected_location.length == 8) {
        // show the winning message
        var winning_message = document.getElementById("winning-message");
        winning_message.style.display = "block";
        winning_message.innerHTML = "🎊 you won! 🎊";

    }
}

const updateColorsOfBoxes = (selected_location, boxes, selected_places, total_cols, total_rows) => {
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
const resetAll = (boxes, selected_places, selected_location) => {
    boxes.forEach((box) => {
        box.setAttribute("selected", "false");
        box.innerHTML = "";
        makeBlackWhite(box);
        box.style.opacity = "1";
    })
    for (var i = 0; i < selected_places.length; i++) {
        selected_places[i] = [];
        for (var j = 0; j < selected_places[i].length; j++) {
            selected_places[i][j] = false;
        }
    }
    selected_location = [];
    var total_score = document.getElementById("score");
    total_score.innerHTML = "0";
    var winning_message = document.getElementById("winning-message");
    winning_message.style.display = "none";
}
export { vibrate, updateColorsOfBoxes, winningMessage, turnAllBoxesAsRed, updateBoxValues, resetAll, makeBlackWhite };

