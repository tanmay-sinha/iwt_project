var scores, roundScore, activePlayer;
var gamePlaying = true;

init();

// Clicking the button to roll the dice
document.querySelector(".btn-roll").addEventListener("click", function () {
    if (gamePlaying) {
        // 1. Get the random number
        var dice = Math.floor((Math.random() * 6)) + 1;


        // 2. Display the result
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.style.height = "300";
        diceDOM.style.width = "300";
        diceDOM.src = "dice-" + dice + ".jpg";


        // 3. Update the roundScore, but only if that's not 1
        if (dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;

        } else {
            // Next player
            document.querySelector(".btn-hold").disabled = true;
            document.querySelector(".btn-roll").disabled = true;
            setTimeout(() => {
                nextPlayer();
            }, 2000)
        }
    }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
    if (gamePlaying) {
        // Add currentScore to globalScore
        scores[activePlayer] += roundScore;

        // Update the UI to show the globalScore
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            nextPlayer()
        }
    }
})

function nextPlayer() {
    //Next player with ternary operator
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector(".btn-hold").disabled = false;
    document.querySelector(".btn-roll").disabled = false;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    document.querySelector(".dice").style.display = "none";
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    document.querySelector(".player-0-panel").classList.add("active");;
}

// Clicking for instructions
document.querySelector(".instructions").addEventListener("click", function () {
    document.querySelector(".modal").classList.add("show");
    document.querySelector(".close").addEventListener("click", function () {
        document.querySelector(".modal").classList.remove("show");
    });
});
