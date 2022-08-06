
/**
 * Inserts a certain character until a has the desired length
 * e.g. padLeft('foo', 5, '_') -> '__foo'
 * e.g. padLeft(  '2', 2, '0')   -> '02'
 */
function padLeft(val, num, str) {
	return '00000'.replace(/0/g, str).slice(0, num - val.length) + val;
}

// YOUR CODE GOES HERE

// Function returns a string that is a combination of `val` character and `str`.
// `num` specifies the length of the string. But max length is 5.
// `str` is a string that inserted into the final string and aligned to the right.
// `val` is a placeholder character, that fills empty characters that not occupied with `str`

// EXAMPLES

// padLeft('foo', 5, '_') -> '__foo'
// Steps: '00000' -> '_____' -> '__' -> '__foo'

// padLeft(  '2', 2, '0')   -> '02'
// Steps: '00000' -> '00000' -> '0' -> '02'

module.exports = padLeft;