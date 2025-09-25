//1.
//function square(number) {
  //return number * number;
//}
//let X=parseFloat(prompt("Nhập số"))
//let result=square(X)
//document.write('Kết quả là '+result);

//2.
//function area circle(r){
  //return Math.PI*r*r
//}
//function perimeter(r){
  //return Math.PI*2*r
//}
//let R=parseFloat(prompt("Nhập bán kính:"))
//let result1=area circle(R)
//let result2=perimeter(R)
//document.write('Diện tích hình tròn là: '+result1.toFixed(2)+'<br>')
//document.write('Chu vi hình tròn là: '+result2.toFixed(2)+'<br>')

//3.
//function factorial(n) {
  //if (n < 0) {
    //return "Không có giai thừa cho số âm!";
  //}
  //let result = 1;
  //for (let i = 1; i <= n; i++) {
    //result *= i;
  //}
  //return result;
//}
//let number = parseInt(prompt("Nhập số nguyên để tính giai thừa:"));
//let output = factorial(number);
//document.write("Giai thừa của " + number + " là: " + output);

//4.
//function isDigit(char) {
  //return char.length === 1 && char >= '0' && char <= '9';
//}
//let input = prompt("Nhập một ký tự:");
//if (isDigit(input)) {
  //alert(input + " là ký tự số.");
//} else {
  //alert(input + " không phải ký tự số.");
//}

//5.
//function minOfThree(a, b, c) {
  //let min = a;
  //if (b < min) {
    //min = b;
  //}
  //if (c < min) {
    //min = c;
  //}
  //return min;
//}
//let x = parseInt(prompt("Nhập số nguyên thứ nhất:"));
//let y = parseInt(prompt("Nhập số nguyên thứ hai:"));
//let z = parseInt(prompt("Nhập số nguyên thứ ba:"));
//let result = minOfThree(x, y, z);
//alert("Số nhỏ nhất là: " + result);

//6.
//function isPositiveInteger(n) {
  //return Number.isInteger(n) && n > 0;
//}
//let num = parseFloat(prompt("Nhập một số:"));
//if (isPositiveInteger(num)) {
  //alert(num + " là số nguyên dương");
//} else {
  //alert(num + " KHÔNG phải số nguyên dương");
//}

//7.
//function swap(a, b) {
  //[a, b] = [b, a];
  //return [a, b];
//}
//let x = parseInt(prompt("Nhập số nguyên thứ nhất:"));
//let y = parseInt(prompt("Nhập số nguyên thứ hai:"));
//let result = swap(x, y);
//document.write("Sau khi đổi chỗ: x = " + result[0] + ", y = " + result[1]);

//8.
//function reverseArray(arr) {
  //return arr.reverse();
  //let newArr = [];
  //for (let i = arr.length - 1; i >= 0; i--) {
    //newArr.push(arr[i]);
  //}
  //return newArr;
//}
//let numbers = [1, 2, 3, 4, 5];
//let reversed = reverseArray(numbers);
//document.write("Mảng ban đầu: " + numbers + "<br>");
//document.write("Mảng đảo ngược: " + reversed);

//9.
function checkCharInArray(arr, char) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === char) {
      count++;
    }
  }
  return count > 0 ? count : -1;
}
let arr = ['a', 'b', 'c', 'a', 'd', 'a', 'e'];
let char = prompt("Nhập ký tự cần kiểm tra:");
let result = checkCharInArray(arr, char);
if (result === -1) {
  document.write("Ký tự '" + char + "' không có trong mảng.");
} else {
  document.write("Ký tự '" + char + "' xuất hiện " + result + " lần trong mảng.");
}