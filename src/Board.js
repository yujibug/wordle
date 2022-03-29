import React, { useContext } from 'react';
import Letter from './Letter';
import { AppContext } from './App';

function Board() {
  const { notWord, currAttempt } = useContext(AppContext);
  const isNotWord = currAttempt.letterPos === 6 && notWord;
  return (
    <div className='board'>
      <div className='row' id={isNotWord && 'notWord'}>
        <Letter letterPos={0} attemptVal={0}></Letter>
        <Letter letterPos={1} attemptVal={0}></Letter>
        <Letter letterPos={2} attemptVal={0}></Letter>
        <Letter letterPos={3} attemptVal={0}></Letter>
        <Letter letterPos={4} attemptVal={0}></Letter>
        <Letter letterPos={5} attemptVal={0}></Letter>
      </div>
      <div className='row' id={isNotWord && 'notWord'}>
        <Letter letterPos={0} attemptVal={1}></Letter>
        <Letter letterPos={1} attemptVal={1}></Letter>
        <Letter letterPos={2} attemptVal={1}></Letter>
        <Letter letterPos={3} attemptVal={1}></Letter>
        <Letter letterPos={4} attemptVal={1}></Letter>
        <Letter letterPos={5} attemptVal={1}></Letter>
      </div>
      <div className='row' id={isNotWord && 'notWord'}>
        <Letter letterPos={0} attemptVal={2}></Letter>
        <Letter letterPos={1} attemptVal={2}></Letter>
        <Letter letterPos={2} attemptVal={2}></Letter>
        <Letter letterPos={3} attemptVal={2}></Letter>
        <Letter letterPos={4} attemptVal={2}></Letter>
        <Letter letterPos={5} attemptVal={2}></Letter>
      </div>
      <div className='row' id={isNotWord && 'notWord'}>
        <Letter letterPos={0} attemptVal={3}></Letter>
        <Letter letterPos={1} attemptVal={3}></Letter>
        <Letter letterPos={2} attemptVal={3}></Letter>
        <Letter letterPos={3} attemptVal={3}></Letter>
        <Letter letterPos={4} attemptVal={3}></Letter>
        <Letter letterPos={5} attemptVal={3}></Letter>
      </div>
      <div className='row' id={isNotWord && 'notWord'}>
        <Letter letterPos={0} attemptVal={4}></Letter>
        <Letter letterPos={1} attemptVal={4}></Letter>
        <Letter letterPos={2} attemptVal={4}></Letter>
        <Letter letterPos={3} attemptVal={4}></Letter>
        <Letter letterPos={4} attemptVal={4}></Letter>
        <Letter letterPos={5} attemptVal={4}></Letter>
      </div>
      <div className='row' id={isNotWord && 'notWord'}>
        <Letter letterPos={0} attemptVal={5}></Letter>
        <Letter letterPos={1} attemptVal={5}></Letter>
        <Letter letterPos={2} attemptVal={5}></Letter>
        <Letter letterPos={3} attemptVal={5}></Letter>
        <Letter letterPos={4} attemptVal={5}></Letter>
        <Letter letterPos={5} attemptVal={5}></Letter>
      </div>
    </div>
  );
}

function Inputs() {
  return (
    <div>
      <div className='input'></div>
      <div className='input'></div>
      <div className='input'></div>
      <div className='input'></div>
      <div className='input'></div>
      <div className='input'></div>
    </div>
  );
}

export default Board;
