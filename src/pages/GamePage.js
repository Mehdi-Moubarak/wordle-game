import React, { useState } from 'react';
import { getRandomWord } from '../utils/wordList';
import GuessRow from '../components/GuessRow';
import '../styles/GamePage.css';

const GamePage = () => {
    const [solution, setSolution] = useState(getRandomWord);
    const [guesses, setGuesses] = useState(Array(6).fill('')); // Initialize with 6 empty guesses
    const [currentGuess, setCurrentGuess] = useState('');
    const [currentRow, setCurrentRow] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentGuess.length !== solution.length) return; // Ensure guess length matches the solution length

        const newGuesses = guesses.slice();
        newGuesses[currentRow] = currentGuess; // Update the current row with the guess
        setGuesses(newGuesses);

        if (currentGuess === solution) {
            setGameWon(true);
            setGameOver(true);
        } else if (currentRow === guesses.length - 1) {
            setGameOver(true);
        } else {
            setCurrentRow(currentRow + 1); // Move to the next row
        }

        setCurrentGuess('');
    };

    const handleRestart = () => {
        setSolution(getRandomWord());
        setGuesses(Array(5).fill(''));
        setCurrentGuess('');
        setCurrentRow(0);
        setGameOver(false);
        setGameWon(false);
    };

    return (
        <div className="game-page">
            <h1>Wordly Game</h1>
            {guesses.map((guess, index) => (
                <GuessRow key={index} guess={guess} solution={solution} />
            ))}
            {!gameOver && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={currentGuess}
                        onChange={(e) => setCurrentGuess(e.target.value)}
                        maxLength={solution.length}
                        disabled={gameOver}
                    />
                    <button type="submit" disabled={gameOver}>Guess</button>
                </form>
            )}
            {gameOver && (
                <div className="game-over">
                    {gameWon ? <p>Congratulations! You guessed the word!</p> : <p>Game over! The word was {solution}.</p>}
                    <button onClick={handleRestart}>Play Again</button>
                </div>
            )}
        </div>
    );
};

export default GamePage;
