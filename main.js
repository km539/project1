
//ターン確認用
let turn = true;

//2dボード作成
//要素確認用
let board = new Array(8);
for (let i = 0; i < board.length; i++) {
    board[i] = new Array(8);
}
//console.log(board);

let htmlBoard = document.querySelectorAll("#boardinfo tr");
//console.log(htmlBoard);
// const // constant immutable 
// let // mutable 


//ボードをクリックしたらそこの位置をScript側で要素を取得
for (let i = 0; i < htmlBoard.length; i++) {
    for (let j = 0; j < htmlBoard.length; j++) {
        const select_cell = htmlBoard[i].cells[j];
        
        //特定の要素がクリックされた時の処理
        select_cell.addEventListener("click", function (e) {

            // console.log(e.target);
            if(board[i][j] === 0){
                //console.log(select_cell);
                if(!turn){ //白のターンなら１
                    board[i][j] = 1;
                }else{ //黒のターンなら２
                    board[i][j] = 2;
                }
                const count = checkReverse(i,j)

                //周りにひっくりかえせる石があったら
                if(count > 0){
                    turn = !turn;
                    checkTurn();
                    boardSet();
                    //console.log(board);
                }else{
                    //error
                    board[i][j] = 0;
                    console.log("cannot put your stone");
                    console.log(board);
                }
               
            }
        });

    }
}

function checkReverse(i,j){
    let counter = 0;
    //console.log(counter);

    //let target = board[i][j];
    //console.log(target);

    //周りを確認する
    //console.log(counter);
    counter = counter + turnRight(i,j);
    //console.log(counter);
    counter = counter + turnLeft(i,j);
    //console.log(counter);
    //console.log('!!!');
    counter = counter + turnUp(i,j);
    //console.log(counter);
    counter = counter + turnDown(i,j);
    //console.log(counter);
    //console.log('-----------');
    counter = counter + turnRightDown(i,j);
    //console.log(counter);
    counter = counter + turnLeftUp(i,j);
    //console.log(counter);

    counter = counter + turnLeftDown(i,j);
    counter = counter + turnRightUp(i,j);

    //console.log(counter);
    return counter;
}
function turnUp(row,col){
    let num = 0;
    let next = 0;
    if(row !== 0){
        next = board[row-1][col];
    }else{
        return num;
    }

    if(board[row][col] !== next && board[row][col] !== 0 && next !== 0){
        //console.log(next);

        for (let i = row-2; i > 0; i--) {
            //console.log(board[i][col]);
           if(board[i][col] === 0){
               break;
           }else if(board[i][col] === board[row][col]){
               for(let j = row-1;j>i-1;j--){
                   board[j][col] = board[row][col];
                   console.log("turn up");
                   num++;
               }
           }else{

           }
        }
        /* console.log("turn up num");
    console.log(num);
    console.log("--------------"); */
    }
    return num;
}

function turnDown(row,col){
    let num = 0; 
    let next = 0;
    if(row !== board.length-1){
        next = board[row+1][col];
    }else{
        return num;
    }

    if(board[row][col] !== next && board[row][col] !== 0 && next !== 0){
        //console.log(next);

        for (let i = row+2; i < board.length; i++) {
            //console.log(board[i][col]);
           if(board[i][col] === 0){
               break;
           }else if(board[i][col] === board[row][col]){
               for(let j = row+1;j<i+1;j++){
                   board[j][col] = board[row][col];
                   console.log("turn down");
                   num++;
               }
           }else{

           }
        }
    }
    /*console.log("turn down num");
    console.log(num);
    console.log("--------------"); */
    return num;
}

function turnRight(row,col){
    let num = 0;
    let next = board[row][col+1];

    if(board[row][col] !== next && board[row][col] !== 0 && next !== 0){
        //console.log(next);

        for (let i = col+2; i < board.length; i++) {
            //console.log(board[row][i]);
           if(board[row][i] === 0){
               break;
           }else if(board[row][i] === board[row][col]){
               for(let j = col+1;j<i+1;j++){
                   board[row][j] = board[row][col];
                   console.log("turn right");
                   num++;
               }
           }else{

           }
        }
    }
    return num;
}

function turnLeft(row,col){
    let num = 0;
    let next = board[row][col-1]

    if(board[row][col] !== next && board[row][col] !== 0 && next !== 0){
        //console.log(next);

        for (let i = col-2; i > 0; i--) {
            //console.log(board[row][i]);
           if(board[row][i] === 0){
               break;
           }else if(board[row][i] === board[row][col]){
               for(let j = col-1;j>i-1;j--){
                   board[row][j] = board[row][col];
                   console.log("turn left");
                   num++;
               }
           }else{

           }
        }
    }
    return num;
}

