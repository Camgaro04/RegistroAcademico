var currentItem = 'estaaa';

function loginRegistro(){
    var email = $('#loginname').val();
    var password = $('#password').val();
    if(email == '123' && password== '123'){
        saveUserTest();
        $(location).attr('href','html/schedule.html');
    }
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

        if(selectedElement.prerequisites.length == 0){
            $('#prerequisites').append('No Presenta prerequisitos');    
        }
    }
}

function loadInformation(){
    var table = document.getElementById('principalTable');

    // listen for a click
    table.addEventListener('click', function(ev){
        var idElement = ev.target.id;
        selectElement(idElement);
    })

    var informationUser = JSON.parse(localStorage.getItem('currentUser'));
    var principalContainer = $("#principalTable").find('tbody');
    if(informationUser != null){
        for(var i=0;i<informationUser.carrer.semesters.length;i++){
            var currentRow = principalContainer.append($('<tr>'));
            for(var j = 0; j<informationUser.carrer.semesters[i].courses.length;j++){
                currentItem = informationUser.carrer.semesters[i].courses[j].name;
                var currentCourse = informationUser.carrer.semesters[i].courses[j].name;
                var divPrincipal = '<div id="'+informationUser.carrer.semesters[i].courses[j].name+'" ><div class="card text-white '+informationUser.carrer.semesters[i].courses[j].color+' mb-3" style="max-width: 18rem;" ><div class="card-header" id="'+currentCourse+'">'+currentCourse+'</div></div>'
                    currentRow.append($('<td>')
                        .append(divPrincipal)
                        .append('</div>')
                );
            }
        }
    }
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


function saveUserTest(){
    var userTest = {
        uid:"012dsdDfd",
        firstName:"test",
        lastName:"konrad",
        email:"test@konradlorenz.edu.co",
        carrer:{
            uid:"012dsdDfd",
            name:"Ing de sistemas",
            currentAverage:4,
            currentProgress:2.0,
            semesters:[
                {
                    uid:"022asdfe233dss",
                    name:"linea1",
                    courses:[
                        {
                            uid:"01",
                            firstTime: true,
                            code:"874512",
                            name:"Fundamentos de matematicas",
                            credits:4,
                            color:"bg-blue",
                            prerequisites:[],
                            periods:[
                                { 
                                    uid:"01",
                                    firstPeriod:2.1,
                                    secondPeriod:1.0,
                                    finalScore:2.2,
                                    state:"PRIMERA VEZ"
                                },
                                {
                                    uid:"02",
                                    firstPeriod:3.5,
                                    secondPeriod:3.5,
                                    finalScore:3.5,
                                    state:"REPETICION"
                                }
                            ]
                        },
                        
                        {
                            uid:"01",
                            firstTime: true,
                            name:"Calculo diferencial",
                            credits:4,
                            code:"8965214",
                            color:"bg-blue",
                            prerequisites:[],
                            periods:[
                                { 
                                    uid:"01",
                                    firstPeriod:2.1,
                                    secondPeriod:1.0,
                                    finalScore:2.2,
                                    state:"PRIMERA VEZ"
                                },
                                {
                                    uid:"02",
                                    firstPeriod:3.5,
                                    secondPeriod:3.5,
                                    finalScore:3.5,
                                    state:"REPETICION"
                                }
                            ]
                        },
                        {
                            uid:"01",
                            firstTime: true,
                            code:"8963257",
                            name:"calculo integral",
                            credits:4,
                            color:"bg-blue",
                            prerequisites:[],
                            periods:[
                                { 
                                    uid:"01",
                                    firstPeriod:2.1,
                                    secondPeriod:1.0,
                                    finalScore:2.2,
                                    state:"PRIMERA VEZ"
                                },
                                {
                                    uid:"02",
                                    firstPeriod:3.5,
                                    secondPeriod:3.5,
                                    finalScore:3.5,
                                    state:"REPETICION"
                                }
                            ]
                        }  
                    ]

                },
                {
                    uid:"022asdfe233dss",
                    name:"linea2",
                    courses:[
                        {
                            uid:"02",
                            firstTime: true,
                            code:"7852144",
                            name:"Logica Matematica",
                            credits:4,
                            color:"bg-grey",
                            prerequisites:[],
                            periods:[
                                { 
                                    uid:"01",
                                    firstPeriod:4.1,
                                    secondPeriod:4.1,
                                    finalScore:4.1,
                                    state:"PRIMERA VEZ"
                                }
                            ]
                        },
                        
                        {
                            uid:"02",
                            firstTime: true,
                            code:"8511124",
                            name:"Algebra lineal",
                            credits:4,
                            color:"bg-grey",
                            prerequisites:[],
                            periods:[
                                { 
                                    uid:"01",
                                    firstPeriod:4.1,
                                    secondPeriod:4.1,
                                    finalScore:4.1,
                                    state:"PRIMERA VEZ"
                                }
                            ]
                        },

                        {
                            uid:"02",
                            firstTime: true,
                            name:"Matematicas discretas",
                            code:"963258",
                            credits:4,
                            color:"bg-grey",
                            prerequisites:[],
                            periods:[
                                { 
                                    uid:"01",
                                    firstPeriod:4.1,
                                    secondPeriod:4.1,
                                    finalScore:4.1,
                                    state:"PRIMERA VEZ"
                                }
                            ]
                        }
                    ]

                },
                {
                    uid:"022asdfe233dss",
                    name:"linea3",
                    courses:[
                        {
                            uid:"02",
                            code:"562031",
                            firstTime: true,
                            name:"Fundamentos de programacion",
                            credits:4,
                            color:"bg-green",
                            prerequisites:[],
                            periods:[
                                { 
                                    uid:"01",
                                    firstPeriod:4.1,
                                    secondPeriod:4.1,
                                    finalScore:4.1,
                                    state:"PRIMERA VEZ"
                                }
                            ]
                        },
                        
                        {
                            uid:"02",
                            code:"585211",
                            firstTime: true,
                            name:"Tecnicas de programacion I",
                            credits:4,
                            color:"bg-green",
                            prerequisites:[],
                            periods:[
                                { 
                                    uid:"01",
                                    firstPeriod:4.1,
                                    secondPeriod:4.1,
                                    finalScore:4.1,
                                    state:"PRIMERA VEZ"
                                }
                            ]
                        },

                        {
                            uid:"02",
                            firstTime: true,
                            code:"741258",
                            name:"Tecnicas de programacion II",
                            credits:4,
                            color:"bg-green",
                            prerequisites:[],
                            periods:[
                                { 
                                    uid:"01",
                                    firstPeriod:4.1,
                                    secondPeriod:4.1,
                                    finalScore:4.1,
                                    state:"PRIMERA VEZ"
                                }
                            ]
                        }
                    ]
                }
            ]
        } 
    };

    localStorage.setItem('currentUser',JSON.stringify(userTest));
}


