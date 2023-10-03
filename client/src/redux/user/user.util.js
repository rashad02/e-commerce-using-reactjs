import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL || '';
export const registerUser = async user => {

  let userInfo = {};

  let registerUser = await axios({
    method: 'post',
    url: baseUrl + '/user/register',
    data: user
  }).then(response => {

    if (response.data.success) {
      userInfo = response.data.user;

      localStorage.setItem('userId', userInfo.userId);
    }
  }).catch(error => {
    console.log("Registration failed: ", error);

    return error;
  });


  if (registerUser) {
    registerUser.then(res => {

      userInfo = res;
    })
  }

  return userInfo;
}

export const loginUser = async user => {

  let userInfo = {};

  let loginUser = await axios({
    method: 'post',
    url: baseUrl + '/user/login',
    data: user
  }).then(response => {

    if (response.data.success) {
      userInfo = response.data.user;

      localStorage.setItem('userId', userInfo.userId);
    }
  }).catch(error => {
    console.log("Login failed: ", error);

    return error;
  });

  if (loginUser) {
    loginUser.then(res => {
      userInfo = res;
    })
  }

  return userInfo;

}


export const getUser = async userId => {
  let user = null;

  await axios({
    url: baseUrl + '/user',
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    params: { id: userId }
  }).then(response => {
    if (response.data.success) {
      return user = response.data.user;
    }
  }).catch(error => {
    console.log("User not found: ", error);

    return error;
  });


  return user;
}


export const getCurrentUser = userPromise => {

  let currentUser = null;

  if (userPromise) {
    userPromise.then(res => {
      if (res) {
        currentUser = res;
      }
    })
  }

  return currentUser;
}


