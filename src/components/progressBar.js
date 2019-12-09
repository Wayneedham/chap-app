import React, { Component } from 'react';
import {
  View,
  Text,
  Modal
} from 'react-native';
import * as Progress from "react-native-progress";
import styles from "./progressBarStyle";

class progressBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      timer: 25
    }
  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps.isTimer === true && this.props.nextProps !== nextProps.isTimer){
      this.interval = setInterval(
        () => {
          this.setState((prevState)=> ({ timer: prevState.timer - 1 }))
        },
        1000
      );
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
          <Progress.Circle size={60} indeterminate={true} color={"blue"}/>
          {
            isTimer && timer>=0 &&
            <View style={{marginTop: 10}}>
              <Text style={{color: 'red'}}>{"Your image will be ready in " + timer + " seconds."}</Text>
            </View>
          }   
        </View>               
      </Modal>
    )
  }
}

export default progressBar;