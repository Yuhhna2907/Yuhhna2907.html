//1.
//function alertMessage() {
  //alert("Xin chào");
//}

//2.
//function increaseNumber(num) {
  //return num + 1;
//}
//let input = parseInt(prompt("Nhập một số:"));
//let result = increaseNumber(input);
//document.write(result);

//3.
//function compareAndSum(a, b) {
  //if (a > b) {
    //alert(a + " lớn hơn " + b);
  //} else {
    //return a + b;
  //}
//}
//let x = parseInt(prompt("Nhập số thứ nhất:"));
//let y = parseInt(prompt("Nhập số thứ hai:"));
//let result = compareAndSum(x, y);
//if (result !== undefined) {
  //document.write("Tổng của " + x + " và " + y + " là: " + result)
//}

//4.
//function addNumbers() {
  //let firstNum = 4;
  //let secondNum = 8;
  //return firstNum + secondNum;
//}
//result = 0;
//alert("Giá trị result trước khi gọi hàm: " + result);
//result = addNumbers();
//alert("Giá trị result sau khi gọi hàm: " + result);

//5.
let stars = ["Polaris", "Aldebaran", "Deneb", "Vega", "Altair", "Dubhe", "Regulus"];
let constellations = ["Ursa Minor", "Taurus", "Cygnus", "Lyra", "Aquila", "Ursa Major", "Leo"];
function findConstellation(starName) {
  for (let i = 0; i < stars.length; i++) {
    if (stars[i].toLowerCase() === starName.toLowerCase()) {
      return constellations[i];
    }
  }
  return null;
}
let inputStar = prompt("Nhập tên ngôi sao:");
let result = findConstellation(inputStar);
if (result) {
  document.write(" Ngôi sao " + inputStar + " thuộc chòm sao: " + result);
} else {
  document.write(" Không tìm thấy ngôi sao " + inputStar + " trong danh sách.");
}


