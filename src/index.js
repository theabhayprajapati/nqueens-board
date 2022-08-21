import { resetAll, turnAllBoxesAsRed, updateColorsOfBoxes, vibrate, winningMessage } from './utils/utils.js';
var board = document.getElementById("board");
var boxes = [];
var rows = [];
var cols = [];
var matrix = [];
var total_cols = 8;
var total_rows = 8;
var selected_location = [];
var selected_places = [];
var total_boxes = total_cols * total_rows;

for (var i = 0; i < total_rows; i++) {
    console.log('starting to create maze.');
    for (var j = 0; j < total_cols; j++) {
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
    console.log('created maze.');
}

function making_all_taken_place_false(selected_places, total_rows, total_cols) {
    console.log('making all taken / selected places false.');
    for (var i = 0; i < total_rows; i++) {
        selected_places[i] = [];
        for (var j = 0; j < total_cols; j++) {
            selected_places[i][j] = false;
        }
    }
    console.log('made all taken / selected places false.');
}
making_all_taken_place_false(selected_places, total_rows, total_cols);

const initail_setup = () => {
    console.log('getting data from local storage.');
    var selected_location_ls = JSON.parse(localStorage.getItem('selected_location'));
    // if the selected location is not null then update the selected location
    if (selected_location_ls != null) {
        selected_location = selected_location_ls;
        selected_location.forEach((location) => {
            // get boxes with this row col
            boxes.forEach((box) => {
                var row = Number(box.getAttribute('row'));
                var col = Number(box.getAttribute('col'));
                console.log(location[0] + "," + location[1]);
                if (row == location[0] && col == location[1]) {
                    box.setAttribute('selected', 'true');
                    box.innerHTML = "👑";
                }
            })
        })
        updateColorsOfBoxes(selected_location, boxes, selected_places, total_cols, total_rows);
        turnAllBoxesAsRed(boxes, selected_places);
    }
    console.log('got data from local storage.');

}
initail_setup();
boxes.forEach((box) => {
    console.log('adding event listener to box.');
    box.addEventListener("click", (e) => {
        console.log('box clicked.');
        var row = e.target.getAttribute("row");
        var col = e.target.getAttribute("col");
        if (e.target.getAttribute("selected") == "false") {
            if (selected_places[row][col]) {
                e.target.classList.add("red-pulse-box");
                vibrate(400);
                updateColorsOfBoxes(selected_location, boxes, selected_places, total_cols, total_rows);
                turnAllBoxesAsRed(boxes, selected_places);
            } else {
                for (var i = 0; i < total_rows; i++) {
                    selected_places[i] = [];
                    for (var j = 0; j < total_cols; j++) {
                        selected_places[i][j] = false;
                    }
                }
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
                    selected_places[i][j] = false;
                }
            }

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
        localStorage.setItem("selected_location", JSON.stringify(selected_location));
        console.log(localStorage.getItem("selected_location"));
        winningMessage(selected_location)
    })
})

var resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", resetAll(boxes, selected_places, selected_location));
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
