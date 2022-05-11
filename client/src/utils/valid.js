const valid = ({fullname, username, email, password, cf_password, yearofpassing}) => {
    const err = {}

    if(!fullname) {
        err.fullname = "Please add your full name."
    }else if(fullname.length > 25){
        err.fullname = "Full name is up to 25 characters long."
    }

    if(!username) {
        err.username = "Please add your user name."
    }else if(username.replace(/ /g, '').length > 25){
        err.username = "User name is up to 25 characters long."
    }

    if(!email) {
        err.email = "Please add your email."
    }else if(!validateEmail(email)){
        err.email = "Email format is incorrect. Only emails with AIKTC domain are allowed!"
    }

    if(!password) {
        err.password = "Please add your password."
    }else if(password.length < 6){
        err.password = "Password must be at least 6 characters."
    }else if(!validatePassword(password)) {
        err.password = "Weak password. Password must have at least one Uppercase, one Lowercase, one digit and one Special Characters!"
    }

    if(password !== cf_password) {
        err.cf_password = "Confirm password did not match."
    }

    if(!yearofpassing) {
        err.yearofpassing = "Please enter your Year of Passing."
    }else if(yearofpassing > new Date().getFullYear() + 3){
        err.yearofpassing = "Not a valid year of passing."
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length
    }
}



function validateEmail(email) {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(email);

    if(re.test(email)){
        // Email valid. Procees to test if it's from the right domain (Second argument is to check that the string ENDS with this domain, and that it doesn't just contain it)
        if(email.indexOf("@aiktc.ac.in", email.length - "@aiktc.ac.in".length) !== -1){
            // VALID
            // console.log("VALID");
            return true;
        }
        else {
            // console.log("INVALID")
            return false;
        }
    }
}

function validatePassword(password) {
    const re = new RegExp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-]).{8,32}$");
    return re.test(password);
}
  
export default valid