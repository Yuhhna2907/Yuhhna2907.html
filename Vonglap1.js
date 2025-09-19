//1.
//for (let i = 1; i < 100; i++) {
//alert(i);
//if (i===99){
//alert('Đã hoàn thành');
//}
//}

//2.
//let nhietdo=parseInt(prompt('Nhập nhiệt độ hiện tại:'))
//if (nhietdo>100) {
//alert("Bạn cần giảm nhiệt độ")
//}else if (nhietdo<20) {
//alert("Bạn cần tăng nhiệt độ")
//} else
//alert("Bạn bình thường")

//3.
//let n= parseInt(prompt("Nhập số lượng phần tử:"))
//let fibo=''
//let f1=1
//let f2=1
//let count=0

//while(count<n){
//fibo +=f1 + "<br>"
//let next=f1+f2
//f1=f2
//f2=next
//count++
//}
//document.write(fibo)

//4.
//let n= parseInt(prompt("Nhập số lượng phần tử:"))
//let f1=1
//let f2=1
//let count=0

//while(count<n) {
//if (f1 % 5 === 0){
//document.write(f1 + " (số hạng thứ " + count + ") chia hết cho 5<br>");
//break
//}
//let next = f1 + f2
//f1 = f2
//f2 = next
//count++
//}

//5.
//let n= parseInt(prompt("Nhập số lượng phần tử:"))
//let f1=1
//let f2=1
//let count=0
//let sum=0

//while(count<n){
//sum+=f1
//let next = f1+f2
//f1=f2
//f2=next
//sum=f1+f2+next
//count++
//}
//document.write("Tổng của"+n+"số Fibonaacci là:"+sum)

//6.
//let n=parseInt(prompt('Nhập số lượng phần tử:'))
//let count =0
//let f1=0
//let sum=0

//while (count<n){
//f1=f1+7
//sum=sum+f1
//count++
//}
//document.write("Tổng của"+n+' số chia hết cho 7 là :'+sum)

//7.
//for (let i = 1; i <= 100; i++) {
//if(i%15===0){
//document.write('Fizzbuzz'+'<br>')
//}else if(i%5===0){
//document.write('Buzz'+'<br>')
//}else if(i%3===0){
//document.write('Fizz'+'<br>')
//}else
//document.write(i+"<br>")
//}

//8.
<button onClick="GameStart()">Bắt đầu chơi</button>
function GameStart() {
  let max = parseInt(prompt(" Nhập khoảng tối đa :"));
  if (isNaN(max) || max <= 1) {
    alert("Vui lòng nhập số lớn hơn 1");
    return;
  }
  let dudoanmay = Math.floor(Math.random() * max) + 1;
  let gioihan = 3;
  let luot = 0;

  while (luot < gioihan) {
    let dudoannguoi = parseInt(prompt("🔢 Nhập số bạn đoán (Lượt " + (luot + 1) + "/" + gioihan + "):"));
    luot++;
    if (dudoannguoi === dudoanmay) {
      alert(" Chúc mừng! Bạn đã đoán đúng số " + dudoanmay);
      return;
    } else if (dudoannguoi > dudoanmay) {
      alert(" Sai! Máy chọn số nhỏ hơn.");
    } else {
      alert(" Sai! Máy chọn số lớn hơn.");
    }
  }
  alert(" Hết 3 lượt! Bạn đã thua. Máy chọn số: " + dudoanmay);
}








