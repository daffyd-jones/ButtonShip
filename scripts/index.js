document.body.onload = function () {
    let buttDiv = document.createElement('div');
    let buttA = document.createElement('a');
    buttA.setAttribute('id', "enterA");
    buttDiv.setAttribute('id', "enterDiv");
    buttDiv.style.backgroundColor = "antiquewhite";
    buttDiv.style.height = "1.5cm";
    buttDiv.style.width = "2.5cm";
    buttDiv.style.position = "relative";
    buttDiv.style.alignContent = "auto";
    buttDiv.style.fontWeight = "600";
    buttDiv.innerHTML = "Start!";
    buttDiv.onclick = function () {
        db.collection('PlayerCount').doc('PlyrCnt').get().then(
            function (snap) {
                let check = snap.data().isp1waiting;

                if (check) {

                    db.collection('PlayerCount').doc('PlyrCnt').update({
                        isp1waiting: false

                    })
                    console.log(check);
                    setTimeout(function () {
                        window.location.href = "player2.html";
                    }, 500);
                } else {

                    db.collection('PlayerCount').doc('PlyrCnt').update({
                        isp1waiting: true
                    })
                    console.log(check);
                    setTimeout(function () {
                        writeBase();
                        window.location.href = "player1.html";
                    }, 500);
                }
            }
        )
    };
    buttA.appendChild(buttDiv);
    document.getElementById('container').appendChild(buttA);
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

