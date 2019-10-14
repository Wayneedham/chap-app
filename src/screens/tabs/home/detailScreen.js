import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  PermissionsAndroid,
  Platform
} from 'react-native';
import { responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import FastImage from 'react-native-fast-image';
import styles from "./detailScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";

class detailScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      calcImgHeight: 0
    };
  }

  goBack = () => {
    // Actions.pop();
    this.props.navigation.goBack();
  }

  render(){
    const detailItem = this.props.navigation.getParam("detailItem");
    console.log("detailItem===", detailItem);
    const{calcImgHeight} = this.state;
    return(
      <View style={styles.container}>
        <View style={styles.topbar_wrap}>
          <Text style={[styles.title, fonts.montserrat_bold]}>DETAILS</Text>
          <TouchableOpacity style={styles.back_wrap} onPress={this.goBack}>
            <Image
              source={require("../../../../assets/icons/icon_back_white.png")}
              style={styles.back}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.detail_wrap}>
          <FastImage 
            resizeMode="contain"
            style={{ width: responsiveWidth(94), height: calcImgHeight }}
            source={{ uri: detailItem.image }}
            onLoad={evt =>
              this.setState({
                calcImgHeight:
                  evt.nativeEvent.height / evt.nativeEvent.width * responsiveWidth(94), // By this, you keep the image ratio
              })}
          />
          <View style={styles.detail_txt_wrap}>
            <Text style={[styles.detail_bold_txt, fonts.montserrat_semibold]}>
            {"Image Type: "}<Text style={[fonts.montserrat_regular]}>{detailItem.type}</Text>
            </Text>
            <Text style={[styles.detail_bold_txt, fonts.montserrat_semibold]}>
              {"Age: "} <Text style={[fonts.montserrat_regular]}>{parseFloat(detailItem.age).toFixed(5)}</Text>
            </Text>
            <View>
              <Text style={[styles.detail_bold_txt, fonts.montserrat_semibold]}>
                Description
              </Text>
              <Text style={[fonts.montserrat_regular]}>
                {detailItem.desc}
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default detailScreen;