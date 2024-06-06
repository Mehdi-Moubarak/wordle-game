import React from 'react';
import LetterBox from './LetterBox';
import '../styles/GuessRow.css';

const GuessRow = ({ guess, solution }) => {
    const letters = guess.split('').concat(Array(5).fill(''));

    const getStatus = (letter, index) => {
        if (!letter) return '';
        if (solution[index] === letter) return 'green';
        if (solution.includes(letter)) return 'yellow';
        return 'gray';
    };

    return (
        <div className="guess-row">
            {letters.map((letter, index) => (
                <LetterBox key={index} letter={letter} status={getStatus(letter, index)} />
            ))}
        </div>
    );
};

export default GuessRow;
