import React, { useContext, useEffect } from 'react';
import { AppContext } from './App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

function GameOver() {
  const {
    gameOver,
    correctWord,
    currAttempt,
    copyAlertControl,
    setCopyAlertControl,
    fadeInAnimation,
    setFadeInAnimation,
    fadeOutAnimation,
    setFadeOutAnimation,
    closeGameOverModal,
    setCloseGameOverModal,
  } = useContext(AppContext);

  useEffect(() => {
    setFadeInAnimation('fade-in-animation');
    let fadeOutAnimation = setTimeout(() => {
      setFadeOutAnimation('fade-out-animation');
    }, 2000);
    let timerAlert = setTimeout(() => {
      setCopyAlertControl(false);
    }, 3000);
    return () => {
      clearTimeout(timerAlert);
      clearTimeout(fadeInAnimation);
      clearTimeout(fadeOutAnimation);
      setFadeInAnimation('');
      setFadeOutAnimation('');
    };
  }, [copyAlertControl]);

  const copyResult = () => {
    const letterDiv = document.getElementsByClassName('letter');
    const finalAttempt = gameOver.guessedWord ? currAttempt.attempt : 'X';
    let result = [[`오늘의워들 ${finalAttempt}/6`], ['개행']];
    for (let i = 0; i < letterDiv.length; i++) {
      if (i % 6 === 0 && i < 6 * currAttempt.attempt) {
        result.push('개행');
      }
      if (letterDiv[i].id === 'correct') {
        result.push('💚');
      }
      if (letterDiv[i].id === 'almost') {
        result.push('💛');
      }
      if (letterDiv[i].id === 'error') {
        result.push('🤍');
      }
    }
    result = result.join('');
    result = result.split('개행');
    result.push([], ['yujibug.github.io/daywordle #오늘의워들']);
    result = result.join('\r\n');
    doCopy(result);
  };

  const doCopy = (text) => {
    // 흐름 1.
    if (navigator.clipboard) {
      // (IE는 사용 못하고, 크롬은 66버전 이상일때 사용 가능합니다.)
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopyAlertControl(true);
        })
        .catch(() => {
          alert('복사를 다시 시도해주세요.');
        });
    } else {
      // 흐름 2.
      if (!document.queryCommandSupported('copy')) {
        return alert('복사하기가 지원되지 않는 브라우저입니다.');
      }

      // 흐름 3.
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.top = 0;
      textarea.style.left = 0;
      textarea.style.position = 'fixed';

      // 흐름 4.
      document.body.appendChild(textarea);
      // focus() -> 사파리 브라우저 서포팅
      textarea.focus();
      // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
      textarea.select();
      // 흐름 5.
      document.execCommand('copy');
      // 흐름 6.
      document.body.removeChild(textarea);
      setCopyAlertControl(true);
    }
  };

  const modalState = closeGameOverModal ? 'invisible' : '';

  return (
    <div className={`modal ${modalState}`}>
      {copyAlertControl && (
        <div className='alert-wrapper'>
          <div className={`alert ${fadeInAnimation} ${fadeOutAnimation}`}>
            복사 되었습니다
          </div>
        </div>
      )}
      <div className='gameover-modal-body modal-body'>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className='xMark'
          onClick={() => {
            setCloseGameOverModal(true);
          }}
        />
        <h1>{gameOver.guessedWord ? '잘했어요!' : '아쉬워요'}</h1>
        <h2>정답 :</h2>
        {correctWord.map((letter, index) => {
          return (
            <div className='gameover-letter' id='correct' key={index}>
              {letter}
            </div>
          );
        })}
        <div className='btn-wrapper'>
          <button className='btn' onClick={copyResult}>
            결과 복사
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameOver;
