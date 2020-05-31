import React, { Component } from 'react';
import {
  ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import * as userActions from "../../../actions/userActions";
import {getDataError, getDataSuccess, getDataPending, setReduxAddInfo} from '../../../reducers/fetchdata';
import DetectModal from "../../../components/detectModal";
import serverurl from '../../../../config/const/serverurl';

class detectResultScreen extends Component{

  constructor(props){
    super(props);
    this.state = {
      isShowModal: false,
      isPromptDialog: true
    }
  }

  componentWillReceiveProps(nextProps){ 
    const responseData = nextProps.data;
    if(nextProps.isactive==2){
      if(nextProps.pending === false && responseData!==""){
        if(Object.keys(responseData).includes("detect_file")){
          this.props.initReduxData("");
        }
      }
    }
  }

  onDismissRecent=()=>{
    Actions.pop();
  }

  handleConfirm = async (horseAge)=>{
    this.setState({isShowModal: true, isPromptDialog: false})
    const{recentData} = this.props;
    const url = serverurl.basic_url + 'answer';
    const userData = new FormData()
    userData.append('user', window.currentUser["id"]);
    userData.append('detection', recentData["id"]);
    userData.append('age', horseAge);
    await this.props.postNewRequest(userData, url);   // send horse's age via email. 
    this.setState({isShowModal: false})
    // setTimeout(() => {
    //   this.props.navigation.goBack(null)
    // }, 300);
  }

  render(){
    const{recentData} = this.props;
    const {isShowModal, isPromptDialog} = this.state;
    return(
      <ScrollView>
        <DetectModal 
          recentData={recentData}
          onDone={this.onDismissRecent}
          handleConfirm={this.handleConfirm}
          isShowModal={isShowModal}
          isPromptDialog={isPromptDialog}
        />
      </ScrollView>
    )
  }
}


const mapStateToProps = state => ({
  error: getDataError(state.fetchdata),
  data: getDataSuccess(state.fetchdata),
  isactive: state.fetchdata.isactive,
  pending: getDataPending(state.fetchdata),
  intlData: state.IntlReducers
})

const mapDispatchToProps = dispatch => {
  return {
    postNewRequest: (postData, url) => dispatch(userActions.postRequest(postData, url)),
    initReduxData: (initial) => dispatch(setReduxAddInfo(initial))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(detectResultScreen);
