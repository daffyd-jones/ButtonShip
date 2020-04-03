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
                            
                            db.collection('PlayerCount').doc('PlyrCnt').update({
                                isp1waiting: false
                                
                            })
                            console.log(check);
                            setTimeout(function() {
                                window.location.href = "player2.html";
                            }, 500);
                        } else {
                            
                            db.collection('PlayerCount').doc('PlyrCnt').update({
                                isp1waiting: true
                            })
                            console.log(check);
                            setTimeout(function() {
                                window.location.href = "player1.html";
                            }, 500);
                        }
                    }
                )
            };
            buttA.appendChild(buttDiv);
            document.getElementById('container').appendChild(buttA);
        }
