import { makeBlackWhite, resetAll, turnAllBoxesAsRed, updateColorsOfBoxes, vibrate, winningMessage } from './utils/utils.js';
var board = document.getElementById("board");
const RED_SHADE = '#EA3C52'
var boxes = [];
var rows = [];
var cols = [];
var matrix = [];
var total_cols = 8;
var total_rows = 8;
var selected_location = [];
var selected_places = [];
var total_boxes = total_cols * total_rows;
// make a 2d array
for (var i = 0; i < total_rows; i++) {
    matrix[i] = [];
    for (var j = 0; j < total_cols; j++) {
        matrix[i][j] = j;
    }
}
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

for (var i = 0; i < total_rows; i++) {
    selected_places[i] = [];
    for (var j = 0; j < total_cols; j++) {
        selected_places[i][j] = false;
    }
}
console.log(selected_places);

boxes.forEach((box) => {
    box.addEventListener("click", (e) => {
        var row = e.target.getAttribute("row");
        var col = e.target.getAttribute("col");
        boxes.forEach((box) => {
            makeBlackWhite(box);
        })
        if (e.target.getAttribute("selected") == "false") {
            console.info(
                "selected place values", selected_places[row][col]
            )
            if (selected_places[row][col]) {
                // add class red-pulse-box
                e.target.classList.add("red-pulse-box");
                vibrate(400);
                updateColorsOfBoxes(selected_location, boxes, selected_places, total_cols, total_rows);
                turnAllBoxesAsRed(boxes, selected_places);
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
                updateColorsOfBoxes(selected_location, boxes,
                    selected_places, total_cols, total_rows);

                turnAllBoxesAsRed(boxes, selected_places);
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
            updateColorsOfBoxes(
                selected_location,
                boxes,
                selected_places,
                total_cols,
                total_rows

            );
            turnAllBoxesAsRed(boxes, selected_places);
            vibrate(100);
        }
        console.log("selected Places")
        console.log(selected_places);
        winningMessage(selected_location)
    })
})

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
