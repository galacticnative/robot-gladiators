// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

var fight = function (enemy) {

    // repeat and execute as long as the enemy robot is alive 
    while (playerInfo.health > 0 && enemy.health > 0) {
        // ask user if they'd like to fight or skip using fightOrSkip function
        if (fightOrSkip()) {
          // if true, leave fight by breaking loop
          break;
        }

        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
        //added Math.max in place of just enemy.health minus playerInfo.attack
        //generate random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );

        // check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");

            //award player money for winning
            playerInfo.money = playerInfo.money + 20;

            //leave while() loop since enemy is dead; added break to ensure enemy cannot fight when they are dead (cheap shots)
            break;
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        // remove player's health by subtracting the amount set in the enemy.attack variable
        //generate random playerInfo.health value after enemy.attack
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );

        // check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            //leave while() loop is player is dead; added break to be able to exit current loop
            break;
            while (enemy.health > 0 && playerInfo.health > 0);
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }

    }
};

var startGame = function () {
    //reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        //if player still alive, keep fighting
        if (playerInfo.health > 0) {
            // let user know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            // pick new enemy to fight based on the index of the enemy.names array
            var pickedEnemyObj = enemyInfo[i];

            // reset enemy.health before starting new fight
            //updated from enemy.health equal 50 to now a math function, Math.floor rounds down to nearest whole#
            //removed Math function, and called to randomNumber function with a min, max
            pickedEnemyObj.health = randomNumber(40, 60);

            // use debugger to pause script from running and check what's going on at that moment in the code
            //debugger;

            // pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
            fight(pickedEnemyObj);
        }

        //if we're not at the last enemy in the array
        if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
            //ask if user wants to use the store before next round
            var storeConfirm = window.confirm("The fight is over, visis the store before the next round?");

            //if yes, take them to the store()
            if (storeConfirm) {
                shop();
            }
        }

        //if player is not alive, stop the game
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }

    //after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
};

//function to end the entire game
var endGame = function () {
    //if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("The game has now ended. Let's see how you did!");
    }

    //ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function() {
    //ask player what they'd like to do (replaced the console.log)
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    //use SWITCH to carry out action
    switch (shopOptionPrompt) {
        case "REFILL": //new case
        case "refill":
            playerInfo.refillHealth();
            break;
        case "UPGRADE": //new case
        case "upgrade":
            playerInfo.upgradeAttack();
            break;
        case "LEAVE": //new case
        case "leave": 
            window.alert("Leaving the store.");

            //do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");

            //call shop() again to force player to pick a valid option
            shop();
            break;
    } 
};

//function to set name
var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
};

// function to generate a random numeric value
//added min, max within function parantheses
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
  
    return value;
};

var fightOrSkip = function() {
    // ask user if they'd like to fight or skip using  function
    var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
    // Conditional Recursive Function call - validate prompt answer
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }
  
    promptFight = promptFight.toLowerCase();
    // if user picks "skip" confirm and then stop the loop
    if (promptFight === "skip") {
      // confirm user wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playerMoney for skipping, but don't let them go into the negative
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            
            //return true if user wants to leave
            return true;
        }
    }
}

//removed player variables (playerName, playerHealth, playerAttack, playerMoney) and replaced with object
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enought money!");
        }
    }
};

// You can also log multiple values at once like this; removed console.log(playerInfo.name... Attack... Health)
//removed enemy.names, enemy.health, and enemy.attack and created objects
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

//start the game when the page loads
startGame();