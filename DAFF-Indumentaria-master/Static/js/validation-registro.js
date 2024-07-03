let btnSend = document.querySelector("#btn-send");

//boton registrar
btnSend.addEventListener('click',function(){
    document.querySelector("#error-firstname").innerHTML = "";
    document.querySelector("#error-lastname").innerHTML = "";
    document.querySelector("#error-email").innerHTML = "";
    document.querySelector("#error-password").innerHTML = "";
    document.querySelector("#error-birthdate").innerHTML = "";
    document.querySelector("#error-country").innerHTML = "";
    document.querySelector("#error-terms").innerHTML = "";

    //Expresión regular para validar el formato del email ingresado
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;

    let error = false; 
    let firstname = document.querySelector("#firstname");
    let lastname = document.querySelector("#lastname");
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    let birthDate = document.querySelector("#birthdate");
    let fechaNac = new Date(birthDate.value);
    let hoy = new Date();
    
    let country = document.querySelector("#country");
    let terms = document.querySelector("#terms");
   
    //Validamos el largo minimo del nombre
    if(firstname.value.trim()=='' || firstname.value.trim().length <= 2 ){
        document.querySelector("#error-firstname").innerHTML = "El campo Nombre debe contener 3 letras como mínimo";
        error=true;
    }
    
    //Validamos el largo mínimo del apellido
    if(lastname.value.trim()=='' ||  lastname.value.trim().length <= 2 ){
        document.querySelector("#error-lastname").innerHTML = "El campo Apellido debe contener 3 letras como mínimo";
        error=true;
    }

    if(!emailRegex.test(email.value)){
        document.querySelector("#error-email").innerHTML ="El email no tiene un formato válido. Reingrese";
        error=true;
    }

    //TO DO: que la fecha sea menor a hoy!!
    if (birthDate.value == ''){
        document.querySelector("#error-birthdate").innerHTML ="Debe ingresar una fecha de nacimiento";       
        error=true;
    }

    if (fechaNac.getTime() > hoy.getTime()){
        document.querySelector("#error-birthdate").innerHTML ="La fecha debe ser menor a hoy";       
        error=true;
    }

    if(!passwordRegex.test(password.value)){
        document.querySelector("#error-password").innerHTML ="Mínimo 8 caracteres máximo 15<br>Al menos una letra mayúscula<br>Al menos una letra minucula<br>Al menos un dígito<br>No espacios en blanco<br>Al menos 1 caracter especial";
        error=true;
    } 

    if(country.value==''){
        document.querySelector("#error-country").innerHTML = "Debe seleccionar un país";
        error=true;
    }

    if (!terms.checked){
        //alert('ckeckbutton esta checked');
        document.querySelector("#error-terms").innerHTML ="Debe aceptar los términos y condiciones";
        error=true;
    }

    if (!error) {
        alert('Datos cargados con éxito:\nNombre: ' + firstname.value + '\n Apellido: ' +
            lastname.value + '\n Email: ' + email.value + '\n Password: ' +
            password.value + '\n Cumpleaños: ' + birthDate.value + '\n Pais: ' +
            country.value + '\nCkeck ' + terms.checked
        ) ;
        //const usuario = new Usuario(1, firstname.value, lastname.value, email.value, birthDate.value, password.value, country.value);
        //dropdown-log-in
        //const userEnPagina = document.querySelector("#dropdown-log-in");
        //userEnPagina.value="eeee";
        //document.querySelector(".dropdown-log-in").innerHTML = email.value;
        //document.querySelector("#dropdown-log-in").innerHTML = email.value;
    }

});