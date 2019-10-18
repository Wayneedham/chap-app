import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import colorStyle from "../sharedStyles/colorStyle";

export default class RadioButtons extends Component {

	render() {
		const { options } = this.props;

		return (
			<View style={styles.container}>
				{options.map(item => {        
					return (
						<TouchableOpacity key={item.key} style={styles.buttonContainer} onPress={() => this.props.onSelectImgType(item)}>							
							<View
								style={styles.circle}								
							>
								{item.selected === true && <View style={styles.checkedCircle} />}
							</View>
              <Text style={styles.radioTxt}>{item.text}</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: "row",
    paddingLeft: 10
  },
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginRight: 30,
	},

	circle: {
		height: 20,
		width: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#ACACAC',
		alignItems: 'center',
		justifyContent: 'center',
	},
  
	checkedCircle: {
		width: 14,
		height: 14,
		borderRadius: 7,
		backgroundColor: '#794F9B',
  },
  
  radioTxt:{
    marginLeft: 10,
    color: colorStyle.colorMainGray
  }
});
