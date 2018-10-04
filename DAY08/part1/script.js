window.onload =function () {
  show('login-form')

  try {
    
    getToken()
    show('journey-form')
  }catch (error){
  console.log("Unable to get token")
  
  }

  loadMap()

    if (hasToken()) {
      getAgencies(this.localStorage.getItem('token'))
      //getAgencies(this.localStorage.getItem('token'))
    }

    var submitButton =this.document.getElementById('submit')
    submitButton.addEventListener('click', function(event){
      event.preventDefault()

      var clientId = getClientId()
      var clientSecret = getClientSecret()

      login(clientId,clientSecret)
    })
  

    var logoutButton = this.document.getElementById('submit-logout')
    logoutButton.addEventListener('click', function(event){
      event.preventDefault()
      localStorage.removeItem('token')
      localStorage.removeItem('storageDate')

        show('logout-form')
    })

    var journeyButton =document.getElementById('jouney-buttin')
    journeyButton.addEventListener('click' , function(event) {
      event.preventDefault()
      var start =document.getElementById('start').value
      var destination = document.getElementById('destination').value

      alert(start + '' + destination)
    })
  }

    var submitAgencyButton =this.document.getElementById('submit-agency')
    submitAgencyButton.addEventListener('click', function(event){
      event.preventDefault()
      var agenciesSelectDropDown = document.getElementById('agencies-select')
      var selectedAgency =agenciesSelectDropDown.options
      [agenciesSelectDropDown.selectedIndex].value
      var token =getToken()
      getLines(token,selectedAgency)

    })    


    var backButton =this.document.getElementById('back-button')
    backButton.addEventListener('click', function(event){
      event.preventDefault()
        show('agencies')
    })

 function loadMap(){
    mapboxgl.accessToken = 'pk.eyJ1IjoiemlraG9uYW4iLCJhIjoiY2ptdDhmaGczMTd1czNrbDg5MTRoZXc3YSJ9.E-GocNkDS6sjpjBdpk4Tdg';
    window.map = new mapboxgl.Map({
    container: 'map',
   style: 'mapbox://styles/mapbox/streets-v10',
    center:[18.4241,-33.9249],
     zoom:9
  })
  window.startPin = new mapboxgl.Marker({draggable:true}).setLngLat([0,0]). addTo(window.map)
  window.destinationPin = new mapboxgl.Marker({draggable:true}).setLngLat([0,0]). addTo(window.map)

  window.map.on('click' ,function (event) {
    console.log(event)
   
    if(window.startPoint == true) {
      window.destinationPin.setLngLat(event.lngLat)
      window.startPoint = false 
      document.getElementById('destination').value =event.lngLat.lng +',' +event.lngLat.lat
    } else{
      window.startPin.setLngLat(event.lngLat)
      window.startPoint = true
      document.getElementById('start').value =event.lngLat.lng +',' +event.lngLat.lat

    } 

    })
 

 }


function show(formId) {
  document.getElementById('login-form').style.display='none'
  document.getElementById('agencies').style.display='none'
  document.getElementById('lines').style.display='none'
  document.getElementById('logout-form').style.display='none'
  document.getElementById('journey-form').style.display='none'
  


  document.getElementById(formId).style.display ='block'
  if(formId != 'login-form'){
    document.getElementById('logout-form').style.display ='block'
  }
}

function getToken(){
  var token =this.localStorage.getItem('token')
  if(token ==null || token == undefined || token == 'undefined'){
    throw  Error('invalid token')
} 
    return token

}

function hasToken (){

  //Check is the token exist in the storage

    var token =localStorage.getItem('token')

    if(token) {
      //hide the form of the token exist
      var loginForm =document.getElementById('login-form')
      //loginForm.classList.add('is-invisible')
      loginForm.style.display ="none"
      return true
    }
    else {
        return false
    }
  
  }

function getClientId() {
  var clientId = document.getElementById('client-id')
  return clientId.value

}
function getClientSecret() {
  var clientSecret = document.getElementById('client-secret')
  return clientSecret.value

}
function login(clientId,clientSecret) {

// create a client here: https://developer.whereismytransport.com/clients
var CLIENT_ID = clientId;
var CLIENT_SECRET = clientSecret;
var payload = {
    'client_id': CLIENT_ID,
    'client_secret': CLIENT_SECRET,
    'grant_type': 'client_credentials',
    'scope': 'transportapi:all'
};
var request = new XMLHttpRequest();
request.open('POST', 'https://identity.whereismytransport.com/connect/token', true);
request.addEventListener('load', function () {
    var response = JSON.parse(this.responseText);
    var token = response.access_token;
    window.token = token;

    if(this.status == 200) {
      //delete token when logging out
      localStorage.setItem('token', token)
      localStorage.setItem('storageDate',Date.now().toLocaleString())
    }
    show('journey-form')

});
request.setRequestHeader('Accept', 'application/json');
var formData = new FormData();

for (var key in payload) {
  formData.append(key, payload[key]);
}

request.send(formData)
}

 function getAgencies(token) {
  var request = new XMLHttpRequest();
  request.addEventListener('load', function () {
    var response = JSON.parse(this.responseText);
    var agenciesList =document.getElementById('agencies-select')
    agenciesList.textContent =this.responseText
    addAgenciesToDropDown(response)

  });
  request.open('GET', 'https://platform.whereismytransport.com/api/agencies', true);
  request.setRequestHeader('Accept', 'application/json');
  request.setRequestHeader('Authorization', 'Bearer ' + token);
  request.send();
 }

 function addAgenciesToDropDown(agenciesList) {
  var agenciesSelect = document.getElementById('agencies-select')
  agenciesSelect.options.length = 0
  agenciesSelect.options.add(new Option("Select an option", null, true, true))
  agenciesList.forEach(function(agency) {
      agenciesSelect.options.add(new Option(agency.name, agency.id, false, false))
  })

}

function getLines(token, agency){
  var request = new XMLHttpRequest();
  request.addEventListener('load', function () {
    var response = JSON.parse(this.responseText);
        show('lines')
    var linesList =document.getElementById('lines-select')
    linesList.textContent =this.responseText
    addLinesToDropDown(response)

  });
  request.open('GET', 'https://platform.whereismytransport.com/api/lines?agencies='+agency, true);
  request.setRequestHeader('Accept', 'application/json');
  request.setRequestHeader('Authorization', 'Bearer ' + token);
  request.send();
 }

 function addLinesToDropDown(linesList) {
  var linesSelect = document.getElementById('lines-select')
  linesSelect.options.length = 0
  linesSelect.options.add(new Option("Select an option", null, true, true))
  linesList.forEach(function(lines) {
      linesSelect.options.add(new Option(lines.name, lines.id, false, false))
  })

}


