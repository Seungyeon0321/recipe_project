const User = require("../models/user");


//have to keep the user information to figure out the user id. This user id
//which is unique will be used a base to add the poset on the base id.

//The Id below will be brought by the login information
exports.createPosts = async (req, res, next) => {
  try {
    //need to find the user 
    const user = await User.findOne({
      userId: Id,
    }, '-password');
    // add the posts based on the user id

    if(!user) {
        console.log('There is something wrong')
    }
// need to send the info 
    
  } catch (err) {
    console.log(err);
  }
};
