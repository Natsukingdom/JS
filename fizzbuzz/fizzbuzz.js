// 1からcount までの fizzbuzz を 実行するメソッド
function showFizzBuzz(count) {
    'use strict';
    let fizzbuzz_result = []; // []で宣言してあげないとコケる.
    // new Array(hoge) という 宣言も可能。その場合、 hoge は int で、 長さが hoge の array を宣言したことになる。
    for (var i = 1; i <= count; i++) {
        if (i % 15 == 0) {
            fizzbuzz_result.push('FizzBuzz');
        } else if (i % 5 == 0) {
            fizzbuzz_result.push('Buzz');
        } else if (i % 3 == 0) {
            fizzbuzz_result.push('Fizz');
        } else {
            fizzbuzz_result.push(i);
        }
    }
    return fizzbuzz_result; // ruby ばっかり書いていて、return を 書くのを 最初は忘れてた。
}

let result = showFizzBuzz(100);

for (value of result) {
    console.log(value);
}

for (value of result) {
    document.write(value);
    document.write('<br />')
}
