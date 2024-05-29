import React from 'react';
import '../styles/LetterBox.css';

const LetterBox = ({ letter, status }) => {
    return <div className={`letter-box ${status}`}>{letter}</div>;
};

export default LetterBox;
