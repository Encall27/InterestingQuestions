/*
function recur(n, cur) {
if (!cur) {
cur = 0;
}
if (n < 2) {
throw new Error('Invalid input');
}
if (n === 2) {
return 1 / n + cur;
}
return recur(n - 1, cur + 1 / (n * (n -1)));
}
This recur function represents a mathematics series. Please write a program doing the
same calculation without using recursive.
*/

const recur = (n) => {
   // throw error if n < 2
   if (n < 2) {
      throw new Error('Invalid input');
   }
   // initial variable cur
   let cur = 0;
   // for the case that n > 2
   while (n > 2) {
       cur += 1/(n*(n-1));
       --n;
   }
   // return result if n = 2
   return cur += 1/n;
}

// use O(1) space
// time complexity of O(n) => use a loop to iterate over the numbers from n down to 2
