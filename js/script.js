var chessBoard = [],
    me = true,
    over = false;

//赢法数组
var wins = [];

//赢法的统计数组
var myWin = [],
    computerWin = [];

for(var i=0;i<15;i++){
    chessBoard[i] = [];
    for(var j=0;j<15;j++){
        chessBoard[i][j] = 0;
    }
}

for(i=0;i<15;i++){
    wins[i] = [];
    for(j=0;j<15;j++){
        wins[i][j] = [];
    }
}

var count = 0;
for(i=0;i<15;i++){
    for(j=0;j<11;j++){
        for(var k=0;k<5;k++){
            wins[i][j+k][count] = true;
        }
        count++;
    }
}
for(i=0;i<15;i++){
    for(j=0;j<11;j++){
        for(k=0;k<5;k++){
            wins[j+k][i][count] = true;
        }
        count++;
    }
}
for(i=0;i<11;i++){
    for(j=0;j<11;j++){
        for(k=0;k<5;k++){
            wins[i+k][j+k][count] = true;
        }
        count++;
    }
}
for(i=0;i<11;i++){
    for(j=14;j>3;j--){
        for(k=0;k<5;k++){
            wins[i+k][j-k][count] = true;
        }
        count++;
    }
}

for(i=0;i<count;i++){
    myWin[i] = 0;
    computerWin[i] = 0;
}

var chess = document.getElementById('chess'),
    context = chess.getContext('2d');

context.strokeStyle = '#bfbfbf';

var bg = new Image();
bg.src = 'images/bg.jpg';
bg.onload = function(){
    context.drawImage(bg,0,0,450,450);
    drawChessBoard();
};

var drawChessBoard = function(){
    for(var i=0;i<15;i++){
        context.moveTo(15+i*30,15);
        context.lineTo(15+i*30,435);
        context.stroke();
        context.moveTo(15,15+i*30);
        context.lineTo(435,15+i*30);
        context.stroke();
    }
};

var oneStep = function(i,j,me){
    context.beginPath();
    context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
    context.closePath();
    var gradient = context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);
    if(me){
        gradient.addColorStop(0,'#0a0a0a');
        gradient.addColorStop(1,'#636766');
    }else{
        gradient.addColorStop(0,'#d1d1d1');
        gradient.addColorStop(1,'#f9f9f9');
    }
    context.fillStyle = gradient;
    context.fill();
};

chess.onclick = function(e){
    if(over){
        return;
    }
    if(!me){
        return;
    }
    var x = e.offsetX,
        y = e.offsetY,
        i = Math.floor(x/30),
        j = Math.floor(y/30);
    if(chessBoard[i][j] == 0){
        oneStep(i,j,me);
        chessBoard[i][j] = 1;

        //radar(i,j);

        //判断胜负
        for(var k=0;k<count;k++){
            if(wins[i][j][k]){
                myWin[k]++;
                computerWin[k] = 6;
                if(myWin[k]==5){
                    alert('You Win');
                    over = true;
                }
            }
        }
        if(!over){
            me = !me;
            setTimeout(computerAI,600);
        }
    }
};

var computerAI = function(){
    var myScore = [],
        computerScore = [],
        max = 0;
    var u = 0,
        v = 0;
    for(var i=0;i<15;i++){
        myScore[i] = [];
        computerScore[i] = [];
        for(var j=0;j<15;j++){
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }
    for(i=0;i<15;i++){
        for(j=0;j<15;j++){
            if(chessBoard[i][j]==0){
                for(var k=0;k<count;k++){
                    if(wins[i][j][k]){
                        if(myWin[k]==1){
                            myScore[i][j] += 200;
                        }else if(myWin[k]==2){
                            myScore[i][j] += 400;
                        }else if(myWin[k]==3){
                            myScore[i][j] += 2000;
                        }else if(myWin[k]==4){
                            myScore[i][j] += 10000;
                        }
                        if(computerWin[k]==1){
                            computerScore[i][j] += 220;
                        }else if(computerWin[k]==2){
                            computerScore[i][j] += 420;
                        }else if(computerWin[k]==3){
                            computerScore[i][j] += 2100;
                        }else if(computerWin[k]==4){
                            computerScore[i][j] += 20000;
                        }
                    }
                }
                if(myScore[i][j]>max){
                    max = myScore[i][j];
                    u = i;
                    v = j;
                }else if(myScore[i][j]==max){
                    if(computerScore[i][j]>computerScore[u][v]){
                        u = i;
                        v = j;
                    }
                }
                if(computerScore[i][j]>max){
                    max = computerScore[i][j];
                    u = i;
                    v = j;
                }else if(computerScore[i][j]==max){
                    if(myScore[i][j]>myScore[u][v]){
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }
    oneStep(u,v,false);
    chessBoard[u][v] = 2;
    //判断胜负
    for(k=0;k<count;k++){
        if(wins[u][v][k]){
            computerWin[k]++;
            myWin[k] = 6;
            if(computerWin[k]==5){
                alert('Com Win');
                over = true;
            }
        }
    }
    if(!over) {
        me = !me;
    }
};

//判断胜负

//function radar(i,j){
//    var n,count;
//
//    ew(i,j);
//    sn(i,j);
//    es_wn(i,j);
//    en_ws(i,j);
//
//    function isWin(c){
//        if(c>=5){
//            console.log('win');
//        }
//    }
//    function ew(i,j){
//        count=1;
//        for(n=1;n<5;n++){
//            if(i+n<15){
//                if(chessBoard[i][j]==chessBoard[i+n][j]){
//                    count++;
//                }else{
//                    break;
//                }
//            }
//        }
//        for(n=1;n<5;n++){
//            if(i-n>=0){
//                if(chessBoard[i][j]==chessBoard[i-n][j]){
//                    count++;
//                }else{
//                    break;
//                }
//            }
//        }
//        isWin(count);
//    }
//    function sn(i,j){
//        count=1;
//        for(n=1;n<5;n++){
//            if(j+n<15){
//                if(chessBoard[i][j]==chessBoard[i][j+n]){
//                    count++;
//                }else{
//                    break;
//                }
//            }
//        }
//        for(n=1;n<5;n++){
//            if(j-n>=0){
//                if(chessBoard[i][j]==chessBoard[i][j-n]){
//                    count++;
//                }else{
//                    break;
//                }
//            }
//        }
//        isWin(count);
//    }
//    function es_wn(i,j){
//        count=1;
//        for(n=1;n<5;n++){
//            if(i+n<15&&j+n<15){
//                if(chessBoard[i][j]==chessBoard[i+n][j+n]){
//                    count++;
//                }else{
//                    break;
//                }
//            }
//        }
//        for(n=1;n<5;n++){
//            if(i-n>=0&&j-n>=0){
//                if(chessBoard[i][j]==chessBoard[i-n][j-n]){
//                    count++;
//                }else{
//                    break;
//                }
//            }
//        }
//        isWin(count);
//    }
//    function en_ws(i,j){
//        count=1;
//        for(n=1;n<5;n++){
//            if(i+n<15&&j-n>=0){
//                if(chessBoard[i][j]==chessBoard[i+n][j-n]){
//                    count++;
//                }else{
//                    break;
//                }
//            }
//        }
//        for(n=1;n<5;n++){
//            if(i-n>=0&&j+n<15){
//                if(chessBoard[i][j]==chessBoard[i-n][j+n]){
//                    count++;
//                }else{
//                    break;
//                }
//            }
//        }
//        console.log((me?'黑':'白')+'/'+count);
//        isWin(count);
//    }
//}