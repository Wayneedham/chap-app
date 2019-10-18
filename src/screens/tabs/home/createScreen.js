import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform
} from 'react-native';

import { TextField } from "react-native-material-textfield";
import ImagePicker from 'react-native-image-picker';
import ActionSheet from 'react-native-actionsheet';
import ImageResizer from 'react-native-image-resizer';

import CustomBar from "../../../components/customBar";
import styles from "./createScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";


const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4
const actionOptions = ['Cancel', 'Take Photo', 'Import Photo']

class createScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      txt_img_type: "",
      txt_img_name: "",
      txt_img_desc: "",
      imgSrc: ""
    };

    // this.showActionSheet = this.showActionSheet.bind(this)
  }

  onPostImg(){

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
            ImageResizer.createResizedImage(response.uri, 700, 500, 'JPEG', 80)
              .then(({uri}) => {
                let source = { uri: uri };
                this.setState({imgSrc: source});
            })
              .catch( err => {
                  console.log('error=', err);
            }); 
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
          ImageResizer.createResizedImage(response.uri, 700, 500, 'JPEG', 80)
                .then(({uri}) => {
                  let source = { uri: uri };
                  this.setState({imgSrc: source});
              })
                .catch( err => {
                    console.log('error=', err);
              });
        }
    });
}

  render(){
    const{txt_img_desc, txt_img_name, txt_img_type, imgSrc} = this.state;
    return(
      <ScrollView style={styles.container}>
        <CustomBar 
          title={"New"}
          navigate={this.props.navigation}
        />
        <View style={styles.img_container}>
          <Image 
            style={styles.imgWrap}
            source={imgSrc==="" ? require("../../../../assets/image/img_empty.png"): imgSrc}
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
          <TextField 
            style={styles.detailsTxtWrap}
            label={"Image Type"}  
            value={txt_img_type}
            onChangeText={text => this.setState({ txt_img_type: text })}
          />
          <TextField 
            style={styles.detailsTxtWrap}
            label={"Image Description"}
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
      </ScrollView>
    )
  }
}

export default createScreen;