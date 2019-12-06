import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

class quizVideoScreen extends Component{
  render(){
    return(
      <View>
        <Text>How Old Do You Think this Horse is?</Text>
        <Image/>
        <View>
          <TouchableOpacity>
            <Text>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Prev</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>9 Years Old</Text>
          <TouchableOpacity>
            <Text>Watch Video for Explanations</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default quizVideoScreen;