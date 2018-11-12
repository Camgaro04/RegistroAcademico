
function saveUser(){
    var name = $('#name').val();
    var lastName = $('#lastName').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var confirmPassword = $('#password-confirm').val();
    if(password != confirmPassword){
        alert('Las contraseñas con coinciden');
        return;
    }

    if(confirmPassword.length <8){
        alert('La Contraseña es muy corta,son minimo 8 caracteres');
        return;
    }

    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    var formatEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    if(!formatEmail.test(email)){
        alert('el formato del correo es invalido');
        return;
    }


    if(!format.test(confirmPassword)){
        alert('La Contraseña no contiene ningun caracter especial');
        return;
    } 
    
    var users = JSON.parse(localStorage.getItem('users'));
    var user = {name:name,lastName:lastName,email:email,pass:password};
    if(users == null){
        users=[];
        users.push(user);
    }else{
        users.push(user);
    }
    localStorage.setItem('users',JSON.stringify(users));
    alert('usuario guardado');
    $(location).attr('href','../index.html');
}


function loadElements(){

    var elemento1 = {id:0,name:'Ajedrez',description:'Juego de ajedrez',isAvaliable:true,date:'08-10-2018',copies:2,imagen:'../assets/ajedrez.jpg'};
    var elemento2 = {id:1,name:'Raquetas',description:'Par de raquetas con su ping-pong',isAvaliable:true,date:'08-10-2018',copies:2,imagen:'../assets/raquetas.jpg'};
    var elemento3 = {id:2,name:'x-box 360',description:'Consola de videojuegos',isAvaliable:true,date:'08-10-2018',copies:3,imagen:'../assets/svos.jpg'};
    var elemento4 = {id:3,name:'Pista de baile',description:'Pista de baile',isAvaliable:true,date:'08-10-2018',copies:2,imagen:'../assets/dance_dance.jpg'};
    var elemento5 = {id:4,name:'Hockey aereo',description:'Mesa de hockey aereo, con disco y dos platillos',isAvaliable:true,date:'08-10-2018',copies:2,imagen:'../assets/hockey.png'};
    var elemento6 = {id:5,name:'Mesa de billar - Pool',description:'juego de 17 bolas y 2 tacos',isAvaliable:true,date:'08-10-2018',copies:2,imagen:'../assets/mesappol.jpg'};
    var elemento7 = {id:6,name:'Mesa de billar - 3 Bandas',description:'Mesa con 3 bolas y 2 tacos',isAvaliable:true,date:'08-10-2018',copies:2,imagen:'../assets/tresbandas.jpg'};

    var elements = JSON.parse(localStorage.getItem('elements'));
    if(elements == null){
        var elements = [];
        elements.push(elemento1);
        elements.push(elemento2);
        elements.push(elemento3);
        elements.push(elemento4);
        elements.push(elemento5);
        elements.push(elemento6);
        elements.push(elemento7);
    }else{
        localStorage.removeItem('elements');
    }
    localStorage.setItem('elements',JSON.stringify(elements));
    
    $('#id1').val(elements[0].id);
    $('#elemento-1-title').text(elements[0].name);
    if(elements[0].isAvaliable){
        $('#elemento-1-avaliable').text('disponible');
    }else{
        $('#elemento-1-avaliable').text('ocupado');
    }
    $('#img_element1').attr("src","../assets/ajedrez.jpg");
    $('#elemento-1-description').text(elements[0].description);
    $('#elemento-1-date').text('Fecha disponible:'+elements[0].date);
    $('#elemento-1-copies').text('Cantidad de copias: '+elements[0].copies);

    $('#id2').val(elements[1].id);
    $('#elemento-2-title').text(elements[1].name);
    if(elements[1].isAvaliable){
        $('#elemento-2-avaliable').text('disponible');
    }else{
        $('#elemento-2-avaliable').text('ocupado');
    }
    $('#img_element2').attr("src",elements[1].imagen);
    $('#elemento-2-description').text(elements[1].description);
    $('#elemento-2-date').text('Fecha disponible:'+elements[1].date);
    $('#elemento-2-copies').text('Cantidad de copias: '+elements[1].copies);


    $('#id3').val(elements[2].id);
    $('#elemento-3-title').text(elements[2].name);
    if(elements[2].isAvaliable){
        $('#elemento-3-avaliable').text('disponible');
    }else{
        $('#elemento-3-avaliable').text('ocupado');
    }
    $('#img_element3').attr("src",elements[2].imagen);
    $('#elemento-3-description').text(elements[2].description);
    $('#elemento-3-date').text('Fecha disponible:'+elements[2].date);
    $('#elemento-3-copies').text('Cantidad de copias: '+elements[2].copies);

    
    $('#id4').val(elements[3].id);
    $('#elemento-4-title').text(elements[3].name);
    if(elements[3].isAvaliable){
        $('#elemento-4-avaliable').text('disponible');
    }else{
        $('#elemento-4-avaliable').text('ocupado');
    }
    $('#img_element4').attr("src",elements[3].imagen);
    $('#elemento-4-description').text(elements[3].description);
    $('#elemento-4-date').text('Fecha disponible:'+elements[3].date);
    $('#elemento-4-copies').text('Cantidad de copias: '+elements[3].copies);

    $('#id5').val(elements[4].id);
    $('#elemento-5-title').text(elements[4].name);
    if(elements[4].isAvaliable){
        $('#elemento-5-avaliable').text('disponible');
    }else{
        $('#elemento-5-avaliable').text('ocupado');
    }
    $('#img_element5').attr("src",elements[4].imagen);
    $('#elemento-5-description').text(elements[4].description);
    $('#elemento-5-date').text('Fecha disponible:'+elements[4].date);
    $('#elemento-5-copies').text('Cantidad de copias: '+elements[4].copies);

    $('#id6').val(elements[5].id);
    $('#elemento-6-title').text(elements[5].name);
    if(elements[5].isAvaliable){
        $('#elemento-6-avaliable').text('disponible');
    }else{
        $('#elemento-6-avaliable').text('ocupado');
    }
    $('#img_element6').attr("src",elements[5].imagen);
    $('#elemento-6-description').text(elements[5].description);
    $('#elemento-6-date').text('Fecha disponible:'+elements[5].date);
    $('#elemento-6-copies').text('Cantidad de copias: '+elements[5].copies);

    $('#id7').val(elements[6].id);
    $('#elemento-7-title').text(elements[6].name);
    if(elements[6].isAvaliable){
        $('#elemento-7-avaliable').text('disponible');
    }else{
        $('#elemento-7-avaliable').text('ocupado');
    }
    $('#img_element7').attr("src",elements[6].imagen);
    $('#elemento-7-description').text(elements[6].description);
    $('#elemento-7-date').text('Fecha disponible:'+elements[6].date);
    $('#elemento-7-copies').text('Cantidad de copias: '+elements[6].copies);

}


