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

import DetectComponent from "../../pagecomponents/detectComponent";
import * as userActions from "../../../actions/userActions";
import {getDataError, getDataSuccess, getDataPending} from '../../../reducers/fetchdata';
import ProgressBar from "../../../components/progressBar";
import CustomBar from "../../../components/customBar";
import styles from "./createScreenStyle";


class createScreen extends Component{
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
        <CustomBar 
          title={"New"}
          navigate={this.props.navigation}
        />
        <DetectComponent 
          onPostHorse={this.onCreateDetect}
          initData={initData}
        />        
        <ProgressBar isPending={isShowModal}/>
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
)(createScreen);