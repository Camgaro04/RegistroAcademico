var currentHours = 0;
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
    if(courseSelected != ''){
        localStorage.setItem('selecteCourse',courseSelected);
        $(location).attr('href','detalle_materia.html');
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
    var url = 'http://localhost:3000/api/Students/'+userInformation.student.id+'/career';
    printProfile(userInformation);

    $.get(url).done(function(data,status){
        saveOnStorage('courses',data);
        printDashBoard(data);
    }).fail(function(data,status){
        console.log(data);
    });
}

function printProfile(userData){
    $('#userName').append(userData.student.displayName);
    $('#career').append(userData.student.career);
    $('#code').append('Codigo: '+userData.student.code);
    $('#currentSemester').append('Semestre actual: '+userData.student.semester);
}


function printDashBoard(data){
    var table = document.getElementById('principalTable');
    if(data != null){
        for(var i=0;i<data.career.lines.length;i++){
            var lineName = '<p class="font-weight-bold">'+data.career.lines[i].name+'</p>'
            table.rows[i+1].cells[0].innerHTML = lineName;
            for(var j = 0; j<data.career.lines[i].courses.length;j++){
                currentItem = data.career.lines[i].courses[j];
                var divPrincipal = '<div id="'+currentItem.name+'" ><div class="card text-white '+data.career.lines[i].color+' mb-3" style="max-width: 18rem;" ><div class="card-header" id="'+currentItem.name+'">'+currentItem.name+'</div></div>'
                var dot = ' <span class="dot bg-red"></span>';
                if(currentItem.status){
                    dot = ' <span class="dot bg-green"></span>';
                }
                table.rows[i+1].cells[currentItem.semester].innerHTML =  dot+divPrincipal; 
            }     
        }
    }
}

function printCourseInformation(data){
    var content = '<tr><th scope="col">Codigo</th><th scope="col">Nota 40%</th><th scope="col">Nota 60%</th><th scope="col">Nota Final</th><th scope="col">Estado</th></tr>'
    $("#resultsTable").append(content);
    content = '';
    var principalResultsTables = $("#resultsTable").find('tbody');
    if(data != null){
        this.currentHours = data.course.userHours;
        console.log(data.course.recommendedHours);
        for(var i =0;i<data.course.score.length;i++){
            currentElement = data.course.score[i];
            content += '<tr  scope="row"> ';
            content += '<td>'+data.course.code+' </td>';
            content += '<td>'+currentElement.firstPeriod+' </td>';
            content += '<td> '+currentElement.secondPeriod+' </td>';
            content += '<td> '+currentElement.finalScore +' </td>';
            content += '<td> '+currentElement.status +' </td>';
            content += '</tr>';
        }

        var courseName = data.course.name;
        var lineInformation = findSelecteCourse(courseName);
        principalResultsTables.append(content);
        var color = lineInformation.color;
        $('#bannerLeft').addClass(color);
        $('#principalTitle').append(courseName);
        $('#creditsNumber').append(data.course.credits);
        $('#navBarElement').addClass(color);
        $('#progressBarElement').addClass(color);
        $('#lineNumber').append(lineInformation.name)
        $('#buttonCalculadora').addClass(color);

        if(data.course.prerequisites.length == 0){
            $('#prerequisites').append('No Presenta prerequisitos');    
        }

        setupProgressBar(data.course.recommendedHours)
    }

}


function loadCourseInformation(){
    
    var informationUser = JSON.parse(localStorage.getItem('userinformation'));
    var selectedCourse = localStorage.getItem("selecteCourse");
    printProfile(informationUser);
    if(informationUser != null){    
        var url = 'http://localhost:3000/api/Students/'+informationUser.student.id+'/career/'+selectedCourse;
        $.get(url).done(function(data,status){
            printCourseInformation(data);
        }).fail(function(data,status){
            console.log(data);
        });

    }
}

function findSelecteCourse(selectedCourse){
    var informationUser = JSON.parse(localStorage.getItem('courses'));
    console.log(informationUser);
    if(informationUser != null){
        for(var i=0;i<informationUser.career.lines.length;i++){
            for(var j = 0; j<informationUser.career.lines[i].courses.length;j++){
                if(informationUser.career.lines[i].courses[j].name == selectedCourse){
                   return informationUser.career.lines[i];      
                }
            }
        }
    }
    
}

function saveOnStorage(key,data){
    localStorage.setItem(key,JSON.stringify(data));
}

function showCalculator(){
    $('#exampleModal').modal('toggle');   
}

function calculate(){
    var firstNote = $('#firstNote').val();
    var secondNote = $('#secondNote').val();
    $("#result").val(firstNote *0.4 + secondNote*0.6)
}

function showProfile(){
    $('#studentProfile').modal('toggle');
}

function saveHours(){
    hours = $("#hours").val(); 
    var informationUser = JSON.parse(localStorage.getItem('userinformation'));
    var selectedCourse = localStorage.getItem("selecteCourse");
    var url = 'http://localhost:3000/api/Students/'+informationUser.student.id+'/career/'+selectedCourse;
    this.currentHours = this.currentHours+ parseInt(hours);
    var dataValues = JSON.stringify({userHours:parseInt(this.currentHours)})

    $.ajax({
        url: url,
        method: 'PUT',
        data:dataValues,
        contentType: 'application/json',
        success: function(result) {
            this.currentHours = result.course.userHours;
            setupProgressBar(result.course.recommendedHours);
        },
        error: function(request,msg,error) {
            console.log(error);
        }
    });
}

function setupProgressBar(recommendedHours){
    currentProgress = (this.currentHours*100)/recommendedHours;
    $('.progress-bar').css('width', currentProgress+'%').attr('aria-valuenow', this.currentHours);
}


function backPressed(){
    window.onpopstate = function() {
        $(location).attr('href','schedule.html');
     }; history.pushState({}, '');
}


