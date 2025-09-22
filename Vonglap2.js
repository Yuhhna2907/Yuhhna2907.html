//1.(đã làm ở vòng lặp 1)
//2.
//let n = parseInt(prompt("Nhập một số nguyên dương:"));
//if (isNaN(n) || n < 0) {
  //alert(" Vui lòng nhập số nguyên dương!");
//} else {
  //let gt = 1;
  //let i = 1;
  //while (i <= n) {
    //gt *= i;
    //i++;
  //}
  //alert( n + "! = " + gt);
//}

//3.
//let n = 5;

// Góc vuông dưới bên trái
//for (let i = 1; i <= n; i++) {
  //for (let j = 1; j <= i; j++) {
    //document.write("*");
  //}
  //document.write("<br>");
//}
//document.write("<br>");

// Góc vuông trên bên trái
//for (let i = n; i >= 1; i--) {
  //for (let j = 1; j <= i; j++) {
    //document.write("*");
  //}
  //document.write("<br>");
//}
//document.write("<br>");

// Góc vuông dưới bên phải
//for (let i = 1; i <= n; i++) {
  //for (let k = 1; k <= n - i; k++) {
    //document.write("&nbsp;&nbsp;");
  //}
  //for (let j = 1; j <= i; j++) {
    //document.write("*");
  //}
  //document.write("<br>");
//}
//document.write("<br>");

// Góc vuông trên bên phải
//for (let i = n; i >= 1; i--) {
  //for (let k = 1; k <= n - i; k++) {
    //document.write("&nbsp;&nbsp;");
  //}
  //for (let j = 1; j <= i; j++) {
    //document.write("*");
  //}
  //document.write("<br>");
//}

//4.
//let hcn =''
//for (let i=1;i<=7;i++){
  //for (let j=1;j<=15;j++){
    //if(i===1||i===7||j===1||j===15){
      //hcn+=('*')
    //}else
      //hcn+=('&nbsp;&nbsp;')
  //}
  //hcn+='<br>'
//}
//document.write(hcn)

//5.(đã làm ở bài cấu trúc điều kiện 2)
//6.
let heart = "";
let size = 6;

for (let i = size / 2; i <= size; i += 2) {
  for (let j = 1; j < size - i; j += 2) {
    heart += "&nbsp;&nbsp;";
  }
  for (let j = 1; j <= i; j++) {
    heart += "*";
  }
  for (let j = 1; j <= size - i; j++) {
    heart += "&nbsp;&nbsp;";
  }
  for (let j = 1; j <= i; j++) {
    heart += "*";
  }
  heart += "<br>";
}
for (let i = size; i >= 1; i--) {
  for (let j = i; j < size; j++) {
    heart += "&nbsp;&nbsp;";
  }
  for (let j = 1; j <= (i * 2) - 1; j++) {
    heart += "*";
  }
  heart += "<br>";
}
document.write(heart);