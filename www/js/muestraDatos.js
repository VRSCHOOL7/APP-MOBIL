document.addEventListener('deviceready', onDeviceReady, false);

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
                $("ul").append(newelem);
            }

        

        }).fail(function () {
            alert("ERROR");
        });
        
        return false;
    });
    
}