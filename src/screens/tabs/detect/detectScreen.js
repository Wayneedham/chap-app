import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  Modal
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Progress from "react-native-progress";

import DetectComponent from "../../pagecomponents/detectComponent";
import * as userActions from "../../../actions/userActions";
import {getDataError, getDataSuccess, getDataPending} from '../../../reducers/fetchdata';
import styles from "./detectScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";



class detectScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      initData: false
    };    
  }
  
  componentWillReceiveProps(nextProps){    
    if(nextProps.pending === false){
      const responseData = nextProps.data;
      if(Object.keys(responseData).includes("message")){
        Alert.alert(
          "",
          responseData["message"],
          [{ text: "OK", onPress: () => {this.setState({isShowModal: false});} }],
          { cancelable: false }
        );
      }
      else if(Object.keys(responseData).includes("recent")){   

        Alert.alert(
          "",
          "The image was detected successfully.",
          [{ text: "OK", onPress: () => {
            this.setState({isShowModal: false, initData: true});            
          }}],
          { cancelable: false }
        );
        console.log("post success  sss");     
      }
    }
  }

  onCreateDetect =(userData)=>{    
    console.log("userData==", userData);
    this.setState({isShowModal: true});
    this.props.actions.postHorse(userData);
  }

  render(){
    const{isShowModal, initData} = this.state;
    // const{pending} = this.props;
    return(
      <ScrollView style={styles.container}>
        <Text style={[styles.title, fonts.montserrat_bold]}>New</Text>
        <DetectComponent 
          onPostHorse={this.onCreateDetect}
          initData={initData}
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
      </ScrollView>
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
      postHorse: userActions.postNewHorse
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(detectScreen);