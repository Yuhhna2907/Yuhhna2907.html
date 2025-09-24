//1.
//let a = [
  //[1, 2, 1, 24],
  //[8, 11, 9, 4],
  //[7, 0, 7, 27],
  //[7, 4, 28, 14],
  //[3, 10, 26, 7]
//];
//for (let i = 0; i < a.length; i++) {
  //document.write("row " + i + "<br>");
  //for (let j = 0; j < a[i].length; j++) {
    //document.write(" " + a[i][j] + "<br>");
  //}
//}

//2.
//let array=['y','u','h','h','n','a',2,9,0,7]
//document.write('Mảng ban đầu là '+array+'<br>');
//document.write('Mảng sau khi đảo ngược là ');
//for(let i=array.length-1;i>=0;i--){
  //document.write(array[i]);
//}

//3.
//let array = ["a", "1", "b", "9", "c", "3", "x", "!", "5"];
//let count = 0;
//for (let i = 0; i < array.length; i++) {
  //if (!isNaN(array[i]) && array[i] >= "0" && array[i] <= "9") {
    //count++;
  //}
//}
//document.write("Mảng: " + array.join(", ") + "<br>");
//document.write("Số lượng ký tự số (0-9) trong mảng là: " + count);

//4.
//let string=prompt('Nhập một chuỗi:')
//let array = string.split(" ");
//let count = 0;
//for (let i = 0; i < array.length; i++) {
  //if (array[i] !== "") {
  //}
//}
//document.write("Chuỗi: " + string + "<br>");
//document.write("Số từ trong chuỗi là: " + count);

//5.
//let str1 = prompt("Nhập chuỗi thứ nhất:");
//let str2 = prompt("Nhập chuỗi thứ hai:");
//if (str1 === str2) {
  //document.write("Hai chuỗi giống nhau.");
//} else {
  //document.write("Hai chuỗi KHÔNG giống nhau.");
//}

//6.
let array = ['a', '-', 'b', 'c', '-', 'd', 'e', '-'];
document.write("Mảng ban đầu: " + array.join(" ") + "<br>");
for (let i = 0; i < array.length; i++) {
  if (array[i] === '-') {
    array[i] = '_';
  }
}
document.write("Mảng sau khi thay thế: " + array.join(" "));

