import axios from 'axios';
import constanst from '../constats';

/**
 * [GET]
 * 
 * Get users 
 * @param {Number} first 
 * @param {Number} after 
 */
export function getUsers(first=5,after=0) {
    return axios.get(`${constanst['user']}?first=${first}&after=${after}`)
                .then(user => user['data'])
}

/**
 * [GET]
 * 
 * Get users  by ID
 * @param {String} id 
 */
export function getUsersByID(id) {
    if (id === undefined) return new Promise();

    return axios.get(`${constanst['user']}/${id}`)
                .then(user => user['data'])
}

/**
 * [PUT]
 * 
 * Update user data
 * @param {String} id 
 * @param {Object} data 
 */
export function updateUser(id , data) {
    if ((data && id) == undefined) return new Promise();

    return axios.put(`${constanst['user']}/${id}` , 
                     JSON.stringify(data), {
                         headers:{
                             "Content-Type":"application/json",
                         }
                     })
}

/**
 * [DELETE]
 * 
 * Delete user 
 * @param {String} id 
 */
export function deleteUser(id) {
     if (id === undefined) return new Promise();

     return axios.delete(`${constanst['user']}/${id}`)
}


/**
 * [POST]
 * 
 * Add new user 
 * @param {Object} data 
 */
export function addUser(data) {
    if ( data === undefined ) return new Promise();

    return axios.post(`${constanst['auth']}/register` ,
                      JSON.stringify(data) , {
                            headers:{
                                "Content-Type":"application/json",
                            }
                      })
}

/**
 * [POST]
 * 
 * Upload user afatar 
 * @param {FormData} data 
 */
export function uploadAvatar(data) {
    if ( data === undefined ) return new Promise();

    return axios.post(`${constanst['user']}/upload_avatar` ,
                         data , {
                            headers:{
                                "Content-Type":"multipart/form-data",
                            }
                      })
}




