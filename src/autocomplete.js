const fs = require('fs');
const REP_LENGTH = 7;

const Trie = function(words, _lvl = 0) {
  var leaf = this;
  this.rep = words.slice(0, REP_LENGTH);

  words.forEach(word => {
    var char = word[_lvl];
    if (leaf[char]) {
      leaf[char].push(word);
    } else {
      leaf[char] = [word];
    }
  });

  for (let key in this) {
    if (key.length === 1) {
      this[key] = new Trie(this[key], _lvl + 1);
    }
  }
}

var dict = fs.readFileSync('./en_50k.txt', 'utf8').split('\n');

var trie = new Trie(dict);

// the following code provides a simple terminal interface

// console.log("Enter prefix for autocompletion choices, or enter 'quit' to end");
// process.stdin.resume();
// process.stdin.setEncoding('utf8');
// var util = require('util');
//
// process.stdin.on('data', function (text) {
//   var string = util.inspect(text);
//   string = string.slice(1, string.length - 3);
//   var current = trie;
//
//   for (var i = 0; i < string.length && current[string[i]]; i++) {
//       current = current[string[i]];
//   }
//
//   if (current.rep && i === string.length) {
//     console.log(current.rep);
//   }
//
//   if (text === 'quit\n') {
//     done();
//   }
// });
//
// function done() {
//   process.exit();
// }
