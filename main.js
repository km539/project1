//get board info
//const board = document.querySelector(".component");


let osero = ['○', '●'];

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
        
        //特定の要素がクリックされたら
        select_cell.addEventListener("click", function (e) {
            //console.log(select_cell);
            // console.log(e.target);
            if(select_cell === ''){
                console.log(select_cell);
            }
        });


    }
}



//reset button
function startGame() {
    //console.log("started");
    //set 0 for all elements 
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = 0;
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

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            switch (board[i][j]) {
                case 1:
                    //console.log('white');
                    htmlBoard[i].cells[j].innerText = "○"
                    break;
                case 2:
                    //console.log('black');
                    htmlBoard[i].cells[j].innerText = "●"
                    break;
                case 0:
                    htmlBoard[i].cells[j].innerText = ""
                    break;
            }
        }
    }
}
//hint button
function hint() {
    console.log("hint!");
}

//おけるスペースか確認
function iffreespace() {
    consolek.log("space");
}