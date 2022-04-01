import * as KoreanNounList from 'pd-korean-noun-list-for-wordles';

export const boardDefault = [
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
];

export const wordSet = new Set(new Set(KoreanNounList.ALL_NOUNS));
