const  RECORDS_AMOUNT = [5,10,15,20],
       TABLE_FIELDS   = ["user" , "role" ,"status"],
       ROLES          = ['Admin' ,'Moderator' , 'User' , 'Visitor'],
       PERMISSIONS    = ['change_firstname' , 'change_lastname' , 
                         'change_role' , 'upload_avatar' , 'delete'],
       API_PATH       = "http://localhost:4256/api/v1",
       USER_PATH      = `${API_PATH}/users`,
       AUTH_PATH      = `${API_PATH}/auth`;
 

const PERMISSIONS_LIST = {
    update:{
        name:"Update",
        permissions:[
            {
                key:"change_firstname",
                name:"Change First name"
            },
            {
                key:"change_lastname",
                name:"Change Last name"
            },
            {
                key:"change_role",
                name:"Change Role"
            },
        ],
    },
    other:{
        name:"Other",
        permissions:[
            {
                key:"upload_avatar",
                name:"Uload Avatar"
            },
            {
                key:"delete",
                name:"Delete"
            }
        ]
    }
}
    
export default  Object.freeze({
    "records_amount":RECORDS_AMOUNT,
    "fields":TABLE_FIELDS,
    "roles":ROLES,
    "permissions":PERMISSIONS,
    "permissions_list":PERMISSIONS_LIST,
    "user":USER_PATH,
    "auth":AUTH_PATH,
})
