import React from 'react';
import Key from './Key';

function Keyboard() {
  const keys1 = ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ'];
  const keys2 = ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ'];
  const keys3 = ['ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ'];

  return (
    <div className='keyboard'>
      <div className='line1'>
        {keys1.map((key, index) => {
          return <Key keyVal={key} key={index}></Key>;
        })}
      </div>
      <div className='line2'>
        {keys2.map((key, index) => {
          return <Key keyVal={key} key={index}></Key>;
        })}
      </div>
      <div className='line3'>
        <Key keyVal='입력' isBig={true}></Key>
        {keys3.map((key, index) => {
          return <Key keyVal={key} key={index}></Key>;
        })}
        <Key keyVal='삭제' isBig={true}></Key>
      </div>
    </div>
  );
}

export default Keyboard;
