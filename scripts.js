"use strict";

/*ROLL THE DICE PROJECT */

//var to store the random number
let Rand = 0;
//var to store the current player turn "Player1 Or Player2"
let PlayerTurn = 'Player1';
let WinnerName ="";
//object to hold 
let Score = {
    Player1Current :0,
    Player1Total:0,

    Player2Current:0,
    Player2Total:0
}


//get the dom elements

//game buttons and pic
let newGameBtn  = document.querySelector(".new-game-btn");
let dicePic = document.querySelector(".dice-pic");

let rollDiceBtn = document.querySelector(".roll-dice-btn");
let holdBtn = document.querySelector(".hold-btn");

//players total scores
let player1TotalScore = document.querySelector(".player1-total-score");
let player2TotalScore = document.querySelector(".player2-total-score");

//players current scores
let player1CurrentScore = document.querySelector(".player1-current-score");
let player2CurrentScore = document.querySelector(".player2-current-score");

//players Containers
let Player1Container = document.querySelector(".player1");
let Player2Container = document.querySelector(".player2");

//winner screen dom effects
let WinnerOverLay = document.querySelector(".winner-overlay");
let MessageBox = document.querySelector(".winner-message-container");
let Winner  = document.querySelector(".winner-name");
let CloseBtn = document.querySelector(".close-btn");


//generating a random number function
function getRandomNumber(min, max)
  {
    return Math.trunc (Math.random() * (max - min+1) + min);
  }

  //Roll The dice function
  function RollTheDice()
  {
    rollDiceBtn.addEventListener("click",()=>{

        //Roll the dice
        PerformDiceRoll();

        //update the current score otherwise switch the player turn
        if(Rand != 1)
            {
                UpdateCurrentScore();
            }
        else
        {
            SetCurrentScoresToZero();
            SwitchPlayerTurn();
        }
        
    })
  }

  //display the dice with random value
  function PerformDiceRoll()
  {
    //set the dice pic to visible
    dicePic.style.visibility = "visible";
    Rand = getRandomNumber(1,6);

    //select one of the dice pics randomly
    dicePic.src = `${Rand}.png`;
  }

  //Update Players Current Score
  function UpdateCurrentScore(){
    if(PlayerTurn==='Player1')
        {
           
            Score.Player1Current += Rand;
            player1CurrentScore.textContent = Score.Player1Current;
        }     
        
        else if(PlayerTurn==='Player2')
            {
               
                Score.Player2Current += Rand;
                player2CurrentScore.textContent =  Score.Player2Current;
                        
            }

  }

  //set Current scores to 0
  function SetCurrentScoresToZero()
  {
    if(PlayerTurn==='Player1')
        {
            Score.Player1Current = 0;
            player1CurrentScore.textContent = Score.Player1Current;
        }
        else if(PlayerTurn==='Player2')
            {
                Score.Player2Current = 0;
                player2CurrentScore.textContent = Score.Player2Current;
            }
  }

  //switch player turn
  function SwitchPlayerTurn()
  {
    if(PlayerTurn==="Player1")
        {
            PlayerTurn = "Player2";
            Player1Container.style.opacity = "0.6";
            Player2Container.style.opacity = "1";

        }
        else if(PlayerTurn==="Player2")
            {
                PlayerTurn="Player1";
                Player1Container.style.opacity = "1";
                Player2Container.style.opacity = "0.6";
            }
  }

  //render total scores on the screen
  function RenderTotalScores(TotalScoreElement , Value)
  {
    TotalScoreElement.textContent = Value;
  }

  //add the current score to the total score
  function HoldScore()
  {
     holdBtn.addEventListener("click",()=>{

        if(PlayerTurn==="Player1")
            {
                Score.Player1Total += Score.Player1Current;
                RenderTotalScores(player1TotalScore,Score.Player1Total)
            }
            else if(PlayerTurn==="Player2")
                {
                    Score.Player2Total+= Score.Player2Current
                    RenderTotalScores(player2TotalScore,Score.Player2Total)

                }

                SetCurrentScoresToZero();

                if(IsThereAWinner())
                    {
                        //show winner here
                        DecideWhoWonTheGame();
                        ShowWinnerMessage();
                        ChangeButtonsEnabledStatus();
                        
                    }
                    else
                    SwitchPlayerTurn();
     });
  }

  //check is there is a winner
  function IsThereAWinner()
  {
    return (Score.Player1Total >= 100 || Score.Player2Total >=100);
  }

  function DecideWhoWonTheGame()
  {
    if(Score.Player1Total >= 100)
        {
            WinnerName = "Player 1";
        }
        else
        {
            WinnerName = "Player 2";
        }
  }

  function ShowWinnerMessage()
  {
    WinnerOverLay.style.display = "block";
    MessageBox.style.display = "flex";
    Winner.textContent = `🎉🎊🎈 ${WinnerName} Has Won The Game 🎉🎊🎈`
  }

  function HideWinnerMessage()
  {
    CloseBtn.addEventListener("click",()=>{
        WinnerOverLay.style.display = "none";
        MessageBox.style.display = "none";
    });
   
  }

  //reset the game
  function ResetTheGame()
  {
    newGameBtn.addEventListener("click",()=>{
        Score.Player1Total=0;
        Score.Player2Total=0;
        PlayerTurn= "Player2";
        RenderTotalScores(player1TotalScore,Score.Player1Total)
        RenderTotalScores(player2TotalScore,Score.Player2Total)
        dicePic.style.visibility = "hidden";
        ChangeButtonsEnabledStatus();
        SwitchPlayerTurn();
       
    });
  }

  function ChangeButtonsEnabledStatus()
  {
     if(holdBtn.disabled)
        {
            holdBtn.disabled= false
        }
        else
        holdBtn.disabled = true;

        if(rollDiceBtn.disabled)
            {
                rollDiceBtn.disabled = false
            }
            else
                rollDiceBtn.disabled  = true;
  }

  function PlayGame()
  {
    //run the game
  RollTheDice();

  HoldScore();

  HideWinnerMessage();

  ResetTheGame();
  }

PlayGame();
  