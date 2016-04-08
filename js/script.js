var chessBoard = [],
    me = true;

//赢法数组
var wins = [];

for(var i=0;i<15;i++){
    chessBoard[i] = [];
    for(var j=0;j<15;j++){
        chessBoard[i][j] = 0;
    }
}

//for(i=0;i<15;i++){
//    wins[i] = [];
//    for(j=0;j<15;j++){
//        wins[i][j] = [];
//    }
//}
//
//var count = 0;
//for(i=0;i<15;i++){
//    for(j=0;j<11;j++){
//        for(var k=0;k<5;k++){
//            wins[i][j+k][count] = true;
//        }
//        count++;
//    }
//}
//for(i=0;i<15;i++){
//    for(j=0;j<11;j++){
//        for(k=0;k<5;k++){
//            wins[j+k][i][count] = true;
//        }
//        count++;
//    }
//}
//for(i=0;i<11;i++){
//    for(j=0;j<11;j++){
//        for(k=0;k<5;k++){
//            wins[i+k][j+k][count] = true;
//        }
//        count++;
//    }
//}
//for(i=0;i<15;i++){
//    for(j=14;j>3;j--){
//        for(k=0;k<5;k++){
//            wins[i+k][j-k][count] = true;
//        }
//        count++;
//    }
//}

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
    var x = e.offsetX,
        y = e.offsetY,
        i = Math.floor(x/30),
        j = Math.floor(y/30);
    if(chessBoard[i][j] == 0){
        oneStep(i,j,me);
        if(me){
            chessBoard[i][j] = 1;
        }else{
            chessBoard[i][j] = 2;
        }
        radar(i,j);
        me = !me;
    }
};

//判断胜负
function radar(i,j){
    var n,count;

    ew(i,j);
    sn(i,j);
    es_wn(i,j);
    en_ws(i,j);

    function isWin(c){
        if(c>=5){
            console.log('win');
        }
    }
    function ew(i,j){
        count=1;
        for(n=1;n<5;n++){
            if(i+n<15){
                if(chessBoard[i][j]==chessBoard[i+n][j]){
                    count++;
                }else{
                    break;
                }
            }
        }
        for(n=1;n<5;n++){
            if(i-n>=0){
                if(chessBoard[i][j]==chessBoard[i-n][j]){
                    count++;
                }else{
                    break;
                }
            }
        }
        isWin(count);
    }
    function sn(i,j){
        count=1;
        for(n=1;n<5;n++){
            if(j+n<15){
                if(chessBoard[i][j]==chessBoard[i][j+n]){
                    count++;
                }else{
                    break;
                }
            }
        }
        for(n=1;n<5;n++){
            if(j-n>=0){
                if(chessBoard[i][j]==chessBoard[i][j-n]){
                    count++;
                }else{
                    break;
                }
            }
        }
        isWin(count);
    }
    function es_wn(i,j){
        count=1;
        for(n=1;n<5;n++){
            if(i+n<15&&j+n<15){
                if(chessBoard[i][j]==chessBoard[i+n][j+n]){
                    count++;
                }else{
                    break;
                }
            }
        }
        for(n=1;n<5;n++){
            if(i-n>=0&&j-n>=0){
                if(chessBoard[i][j]==chessBoard[i-n][j-n]){
                    count++;
                }else{
                    break;
                }
            }
        }
        isWin(count);
    }
    function en_ws(i,j){
        count=1;
        for(n=1;n<5;n++){
            if(i+n<15&&j-n>=0){
                if(chessBoard[i][j]==chessBoard[i+n][j-n]){
                    count++;
                }else{
                    break;
                }
            }
        }
        for(n=1;n<5;n++){
            if(i-n>=0&&j+n<15){
                if(chessBoard[i][j]==chessBoard[i-n][j+n]){
                    count++;
                }else{
                    break;
                }
            }
        }
        console.log((me?'黑':'白')+'/'+count);
        isWin(count);
    }
    //for(n=1,count=1;n<5;n++){
    //    if(i+n<15){
    //        if(chessBoard[i][j]==chessBoard[i+n][j]){
    //            count++;
    //        }
    //    }
    //    //if(i-n>=0){
    //    //    if(chessBoard[i][j]==chessBoard[i-n][j]){
    //    //        count++;
    //    //    }
    //    //}
    //    console.log((me?'黑':'白')+'-'+count);
    //    if(count>=5){
    //        console.log('win');
    //    }
    //}
    //for(n=1,count=1;n<5;n++){
    //    if(j+n<15){
    //        if(chessBoard[i][j]==chessBoard[i][j+n]){
    //            count++;
    //        }
    //    }
    //    if(j-n>=0){
    //        if(chessBoard[i][j]==chessBoard[i][j-n]){
    //            count++;
    //        }
    //    }
    //    console.log((me?'黑':'白')+'|'+count);
    //    if(count>=5){
    //        console.log('win');
    //    }
    //}
}