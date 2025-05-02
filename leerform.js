function leer(){
	//referencia por pseudoclase
	var nombre=document.forms["formulario"].elements[0].value;
	//referencia por Id
	var clave=document.getElementById("pass").value;
	//referencia por TagName
	var car=document.getElementsByTagName("select")[0].value;
	//referencia por Name
	var gen=document.getElementsByName("genero");
	//Declaración de variables no son necesarias
	var i, g;
	for(i=0;i<gen.length;i++)
	{
		if(gen[i].checked){
			g=gen[i].value;
		}
	}

	//referencia por Id
	var p=document.getElementById("privacidad").checked;

	document.getElementById("datos").innerHTML=
	"\<br>Nombre: "+nombre+
	"\<br>Password: "+clave+
	"\<br>Tu carrera es: "+car+
	"\<br>Tu género es: "+g+
	"\<br>Aceptó el acuerdo: "+p;
}