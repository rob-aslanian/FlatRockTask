const User  = require('../models/user.model'),
      PERMISSIONS  = ['change_firstname' , 'change_lastname' , 'change_role' , 
                      'upload_avatar' , 'delete'],
      PERMISSION_BY_ROLE = {
                admin:"all",
                moderator:['change_firstname' , 'change_lastname' , 'delete'],
                user:['change_firstname' , 'change_lastname' , 'upload_avatar'],
                visitor:['change_firstname' , 'change_lastname']
            }

function __setPermissionsByRole(role) {
    if (role === undefined) return;

    const permissions = PERMISSION_BY_ROLE[role.toLowerCase()];

    // For Admin /// 
    if (typeof permissions === 'string' && 
        permissions === "all") {
        return PERMISSIONS.reduce((obj , p) => {
            obj[p] = true;
            return obj;
        } , {})
    } else {
        if (permissions) {
            if (permissions.length > 0) {
                return PERMISSIONS.reduce((obj , p) => {
                    obj[p] = permissions.includes(p);
                    return obj;
                } , {})
            }
        }
    }
}

function register(req , res) { 
    const data = req.body;
    data['permissions'] = __setPermissionsByRole(req.body.role);

    const user = new User(req.body);
    user.save()
        .then(el => res.send(el))
        .catch(err => res.status(500).send(err) )    
}


module.exports = { register }
