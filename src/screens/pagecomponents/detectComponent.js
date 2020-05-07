import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';

import ActionSheet from 'react-native-actionsheet';
import { TextField } from "react-native-material-textfield";
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import { connect } from 'react-redux';
import {getDataError, getDataSuccess, getDataPending, setReduxAddInfo} from '../../reducers/fetchdata';
import { bindActionCreators } from 'redux';
import * as userActions from "../../actions/userActions";

import RadioButton from "../../components/radioButton"; 
import HelpComopnent from "../pagecomponents/helpComponent";
import styles from "./detectComponentStyle";
import fonts from "../../sharedStyles/fontStyle";

const CANCEL_INDEX = 0
const actionOptions = ['Cancel', 'Take Photo', 'Import Photo']

class detectComponent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      txt_img_type: "lower",
      txt_img_name: "",
      txt_img_desc: "",
      imgSrc: "",
      imgURI: "",
      isShowModal: this.props.pending,
      isHelpModal: false,
      radioOptions:  [
        {key: 'lower', text: "Lower", selected: true },
        {key: 'upper', text: "Upper", selected: false }
      ]
    };
    this.onSelectImgType = this.onSelectImgType.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.initData === true){
      const{radioOptions} = this.state;
      radioOptions.map(item=>{
        item.selected = false;
        if(item.key === "lower"){
          item.selected = true;
        }
      })
      this.setState({
        txt_img_desc: "",
        txt_img_type: "lower",
        txt_img_name: "",
        imgSrc: "",
        imgURI: ""
      })
    }
  }

  showAlert(message) {
    Alert.alert(
      "",
      message,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }

  onSelectImgType(selected){
    const{radioOptions} = this.state;
    radioOptions.map(item=>{
      item.selected = false;
      if(item.key === selected.key){
        item.selected = true;
      }
    })
    this.setState({txt_img_type: selected.key});
  }

  onUpgrade(){
    this.props.onUpgrade();
  }
  onAnnuallyUpgrade(){
    this.props.onAnnuallyUpgrade();
  };
  onPostImg(){
    const{txt_img_type, txt_img_desc, txt_img_name, imgURI} = this.state;

    if (imgURI === "") {
      this.showAlert(this.props.intlData.messages['alert']['uploadImageToDetect']);
      return;
    }

    if (txt_img_name === "") {
      this.showAlert(this.props.intlData.messages['alert']['enterName']);
      return;
    }

    const userData = new FormData()
    userData.append('user', window.currentUser["id"]);
    userData.append('image_type', txt_img_type);
    userData.append('name', txt_img_name);
    userData.append('description', txt_img_desc);
    const uploadUri = Platform.OS === "android" ? imgURI.uri : imgURI.uri.replace("file://", "")
    const fileName = "horse_" + new Date().getTime() + ".jpg";
    userData.append('file', {
      uri: uploadUri,
      name: fileName,
      type: imgURI.type === undefined ? "image/jpeg" : imgURI.type,
    });
    this.props.onPostHorse(userData);
  }

  handlePhotoPress =(index)=> {
    if (index == 2)
      this._pickImage();
    else if (index == 1)
      this._pickImagefromCamera();
  }

  showActionSheet =()=> {
    this.ActionSheet.show();
  }

  _pickImagefromCamera = async () => {
    let options = {
            mediaType: 'photo',
            quality: 1,
            allowsEditing: true,
            aspect: [4, 3],
        }
    ImagePicker.launchCamera(options, (response) => {
        if (!response.didCancel) {
          let source = { uri: response.uri };
          this.setState({imgSrc: source, imgURI: response});
        }
    });  
  }

  _pickImage = async () => {
      let options = {
              mediaType: 'photo',
              quality: 1,
              allowsEditing: true,
              aspect: [4, 3],
          }
      ImagePicker.launchImageLibrary(options, (response) => {
          if (!response.didCancel) {
            let source = { uri: response.uri };
            this.setState({imgSrc: source, imgURI: response});
            // Image.getSize( response.uri, ( width, height ) =>
            // {
            //     let imgScale = 1;
            //     if(width > 3000 || height > 3000){
            //       imgScale = 0.5;
            //     }
            //     ImageResizer.createResizedImage(response.uri, width * imgScale, height * imgScale, 'JPEG', 80)
            //         .then(({uri}) => {
            //           let source = { uri };
            //           this.setState({imgSrc: source, imgURI: uri});
            //       })
            //         .catch( err => {
            //             console.log('error=', err);
            //     });   
            // }, ( error ) =>
            // {              
            //     console.log( error );
            // });
          }
      });
  }

  onShowHelp(flag){
    this.setState({isHelpModal: flag});
  }

  render(){
    const{txt_img_desc, txt_img_name, radioOptions, imgSrc, isHelpModal, txt_img_type} = this.state;
    const is_premium = window.currentUser["is_premium"];
    const { intlData } = this.props
    return(
      <View>
        <View style={styles.img_container}>
          <Image 
            style={styles.imgWrap}
            source={imgSrc==="" ? require("../../../assets/image/img_empty.png"): imgSrc}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.uploadTxt_wrap} onPress={this.showActionSheet}>
            <Text style={[styles.uploadTxt, fonts.montserrat_semibold]}>
              {intlData.messages['detection']['uploadImage']}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.details_container}>
          <TextField 
            style={styles.detailsTxtWrap}
            label={intlData.messages['detection']['horseName']}
            value={txt_img_name}
            onChangeText={text => this.setState({ txt_img_name: text })}
          />
          <View>
            <View style={styles.rowWrap}>
              <Text style={[styles.imgTypeTxt, fonts.montserrat_regular]}>
                {intlData.messages['detection']['selectImageType']}
              </Text>
              {/* <TouchableOpacity style={styles.helpWrap} onPress={()=>this.onShowHelp(true)}>
                <Image 
                  source={require("../../../assets/icons/icon_help.png")}
                  style={styles.helpIcon}
                />
              </TouchableOpacity> */}
            </View>
            <RadioButton 
              options={radioOptions} 
              onSelectImgType={this.onSelectImgType}
            />
            <Text style={[styles.helpTxt, fonts.montserrat_bold]}>
              {txt_img_type==="lower" 
                ? intlData.messages['detection']['selectAge']['lowerAge'] 
                : intlData.messages['detection']['selectAge']['upperAge']
              }
            </Text>
          </View>
          <TextField 
            style={styles.detailsTxtWrap}
            label={"Image Description(Optional)"}
            returnKeyType={'done'}
            value={txt_img_desc}
            onChangeText={text => this.setState({ txt_img_desc: text })}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.onPostImg()}
          style={[styles.update_container, is_premium ==='annually'?{marginBottom: 70}:{}]}
        >
          <Text style={[styles.update_txt, fonts.montserrat_bold]}>
            {is_premium !=='trial'
              ? intlData.messages['detection']['detectionButton']['is_premium'] 
              : intlData.messages['detection']['detectionButton']['not_premium']
            }
          </Text>
          {
            is_premium === 'trial' && (
              <Text style={[styles.update_small_txt, fonts.montserrat_semibold]}>
                {intlData.messages['detection']['detectionButton']['checkout']}
              </Text>
            )
          }
        </TouchableOpacity>
        {
          is_premium === 'trial' && 
          <TouchableOpacity
            onPress={() => this.onUpgrade()}
            style={styles.upgrade_container}
          >
            <Text style={[styles.update_txt, fonts.montserrat_bold]}>
              {"Upgrade To Unlimited"}
            </Text>
            <Text style={[styles.update_small_txt, fonts.montserrat_semibold]}>
              {intlData.messages['detection']['detectionButton']['subscription']}
            </Text>
          </TouchableOpacity>
        }
        {
          ( is_premium === 'trial' || is_premium === 'monthly' ) && 
          <TouchableOpacity
            onPress={() => this.onAnnuallyUpgrade()}
            style={is_premium === 'monthly'? [styles.upgrade_container, {marginBottom: 70}]: styles.annyally_upgrade_container}
          >
            <Text style={[styles.update_txt, fonts.montserrat_bold]}>
              {"Upgrade To Unlimited"}
            </Text>
            <Text style={[styles.update_small_txt, fonts.montserrat_semibold]}>
              {intlData.messages['detection']['detectionButton']['annuallySubscription']}
            </Text>
          </TouchableOpacity>
        }
        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={actionOptions}
          cancelButtonIndex={CANCEL_INDEX}
          onPress={this.handlePhotoPress}
        />

        <HelpComopnent 
          isShow={isHelpModal}
          onDone={()=>{this.onShowHelp(false)}}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  error: getDataError(state.fetchdata),
  data: getDataSuccess(state.fetchdata),
  isactive: state.fetchdata.isactive,
  connection: state.connection.isConnected,
  pending: getDataPending(state.fetchdata),
  intlData: state.IntlReducers
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      postHorse: userActions.postNewHorse,
      postNewRequest: userActions.postRequest,
      detectPurchase: userActions.videoPurchase,
      initReduxData: setReduxAddInfo
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(detectComponent);