import React, { useState, createContext } from 'react';
import Board from './Board';
import Keyboard from './Keyboard';
import './App.css';
import { boardDefault } from './words';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  return (
    <div className='App'>
      <div className='main-container'>
        <nav>
          <h1>ㅇㅜㅓㄷㅡㄹ</h1>
        </nav>
        <AppContext.Provider value={{ board, setBoard }}>
          <Board></Board>
          <Keyboard></Keyboard>
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
