function Calcular(){
	var horas=document.getElementById("horas").value;
	var precio=document.getElementById("carrera").value;
	var total=parseFloat(horas)*parseFloat(precio);
	document.getElementById("resultado").innerHTML="Total a pagar: $"+total+".00 MXN";
}