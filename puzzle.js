
var rows = 3;
var columns = 3;

var currTile;
var otherTile; 

var turns = 0;

var imgOrder1 = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var imgOrder = ["5", "2", "7", "4", "1", "6", "8", "9", "3"];

window.onload = function() {
    for (let r=0; r < rows; r++) {
        for (let c=0; c < columns; c++) {

            //<img id="0-0" src="1.jpg">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".jpeg";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);  
            tile.addEventListener("dragover", dragOver);    
            tile.addEventListener("dragenter", dragEnter);  
            tile.addEventListener("dragleave", dragLeave);  
            tile.addEventListener("drop", dragDrop);        
            tile.addEventListener("dragend", dragEnd);     

            document.getElementById("board").append(tile);

        }
    }
}

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; 
}

function dragEnd() {
    if (!otherTile.src.includes("1.jpeg")) {
        return;
    }

    let currCoords = currTile.id.split("-"); 
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;

        checkCompletion();
    }
   
}
function checkCompletion() {
    let tiles = document.querySelectorAll("#board img");
    let currentOrder = Array.from(tiles).map((tile) => tile.src.split("/").pop().split(".")[0]);

    if (JSON.stringify(currentOrder) === JSON.stringify(imgOrder1)) {
        alert("You have successfully completed the puzzle!");
    }
}
