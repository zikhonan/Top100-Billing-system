
window.onload =function () {
    var submitButton =document.getElementById('submit')
    
    submitButton.addEventListener('click', function(event){
        event.preventDefault()
    
        validateName()
        validateSurname()
        validateAge()
        validateGender()
    })
    
}

/**
 * This function validates the name from the name input
 */
function validateName() {
    var name = document.getElementById('Name')

    if(name.value === "" || name.value === undefined)
    {
        //SHOW EROR MESSAGE 
        var  nameErrorMessage = document.getElementById('name-error')
        nameErrorMessage.classList.remove('is-invisible')
    }
    else {
        var nameErrorMessage = document.getElementById('name-error')
        nameErrorMessage.classList.add('is-invisible')
    }
}

/**
 * This function validates the surname from the surname input
 */
function validateSurname() {
    var surname = document.getElementById('Surname')

    if(surname.value === "" || surname.value === undefined)
    {
        //SHOW ERROR MESSAGE
        var surnameErrorMessage =document.getElementById('surname-error')
        surnameErrorMessage.classList.remove('is-invisible')      
    }
    else {
        var surnameErrorMessage = document.getElementById('surname-error')
        surnameErrorMessage.classList.add('is-invisible')
    }

}


/**
 * This function validates the age from the age input
 */
function validateAge() {
    var age = document.getElementById('age').value
    var tooYoungError = document.getElementById('age-error-young')
    var tooOldError = document.getElementById('age-error-old')
    
    if(age < 18)
    {
        tooYoungError.classList.remove('is-invisible')
        tooOldError.classList.add('is-invisible')
    }
    else if(age > 64) {
        
        tooOldError.classList.remove('is-invisible')
        tooYoungError.classList.add('is-invisible')
    }
    else {   
        tooOldError.classList.add('is-invisible')
        tooYoungError.classList.add('is-invisible')
    }
}

/**
 * This function validates the gender from the gender input
 */

















/**
 * This functions get the name from the name input
 */
function getName() {
    var name =document.getElementById('Name')
    console.log(name.value)
    return name.value
}

/**
 * This function gets the middle name from the middle name input
 */
function getMiddleName(){
    var middleName =document.getElementById('MiddleName')
    return middleName.value
}
/**
 * This functions get the surname from the Surname inout
 */
 function getSurname(){
     var surname =document.getElementById('Surname')
     return surname.value
 }

 /**
  * This function get the age from the  age input
  */
 function getAge(){
    var age =document.getElementById('Age')
    return age.value
}

  /**
  * This function get the gender from the  gender input
  */
 function getGender(){
    var gender =document.getElementById('Gender')
    return gender.value
}
  /**
  * This function get the address from the  address input
  */
 function getAddress(){
    var address =document.getElementById('Address')
    return address.value
}
  /**
  * This function get the phone number from the phone number input
  */
 function getPhoneNumber(){
    var phonenumber =document.getElementById('PhoneNumber')
    return phonenumber.value
}