import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import {
  responsiveWidth, responsiveHeight
} from 'react-native-responsive-dimensions';
import FastImage from 'react-native-fast-image';
import ImageZoom from 'react-native-image-pan-zoom';
import moment from "moment";

import * as userActions from "../../../actions/userActions";
import CustomBar from "../../../components/customBar";
import styles from "./detailScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";

class detailScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      calcImgHeight: 0,
      zoomModal: false,
    };
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  onZoomImage =(flag)=>{
    this.setState({zoomModal: flag})
  }

  render(){
    const detailItem = this.props.navigation.getParam("detailItem");
    let age = detailItem.age === null ? 0 : detailItem.age;
    age = userActions.calcuateHorseAge(age);
    // if(detailItem.image_type.toLowerCase() === "lower"){
    //   age = parseFloat(age) >= 17 ? "17 or Older" : parseFloat(age).toFixed(5);
    // }else{
    //   age = parseFloat(age) >= 20 ? "20 or Older" : parseFloat(age).toFixed(5);
    // }

    const{calcImgHeight, zoomModal} = this.state;
    return(
      <ScrollView style={styles.container}>
        <CustomBar 
          title={detailItem["name"]}
          navigate={this.props.navigation}
        />
        <View style={styles.detail_wrap}>
          <TouchableOpacity onPress={()=>this.onZoomImage(true)}>
            <FastImage 
              resizeMode="contain"
              style={{ width: responsiveWidth(94), height: calcImgHeight }}
              source={{ uri: detailItem.detect_file }}
              onLoad={evt =>
                this.setState({
                  calcImgHeight:
                    evt.nativeEvent.height / evt.nativeEvent.width * responsiveWidth(94), // By this, you keep the image ratio
                })}
            />
          </TouchableOpacity>
          
          <View style={styles.detail_txt_wrap}>
            <Text style={[styles.detail_bold_txt, fonts.montserrat_semibold]}>
            {"Uploaded At: "}<Text style={[fonts.montserrat_regular]}>{moment(detailItem.uploaded_at).format('MM-DD-YYYY')}</Text>
            </Text>
            <Text style={[styles.detail_bold_txt, fonts.montserrat_semibold]}>
            {"Image Type: "}<Text style={[fonts.montserrat_regular]}>{detailItem.image_type}</Text>
            </Text>
            <Text style={[styles.detail_bold_txt, fonts.montserrat_semibold]}>
              {"Age: "} <Text style={[fonts.montserrat_regular]}>{age}</Text>
            </Text>
            <View>
              <Text style={[styles.detail_bold_txt, fonts.montserrat_semibold]}>
                Description
              </Text>
              <Text style={[fonts.montserrat_regular]}>
                {detailItem.description}
              </Text>
            </View>
          </View>
        </View>
        <Modal
          animationType={'slide'}      
          visible={zoomModal}
          onRequestClose={()=>{}}>
            <View style={styles.modal_container}>
              <ImageZoom cropWidth={Dimensions.get('window').width}
                        cropHeight={Dimensions.get('window').height}
                        imageWidth={responsiveWidth(100)}
                        imageHeight={responsiveHeight(100)}>
                <FastImage 
                  style={{width:responsiveWidth(100), height:responsiveHeight(100)}}
                  source={{uri:detailItem.detect_file}}
                  resizeMode="contain"
                  />
              </ImageZoom>
              <TouchableOpacity style={styles.dismissWrap} onPress={()=>this.onZoomImage(false)}>
                <Text style={[styles.dismiss, fonts.montserrat_bold]}>Close</Text>
              </TouchableOpacity>
            </View>
        </Modal>
      </ScrollView>
    )
  }
}

export default detailScreen;