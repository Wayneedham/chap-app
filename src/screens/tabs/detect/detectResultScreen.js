import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Alert
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import * as userActions from "../../../actions/userActions";
import {getDataError, getDataSuccess, getDataPending, setReduxAddInfo} from '../../../reducers/fetchdata';
import DetectModal from "../../../components/detectModal";
import serverurl from '../../../../config/const/serverurl';

class detectResultScreen extends Component{

  constructor(props){
    super(props);
    this.state = {
      isShowModal: false
    }
  }

  componentWillReceiveProps(nextProps){ 
    const responseData = nextProps.data;
    if(nextProps.pending === false && responseData!==""){      
      if(Object.keys(responseData).includes("detect_file")){
        this.setState({isShowModal: false}); 
      }
      this.props.actions.initReduxData("");
    }    
  }

  onDismissRecent=()=>{    
    Actions.pop();
  }

  handleConfirm =(horseAge)=>{
    const{recentData} = this.props;
    const url = serverurl.basic_url + 'answer';
    const userData = new FormData()
    userData.append('user', window.currentUser["id"]);
    userData.append('detection', recentData["id"]);
    userData.append('age', horseAge);
    this.props.actions.postNewRequest(userData, url);   // send horse's age via email. 
    setTimeout(()=>{
      this.setState({isShowModal: true})
    }, 300);   
  }

  render(){
    const{recentData} = this.props;
    return(
      <ScrollView>
        <DetectModal 
          recentData={recentData}
          onDone={this.onDismissRecent}
          handleConfirm={this.handleConfirm}
        />  
      </ScrollView>
    )
  }
}


const mapStateToProps = state => ({
  error: getDataError(state.fetchdata),
  data: getDataSuccess(state.fetchdata),
  isactive: state.fetchdata.isactive,
  pending: getDataPending(state.fetchdata)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      postNewRequest: userActions.postRequest,
      initReduxData: setReduxAddInfo
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(detectResultScreen);
