document.addEventListener('deviceready', onDeviceReady, false);
$('.tabs').tabs({"swipeable": true});
$('.sidenav').sidenav();
$('select').formSelect();
$('.scrollspy').scrollSpy();
function loadCourse(IdCursos){
    return function(){
        $('#test-swipe-2').empty();
        let text = "<div>"
    
        $.ajax({
            method: "GET",
            url: "https://vrschool7.herokuapp.com/api/get_course_details",
            data: {session_token: localStorage.getItem('token_container'), courseID:IdCursos},
            dataType: "json",      
        }).done(function (dades) {
            console.log(localStorage.getItem('token_container'));


            $('#test-swipe-2').append("<h3>VR Tasks</h3>");
            for (i in dades["course"]["vr_tasks"]){
                let newElementList = "<li>"+ dades["course"]["vr_tasks"][i]["title"]+ "</li>";
                text = text + newElementList
                $('#test-swipe-2').append(text);
            }
            
            $('#test-swipe-2').append("<h3>Tasks</h3>");
            for (i in dades["course"]["tasks"]){
                let newElementList = "<li>"+ dades["course"]["vr_tasks"][i]["title"]+ "</li>";
                text = text + newElementList
                $('#test-swipe-2').append(text);
            }

            
            
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
                let newelem = $("<a id='listelement' class='collection-item' href='#!'>"+dades["course_list"][i]["title"]+"</a>");
                $("#lista_courses").append(newelem);
                console.log(dades["course_list"][i]["_id"])

                newelem.click(loadCourse(dades["course_list"][i]["_id"]));
            }

        }).fail(function () {
            alert("ERROR");
        });
        
        return false;
    });
    
}