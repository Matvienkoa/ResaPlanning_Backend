const passwordValidator = require('password-validator');
const passwordSchema = new passwordValidator();
 
// Password Schema => validation inputs
passwordSchema
.is().min(8)
.is().max(30)                                                                  
.has().uppercase(1)                            
.has().lowercase(1)                        
.has().digits(1)                             
.has().not().spaces()                   

module.exports = passwordSchema;