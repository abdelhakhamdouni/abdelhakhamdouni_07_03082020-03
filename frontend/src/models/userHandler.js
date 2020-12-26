import config from '../helpers/config'
import axios from 'axios'

function logWithToken(token){
      return axios.get(config.url+"auth",  
      { 
        timeout: 1000,
        headers: {'Authorization': 'Bearer '+token}
      }
     )
}

function deleteUser(userId){
  let token = localStorage.getItem('token')
  return axios.delete(
    config.url +"auth/"+userId,
    { 
      timeout: 1000,
     headers: {'Authorization': 'Bearer '+token}
   }
  )
}

/**
 * @param {Object} credentiels = {email, password}
 */
function logUser(credentiels){
  return axios.post(
    config.url+"auth/login", 
    credentiels,
    
    )
}

function addUser(data, file){
  let formData = new FormData();
  formData.append('user', JSON.stringify(data));
  if(file !== null){
    formData.append('image', file[0] || null);
  }
  return axios.post(
    config.url + "auth/signup", formData,
      {
        method: 'post'
      }
    )
}

function checkUserPseudo(pseudo){
  return axios.post(
    config.url + "auth/user/check/pseudo",{
        pseudo
    }
  )
}

function getUserById(id){
  let token = localStorage.getItem('token')
  return axios.get(
    config.url + "auth/" + id,
    {
      timeout: 1000,
      headers: { 'Authorization': 'Bearer ' + token }
    }
  )
}

function getAllUsers(){
  let token = localStorage.getItem('token')
  return axios.get(
    config.url + "auth/users",
    {
      timeout: 1000,
      headers: { 'Authorization': 'Bearer ' + token }
    }
  )
}
export {logWithToken, deleteUser, logUser, addUser, checkUserPseudo, getUserById, getAllUsers}