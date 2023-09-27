export const getRandomPos = (arr) => Math.floor(Math.random() * arr.length) + 1;

export const splitMapReturnObjs = (arr) =>
  arr.split(" ").map((phrase, index) => {
    return {
      phrase: index < 1 ? phrase : " " + phrase,
      index,
    };
  });

export const filterWordIndex = (arr, counter) =>
  arr.filter((word) => word.index !== counter);

export const getFullScore = (arr) =>
  arr.reduce((acc, num) => acc = acc + num, 0);


export const filterCorrect = (arr) => arr.filter((obj)=>obj.correct).length

export const sortScores = (arr) => arr.sort((a,b)=>b.score-a.score) 