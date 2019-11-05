var currentItem = 'estaaa';
var BASE_URL = ' "http://localhost:3000/api/Students/"';


function loginRegistro(){

    var email = $('#loginname').val();
    var password = $('#password').val();
    var url = 'http://localhost:3000/api/Students/sign-in'
    var data = {email:email,password:password};
    $('#errorBody').empty();
    $.post(url, data)
    .done(function( data, status ) { 
        saveOnStorage('userinformation',data);
        $(location).attr('href','html/schedule.html');
    }).fail(function(data){    
        $('#errorBody').append(data.responseJSON.error.message);
        $('#exampleModal').modal('toggle');
    });
}

function selectElement(courseSelected){
    console.log(courseSelected);
    localStorage.setItem('selecteCourse',courseSelected);
    $(location).attr('href','detalle_materia.html');
}

function selectedCourse(){
    var content = '<tr><th scope="col">Codigo</th><th scope="col">Nota 40%</th><th scope="col">Nota 60%</th><th scope="col">Nota Final</th><th scope="col">Estado</th></tr>'
    $("#resultsTable").append(content);
    var principalResultsTables = $("#resultsTable").find('tbody');
    var selectedElement = findSelecteCourse(localStorage.getItem("selecteCourse"));
    var content = '';
    if(selectedElement != null){
        console.log(localStorage.getItem("selecteCourse"));
        //print table results
        for(var i =0;i<selectedElement.periods.length;i++){
            currentElement = selectedElement.periods[i];
            content += '<tr  scope="row"> ';
            content += '<td>'+selectedElement.code+' </td>';
            content += '<td>'+currentElement.firstPeriod+' </td>';
            content += '<td> '+currentElement.secondPeriod+' </td>';
            content += '<td> '+currentElement.finalScore +' </td>';
            content += '<td> '+currentElement.state +' </td>';
            content += '</tr>';
        }
        principalResultsTables.append(content);
        console.log(selectedElement);
        //print enviroment
        $('#bannerLeft').addClass(selectedElement.color);
        $('#principalTitle').append(selectedElement.name);
        $('#creditsNumber').append(selectedElement.credits);
        $('#navBarElement').addClass(selectedElement.color);
        $('#progressBarElement').addClass(selectedElement.color);

        if(selectedElement.prerequisites.length == 0){
            $('#prerequisites').append('No Presenta prerequisitos');    
        }
    }
}

function loadInformation(){
    var table = document.getElementById('principalTable');
    var userCarrer = '';
    // listen for a click
    table.addEventListener('click', function(ev){
        var idElement = ev.target.id;
        if(idElement !='principalTable'){
            selectElement(idElement);
        }
    })

    var userInformation = JSON.parse(localStorage.getItem('userinformation'));
    console.log(userInformation);
    var url = 'http://localhost:3000/api/Students/'+userInformation.student.id+'/career';

    $.get(url).done(function(data,status){
        printDashBoard(data);
    }).fail(function(data,status){
        console.log(data);
    });
}


function printDashBoard(data){
    var principalContainer = $("#principalTable").find('tbody');
    if(data != null){
        for(var i=0;i<data.career.lines.length;i++){
            var currentRow = principalContainer.append($('<tr>'));
            for(var j = 0; j<data.career.lines[i].courses.length;j++){
                currentItem = data.career.lines[i].courses[j];
                var divPrincipal = '<div id="'+currentItem.name+'" ><div class="card text-white '+data.career.lines[i].color+' mb-3" style="max-width: 18rem;" ><div class="card-header" id="'+currentItem.name+'">'+currentItem.name+'</div></div>'
                        currentRow.append($('<td>')
                            .append(divPrincipal)
                            .append('</div>')
                    );
            }
        }
    }
    console.log(data);
}

function findSelecteCourse(selectedCourse){
    var informationUser = JSON.parse(localStorage.getItem('currentUser'));
    if(informationUser != null){
        for(var i=0;i<informationUser.carrer.semesters.length;i++){
            for(var j = 0; j<informationUser.carrer.semesters[i].courses.length;j++){
                if(informationUser.carrer.semesters[i].courses[j].name == selectedCourse){
                    return informationUser.carrer.semesters[i].courses[j];
                }
            }
        }
    }
    
}

function saveOnStorage(key,data){
    localStorage.setItem(key,JSON.stringify(data));
}




