let btnSend = document.querySelector("#btn-send1");

//boton registrar
btnSend.addEventListener('click',function(){
    document.querySelector("#error-firstname").innerHTML = "";
    document.querySelector("#error-email").innerHTML = "";
    document.querySelector("#error-phone").innerHTML = "";
    document.querySelector("#error-message")

    //Expresión regular para validar el formato del email ingresado
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phoneRegex = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;

    let error = false; 
    let firstname = document.querySelector("#firstname");
    let email = document.querySelector("#email");
    let phone = document.querySelector("#phone");
    let message = document.getElementById("message");
    
    //Validamos el largo minimo del nombre
    if(firstname.value.trim()=='' || firstname.value.trim().length <= 2 ){
        document.querySelector("#error-firstname").innerHTML = "El campo Nombre debe contener 3 letras como mínimo";
        error=true;
    }
    
    if(!emailRegex.test(email.value)){
        document.querySelector("#error-email").innerHTML ="El email no tiene un formato válido. Reingrese";
        error=true;
    }

    if(!phoneRegex.test(phone.value)){
        document.querySelector("#error-phone").innerHTML ="El telefono no tiene un formato valido. Reingrese";
        error=true;
    }

    //Validamos el largo minimo del mensaje
    if(message.value.trim().length <= 20 ){
        document.querySelector("#error-message").innerHTML = "El mensaje debe tener minmo 20 caracteres.";
        error=true;
    }

    if (!error) {
        alert('Datos cargados con éxito:\nNombre: ' + firstname.value + '\n Email: ' + email.value + 
            '\n Telefono: ' + phone.value
        ) ;
        //const usuario = new Usuario(1, firstname.value, lastname.value, email.value, birthDate.value, password.value, country.value);
        //dropdown-log-in
        //const userEnPagina = document.querySelector("#dropdown-log-in");
        //userEnPagina.value="eeee";
        //document.querySelector(".dropdown-log-in").innerHTML = email.value;
        //document.querySelector("#dropdown-log-in").innerHTML = email.value;
    }

});