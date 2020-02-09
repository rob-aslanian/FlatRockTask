const User = require('../models/user.model');

/**
 * Check if id is mongodb object id format 
 * @private
 */
function __isIdValid(id){
    return /^[0-9a-fA-F]{24}$/.test(id);
}


/**
 * Get all users and paginate by user collection
 * 
 * @param {Request} req 
 * @param {Response} res  
 */
function getAllUsers(req , res) {
    let { first , after } = req.query;
        first = +first || 5
        after = +after || 0;

    User.aggregate([
        {
          '$group': {
            '_id': null, 
            'users': {
              '$push': '$$ROOT'
            }
          }
        }, {
          '$addFields': {
            'users_amount': {
              '$cond': [
                { '$isArray': '$users'}, 
                { '$size': '$users'}, 
                0
              ]
            }
          }
        }, {
          '$project': {
            '_id': 0, 
            'users_amount': 1, 
            'users': {
              '$slice': [
                '$users', 
                 after, 
                 first
              ]
            }
          }
        }
      ])
      .exec((err , users) => {
        if (err) {
            res.send(err);
        }
        return res.json(users[0])
    })


}

function getUserByID(req , res) {
   const id = req.params.id;

    if (!__isIdValid(id)) {
        res.status(403);
        res.json({"error":"Id field must be mongod db object.id format"})
    }

   User.findById(id , (err , user) => {
       if (err) {
           res.status(404);
           res.json({"error":`Can\`t find user with id ${id}`})
       }
       res.send(user);
   })
   
}

function updateUser(req , res) {
    const id = req.params.id;
          
    if (!__isIdValid(id)) {
        res.status(403);
        res.json({"error":"Id field must be mongod db object.id format"})
    }

    User.findByIdAndUpdate(id , req.body , (err , user) => {
        if (err) {
            res.status(404);
            res.json({"error":`Can\`t find user with id ${id}`})
        }
        res.send(user);
    })
    
 }


 function deleteUser(req , res) {
    const id = req.params.id;
          
    if (!__isIdValid(id)) {
        res.status(403);
        res.json({"error":"Id field must be mongod db object.id format"})
    }

    User.findByIdAndDelete(id , (err) => {
        if (err) {
            res.status(404)
               .json({"error":`Can\`t find user with id ${id}`})
        }
        res.status(200)
           .send(null)
    })
 }


 /**
  * Upload user avatar 
  * 
  * @param {Request} req 
  * @param {Response} res 
  */
 function uploadAvatar(req , res) {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            const avatar = req.files.avatar,
                  id     = req.body.user_id;
          
            avatar.mv(`./uploads/${avatar.name}`);
            
            // Set Avatar 
            User.findByIdAndUpdate(id , { avatar:avatar.name })
                .then(_ => {
                    res.send({
                        status: true,
                        message: 'File is uploaded',
                        data: {
                            name: avatar.name,
                            mimetype: avatar.mimetype,
                            size: avatar.size
                        }
                    });
                })


        }
    } catch (err) {
        res.status(500)
           .send(err);
    }
    
 }

module.exports = { 
    getAllUsers ,  // [GET] -->  all 
    getUserByID,  // [GET] --> with param 
    updateUser,  // [PUT] --> update user  
    deleteUser,  // [DELETE] --> delete user 
    uploadAvatar // [POST] --> upload avaar
 }