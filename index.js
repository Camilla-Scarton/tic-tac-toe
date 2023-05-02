let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let msgRef = document.querySelector("#message");

let newGameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");

// Board indexes: (first row ->) 0 1 2 (second row ->) 3 4 5 (third row ->) 6 7 8
let winningPattern = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

// X first, O second
let xTurn = true;
let count = 0;

// Disabled all buttons to finish game
const disableButtons = () => {
    btnRef.forEach(btn => btn.disabled = true);
    popupRef.classList.remove("hide");   
}

// Function to close popup and reset board 
const resetBoard = () => {
    btnRef.forEach(btn => {
        btn.innerText = "";
        btn.disabled = false;
    });
    popupRef.classList.add("hide"); 
}

newGameBtn.addEventListener("click", () => {
    count = 0;
    xTurn = true;
    resetBoard();
})

restartBtn.addEventListener("click", () => {
    count = 0;
    xTurn = true;
    btnRef.forEach(btn => {
        btn.innerText = "";
        btn.disabled = false;
    });
})

// Game logic
const winChecker = () => {
    for (let pattern of winningPattern) {
        // winnigPattern gives us indexes, btnRef gives us the actual plays
        let [mark1, mark2, mark3] = [ btnRef[pattern[0]].innerText, btnRef[pattern[1]].innerText, btnRef[pattern[2]].innerText ];
        //if mark1 == mark2 == mark3, X wins, O wins or they are all empty!
        if (mark1 == mark2 && mark2 == mark3 && mark1 != "") {
            msgRef.innerHTML = `&#x1F389; <br> ${mark1} wins!`;
            disableButtons();
        }
    }
}

// Display X/O on click
btnRef.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.innerText = xTurn ? "X" : "O";
        xTurn = !xTurn;
        btn.disabled = true;
        count++;
        if (count === 9) {
            msgRef.innerHTML = `&#x1F60E; <br> It's a Draw! <br> No winner this time!`;
            disableButtons();
        }
        if (count > 2) winChecker();
    })
})