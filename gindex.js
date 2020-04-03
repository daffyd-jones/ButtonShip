// Create required variables.
const emptyspace = "<img src='images/emptyspace.png' height='15px' width='15px'>";
const hitspace = "<img src='images/hitspace.png' height='15px' width='15px'>";
const missedspace = "<img src='images/missspace.png' height='15px' width='15px'>";
const shipspace = "<img src='images/shipspace.png' height='15px' width='15px'>";
const gridcontainer = document.getElementById("holdsgrid")
const carriersize = 5;
const battleshipsize = 4;
const destroyersize = 3;
const submarinesize = 3;
const patrolboatsize = 2;
let cx1;
let cy1;
let cx2;
let cy2;

// Create grid of pictures.
function makeGrid(size) {
    let myGrid = [];
    for (let i = 0; i < size; i++) {
        myGrid[i] = [];
        for (let n = 0; n < size; n++) {
            myGrid[i][n] = emptyspace;
        }
    }
    return myGrid;
}
// Place grid of pictures underneath x axis headers
// and place y axis #'s infront of grids rows, and
// pushes it all to the div grid container.
function placeGrids(grid) {
    gridcontainer.innerHTML += ("#");
    const xtitles = createTitles(grid.length);
    gridcontainer.innerHTML += xtitles;
    gridcontainer.innerHTML += '<br>';
    for (let n = 0; n < grid.length; n++) {
        let title = 'y' + n + ' ';
        for (let node of grid[n]) {
            title += node + ' ';
        }
        gridcontainer.innerHTML += title;
        gridcontainer.innerHTML += '<br>';
    }
}
// Creates x axis headers.
function createTitles(size) {
    let output = '  ';
    for (let n = 0; n < size; n++) {
        output += ' x' + n;
    }
    return output;
}
// Gets coordinates for ship placement.
function getCoords(typeofship, sizeofship) {
    let pinput = `Placing ${typeofship}. Enter coordinates for 2 positions, which are ${sizeofship} spaces apart, in a straight line.`
    let inputcoords = prompt(pinput, "Format: X1,Y1,X2,Y2");
    let coords = inputcoords.split(",");
    let recall1 = typeofship;
    let recall2 = sizeofship;
    cy1 = parseInt(coords[0]);
    cx1 = parseInt(coords[1]);
    cy2 = parseInt(coords[2]);
    cx2 = parseInt(coords[3]);
    if (cx1 > cx2) {
        cx1 = parseInt(coords[3]);
        cx2 = parseInt(coords[1]);
    }
    if (cy1 > cy2) {
        cy1 = parseInt(coords[2]);
        cy2 = parseInt(coords[0]);
    }
    let xsizecheck = (cx2 - cx1 + 1 == sizeofship && cy2 == cy1);
    let ysizecheck = (cy2 - cy1 + 1 == sizeofship && cx2 == cx1);
    if (xsizecheck | ysizecheck) {
    } else {
        getCoords(recall1, recall2)
    }
}
// Places the carrier class ship.
function placeCarrier(x1, y1, x2, y2) {
    for (var f = x1; f <= x2; f++) {
        for (var g = y1; g <= y2; g++) {
            p1Grid[f][g] = shipspace;
        }
    }
}
//Places the battleship.
function placeBattleship(x1, y1, x2, y2) {
    for (var f = x1; f <= x2; f++) {
        for (var g = y1; g <= y2; g++) {
            p1Grid[f][g] = shipspace;
        }
    }
}
//Places the destroyer class ship.
function placeDestroyer(x1, y1, x2, y2) {
    for (var f = x1; f <= x2; f++) {
        for (var g = y1; g <= y2; g++) {
            p1Grid[f][g] = shipspace;
        }
    }
}
//Places the submarine.
function placeSubmarine(x1, y1, x2, y2) {
    for (var f = x1; f <= x2; f++) {
        for (var g = y1; g <= y2; g++) {
            p1Grid[f][g] = shipspace;
        }
    }
}
//Places the patrol boat.
function placePatrolBoat(x1, y1, x2, y2) {
    for (var f = x1; f <= x2; f++) {
        for (var g = y1; g <= y2; g++) {
            p1Grid[f][g] = shipspace;
        }
    }
}
// Places ships onto grid then updates the
// grid container.
function placeShips() {
    gridcontainer.innerHTML = '';
    //p1Grid = makeGrid(p1GridSize);
    getCoords("Carrier", carriersize);
    placeCarrier(cx1, cy1, cx2, cy2);
    getCoords("Battleship", battleshipsize);
    placeBattleship(cx1, cy1, cx2, cy2);
    getCoords("Destroyer", destroyersize);
    placeDestroyer(cx1, cy1, cx2, cy2);
    getCoords("Submarine", submarinesize);
    placeSubmarine(cx1, cy1, cx2, cy2);
    getCoords("Patrol Boat", patrolboatsize);
    placePatrolBoat(cx1, cy1, cx2, cy2);
    placeGrids(p1Grid);
}
// Initializes the players grid dimensions to 10x10
// and places the first grid.
let p1GridSize = 10;
let p1Grid = makeGrid(p1GridSize);
placeGrids(p1Grid);










































































































































































































































