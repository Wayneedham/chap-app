import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';

import ActionSheet from 'react-native-actionsheet';
import { TextField } from "react-native-material-textfield";
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

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
    if(nextProps.initData && this.props.initData !== nextProps.initData){
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


  onPostImg(){
    const{txt_img_type, txt_img_desc, txt_img_name, imgURI} = this.state;
    
    if (imgURI === "") {
      this.showAlert("Upload an image to detect please.");
      return;
    }

    if (txt_img_name === "") {
      this.showAlert("Enter name please.");
      return;
    }

    const userData = new FormData()
    userData.append('user', window.currentUser["id"]);
    userData.append('image_type', txt_img_type);
    userData.append('name', txt_img_name);
    userData.append('description', txt_img_desc);   
    let uriParts = imgURI.split('.');
    let fileType = uriParts[uriParts.length - 1];   
    userData.append('file', {
      uri: imgURI,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    this.props.onPostHorse(userData);
    // this.props.actions.postHorse(userData);
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
          this.setState({imgSrc: source, imgURI: response.uri});
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
            Image.getSize( response.uri, ( width, height ) =>
            {
                let imgScale = 1;
                if(width > 3000 || height > 3000){
                  imgScale = 0.5;
                }
                ImageResizer.createResizedImage(response.uri, width * imgScale, height * imgScale, 'JPEG', 80)
                    .then(({uri}) => {
                      let source = { uri };
                      this.setState({imgSrc: source, imgURI: uri});
                  })
                    .catch( err => {
                        console.log('error=', err);
                });   
            }, ( error ) =>
            {              
                console.log( error );
            });
            // let source = { uri: response.uri };
            // this.setState({imgSrc: source, imgURI: response.uri});
          }
      });
  }

  onShowHelp(flag){
    this.setState({isHelpModal: flag});
  }

  render(){
    const{txt_img_desc, txt_img_name, radioOptions, imgSrc, isHelpModal} = this.state;
    // const{pending} = this.props;
    return(
      <View>
        <View style={styles.img_container}>
          <Image 
            style={styles.imgWrap}
            source={imgSrc==="" ? require("../../../assets/image/img_empty.png"): imgSrc}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.uploadTxt_wrap} onPress={this.showActionSheet}>
            <Text style={[styles.uploadTxt, fonts.montserrat_semibold]}>Upload Image</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.details_container}>
          <TextField 
            style={styles.detailsTxtWrap}
            label={"Image Name"}  
            value={txt_img_name}
            onChangeText={text => this.setState({ txt_img_name: text })}
          />
          <View>
            <View style={styles.rowWrap}>
              <Text style={[styles.imgTypeTxt, fonts.montserrat_regular]}>Select Image Type</Text>
              <TouchableOpacity style={styles.helpWrap} onPress={()=>this.onShowHelp(true)}>
                <Image 
                  source={require("../../../assets/icons/icon_help.png")}
                  style={styles.helpIcon}
                />
              </TouchableOpacity>
            </View>
            <RadioButton 
              options={radioOptions} 
              onSelectImgType={this.onSelectImgType}
            />
          </View>
          <TextField 
            style={styles.detailsTxtWrap}
            label={"Image Description(Optional)"}
            multiline={true}  
            value={txt_img_desc}
            onChangeText={text => this.setState({ txt_img_desc: text })}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.onPostImg()}
          style={styles.update_container}
        >
          <Text style={[styles.update_txt, fonts.montserrat_regular]}>
            {"POST"}
          </Text>          
        </TouchableOpacity>
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


export default detectComponent;