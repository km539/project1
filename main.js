//get board info
//const board = document.querySelector(".component");
console.log(board);
const nextTurn = "";

let members = ['black', 'white'];

let osero = ['○', '●'];
//reset button
function startGame(){
    console.log("started");

    r3c3.innerHTML=osero[0];
    r3c4.innerHTML=osero[1];

    r4c3.innerHTML=osero[1];
    r4c4.innerHTML=osero[0];

    document.getElementById("turn").innerHTML = members[0];
}

//hint button
function hint(){
    console.log("hint!");
}

//おけるスペースか確認
function iffreespace(){
    consolek.log("space");
}