//////////////////////////////////
///I have this taking in a map
function swapEm1(boardMap) { ///////goButton1 connects to ready button
    document.getElementById('goButton1').addEventListener("click", function (e) {
        e.preventDefault();
        db.collection('Grids').doc('GridStore').onSnapshot(
            function (snap) {
                let check = snap.data().go;
                if (!check) {
                    let boo = true;
                    bd.collection('Grids').doc('GridStore').update({
                        go: boo
                    })
                    db.collection('Grids').doc('GridStore').onSnapshot(
                        function (snap) {
                            let twoCheck = snap.data().go2;
                            while (!twoCheck) {
                                window.alert("Waiting for other player");
                            }
                            db.collection('Grids').doc('GridStore').update({
                                plyr1: boardMap
                            })
                            db.collection('Grids').doc('GridStore').get().then(
                                (doc) => {
                                    if (doc.exists) {
                                        otherBoard1 = doc.data().plyr2;
                                        return otherBoard1 ///////////////returns other players map if first go was false.
                                    } else {//////////////////////////////---waits for go2 to be true before pulling "otherBoard1"
                                    //////////////////////////////////////returns otherBoard1
                                        console.log("no doc");
                                    }
                                }
                            )
                        }
                    )
                } else {
                    db.collection('Grids').doc('GridStore').update({
                        go2: true,
                        plyr1: boardMap
                    })
                    db.collection('Grids').doc('GridStore').get().then(
                        (doc) => {
                            if (doc.exists) {
                                otherBoard1 = doc.data().plyr2;
                                return otherBoard1; ///////returns other players map if first go was true.
                            } else {///////////////////////---sets go2 to true allowing other player to pull
                                console.log("no doc");/////and pulls then returns otherBoard1
                            }
                        }
                    )
                }
            }
        )

    })
}
//board map takes in map/////goButton2 connects to ready btn
function swapEm2(boardMap) {
    document.getElementById('goButton2').addEventListener("click", function (e) {
        e.preventDefault();
        db.collection('Grids').doc('GridStore').onSnapshot(
            function (snap) {
                let check = snap.data().go;
                if (!check) {
                    let boo = true;
                    bd.collection('Grids').doc('GridStore').update({
                        go: boo
                    })
                    db.collection('Grids').doc('GridStore').onSnapshot(
                        function (snap) {
                            let twoCheck = snap.data().go2;
                            while (!twoCheck) {
                                window.alert("Waiting for other player");
                            }
                            db.collection('Grids').doc('GridStore').update({
                                plyr2: boardMap
                            })
                            db.collection('Grids').doc('GridStore').get().then(
                                (doc) => {
                                    if (doc.exists) {
                                        otherBoard2 = doc.data().plyr1;
                                        return otherBoard2;///////////////returns other players map if first go was false.
                                    } else {//////////////////////////////---waits for go2 to be true before pulling "otherBoard1"
                                        console.log("no doc");//////////////////////////////////////returns otherBoard1
                                    }
                                }
                            )
                        }
                    )
                } else {
                    db.collection('Grids').doc('GridStore').update({
                        go2:true,
                        plyr2: boardMap
                    })
                    db.collection('Grids').doc('GridStore').get().then(
                        (doc) => {
                            if (doc.exists) {
                                otherBoard2 = doc.data().plyr1;
                                return otherBoard2;///////returns other players map if first go was true.
                            } else {///////////////////////---sets go2 to true allowing other player to pull
                                console.log("no doc");/////and pulls then returns otherBoard1
                            }
                        }
                    )
                }
            }
        )

    })
}

