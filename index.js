// Define Card class
class Card {
    // properties = suit and value
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
}

// Define Deck class
class Deck {
    // properties = array that represents the deck of cards
    // Method: Constructor = initializes the deck of cards
    constructor() {
        this.cards = [];
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

        for (let suit of suits) {
            for (let value of values) {
                this.cards.push(new Card(suit, value));
            }
        }
    }

    // Method: Shuffle = this shuffles the deck
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
    
    //Method: dealCards = This deals 26 cards from the deck
    dealCards() {
        return this.cards.splice(0, 26);
    }
}

// Define Player class
class Player {
    // Properties = name, hand, and points
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.points = 0;
    }

    // Method: playCard = plays a card from the player's hand
    playCard() {
        return this.hand.pop();
    }

    // Method: addPoints = adds points to the player's total
    addPoints(points) {
        this.points += points;
    }
}

// Define Game class
class Game {
    // Properties: player1, player2, and deck
    constructor(player1Name, player2Name) {
        this.player1 = new Player(player1Name);
        this.player2 = new Player(player2Name);
        this.deck = new Deck();
    }

    // Method: initializeGame = initializes the game by shuffling the deck and dealing cards to the players
    initializeGame() {
        this.deck.shuffle();
        this.player1.hand = this.deck.dealCards();
        this.player2.hand = this.deck.dealCards();
    }

    // Method: playRound = plays a round of the game, comparing the cards played by each player and updating points accordingly
    playRound() {
        const card1 = this.player1.playCard();
        const card2 = this.player2.playCard();

        const value1 = this.getValue(card1.value);
        const value2 = this.getValue(card2.value);

        if (value1 > value2) {
            this.player1.addPoints(1);
        } else if (value1 < value2) {
            this.player2.addPoints(1);
        }
    }

    // Method: getValue = gives the numerical value of a card
    getValue(value) {
        const values = {
            '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
            'Jack': 11, 'Queen': 12, 'King': 13, 'Ace': 14
        };
        return values[value];
    }

    // Method: playGame = initiates and plays the entire game
    playGame() {
        this.initializeGame();
        for (let i = 0; i < 26; i++) {
            this.playRound();
        }
        this.declareWinner();
    }

    // Method: declareWinner = declares the winner of the game based on total points accumulated by each player and console.logs whether player1 or player2 wins and with how many points or if the game results in a tie.
    declareWinner() {
        if (this.player1.points > this.player2.points) {
            console.log(`${this.player1.name} wins with ${this.player1.points} points!`);
        } else if (this.player1.points < this.player2.points) {
            console.log(`${this.player2.name} wins with ${this.player2.points} points!`);
        } else {
            console.log("It's a tie!");
        }
    }
}

// Create and play the game
const warGame = new Game('Player 1', 'Player 2');
warGame.playGame();