function makeElementBook(elementId){

    var elements = JSON.parse(localStorage.getItem('elements'));
    for(i=0;i<elements.length;i++){
        if(elementId == elements[i].id){
            localStorage.setItem('currentElement',JSON.stringify(elements[i]));
        }
    }
    $(location).attr('href','reserva.html');
}

function loadBookElement(){
    var element = JSON.parse(localStorage.getItem('currentElement'));
    if(element != null){
        $('#id').val(element.id);
        $('#imgelement').attr("src",element.imagen);
        $('#bookElementName').text(element.name);
        $('#bookElementDescription').text(element.description);
        $('#bookElementCopies').text("Numero de copias disponibles: "+element.copies);
    }else{
        alert('No ha seleccionado un elemento valido');
    }
}

function MakeBooking(){
    var bookingList = JSON.parse(localStorage.getItem('booking'));
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var elementBook = JSON.parse(localStorage.getItem('currentElement'));
    elementBook.date = $('#bookDate').val();

    if(elementBook.date == ""){
        alert('Seleccione una fecha por favor');
        return;
    }

    if(bookingList == null){
        var bookingList = [];
        var booking = {id:0,user:currentUser,bookElement: elementBook};
        bookingList.push(booking);
    }else{
        var booking = {id:bookingList.length,user:currentUser,bookElement: elementBook};
        bookingList.push(booking);
    }

    localStorage.setItem('booking',JSON.stringify(bookingList));
    alert('Reserva registrada');
    $(location).attr('href','dashboard.html');
}


function printHistoryTable(){
    var bookingList = JSON.parse(localStorage.getItem('booking'));
    
    var content = '<table class="table"><tr scope="col"><th>ID</th> <th scope="col" >Usuario</th> <th scope="col">Elemento reservado</th><th scope="col">Fecha</th></tr>'
    for(i=0; i<bookingList.length; i++){
        content += '<tr  scope="row"> ';     
        content += '<td>'+bookingList[i].id+' </td>';
        content += '<td> '+bookingList[i].user.name+' </td>';
        content += '<td> '+bookingList[i].bookElement.name +' </td>';
        content += '<td> '+bookingList[i].bookElement.date +' </td>';
        content += '</tr>';
    }
    content += "</table>"
    $('#table').append(content);
}

function login(){
    var email = $('#loginname').val();
    var password = $('#password').val();
    var registeredUsers = JSON.parse(localStorage.getItem('users'));
    for(i=0;i<registeredUsers.length;i++){
        if(email == registeredUsers[i].email && password== registeredUsers[i].pass){
            localStorage.setItem('currentUser',JSON.stringify(registeredUsers[i]));
            $(location).attr('href','html/dashboard.html');
        }
    }

    
}   

function logout(){
    localStorage.clear();
    $(location).attr('href','../index.html');
}
