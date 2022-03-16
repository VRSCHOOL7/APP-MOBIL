/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');

    $("#loginButtonID").on("click", function(){
        $.ajax({
            method: "GET",
            url: "https://vrschool7.herokuapp.com/api/login",
            data : {"username" : $('#usuario').val(),"password" :  $('#password').val()},
            dataType: "json",   // necessitem aixo pq ens retorni un objecte JSON
        }).done(function (msg) {
            console.log($('#usuario').val(),"password" ,  $('#password').val());
            for(let item in msg) {
                console.log(msg[item]);
            // aquí caldría fer mes coses, of course...
            // ...
            };
    
            //let newElement = $("<a id='listelement' class='collection-item' href='#!'>"+msg[item]+"</a>");
        }).fail(function () {
            alert("ERROR");
        });
        alert("asjkcnjkas");
        //location.href = "muestraDatos.html"
    });
}
