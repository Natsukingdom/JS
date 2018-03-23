/**
 * 1からcount までの fizzbuzz を 実行するメソッド
 * @param {number} count いくつまでfizzbuzz を行うかを指定する数値.
 * @return {Array} fizzBuzzResult fizzbuzz の結果を 詰めた配列.
 */
function fizzBuzz(count) {
    'use strict';
    let fizzBuzzResult = []; // []で宣言してあげないとコケる.
    // new Array(hoge) という 宣言も可能。その場合、 hoge は int で、 長さが hoge の array を宣言したことになる。
    for (var i = 1; i <= count; i++) {
        if (i % 15 == 0) {
            fizzBuzzResult.push('FizzBuzz');
        } else if (i % 5 == 0) {
            fizzBuzzResult.push('Buzz');
        } else if (i % 3 == 0) {
            fizzBuzzResult.push('Fizz');
        } else {
            fizzBuzzResult.push(i);
        }
    }
    return fizzBuzzResult; // ruby ばっかり書いていて、return を 書くのを 最初は忘れてた。
}

let result = fizzBuzz(100);

for (value of result) {
    console.log(value);
}

for (value of result) {
    document.write(value);
    document.write('<br />')
}
