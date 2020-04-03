document.body.onload = function(){
let buttDiv = document.createElement('div');
let buttA = document.createElement('a');
buttA.setAttribute('id', "enterA");
buttDiv.setAttribute('id', "enterDiv");
            buttDiv.style.backgroundColor = "blue";
            buttDiv.style.height = "10%";
            buttDiv.style.width = "20%";
            buttDiv.style.position = "relative";
            buttDiv.style.alignContent = "auto";
            buttDiv.innerHTML = "Enter The Game!";
            buttDiv.onclick = function (){
                db.collection('PlayerCount').doc('PlyrCnt').get().then (
                    function (snap) {
                        let check = snap.data().isp1waiting;
                        
                        if (check) {
                            document.getElementById('enterA').href = "player2.html";
                            db.collection('PlayerCount').doc('PlyrCnt').update({
                                isp1waiting: false
                                
                            })
                            console.log(check);
                        } else {
                            document.getElementById('enterA').href = "player1.html";
                            db.collection('PlayerCount').doc('PlyrCnt').update({
                                isp1waiting: true
                            })
                            console.log(check);
                        }
                    }
                )
            };
            buttA.appendChild(buttDiv);
            document.getElementById('container').appendChild(buttA);
        }
