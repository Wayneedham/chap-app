import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Platform
} from 'react-native';

import HorseListItem from "../../../components/horseListItem";
import styles from "./homeScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";

const test_data = {
  image: "http://agehorseservice.eastus.cloudapp.azure.com:8000/media/IMG_0007.JPG",
  desc: "test desc",
  type: "lower",
  age: "12.92333355"
}

class homeScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      horseList: [],
      searchName: ""
    };
  }

  componentDidMount(){
    var imgList = [];
    for(let i=0; i<10; i++){
      imgList.push(test_data);
    }
    this.setState({horseList: imgList});
  }

  goDetail =(item)=>{
    this.props.navigation.navigate("details", {
      detailItem: item
    });
  }

  onCreate(){
    this.props.navigation.navigate("create");
  }

  onSearchName(){
    const{searchName} = this.state;
    console.log("search === ", searchName);
  }

  render(){
    const{horseList} = this.state;
    return(
      <View style={styles.container}>
        <View style={styles.topbar_wrap}>
          <Text style={[styles.title, fonts.montserrat_bold]}>HOME</Text>
          <TouchableOpacity style={styles.camera_wrap} onPress={()=>{this.onCreate()}}>
            <Image
              source={require("../../../../assets/icons/icon_new.png")}
              style={styles.camera}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.search_wrap}>
          <Image 
            style={styles.searchIcon}
            source={require("../../../../assets/icons/icon_search.png")}
            resizeMode="contain"
          />
          <TextInput 
            placeholder="Search Name"            
            inlineImageLeft="search_icon"
            returnKeyType="search"
            onChangeText={text => {this.setState({searchName: text})}}
            onSubmitEditing={()=>{this.onSearchName()}}
          />
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={horseList}
          renderItem={({ item, index }) => (
            <HorseListItem
              key={index}
              horseItem={item}
              onClick={()=>this.goDetail(item)}
            />
          )}
        />
      </View>
    )
  }
}

export default homeScreen;