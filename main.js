//ターン確認用
let turn = true;

//空の要素
let Empty = 0;
let White = 1;
let Black = 2;

//2dボード作成
//要素確認用
let board = new Array(8);
for (let i = 0; i < board.length; i++) {
    board[i] = new Array(8);
}

let board2 = new Array(8);
for (let i = 0; i < board2.length; i++) {
    board2[i] = new Array(8);
}
//ページ表示用ボードをhtmlのテーブルから取得
let htmlBoard = document.querySelectorAll("#boardinfo tr");
// const // constant immutable 
// let // mutable 

//クリックされた位置をScript側でその要素を取得
for (let i = 0; i < htmlBoard.length; i++) {
    for (let j = 0; j < htmlBoard.length; j++) {
        const select_cell = htmlBoard[i].cells[j];

        //特定の要素がクリックされた時の処理
        select_cell.addEventListener("click", function (e) {


            if (board[i][j] === 0) {
                //console.log(select_cell);
                if (!turn) {
                    board[i][j] = White;
                } else {
                    board[i][j] = Black;
                }
                const count = Reverse(i, j);
                //要素情報と一緒にReverse()を実行

                //周りにひっくりかえせる石があったら
                if (count > 0) {
                    turn = !turn;
                    checkTurn();
                    boardSet();
                    //console.log(board);
                    //console.log("next turn --");

                    let canclickspace = searchSpace();
                    if (canclickspace <= 0) {
                        alert(" のターンはスキップされました。");
                        turn = !turn;
                        checkTurn();

                    }
                } else {
                    //error
                    board[i][j] = 0;
                    alert("その場所には打つことができません。");
                    //console.log("cannot put your stone");
                    //console.log(board);
                }

            }
        });
    }
}

function Reverse(i, j) {
    let counter = 0;
    //console.log(counter);

    //let target = board[i][j];
    //console.log(target);

    //周りを確認する
    //console.log(counter);
    counter = counter + turnRight(i, j);
    //console.log(counter);
    counter = counter + turnLeft(i, j);
    //console.log(counter);
    //console.log('!!!');
    counter = counter + turnUp(i, j);
    //console.log(counter);
    counter = counter + turnDown(i, j);
    //console.log(counter);
    //console.log('-----------');
    counter = counter + turnRightDown(i, j);
    //console.log(counter);
    counter = counter + turnLeftUp(i, j);
    //console.log(counter);

    counter = counter + turnLeftDown(i, j);
    counter = counter + turnRightUp(i, j);

    return counter;
}
function turnUp(row, col) {
    let num = 0;
    let NextElement = 0;
    let PlaceColor = board[row][col];
    let top = 0;
    if (row !== top) {
        NextElement = board[row - 1][col];
    } else {
        return num;
    }

    //隣の要素が同じ、または要素なしかを確認
    if (PlaceColor !== NextElement && NextElement !== Empty) {

        //2個隣の要素確認
        for (let i = row - 2; i > 0; i--) {
            //console.log(board[i][col]);
            if (board[i][col] === Empty) {
                break;
            }
            if (board[i][col] === PlaceColor) {
                for (let j = row - 1; j > i - 1; j--) {
                    board[j][col] = PlaceColor;
                    console.log("turn up");
                    num++;
                }
                break;
            }
        }
    }
    return num;
}

function turnDown(row, col) {
    let num = 0;
    let NextElement = 0;
    let PlaceColor = board[row][col];
    let Bottom = board.length - 1

    if (row !== Bottom) {
        NextElement = board[row + 1][col];
    } else {
        return num;
    }

    if (PlaceColor !== NextElement && NextElement !== Empty) {

        for (let i = row + 2; i < board.length; i++) {
            //console.log(board[i][col]);
            if (board[i][col] === Empty) {
                break;
            }
            if (board[i][col] === PlaceColor) {
                for (let j = row + 1; j < i + 1; j++) {
                    board[j][col] = PlaceColor;
                    console.log("turn down");
                    num++;
                }
                break;
            }
        }
    }
    return num;
}

