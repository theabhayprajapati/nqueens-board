
var board = document.getElementById("board");
const RED_SHADE = '#EA3C52'
var boxes = [];
var rows = [];
var cols = [];
var matrix = [];
var total_cols = 8;
var total_rows = 8;

var total_boxes = total_cols * total_rows;
// make a 2d array
for (var i = 0; i < total_rows; i++) {
    matrix[i] = [];
    for (var j = 0; j < total_cols; j++) {
        matrix[i][j] = j;
    }
}
console.log(matrix);
// create a board with 
for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
        var box = document.createElement("div");
        box.className = "box";
        box.style.backgroundColor = "black";
        // if the row and col addition is even then make the background black
        if ((i + j) % 2 == 0) {
            box.style.backgroundColor = "white";
        }
        box.style.gridColumn = j + 1;
        box.style.gridRow = i + 1;
        box.title = i + 1 + "," + Number(j + 1);
        box.setAttribute(
            "selected",
            "false"
        )
        box.setAttribute('row', Number(i));
        box.setAttribute('col', j);
        board.appendChild(box);
        boxes.push(box);
    }
}
// on click on any boxes add this
var selected_location = [];
var selected_places = [];
for (var i = 0; i < total_rows; i++) {
    selected_places[i] = [];
    for (var j = 0; j < total_cols; j++) {
        selected_places[i][j] = false;
    }
}
console.log(selected_places);
const updateColorsOfBoxes = () => {
    console.log('selected locatoin from colors boxes')
    console.log(selected_location);
    if (selected_location.length > 0) {
        console.log('making red.')
        for (var i = 0; i < selected_location.length; i++) {
            updateBoxValues(selected_location[i][0], selected_location[i][1])
        }
    } else {
        console.log("making all white")
        boxes.forEach((box) => {
            makeBlackWhite(box);
        })
    }

}
const makeBlackWhite = (box) => {
    console.log('making black white');
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
const updateBoxValues = (row, col) => {
    console.log(row, " ", col);
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
        console.log('working on diagonals')
    }
    x = row;
    y = col;
    while (x < total_rows && y >= 0) {
        selected_places[x][y] = true;
        x++;
        y--;
        console.log('working on diagonals')
    }
    x = row;
    y = col;
    while (x >= 0 && y < total_cols) {
        selected_places[x][y] = true;
        x--;
        y++;
        console.log('working on diagonals')
    }
    x = row;
    y = col;
    while (x < total_rows && y < total_cols) {
        selected_places[x][y] = true;
        x++;
        y++;
        console.log('working on diagonals')
    }
    console.log('selected_places');
    console.log(selected_places);
}

const turnAllBoxesAsRed = () => {
    console.log('true places')
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
function vibrate(duration) {
    if (navigator.vibrate) {
        navigator.vibrate(duration);
    }
}
boxes.forEach((box) => {
    box.addEventListener("click", (e) => {
        var row = e.target.getAttribute("row");
        var col = e.target.getAttribute("col");
        boxes.forEach((box) => {
            makeBlackWhite(box);
        })
        getData();

        if (e.target.getAttribute("selected") == "false") {
            console.info(
                "selected place values", selected_places[row][col]
            )
            if (selected_places[row][col]) {
                // add class red-pulse-box
                e.target.classList.add("red-pulse-box");
                vibrate(400);
                updateColorsOfBoxes();
                // updateBox();
                turnAllBoxesAsRed();
                vibrate(100);
            } else {

                for (var i = 0; i < total_rows; i++) {
                    selected_places[i] = [];
                    for (var j = 0; j < total_cols; j++) {
                        console.log("making all selected places false")
                        selected_places[i][j] = false;
                    }
                }
                console.log(e.target.getAttribute("selected") + "selecting.");
                e.target.style.backgroundColor = "black";
                e.target.setAttribute("selected", "true");
                selected_location.push([Number(row), Number(col)]);
                e.target.innerHTML = "👑";
                updateColorsOfBoxes();
                // updateBox();
                turnAllBoxesAsRed();
                vibrate(100);
            }
        }
        else {
            for (var i = 0; i < total_rows; i++) {
                selected_places[i] = [];
                for (var j = 0; j < total_cols; j++) {
                    console.log("making all selected places false")
                    selected_places[i][j] = false;
                }
            }
            console.log(e.target.getAttribute("selected") + "deselecting.");
            e.target.setAttribute("selected", "false");
            e.target.innerHTML = "";
            for (var i = 0; i < selected_location.length; i++) {
                if (selected_location[i][0] == row && selected_location[i][1] == col) {
                    selected_location.splice(i, 1);
                }
            }
            updateColorsOfBoxes();
            turnAllBoxesAsRed();
            vibrate(100);
        }
        console.log("selected Places")
        console.log(selected_places);
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
    })
})
const resetAll = () => {
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
var resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", resetAll);
// regester service worker
const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(function (registration) {
                console.log('Service worker registered!', registration);
            }).catch(function (err) {
                console.log('Service worker registration failed: ', err);
            });
    }
}
registerServiceWorker();
// fetch data from api
const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();
    return data;
}
const getData = async () => {
    console.log('fetching data');
    const data = await fetchData();
    return data;
}
