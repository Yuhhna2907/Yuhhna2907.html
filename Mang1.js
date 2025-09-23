//1.
//let array=[5,12,7,18,3,10,25,9,11,30]
//let count =0
//for(let i=0;i<array.length;i++){
  //if(array[i]>=10){
    //count++
  //}
//}
//document.write("Trong mảng có "+count+' số nguyên lớn hơn hoặc bằng 10');

//2.
//let array=[15,7,22,5,9,33,18,2,27,11]
//let max=array[0]
//let index=0
//for(let i=0;i<array.length;i++){
  //if(array[i]>max){
    //max=array[i]
    //index=i
  //}
//}
//document.write('Phần tử lớn nhất trong mảng là '+ max +' tại vị trí '+index+'<br>')

//3.
//let array = [12, 5, 20, 8, 15, 30, 4, 18];
//let max=array[0]
//let sum=0
//for (let i = 0; i < array.length; i++) {
  //if (array[i] > max) {
    //max = array[i]
  //}
  //sum += array[i]
//}
//let average=sum/array.length;
//document.write('Giá trị lớn nhất trong mảng là '+max +'<br>')
//document.write("Giá trị trung bình của mảng là " + average +'<br>')

//4.
//let array = [1,2,3,4,5,6,7,8,9,10];
//let first = 0;
//let last = array.length - 1;
//(cách 1)let reverse=array.reverse()
//(cách 2)let reverse = []
//for (let i=array.length-1; i>=0;i--){
  //reverse.push(array[i]);
//}
//document.write(reverse.join(","));
//(cách 3)
//while (first < last) {
  //let item = array[first];
  //array[first] = array[last]
  //array[last] = item
  //first++
  //last--;
//}
//document.write(array.join(','))

//5.
//let array=[5,-3.12,-7,0,-1,9,4,-6,8]
//let count=0
//for (let i=0;i<array.length;i++){
  //if (array[i]<0){
    //count++
  //}
//}
//document.write("Trong mảng có "+ count+' số nguyên âm')

//6.
//let array = [5, 12, 7, 9, 21, 3, 14, 8, 1, 30];
//let V = parseInt(prompt("Nhập số nguyên V:"));
//if (array.indexOf(V) !== -1) {
  //document.write(V + " is in the array.");
//} else {
  //document.write(V + " is not in the array.");
//}

//7.
//let array = [5, 12, 7, 9, 21, 3, 14, 8, 1, 30];
//let V = parseInt(prompt("Nhập số nguyên V:"));
//document.write("Mảng ban đầu: " + array + "<br>");
//let index = array.indexOf(V);
//if (index !== -1) {
  //for (let i = index; i < array.length - 1; i++) {
    //array[i] = array[i + 1];
  //}
  //array[array.length - 1] = 0;
  //document.write("Đã xóa " + V + " khỏi mảng.<br>");
  //document.write("Mảng sau khi xóa: " + array);}
//else {
  //document.write(V + " không có trong mảng.");}

//8.
//let array = [5, 12, 7, 9, 21, 3, 14, 8, 1, 30];
//document.write("Mảng ban đầu: " + array + "<br>");
//for (let i = 0; i < array.length - 1; i++) {
  //for (let j = i + 1; j < array.length; j++) {
    //if (array[i] < array[j]) {
      //let temp = array[i];
      //array[i] = array[j];
      //array[j] = temp;
    //}
  //}
//}
//document.write("Mảng sau khi sắp xếp giảm dần: " + array);

//9.
let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let b = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
let c = [];
for (let i = 0; i < a.length; i++) {
  c[i] = a[i];
}
for (let j = 0; j < b.length; j++) {
  c[a.length + j] = b[j];
}
document.write("Mảng c (nối từ a và b): " + c);