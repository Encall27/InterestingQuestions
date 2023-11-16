/*
your company is analyzing malware which targets numerical record files.

The malware uses a sliding window over the array of numbers in a file, and tries to match the following pattern:
T, -, - , X, -, -, -, T

Where the position 'X' is compared to each position 'T'.The window is moved so 'X passes through all the values.

The mallware has the following rules:
if any of the 'T' positions in the pattern are bigger or equal to 'X' the malware replaces 'x' with 0.

If the "X" position in the pattern is near the left or right border and is missing a 'T' position neighbor, only the other side is considered.

The malware finds all the positions first and only then sets them to 0.
*/ 

function simulate(entries) {
  const result = [];
  const length = entries.length;

  for (let i = 0; i < length; i++) {
    const x_position = entries[i];
    const t_left_position = entries[i - 3];
    const t_right_position = entries[i + 4];
    
    if ((t_right_position && t_right_position >= x_position) || (t_left_position && t_left_position >= x_position)) {
      result.push(0);
    } else {
      result.push(x_position);
    }
  }

  return result;
}

const records = [1, 2, 0, 5, 0, 2, 4, 3, 3, 3];
console.log(simulate(records));
// Expected output
// [1, 0, 0, 5, 0, 0, 0, 3, 3, 0]