function turnRight(row, col) {
    let num = 0;
    let rightSideNextElement = board[row][col + 1];
    let PlaceColor = board[row][col];

    if (PlaceColor !== rightSideNextElement && rightSideNextElement !== Empty) {

        for (let i = col + 2; i < board.length; i++) {
            //console.log(board.length);
            if (board[row][i] === Empty) {
                break;
            }
            if (board[row][i] === PlaceColor) {
                for (let j = col + 1; j < i + 1; j++) {
                    board[row][j] = PlaceColor;
                    console.log("turn right");
                    num++;
                }
                break;
            }
        }
    }
    return num;
}

function turnLeft(row, col) {
    let num = 0;
    let leftSideNextElement = board[row][col - 1];
    let PlaceColor = board[row][col];

    if (PlaceColor !== leftSideNextElement && leftSideNextElement !== Empty) {

        for (let i = col - 2; i >= 0; i--) {
            //console.log(board[row][i]);
            if (board[row][i] === Empty) {
                break;
            }
            if (board[row][i] === PlaceColor) {
                for (let j = col - 1; j > i - 1; j--) {
                    board[row][j] = PlaceColor;
                    console.log("turn left");
                    num++;
                }
                break;
            }
        }
    }
    return num;
}

function turnRightDown(row, col) {
    let num = 0;
    let next = 0;
    let PlaceColor = board[row][col];
    if (row !== board.length - 1 && row !== board.length - 2) {
        next = board[row + 1][col + 1];
    } else {
        return num;
    }

    if (PlaceColor !== next && next !== Empty) {
        //console.log(next);

        for (let i = row + 2, ii = col + 2; i < board.length, ii < board.length; i++, ii++) {
            //console.log(board[i][ii]);
            if (board[i][ii] === Empty) {
                break;
            }
            if (board[i][ii] === PlaceColor) {
                for (let j = row + 1, jj = col + 1; j < i + 1, jj < ii + 1; j++, jj++) {
                    board[j][jj] = PlaceColor;
                    console.log("turn right down");
                    num++;

                }
                break;
            }
        }
    }
    return num;
}

function turnLeftUp(row, col) {
    let num = 0;
    let next = 0;
    let PlaceColor = board[row][col];
    if (row !== 0) {
        next = board[row - 1][col - 1];
    } else {
        return num;
    }

    if (PlaceColor !== next && next !== Empty) {
        //console.log(next);

        for (let i = row - 2, ii = col - 2; i >= 0, ii >= 0; i--, ii--) {
            //console.log(i+" and " +ii);
            if (board[i][ii] === Empty) {
                break;
            }
            if (board[i][ii] === PlaceColor) {
                for (let j = row - 1, jj = col - 1; j > i - 1, jj > ii - 1; j--, jj--) {
                    board[j][jj] = PlaceColor;
                    console.log("turn left up");
                    num++;

                }
                break;
            }
        }
    }
    return num;
}

function turnLeftDown(row, col) {
    let num = 0;
    let next = 0;
    if (row !== board.length - 1 && row !== board.length - 2) {
        next = board[row + 1][col - 1];
    } else {
        return num;
    }
    //console.log(next);

    if (board[row][col] !== next && board[row][col] !== 0 && next !== 0) {
        //console.log(next);

        for (let i = row + 2, ii = col - 2; i < board.length, ii > 0; i++, ii--) {
            console.log(board[i][ii]);
            if (board[i][ii] === 0) {
                break;
            }
            if (board[i][ii] === board[row][col]) {
                for (let j = row + 1, jj = col - 1; j < i + 1, jj > ii - 1; j++, jj--) {
                    board[j][jj] = board[row][col];
                    console.log("turn left down");
                    num++;

                }
                break;
            }
        }
    }
    return num;
}

