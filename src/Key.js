import React, { useContext, useState } from 'react';
import { AppContext } from './App';

function Key({ keyVal, isBig }) {
  const { onEnter, onDelete, onSelectLetter } = useContext(AppContext);

  function enterKey() {
    if (keyVal === '입력') {
      onEnter();
      return;
    }
    if (keyVal === '삭제') {
      onDelete();
      return;
    }
    onSelectLetter(keyVal);
  }

  return (
    <div className='key' id={isBig && 'bigKey'} onClick={enterKey}>
      <p>{keyVal}</p>
    </div>
  );
}

export default Key;
