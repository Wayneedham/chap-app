import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  Platform
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Progress from "react-native-progress";

import * as userActions from "../../../actions/userActions";
import {getDataError, getDataSuccess, getDataPending} from '../../../reducers/fetchdata';
import HorseListItem from "../../../components/horseListItem";
import styles from "./homeScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";
import serverurl from '../../../../config/const/serverurl';

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
      searchName: "",
      isShowModal: this.props.pending
    };
  }

  componentDidMount(){
    console.log("current=", window.currentUser);
    this.props.actions.fetchHorseList(window.currentUser["id"]);
    this.setState({isShowModal: true});
  }

  componentWillReceiveProps(nextProps){ 
    if(nextProps.pending === false){
      this.setState({isShowModal: false});
      const responseData = nextProps.data;
      if(responseData.length > 0){   
        console.log("load success  ss=====", responseData);     
        let list = [];
        responseData.map(item=>{
          item["file"] = serverurl.server_url + item["file"];
          list.push(item);
        })
        this.setState({horseList: list});
      }
    }
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
  }

  render(){
    const{horseList, isShowModal} = this.state;
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
        <Modal          
          animationType={'none'}
          transparent={true}
          visible={isShowModal}
          onRequestClose={()=>{}}>
          <View style={styles.progressWrap}>
            <Progress.Circle size={60} indeterminate={true} color={"blue"}/>
          </View>          
        </Modal>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  error: getDataError(state.fetchdata),
  data: getDataSuccess(state.fetchdata),
  pending: getDataPending(state.fetchdata)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchHorseList: userActions.fetchHorseList
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(homeScreen);