function turnRightUp(row, col) {
    let num = 0;
    let next = 0;
    let top = 0;
    let PlaceColor = board[row][col];
    if (row !== top) {
        next = board[row - 1][col + 1];
    } else {
        return num;
    }

    //console.log(next);

    if (PlaceColor !== next && next !== Empty) {
        //console.log(next);

        for (let i = row - 2, ii = col + 2; ii < board.length, i >= 0; ii++, i--) {
            //console.log(board[i][ii]);
            if (board[i][ii] === Empty) {
                break;
            }
            if (board[i][ii] === PlaceColor) {
                for (let j = row - 1, jj = col + 1; jj < ii + 1, j > i - 1; jj++, j--) {
                    board[j][jj] = board[row][col];
                    console.log("turn right up");
                    num++;

                }
                break;
            }
        }
    }
    return num;
}

//Start button
function startGame() {

    //set 0 for all elements 
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = Empty;

            //勝利判定の実験
            //board[i][j] =  1;
        }
    }

    //white 1, black 2
    board[3][3] = White;
    board[3][4] = Black;
    board[4][3] = Black;
    board[4][4] = White;

    boardSet();

    //要素確認用ボードの結果をページ表示用ボードに反映
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
            let BoardCellInfo = htmlBoard[i].cells[j];
            let CellDiv = BoardCellInfo.getElementsByTagName('div');
            //let CellDiv = BoardCellInfo.querySelectorAll("div"); //この文がdivタグを
     
            //BoardCellInfo.className = "white_circle";
            //console.log(BoardCellInfo);  
            switch (board[i][j]) {
                case White:
                    //htmlBoard[i].cells[j].innerText = "○"
                    CellDiv.className = "white_circle";
                    //BoardCellInfo.appendChild(CellDiv); 
                    console.log(CellDiv);  
                    console.log(htmlBoard[i].cells[j]);
                    white_counter++;
                    break;
                case Black:
                    //htmlBoard[i].cells[j].innerText = "●"
                    CellDiv.className = "black_circle";
                    //BoardCellInfo.appendChild(CellDiv); 
                    console.log(CellDiv); 
                    console.log(htmlBoard[i].cells[j]); 
                    //add.appendChild(divElement); 
                    black_counter++;
                    break;
                case Empty:
                    //addedDiv.className = ""
                    //htmlBoard[i].cells[j].innerText = ""
                    break;
            }
        }
    }
    //黒と白の数を表示する
    let black = document.getElementById("black");
    let white = document.getElementById("white");

    let total = black_counter + white_counter;

    //黒が一つもなかったら
    if (black_counter === 0) {
        alert("白の勝ち！");

        //白が一つもなかったら
    } else if (white_counter === 0) {
        alert("黒の勝ち！");

        //置く場所がなかったら
    } else if (total >= 64) {

        //数が多いほうの勝ち
        if (black_counter > white_counter) {
            alert("黒の勝ち！");
        } else if (black_counter === white_counter) {
            alert("引き分け！");
        } else {
            alert("白の勝ち！");
        }
    } else {

    }
    black.innerHTML = black_counter;
    //console.log(black_counter);
    white.innerHTML = white_counter;
    //console.log(white_counter);
}
//Hint button
function hint() {
    console.log("hint!");

    let space = searchSpace();
    alert(space + "箇所打つことができます。");
}

function searchSpace() {

    let whosturn = 0;
    if (!turn) { //白のターンなら１
        whosturn = White;
    } else { //黒のターンなら２
        whosturn = Black;
    }

    //ボードをコピー
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board2[i][j] = board[i][j];
        }
    }

    let possible = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {

            if (board[i][j] === Empty) {
                board[i][j] = whosturn;

                //一つ一つの要素をチェック
                const each = Reverse(i, j);

                if (each > 0) {
                    possible++;
                    console.log(i + " and " + j);
                }
                //最初のデータにリセット
                for (let i = 0; i < board2.length; i++) {
                    for (let j = 0; j < board2[i].length; j++) {
                        board[i][j] = board2[i][j];
                    }
                }
            }
            //console.log(board);
        }
    }
    return possible;
}

