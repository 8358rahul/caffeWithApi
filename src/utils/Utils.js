function isValidEmail(value) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}


function validateEmail(value, setEmailError) {
    if (value == "") {
        setEmailError("")
    }
    else if (isValidEmail(value)) {
        setEmailError("")
    }
    
    else {
        setEmailError("Invalid Email")
    }
}

function isvalidaPhoneNumber(value, setPhoneNumberError) 
{
  var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
  if(value.match(phoneno))
        {
      return setPhoneNumberError('')
        }
      else
        {
            return setPhoneNumberError('Invalid Phone Number')
        }
}

function onlyValidNumbers(value,setValidNumbersError)
{
    var numbers = /^[0-9]+$/;
    if(value.match(numbers))
        {
      return setValidNumbersError('')
        }
        else
        {
            return setValidNumbersError('Please enter valide number')
        }
}

 

function validatePassword(value, setPasswordError) {
    if (value.length < 9) {
        setPasswordError("Password must be 9 characters")
    } else {
        setPasswordError("")
    }
}

const utils = {
    isValidEmail,
    validateEmail,
    validatePassword,
    isvalidaPhoneNumber,
    onlyValidNumbers,
     
};

export default utils;