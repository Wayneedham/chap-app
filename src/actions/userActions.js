
import { Actions } from 'react-native-router-flux';
import { AsyncStorage , Platform} from "react-native"
import serverurl from '../../config/const/serverurl'; 
import {fetchDataPending, fetchDataSuccess, fetchDataError} from './actions';

var { FBLoginManager } = require("react-native-facebook-login");

var parsedUser = {
    Age: null,
    AgeMax: null,
    AgeMin: null,
    Avatar: null,
    DateNaissance: null,
    Description: null,
    Email: null,
    Emploi: null,
    Ethnie: null,
    Etude: null,
    FBid: null,
    ID: null,
    INSTAid: null,
    Lat: null,
    Lng: null,
    Pseudo: null,
    Sexe: null,
    SexeChercher: null,
    Style: null,
    TWid: null,
    Distance: null,
    Image1: null,
    Image2: null,
    Image3: null,
    Image4: null,
    Image5: null,
    Image6: null,
    createdAt: null,
    updatedAt: null,
    GeoLive: 0,
    QuickID:null,
}
  
  


export function verficationChamps(prenom, nom, mail, pswd, confirmationpswd, dateNaissance) {
    if (prenom != '' && nom != '' && mail != '' && pswd != '' && confirmationpswd != '' && dateNaissance != '') {
        return true;
    } else {
        return false;
    }
}
export function verficationEmail(mail) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(mail);
}
export function verficationPassword(passwd) {
    return passwd.length > 7 && passwd.length < 31;
}


export function isDateValidFormat(date) {
    var re = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    return re.test(date.replace(/\s/g,''));
}
export function datehandler(text) {

    //        text = text.replace(/\s/g,'')

    switch (text.length) {
        case 2:
            text += ' / ';
            break;
        case 3:
            var x = text.substring(0, 2);
            var y = text.substring(2, 3);
            text = x + ' / ' + y;
            break;
        case 5:
            text = text.substring(0, 2);
            break;
        case 7:
            text += ' / ';
            break;
        case 8:
            var x = text.substring(0, 7);
            var y = text.substring(7, 8);
            text = x + ' / ' + y;
            break;
        case 9:
            text = text.substring(0, 7);
            break;
        
        
    }
    return text;
}



export async function signup() {

    try {
        await firebaseConfig.auth()
            .createUserWithEmailAndPassword(email, pass);

        console.log("Account created");
        var user = firebaseConfig.auth().currentUser;
        setUserData(fname,lname,email,phone,gender,birthdate,user.uid)

        Actions.reset('mainhomeScreen');
        // Navigate to the Home page, the user is auto logged in

    } catch (error) {
        console.log(error.toString())
    }

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
//   fetch(url , {
//     method: "post",
//     body: userData
//  })
//   .then(response=>response.json())
//   .then(resJson =>{
//     console.log("resJson===", resJson);
//   })
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

export async function _isUser(platform, id, props) {
    if (platform == "fb") {
        let headers = {
            Accept: '*/*',
            'Content-Type': 'application/json',
          };


        var url = serverurl.basic_url + 'utilisateurs/verification/facebook/' + id;   
        console.log('url====', url);
        fetch(url) 
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.data == null) {                    
                    props.handleResponse(false);
                    window.CurrentUser.Lng=window.lng;
                    window.CurrentUser.Lat=window.lat;
                    //this.props.navigation.navigate('EtapeA', { users: currentUser });
                    Actions.signUpOneScreen({user:parsedUser})

                } else {                
                    parsedUser = responseJson.data;
                    window.CurrentUser = parsedUser;
                    _storeData('userid',parsedUser).then(_retrieveData('userid')).catch((error) => {
                        console.log(error);
                    });
                    _storeData('logged',true).then(_retrieveData('logged')).catch((error) => {
                        console.log(error);
                    });
                    Actions.reset('home', { user: parsedUser })

                    //this.props.navigation.navigate('Home', { users: currentUser });


                }
            })
            .catch((error) => {
                console.log(error);
            });



    } else if (platform == "insta") {
        var url = serverurl.basic_url + 'utilisateurs/verification/instagram/' + id;
        console.log("url======", url);
        fetch(url , {
            method: "",
            headers: {},
            body: ""
         }) 
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.data);
                if (responseJson.data == null) {
                    window.CurrentUser.Lng=window.lng;
                    window.CurrentUser.Lat=window.lat;
                    //this.props.navigation.navigate('EtapeA', { users: currentUser });
                    Actions.signUpOneScreen({user:parsedUser})

                } else {
                    console.log(responseJson.data);
                    parsedUser = responseJson.data;
                    window.CurrentUser = parsedUser;
                    console.log(parsedUser);
                    //this.props.navigation.navigate('Home', { users: currentUser });
                }
            })
            .catch((error) => {
                console.log(error);
            });
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

  
  