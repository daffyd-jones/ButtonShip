const carrierSize = 5;
const battleshipSize = 4;
const destroyerSize = 3;
const submarineSize = 3;
const patrolboatSize = 2;
let maxHits = 0;
let placingCarrier = true;
let placingBattleship = false;
let placingDestroyer = false;
let placingSubmarine = false;
let placingPatrolboat = false;

let firstInput = true;
let buttonInput;
let xInput = 0;
let yInput = 0;
let validPlacement = false;
let x1 = 0;
let y1 = 0;
let x2 = 0;
let y2 = 0;

let shipArray = [];
let opponentShips = [];
let shotCounter = 0;
let hitCounter = 0;

function makeAttackBoard() {
    let playArea = [];

    let shipRef = db.collection('Grids').doc('GridStore').get().then(
        function (doc) {

            let test = doc.data().plyr2;

            console.log("db placements: ")
            console.log(test["0"]);
            for (let i = 1; i <= 10; ++i) {
                for (let j = 1; j <= 10; j++) {
                    if (test["0"]["" +  j + i]) {
                        opponentShips.push("" + j + i)
                    }
                }
            }
            maxHits = opponentShips.length;
        }
    );
    let table = document.createElement('table');
    table.setAttribute('id', 'attackBoard');
    table.setAttribute('class', "boardTables")
    let tr = table.insertRow(-1);
    for (let i = 1; i <= 10; ++i) {
        tr = table.insertRow(-1);
        for (let j = 1; j <= 10; j++) {
            playArea.push("" + j + i);
            let td = document.createElement('td');
            td = tr.insertCell(-1);
            let btn = document.createElement('button');
            btn.setAttribute('id', "" + j + i);
            btn.setAttribute('class', "attackDivs unknown");
            setTimeout(function () {
                btn.onclick = fire;
            }, 10)
            td.appendChild(btn);
        }
    }
    console.log("saved placements: ")
    console.log(opponentShips);
    document.getElementById("opponent").appendChild(table);
    window.alert("Sink all your opponents ships in the fewest amount of shots to win.");
}

function makeShipBoard() {
    let table = document.createElement('table');
    table.setAttribute('id', 'shipBoard');
    table.setAttribute('class', "boardTables")
    let tr = table.insertRow(-1);
    for (let i = 1; i <= 10; ++i) {
        tr = table.insertRow(-1);
        for (let j = 1; j <= 10; j++) {
            let td = document.createElement('td');
            td = tr.insertCell(-1);
            let btn = document.createElement('button');
            btn.setAttribute('id', j + "," + i + "p");
            btn.setAttribute('class', "attackDivs");
            setTimeout(function () {
                btn.onclick = placement;
            }, 10)
            td.appendChild(btn);
        }
    }
    document.getElementById("player").appendChild(table);
    window.alert("Let's start with placing your Carrier.");
}

function fire() {
    let hit = false;
    if (this.className.includes("hit") || this.className.includes("miss")) {
        
    } else {
        for (let i = 0; i < opponentShips.length; i++) {
            if (this.id == opponentShips[i]) {
                this.className = "attackDivs hit"
                hitCounter++;
                hit = true;
                document.getElementById("hits1").innerHTML = "Hits: " + hitCounter;
            }
        }
        if (hit) {
            shotCounter++;
            if (hitCounter == maxHits) {
                gameOver1(shotCounter);
            }
        } else {
            this.className = "attackDivs miss";
            shotCounter++;
            document.getElementById("score1").innerHTML = "Shots: " + shotCounter;
        }
    }

}/////Ben-My gameOver1() compares values/displays win/lose then resets via writeBase();

function gameOver1(missAmt) {
    window.alert("Congrats, you've sunk all of their ships");

    db.collection('Grids').doc('GridStore').update({
        plr1Scr: missAmt
    });
    db.collection('Grids').doc('GridStore').onSnapshot(
        function (snap) {
            let player2Score = snap.data().plr2Scr;
            if (player2Score != 0) {
                if (missAmt < player2Score) {
                    window.alert("You Won!!!!!");
                } else if (missAmt == player2Score) {
                    window.alert("Tie!!!");
                } else {
                    window.alert("You Lost!");
                }
            } else {
                window.alert("Waiting for other player");
            }
        }
    );
}

