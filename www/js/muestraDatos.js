document.addEventListener('deviceready', onDeviceReady, false);
$('.tabs').tabs({"swipeable": true});
$('.sidenav').sidenav();
$('select').formSelect();
$('.scrollspy').scrollSpy();
function getVRTasksPIN(taskID){
    return function(){
        $.ajax({
            method: "GET",
            url: "https://vrschool7.herokuapp.com/api/pin_request",
            data: {session_token: localStorage.getItem('token_container'), VRtaskID:taskID},
            dataType: "json",
        }).done(function (dades) {
         
            $('#modal1').modal();
            $('#modal1').modal('open'); 

            $("#pinButton").click(function(){
                $("#pinButton").text(dades["PIN"]);
                $(this).css('background-color','rgb(217,55,104)');
            });

            $("#pinButton").text("PIN");
            $("#pinButton").css('background-color','green');
        }).fail(function () {
            alert("ERROR");
        });
    };

   
}
function loadCourse(IdCursos){
    return function(){
        //$('#test-swipe-2').empty();
        $.ajax({
            method: "GET",
            url: "https://vrschool7.herokuapp.com/api/get_course_details",
            data: {session_token: localStorage.getItem('token_container'), courseID:IdCursos},
            dataType: "json",      
        }).done(function (dades) {
        
            $('#lista_vrTasks').empty();
            for (i in dades["course"]["vr_tasks"]){
                let newElementList = $("<a id = 'vrTasks' class='collection-item' href = '#!' style='color: rgb(55, 73, 154);'>"+ dades["course"]["vr_tasks"][i]["title"]+ "</a><br>");
                let vrTasks_ID = dades["course"]["vr_tasks"][i]["ID"]
                newElementList.click(getVRTasksPIN(vrTasks_ID));

                if (dades["course"]["vr_tasks"][i]["completions"][0] != undefined) {
                    $("#notaEx").text(dades["course"]["vr_tasks"][i]["completions"][0]["autograde"]["score"]);

                }
               
                $("#notaEx").text("No hay nota registrada");
                

                $('#lista_vrTasks').append(newElementList);
               
            }

            $('#lista_Tasks').empty();
            for (i in dades["course"]["tasks"]){
                let newElementList = "<a id = 'tasks' class='collection-item' style='color: rgb(55, 73, 154);'>"+ dades["course"]["tasks"][i]["title"]+ "</a><br>";           
                $('#lista_Tasks').append(newElementList);
            }

            $('#lista_Elements').empty();
            for (i in dades["course"]["elements"]){
                let newElementList = "<a id = 'elements' class='collection-item' style='color: rgb(55, 73, 154);'>"+ dades["course"]["elements"][i]["title"]+ "</a><br>";           
                $('#lista_Elements').append(newElementList);
            }
            
            $("#course_title").text(dades["course"]["title"]);
            $('.tabs').tabs('select', "test-swipe-2");
            
        }).fail(function () {
            alert("ERROR");
        });
    };
}

function onDeviceReady() {
    $( document ).ready(function() {
        let token = localStorage.getItem('token_container');
        $.ajax({
            method: "GET",
            url: "https://vrschool7.herokuapp.com/api/get_course",
            data: {session_token: token},
            dataType: "json",   // necessitem aixo pq ens retorni un objecte JSON
        }).done(function (dades) {
            console.log(dades);
            for (i in dades["course_list"]){
                console.log(dades["course_list"][i]["title"]);
                let newelem = $("<a id='listelement' class='collection-item' href='#!' style='color: rgb(55, 73, 154);'>"+dades["course_list"][i]["title"]+"</a>");
                $("#lista_courses").append(newelem);
               
                newelem.click(loadCourse(dades["course_list"][i]["_id"]));

            }
            
        }).fail(function () {
            alert("ERROR");
        });
    
    });
    
}


