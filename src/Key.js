import React, { useContext, useState } from 'react';
import { AppContext } from './App';

function Key({ keyVal, isBig }) {
  const { board, setBoard } = useContext(AppContext);

  function enterKey() {
    if (keyVal == '입력') {
      console.log('입력');
      return;
    }
    if (keyVal == '삭제') {
      console.log('삭제');
      return;
    }
  }

  return (
    <div className='key' id={isBig && 'bigKey'} onClick={enterKey}>
      <p>{keyVal}</p>
    </div>
  );
}

export default Key;