//ships can overlap currently, as well as share end points
function placement() {

    if (placingCarrier) {
        buttonInput = this.id.split(",");
        xInput = parseInt(buttonInput[0]);
        yInput = parseInt(buttonInput[1]);

        console.log(x1);
        if (firstInput) {
            console.log("Carrier first input detected");
            x1 = xInput;
            y1 = yInput;
            firstInput = false;
            document.getElementById(x1 + "," + y1 + "p").className = "attackDivs ship";
            console.log("input was " + x1 + y1);
            window.alert("Please place the other end of your Carrier");
        } else {
            console.log("Carrier second input detected");
            x2 = xInput;
            y2 = yInput;
            if (Math.abs(x1 - x2) == carrierSize - 1) {
                console.log("valid X size detected");
                if (x1 < x2) {
                    for (let i = x1; i <= x2; i++) {
                        shipArray.push("" + i + y1)
                        document.getElementById(i + "," + y1 + "p").className = "attackDivs ship";
                    }
                } else if (x1 > x2) {
                    console.log("x2 > x1 : " + x2 + " > " + x1)
                    for (let i = x2; i <= x1; i++) {
                        shipArray.push("" + i + y1)
                        document.getElementById(i + "," + y1 + "p").className = "attackDivs ship";
                    }
                }

                placingCarrier = false;
                placingBattleship = true;
                firstInput = true;
            } else if (Math.abs(y1 - y2) == carrierSize - 1) {
                console.log("valid Y size detected");
                if (y1 < y2) {
                    for (let i = y1; i <= y2; i++) {
                        shipArray.push("" + x1 + i)
                        document.getElementById(x1 + "," + i + "p").className = "attackDivs ship";
                    }
                } else if (y1 > y2) {
                    for (let i = y2; i <= y1; i++) {
                        shipArray.push("" + x1 + i)
                        document.getElementById(x1 + "," + i + "p").className = "attackDivs ship";
                    }
                }

                placingCarrier = false;
                placingBattleship = true;
                firstInput = true;
            } else {
                window.alert("Invalid Placement, please choose a place 4 squares away from the first.");
            }
        }
    } else if (placingBattleship) {
        console.log("first input : " + firstInput);

        buttonInput = this.id.split(",");
        xInput = parseInt(buttonInput[0]);
        yInput = parseInt(buttonInput[1]);
        console.log(x1);
        if (firstInput) {
            console.log("Battleship first input detected");
            x1 = xInput;
            y1 = yInput;
            firstInput = false;
            document.getElementById(x1 + "," + y1 + "p").className = "attackDivs ship";
            console.log("input was " + x1 + y1);
            window.alert("Please place the other end of your Battleship");
        } else {
            console.log("Battleship second input detected");
            x2 = xInput;
            y2 = yInput;
            if (Math.abs(x1 - x2) == battleshipSize - 1) {
                console.log("valid X size detected");
                if (x1 < x2) {
                    for (let i = x1; i <= x2; i++) {
                        shipArray.push("" + i + y1)
                        document.getElementById(i + "," + y1 + "p").className = "attackDivs ship";
                    }
                } else if (x1 > x2) {
                    for (let i = x2; i <= x1; i++) {
                        shipArray.push("" + i + y1)
                        document.getElementById(i + "," + y1 + "p").className = "attackDivs ship";
                    }
                }

                placingBattleship = false;
                placingDestroyer = true;
                firstInput = true;
            } else if (Math.abs(y1 - y2) == battleshipSize - 1) {
                console.log("valid Y size detected");
                if (y1 < y2) {
                    for (let i = y1; i <= y2; i++) {
                        shipArray.push("" + x1 + i)
                        document.getElementById(x1 + "," + i + "p").className = "attackDivs ship";
                    }
                } else if (y1 > y2) {
                    for (let i = y2; i <= y1; i++) {
                        shipArray.push("" + x1 + i)
                        document.getElementById(x1 + "," + i + "p").className = "attackDivs ship";
                    }
                }
                console.log("setting firstInput to true")
                placingBattleship = false;
                placingDestroyer = true;
                firstInput = true;
            } else {
                window.alert("Invalid Placement, please choose a place 3 squares away from the first.");
            }
        }
    } else if (placingDestroyer) {
        console.log("first input : " + firstInput);

        buttonInput = this.id.split(",");
        xInput = parseInt(buttonInput[0]);
        yInput = parseInt(buttonInput[1]);
        console.log(x1);
        if (firstInput) {
            console.log("Destroyer first input detected");
            x1 = xInput;
            y1 = yInput;
            firstInput = false;
            document.getElementById(x1 + "," + y1 + "p").className = "attackDivs ship";
            console.log("input was " + x1 + y1);
            window.alert("Please place the other end of your Destroyer");
        } else {
            console.log("Destroyer second input detected");
            x2 = xInput;
            y2 = yInput;
            if (Math.abs(x1 - x2) == destroyerSize - 1) {
                console.log("valid X size detected");
                if (x1 < x2) {
                    for (let i = x1; i <= x2; i++) {
                        shipArray.push("" + i + y1)
                        document.getElementById(i + "," + y1 + "p").className = "attackDivs ship";
                    }
                } else if (x1 > x2) {
                    for (let i = x2; i <= x1; i++) {
                        shipArray.push("" + i + y1)
                        document.getElementById(i + "," + y1 + "p").className = "attackDivs ship";
                    }
                }

                placingDestroyer = false;
                placingSubmarine = true;
                firstInput = true;
            } else if (Math.abs(y1 - y2) == destroyerSize - 1) {
                console.log("valid Y size detected");
                if (y1 < y2) {
                    for (let i = y1; i <= y2; i++) {
                        shipArray.push("" + x1 + i)
                        document.getElementById(x1 + "," + i + "p").className = "attackDivs ship";
                    }
                } else if (y1 > y2) {
                    for (let i = y2; i <= y1; i++) {
                        shipArray.push("" + x1 + i)
                        document.getElementById(x1 + "," + i + "p").className = "attackDivs ship";
                    }
                }

                placingDestroyer = false;
                placingSubmarine = true;
                firstInput = true;
            } else {
                window.alert("Invalid Placement, please choose a place 2 squares away from the first.");
            }
        }

    } else if (placingSubmarine) {
        console.log("first input : " + firstInput);

        buttonInput = this.id.split(",");
        xInput = parseInt(buttonInput[0]);
        yInput = parseInt(buttonInput[1]);
        console.log(x1);
        if (firstInput) {
            console.log("Submarine first input detected");
            x1 = xInput;
            y1 = yInput;
            firstInput = false;
            document.getElementById(x1 + "," + y1 + "p").className = "attackDivs ship";
            console.log("input was " + x1 + y1);
            window.alert("Please place the other end of your Submarine");
        } else {
            console.log("Submarine second input detected");
            x2 = xInput;
            y2 = yInput;
            if (Math.abs(x1 - x2) == submarineSize - 1) {
                console.log("valid X size detected");
                if (x1 < x2) {
                    for (let i = x1; i <= x2; i++) {
                        shipArray.push("" + i + y1)
                        document.getElementById(i + "," + y1 + "p").className = "attackDivs ship";
                    }
                } else if (x1 > x2) {
                    for (let i = x2; i <= x1; i++) {
                        shipArray.push("" + i + y1)
                        document.getElementById(i + "," + y1 + "p").className = "attackDivs ship";
                    }
                }

                placingSubmarine = false;
                placingPatrolboat = true;
                firstInput = true;
            } else if (Math.abs(y1 - y2) == submarineSize - 1) {
                console.log("valid Y size detected");
                if (y1 < y2) {
                    for (let i = y1; i <= y2; i++) {
                        shipArray.push("" + x1 + i)
                        document.getElementById(x1 + "," + i + "p").className = "attackDivs ship";
                    }
                } else if (y1 > y2) {
                    for (let i = y2; i <= y1; i++) {
                        shipArray.push("" + x1 + i)
                        document.getElementById(x1 + "," + i + "p").className = "attackDivs ship";
                    }
                }

                placingSubmarine = false;
                placingPatrolboat = true;
                firstInput = true;
            } else {
                window.alert("Invalid Placement, please choose a place 2 squares away from the first.");
            }
        }
    } else if (placingPatrolboat) {
        buttonInput = this.id.split(",");
        xInput = parseInt(buttonInput[0]);
        yInput = parseInt(buttonInput[1]);
        console.log(x1);
        if (firstInput) {
            console.log("Patrol Boat first input detected");
            x1 = xInput;
            y1 = yInput;
            firstInput = false;
            document.getElementById(x1 + "," + y1 + "p").className = "attackDivs ship";
            window.alert("Please place the other end of your Patrol Boat");
            console.log("input was " + x1 + y1);
        } else {
            console.log("Patrol Boat second input detected");
            x2 = xInput;
            y2 = yInput;
            if (Math.abs(x1 - x2) == patrolboatSize - 1) {
                console.log("valid X size detected");
                if (x1 < x2) {
                    for (let i = x1; i <= x2; i++) {
                        shipArray.push("" + i + y1)
                        document.getElementById(i + "," + y1 + "p").className = "attackDivs ship";
                    }
                } else if (x1 > x2) {
                    for (let i = x2; i <= x1; i++) {
                        shipArray.push("" + i + y1)
                        document.getElementById(i + "," + y1 + "p").className = "attackDivs ship";
                    }
                }

                placingPatrolboat = false;
                validPlacement = true;
            } else if (Math.abs(y1 - y2) == patrolboatSize - 1) {
                console.log("valid Y size detected");
                if (y1 < y2) {
                    for (let i = y1; i <= y2; i++) {
                        shipArray.push("" + x1 + i)
                        document.getElementById(x1 + "," + i + "p").className = "attackDivs ship";
                    }
                } else if (y1 > y2) {
                    for (let i = y2; i <= y1; i++) {
                        shipArray.push("" + x1 + i)
                        document.getElementById(x1 + "," + i + "p").className = "attackDivs ship";
                    }
                }

                placingPatrolboat = false;
                validPlacement = true;
            } else {
                window.alert("Invalid Placement, please choose a place 1 square away from the first.");
            }
        }
    }

    if (validPlacement) {
        let gridRef = db.collection('Grids').doc('GridStore')
        for (let i = 0; i < shipArray.length; i++) {
            console.log("updating player 1 grid");
            console.log('plyr1.0.' + shipArray[i]);
            gridRef.update({
                ['plyr1.0.' + shipArray[i]] : "true"
            });
        }
        validPlacement = false;

        document.getElementById("goButton1").onclick = swapEm1;        
    }
}
function swapEm1(boardMap) {
    db.collection('Grids').doc('GridStore').onSnapshot(
        function (snap) {
            let check = snap.data().go;
            if (!check) {
                let boo = true;
                db.collection('Grids').doc('GridStore').update({
                    go: boo
                })
                db.collection('Grids').doc('GridStore').onSnapshot(
                    function (snap) {
                        let twoCheck = snap.data().go2;
                        console.log("opponent grid ready?")
                        if (twoCheck && opponentShips.length == 0) {
                            console.log("grid ready!");
                            makeAttackBoard();
                        } else {
                            console.log("LOLNOPE");
                        }
                    }
                );
            } else {
                console.log("My grid is ready now");
            }
        }
    );
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
        plr1Scr: 0,
        plr2Scr: 0,
        plyr1: arr,
        plyr2: arr

    })
}

makeShipBoard();