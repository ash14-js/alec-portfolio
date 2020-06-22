// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

function getHelloAlecUsingArrowFunctions() {
  fetch('/data').then(response => response.text()).then((quote) => {
    document.getElementById('data-container').innerText = quote;
  });
}

function getJson() {

    fetch('/loginstatus').then(response => response.json()).then((loginstatus) => {
        const email = loginstatus.email;
        const redirectUrl = loginstatus.redirectUrl;
        const dataElement = document.getElementById('data-container');

        if(email == ""){
            dataElement.innerText = "Log in to see comments!";
            console.log("Currently not logged in");
        }

        else{ 
            fetch('/data').then(response => response.json()).then((data) => {
                
                const dataElement = document.getElementById('data-container');  
                dataElement.innerText = ''; 
                for (var i = 0; i < data.length; i++){
                    dataElement.appendChild(createListElement(data[i].email + ' | Comment ' + [i+1] +' : '+ data[i].text));
                    console.log(data[i].text);
                }

            });
        }
    });
}

function getLoginStatus() {
    fetch('/loginstatus').then(response => response.json()).then((loginstatus) => {
        const email = loginstatus.email;
        const redirectUrl = loginstatus.redirectUrl;
        const loginStatusLink = document.getElementById('loginstatuslink');
        loginStatusLink.href = redirectUrl;
        const loginStatusMsg = document.getElementById('loginstatus-container');
        if (email == ""){
            loginStatusLink.innerText = "Login here";
            loginStatusMsg.innerText = "******Login to be able to comment******";
        }
        else{
            loginStatusLink.innerText = "Logout here";
            loginStatusMsg.innerText = "Hello " + email + " you are now logged in!";      
        }

    });
}
//helper method to create list element
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}