function turnRightDown(row,col){
    let num = 0;
    let next = 0;
    if(row !== board.length-1){
        next = board[row+1][col+1];
    }else{
        return num;
    }
    //console.log(next);

    if(board[row][col] !== next && board[row][col] !== 0 && next !== 0){
        //console.log(next);

        for (let i = row+2, ii = col+2 ; i < board.length,  ii < board.length; i++ ,ii++) {
            //console.log(board[i][ii]);
           if(board[i][ii] === 0){
               break;
           }else if(board[i][ii] === board[row][col]){
               for(let j = row+1, jj = col+1;j<i+1, jj<ii+1;j++, jj++){
                   board[j][jj] = board[row][col];
                   console.log("turn right down");
                   num++;
                   
               }
           }else{

           }
        }
    }
    return num;
}

function turnLeftUp(row,col){
    let num = 0;
    let next = 0;
    if(row !== 0){
        next = board[row-1][col-1];
    }else{
        return num;
    }
    //console.log(next);

    if(board[row][col] !== next && board[row][col] !== 0 && next !== 0){
        //console.log(next);

        for (let i = row-2, ii = col-2 ; i > 0,  ii > 0; i-- ,ii--) {
            //console.log(board[i][ii]);
           if(board[i][ii] === 0){
               break;
           }else if(board[i][ii] === board[row][col]){
               for(let j = row-1, jj = col-1;j>i-1, jj>ii-1;j--, jj--){
                   board[j][jj] = board[row][col];
                   console.log("turn left up");
                   num++;
                   
               }
           }else{

           }
        }
    }
    return num;
}

function turnLeftDown(row,col){
    let num = 0;
    let next = 0;
    if(row !== board.length-1){
        next = board[row+1][col-1];
    }else{
        return num;
    }
    //console.log(next);

    if(board[row][col] !== next && board[row][col] !== 0 && next !== 0){
        //console.log(next);

        for (let i = row+2, ii = col-2 ; i < board.length,  ii > 0; i++ ,ii--) {
            console.log(board[i][ii]);
           if(board[i][ii] === 0){
               break;
           }else if(board[i][ii] === board[row][col]){
               for(let j = row+1, jj = col-1;j<i+1, jj>ii-1;j++, jj--){
                   board[j][jj] = board[row][col];
                   console.log("turn left down");
                   num++;
                   
               }
           }else{

           }
        }
    }
    return num;
}

function turnRightUp(row,col){
    let num = 0;
    let next = 0;
    if(row !== 0){
        next = board[row-1][col+1];
    }else{
        return num;
    }
    
    //console.log(next);

    if(board[row][col] !== next && board[row][col] !== 0 && next !== 0){
        //console.log(next);

        for (let i = row-2, ii = col+2 ; ii < board.length,  i > 0; ii++ ,i--) {
            //console.log(board[i][ii]);
           if(board[i][ii] === 0){
               break;
           }else if(board[i][ii] === board[row][col]){
               for(let j = row-1, jj = col+1;jj<i+1, j>ii-1;jj++, j--){
                   board[j][jj] = board[row][col];
                   console.log("turn right up");
                   num++;
                   
               }
           }else{

           }
        }
    }
    return num;
}

//Start button
function startGame() {
    //console.log("started");
    //set 0 for all elements 
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = 0;

            //勝利判定の実験
            //board[i][j] =  1;
        }
    }

    //white 1, black 2
    board[3][3] = 1;
    board[3][4] = 2;
    board[4][3] = 2;
    board[4][4] = 1;

    boardSet();

    checkTurn();
}

//
function checkTurn() {
    let turns = document.getElementById("turn");
    if (turn) {
        turns.innerHTML = 'black';
    } else {
        turns.innerHTML = 'white';
    }
}

function boardSet() {
    //ckeck board elements
    //

    let black_counter = 0;
    let white_counter = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            switch (board[i][j]) {
                case 1:
                    //console.log('white');
                    htmlBoard[i].cells[j].innerText = "○"
                    white_counter++;
                    break;
                case 2:
                    //console.log('black');
                    htmlBoard[i].cells[j].innerText = "●"
                    black_counter++;
                    break;
                case 0:
                    htmlBoard[i].cells[j].innerText = ""
                    break;
            }
        }
    }
    //黒と白の数を表示する
    let black = document.getElementById("black");
    let white = document.getElementById("white");

    let total = black_counter + white_counter;
    
    //黒が一つもなかったら
    if(black_counter === 0){
        alert("白の勝ち！");

    //白が一つもなかったら
    }else if(white_counter === 0){
        alert("黒の勝ち！");

    //置く場所がなかったら
    }else if(total >= 64){

        //数が多いほうの勝ち
        if(black_counter > white_counter){
            alert("黒の勝ち！");
        }else{
            alert("白の勝ち！");
        }
    }else{

    }
    black.innerHTML = black_counter;
    //console.log(black_counter);
    white.innerHTML = white_counter;
    //console.log(white_counter);
}
//Hint button
function hint() {
    console.log("hint!");
}