//takes in miss amount int
function gameOver1(missAmt){
    db.collection('Grids').doc('GridStore').onSnapshot(
        function (snap){
            let ch = snap.data().go;
            if (ch){
                db.collection('Grids').doc('GridStore').update({
                    go:false,
                    plr1Scr: missAmt
                })
                db.collection('Grids').doc('GridStore').onSnapshot(
                    function (snap){
                        let ch2 = snap.data().go2;
                        while(ch2){
                            window.alert("Waiting for other player");
                        }
                        db.collection('Grids').doc('GridStore').get().then(
                            (doc) => {
                                if(doc.exists){
                                    let plr2Scr = doc.data().plr2Scr;
                                    if (missAmt<plr2Scr){
                                        window.alert("You Won!!!!!");
                                        writeBase();
                                    } else{
                                        window.alert("You Lose!!");
                                        writeBase();
                                    }
                                }
                            }
                        )
                    }
                )

            } else {
                db.collection('Grids').doc('GridStore').update({
                    go2: false,
                    plr1Scr: missAmt
                })
                db.collection('Grids').doc('GridStore').get().then(
                    (doc) => {
                        if(doc.exists){
                            let plr2Scr = doc.data().plr2Scr;
                            if (missAmt<plr2Scr){
                                window.alert("You Win!!!");
                                writeBase();
                            } else{
                                window.alert("You Lose!!!");
                                writeBase();
                            }
                        }
                    }
                )

            }
        }
    )
}
function gameOver2(missAmt){
    db.collection('Grids').doc('GridStore').onSnapshot(
        function (snap){
            let ch = snap.data().go;
            if (ch){
                db.collection('Grids').doc('GridStore').update({
                    go:false,
                    plr2Scr: missAmt
                })
                db.collection('Grids').doc('GridStore').onSnapshot(
                    function (snap){
                        let ch2 = snap.data().go2;
                        while(ch2){
                            window.alert("Waiting for other player.")
                        }
                        db.collection('Grids').doc('GridStore').get().then(
                            (doc) => {
                                if(doc.exists){
                                    let plr1Scr = doc.data().plr1Scr;
                                    if (missAmt<plr1Scr){
                                        window.alert("You Win");
                                        writeBase();
                                    } else{
                                        window.alert("you Lose");
                                        writeBase();
                                    }
                                }
                            }
                        )
                    }
                )

            } else {
                db.collection('Grids').doc('GridStore').update({
                    go2: false,
                    plr2Scr: missAmt
                })
                db.collection('Grids').doc('GridStore').get().then(
                    (doc) => {
                        if(doc.exists){
                            let plr1Scr = doc.data().plr1Scr;
                            if (missAmt<plr1Scr){
                                window.alert("You Win!!!");
                                writeBase();
                            } else{
                                window.alert("you Lose!!!")
                                writeBase();
                            }
                        }
                    }
                )

            }
        }
    )
}


function writeBase() {
    let mp = {};
    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            mp['' + j + i] = false;
        }
    }
    let arr = [];
    arr[0] = mp;
    db.collection('Grids').doc('GridStore').set({
        go2: false,
        go: false,
        plyr1: arr,
        plyr2: arr

    })
}








