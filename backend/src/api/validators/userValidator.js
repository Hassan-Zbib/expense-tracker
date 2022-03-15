var validator = require("validator")

const validatePass = (pass) => {
  // let regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  // return regex.test(pass)
  return validator.isStrongPassword(pass, [{
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    returnScore: false,
  }])
}

const validateEmail = (email) => {
  // let regex = new RegExp("")  --> removed because it's not fully RFC 822 compliant
  return validator.isEmail(email)
}

const validatePhone = (phone) => {
    return phone ? validator.isMobilePhone(phone) : true
}

const validatewebsiteAddress = (url) => {
  return url ? validator.isURL(url) : true
}

module.exports = {  
  validatePass,
  validateEmail,
  validatePhone,
  validatewebsiteAddress,
}
