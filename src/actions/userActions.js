
import { Actions } from 'react-native-router-flux';
import { AsyncStorage , Platform} from "react-native"
import serverurl from '../../config/const/serverurl'; 
import {fetchDataPending, fetchDataSuccess, fetchDataError} from './actions';

var { FBLoginManager } = require("react-native-facebook-login");
  
export function verficationEmail(mail) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(mail);
}
export function verficationPassword(passwd) {
    return passwd.length > 7 && passwd.length < 31;
}

export async function handleFacebookLogin (props) {
  try {
    if (Platform.OS === "android")
        FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.WebView);
        FBLoginManager.loginWithPermissions(
          ["email", "public_profile"],
          (error, data) => {
          if (!error) {
              console.log("Login data: ", data.credentials.token);
              const token = data.credentials.token;
              fbLogin(token, props);
          } else {
              console.log("Error: ", error);
          }
        }
    );
    } catch (err) {
    console.log(err);
  }
}

export async function fbLogin(token, props) {
    const databaseRef = firebaseService.database().ref("users");
    const response = await fetch(
      `https://graph.facebook.com/v2.5/me?fields=email,name,gender,birthday,work,about,education&access_token=` +
        token
    );
    var fbUser = await response.json();
  
    createdUser.Pseudo = fbUser.name;
    createdUser.Email = fbUser.email;
    createdUser.isFBLogin = true;
  
    databaseRef
      .orderByChild("Email")
      .equalTo(createdUser.Email)
      .once("value", snapshot => {
        if (snapshot.val() === null) {
          Actions.signupCapitalScreen({ user: createdUser, pwd: token });
        } else {
          snapshot.forEach(child => {
            window.currentUser = child.val();
          });
  
          let userInfo = {
            username: createdUser.Email,
            userpwd: token,
            loginMethod: "facebook",
            ID: window.currentUser["userID"]
          };
          _storeData("userInfo", userInfo);
          _storeData("logged", true);
          Actions.customTabNavigator();
        }
      });
  }

  export async function fblogOut() {
    FBLoginManager.logout(function(error, data) {
      console.log("error==", error);
    });
  }

  export function userSignup(userData){
    const url = serverurl.basic_url + 'register';
    return dispatch => {
      dispatch(fetchDataPending());
      fetch(url , {
        method: "post",
        body: userData
      })
      .then(res => res.json())
      .then(res => {
        dispatch(fetchDataSuccess(res));
        return res;
      })
      .catch(error => {
        dispatch(fetchDataError(error));
      })
    }
  }

  export function userLogin(userData){  
    const url = serverurl.basic_url + 'login';
    return dispatch => {
      dispatch(fetchDataPending());
      fetch(url , {
        method: "post",
        body: userData
      })
      .then(res => res.json())
      .then(res => {
        dispatch(fetchDataSuccess(res));
        return res;
      })
      .catch(error => {
        dispatch(fetchDataError(error));
      })
    }
  }

  export function postNewHorse(postData){ 
    const url = serverurl.basic_url + 'detection';
    return dispatch => {
      dispatch(fetchDataPending());
      fetch(url , {
        method: "post",
        body: postData
      })
      .then(res => res.json())
      .then(res => {
        dispatch(fetchDataSuccess(res));
        return res;
      })
      .catch(error => {
        dispatch(fetchDataError(error));
      })
    }
  }

  export function fetchHorseList(userID){ 
    const url = serverurl.basic_url + 'detections/'+userID;
    return dispatch => {
      dispatch(fetchDataPending());
      fetch(url)
      .then(res => res.json())
      .then(res => {
        dispatch(fetchDataSuccess(res));
        return res;
      })
      .catch(error => {
        dispatch(fetchDataError(error));
      })
    }
  }

  export function videoPurchase(postData){ 
    const url = serverurl.basic_url + 'charge';
    return dispatch => {
      dispatch(fetchDataPending());
      fetch(url , {
        method: "post",
        body: postData
      })
      .then(res => res.json())
      .then(res => {
        dispatch(fetchDataSuccess(res));
        return res;
      })
      .catch(error => {
        dispatch(fetchDataError(error));
      })
    }
  }

  export function postRequest(postData, url){ 
    return dispatch => {
      dispatch(fetchDataPending());
      fetch(url , {
        method: "post",
        body: postData
      })
      .then(res => res.json())
      .then(res => {
        dispatch(fetchDataSuccess(res));
        return res;
      })
      .catch(error => {
        dispatch(fetchDataError(error));
      })
    }
  }

  export async function _storeData(key,value){
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    //   console.warn("done done")
    } catch (error) {
      // Error saving data
    }
  }

  export async function  _retrieveData(key){
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        // console.warn(value);
        return value;
      }
     } catch (error) {
       // Error retrieving data
       return null;
     }
  }

  export async function  clearData(){
    try {
        AsyncStorage.removeItem('logged');
        AsyncStorage.removeItem('userInfo');
     } catch (error) {
       // Error retrieving data
       return null;
     }
  }

  
  