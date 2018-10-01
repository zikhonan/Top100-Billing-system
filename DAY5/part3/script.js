
window.onload =function () {
    var submitButton =document.getElementById('submit')
    
    submitButton.addEventListener('click', function(event){
        event.preventDefault()
        
        var name =getName()
        var surname =getSurname()
        var age =getAge()
        var phonenumber =getPhoneNumber()
        

        if(age < 18){
            alert("you are not old enough to fill this form")
        }

        else if (name == ""|| name == undefined ){
            alert("you must fill the name field")
        
        }
        else if (surname == ""|| surname == undefined ){
            alert("you must fill the surname field")
        }

        else if (phonenumber.length !==10 ){
            alert("phone number must be 10 digits long")
        }
        else {
            alert("Hello" + name + " " +surname + "you are" + age +"years old" )
        }
    

    })
    
}

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