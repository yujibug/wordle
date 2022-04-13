import * as KoreanNounList from 'pd-korean-noun-list-for-wordles';

const Hangul = require('hangul-js');

export const boardDefault = [
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
];

const disassembleWords = (words) => {
  let newWords = [];
  words.forEach((word) => {
    newWords.push(Hangul.disassemble(word));
  });
  return newWords;
};

const disassembleLetter = (words) => {
  words.forEach((word) => {
    for (let i = 0; i < word.length; i++) {
      if (word[i] === 'ㄲ') {
        word.splice(i, 1, 'ㄱ', 'ㄱ');
      }
      if (word[i] === 'ㄸ') {
        word.splice(i, 1, 'ㄷ', 'ㄷ');
      }
      if (word[i] === 'ㅃ') {
        word.splice(i, 1, 'ㅂ', 'ㅂ');
      }
      if (word[i] === 'ㅆ') {
        word.splice(i, 1, 'ㅅ', 'ㅅ');
      }
      if (word[i] === 'ㅉ') {
        word.splice(i, 1, 'ㅈ', 'ㅈ');
      }
      if (word[i] === 'ㅐ') {
        word.splice(i, 1, 'ㅏ', 'ㅣ');
      }
      if (word[i] === 'ㅔ') {
        word.splice(i, 1, 'ㅓ', 'ㅣ');
      }
      if (word[i] === 'ㅖ') {
        word.splice(i, 1, 'ㅕ', 'ㅣ');
      }
    }
  });

  return words;
};

const filterwords = (words) => {
  return words.filter((word) => word.length === 6);
};

const pickWord = (words) => {
  return words[Math.floor(Math.random() * words.length)];
};

const disassembledWords = disassembleWords(KoreanNounList.COMMON_NOUNS);
const disassembledLetter = disassembleLetter(disassembledWords);
const filteredWords = filterwords(disassembledLetter);

export const todaysWord = pickWord(filteredWords);
KoreanNounList.ALL_NOUNS.push('붐업', '승훈', '윤홍', '고구미');
export const wordSet = new Set(KoreanNounList.ALL_NOUNS);
