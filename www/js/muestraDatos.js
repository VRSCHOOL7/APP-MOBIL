document.addEventListener('deviceready', onDeviceReady, false);
$('.tabs').tabs({"swipeable": true});
$('.sidenav').sidenav();
$('select').formSelect();
$('.scrollspy').scrollSpy();

function setTasks(task){
    return function(){
        $('#pinButton').hide();
        $('#modal1').modal();
        $('#modal1').modal('open'); 

        if (task["uploads"][0] != undefined) {
            $("#fallosEx").text("");
            $("#aciertosEx").text("");
            $("#tituloEx1").text("");
            $("#tituloEx2").text("");
            $("#notaEx").text(task["uploads"][0]["grade"]);
            $("#tituloEx3").text("Comentarios:");
            $("#comentariosEx").text(task["uploads"][0]["feedback"]);
            
        }else{
            $("#notaEx").text("No hay nota registrada");
            $("#fallosEx").text("");
            $("#aciertosEx").text("");
            $("#comentariosEx").text("");
            $("#tituloEx1").text("");
            $("#tituloEx2").text("");
            $("#tituloEx3").text("");
        }
    }
}
function getVRTasksPIN(task){
    return function(){
        $.ajax({
            method: "GET",
            url: "https://vrschool7.herokuapp.com/api/pin_request",
            data: {session_token: localStorage.getItem('token_container'), VRtaskID:task["ID"]},
            dataType: "json",
        }).done(function (dades) {
            $('#pinButton').show();
            $('#modal1').modal();
            $('#modal1').modal('open'); 
            
            if (task["completions"][0] != undefined) {
                
                $("#notaEx").text(task["completions"][0]["autograde"]["score"]);
                $("#fallosEx").text(task["completions"][0]["autograde"]["failed_items"]);
                $("#aciertosEx").text(task["completions"][0]["autograde"]["passed_items"]);
                $("#comentariosEx").text(task["completions"][0]["autograde"]["comments"]);
                $("#tituloEx1").text("Tus fallos:");
                $("#tituloEx2").text("Tus aciertos:");
                $("#tituloEx3").text("Comentarios:");


            }else{
                $("#notaEx").text("No hay nota registrada");
                $("#fallosEx").text("");
                $("#aciertosEx").text("");
                $("#comentariosEx").text("");
                $("#tituloEx1").text("");
                $("#tituloEx2").text("");
                $("#tituloEx3").text("");
            }
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
                let vrTask = dades["course"]["vr_tasks"][i]
                newElementList.click(getVRTasksPIN(vrTask));

                $('#lista_vrTasks').append(newElementList);
               
            }

            $('#lista_Tasks').empty();
            for (i in dades["course"]["tasks"]){
                let newElementList = $("<a id = 'tasks' class='collection-item'  href = '#!' style='color: rgb(55, 73, 154);'>"+ dades["course"]["tasks"][i]["title"]+ "</a><br>");
                let taskRealizada = dades["course"]["tasks"][i]   
                newElementList.click(setTasks(taskRealizada));

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


