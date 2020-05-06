import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  Modal
} from 'react-native';
import * as Progress from "react-native-progress";
import styles from "./progressBarStyle";
import { connect } from 'react-redux';

const loadingSeconds = Platform.OS ==='ios' ? 30 : 45

class progressBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      timer: loadingSeconds
    }
  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps.isPending !== this.props.isPending){
      if(this.interval)
        clearInterval(this.interval);
      this.setState({timer: loadingSeconds}, ()=>{
        if(nextProps.isTimer === true && this.props.nextProps !== nextProps.isTimer){
          this.interval = setInterval(
            () => {
              this.setState((prevState)=> ({ timer: prevState.timer - 1 }))
            },
            1000
          );
      }});
    }
  }

  
  componentDidUpdate(){
    if(this.state.timer === 0 && this.props.isTimer === true){ 
      clearInterval(this.interval);
    }
  }
  
  componentWillUnmount(){
    if(this.props.isTimer === true){
      clearInterval(this.interval);
    }
  }

  render(){
    const{isPending, isTimer} = this.props;
    const {timer} = this.state;
    return(
      <Modal
        animationType={'none'}
        transparent={true}
        visible={isPending}
        onRequestClose={()=>{}}>
        <View style={styles.progressWrap}>
          {
            isTimer && timer>=0 &&
            <View style={styles.loadingTxtWrap}>
              <Text style={styles.loadingTxt}>{"Your image will be ready in " + timer + " seconds."}</Text>
            </View>
          }
          <Progress.Circle size={60} indeterminate={true} color={"blue"}/>
        </View>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  intlData: state.IntlReducers
})

export default connect(mapStateToProps, null)(progressBar);