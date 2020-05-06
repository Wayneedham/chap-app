import * as React from "react";
import { Text, View, Image } from "react-native";
import {
  createBottomTabNavigator,
  StackNavigator
} from "react-navigation";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NetInfo from "@react-native-community/netinfo";

import homeScreen from "./home/homeScreen";
import createScreen from "./home/createScreen";
import videoScreen from "./home/videoScreen";
import aboutScreen from "./home/aboutScreen";
import tutorialScreen from "./home/tutorialScreen";

import settingScreen from "./setting/settingScreen";
import profileScreen from "./setting/profileScreen";
import membershipScreen from "./setting/membershipScreen";
import changePwdScreen from "./setting/changePwdScreen";
import languagesScreen from "./setting/languagesScreen"
import courseScreen from "./videos/courseScreen";
import historyScreen from "./history/historyScreen";
import detailsScreen from "./history/detailScreen";
import detectScreen from "./detect/detectScreen";

import {setActiveHistoryScreen} from '../../reducers/fetchdata';
import { setNetworkConnect } from "../../reducers/connection";
import styles from "./tabNavigatorStyle";
import colorStyle from "../../sharedStyles/colorStyle";
import fonts from "../../sharedStyles/fontStyle";


export const HomeStack = StackNavigator(
  {
    home: {
      screen: homeScreen
    },
    create:{
      screen: createScreen
    },
    video: {
      screen: videoScreen
    },
    about: {
      screen: aboutScreen
    },
    tutorial: {
      screen: tutorialScreen
    }
  },
  {
    headerMode: "none",
    initialRouteName: "home",
    navigationOptions: {
      headerVisible: false
    }
  }
);

export const HistoryStack = StackNavigator(
  {
    history: {
      screen: historyScreen
    },
    details: {
      screen: detailsScreen
    }
  },
  {
    headerMode: "none",
    initialRouteName: "history",
    navigationOptions: {
      headerVisible: false
    }
  }
);

export const SettingStack = StackNavigator(
  {
    setting: {
      screen: settingScreen
    },
    profile: {
      screen: profileScreen
    },
    changepwd:{
      screen: changePwdScreen
    },
    languages:{
      screen: languagesScreen
    },
    membership:{
      screen: membershipScreen
    }
  },
  {
    headerMode: "none",
    initialRouteName: "setting",
    navigationOptions: {
      headerVisible: false
    }
  }
);

class customTabNavigator extends React.Component {
  componentDidMount()
  {
    NetInfo.addEventListener(state => {
      let isConnected = false;
      if(state.isConnected){
        if(state.isInternetReachable === null)
          isConnected = false;
        else{
          if(state.type === 'unknown' || state.type==='none')
            isConnected = false;
          else
            isConnected = true;
        }
      }else
        isConnected = false;
      this.props.actions.setNetworkConnect(isConnected);
    });
  }

  render() {
    console.warn(this.props)
    return (
      <BaseNavigator screenProps={this.props}/>
    );
  }
}

export const BaseNavigator = createBottomTabNavigator(
  {
    HOME: {
      screen: HomeStack,
      navigationOptions: ({ screenProps }) => ({
        tabBarIcon: ({ focused }) =>
         (
          <View style={styles.tabItem_container}>
            <Image
              resizeMode="contain"
              source={require("../../../assets/icons/icon_tab_home.png")}
              style={[
                styles.tabaricon,
                focused
                  ? { tintColor: colorStyle.colorMainGray }
                  : { tintColor: colorStyle.colorInactiveTab }
              ]}
            />
            <Text
              allowFontScaling={false}
              style={[
                focused ? styles.focusedicontext : styles.unfocusedicontext,
                fonts.montserrat_medium
              ]}
            >
              {" "}
              {screenProps.intlData.messages['home']['home']}{" "}
            </Text>
          </View>
         ),
        tabBarOnPress: ({ navigation, defaultHandler, jumpToIndex }) => {
          defaultHandler();
          screenProps.actions.setActive(0);
          navigation.navigate("home");
        }
      })
    },
    COURSE: {
      screen: courseScreen,
      navigationOptions: ({ screenProps }) => ({
        tabBarIcon: ({ focused }) =>
          (
            <View style={styles.tabItem_container}>
              <Image
                resizeMode="contain"
                source={require("../../../assets/icons/icon_tab_video.png")}
                style={[
                  styles.tabaricon,
                  focused
                    ? { tintColor: colorStyle.colorMainGray }
                    : { tintColor: colorStyle.colorInactiveTab }
                ]}
              />
              <Text
                allowFontScaling={false}
                style={[
                  focused ? styles.focusedicontext : styles.unfocusedicontext,
                  fonts.montserrat_medium
                ]}
              >
                {" "}
                {screenProps.intlData.messages['videos']['videos']}{" "}
              </Text>
            </View>
          ),
          tabBarOnPress: ({ navigation, defaultHandler, jumpToIndex }) => {
            defaultHandler();
            screenProps.actions.setActive(1);
          }
      })
    },
    DETECT: {
      screen: detectScreen,
      navigationOptions: ({ screenProps }) => ({
        tabBarIcon: ({ focused }) =>
         (
            <View style={styles.tabItem_container}>
              <Image
                resizeMode="contain"
                source={require("../../../assets/icons/icon_tab_detect.png")}
                style={[
                  styles.tabaricon,
                  focused
                    ? { tintColor: colorStyle.colorMainGray }
                    : { tintColor: colorStyle.colorInactiveTab }
                ]}
              />
              <Text
                allowFontScaling={false}
                style={[
                  focused ? styles.focusedicontext : styles.unfocusedicontext,
                  fonts.montserrat_medium
                ]}
              >
                {" "}
                {screenProps.intlData.messages['detection']['detection']}{" "}
              </Text>
            </View>
          ),
          tabBarOnPress: ({ navigation, defaultHandler, jumpToIndex }) => {
            defaultHandler();
            screenProps.actions.setActive(2);
          }
      })
    },
    HISTORY: {
      screen: HistoryStack,
      navigationOptions: ({ screenProps }) => ({
        tabBarIcon: ({ focused }) =>
         (
            <View style={styles.tabItem_container}>
              <Image
                resizeMode="contain"
                source={require("../../../assets/icons/icon_tab_history.png")}
                style={[
                  styles.tabaricon,
                  focused
                    ? { tintColor: colorStyle.colorMainGray }
                    : { tintColor: colorStyle.colorInactiveTab }
                ]}
              />
              <Text
                allowFontScaling={false}
                style={[
                  focused ? styles.focusedicontext : styles.unfocusedicontext,
                  fonts.montserrat_medium
                ]}
              >
                {" "}
                {screenProps.intlData.messages['history']['history']}{" "}
              </Text>
            </View>
          ),
          tabBarOnPress: ({ navigation, defaultHandler, jumpToIndex }) => {
            defaultHandler();
            screenProps.actions.setActive(3);
          }
      })
    },
    SETTINGS: {
      screen: SettingStack,
      navigationOptions: ({ screenProps }) => ({
        tabBarIcon: ({ focused }) => (
          <View style={styles.tabItem_container}>
            <Image
              resizeMode="contain"
              source={require("../../../assets/icons/icon_tab_menu.png")}
              style={[
                styles.tabaricon,
                focused
                  ? { tintColor: colorStyle.colorMainGray }
                  : { tintColor: colorStyle.colorInactiveTab }
              ]}
            />
            <Text
              allowFontScaling={false}
              style={[
                focused ? styles.focusedicontext : styles.unfocusedicontext,
                fonts.montserrat_medium
              ]}
            >
              {" "}
              {screenProps.intlData.messages['settings']['settings']}{" "}
            </Text>
          </View>
        ),
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          defaultHandler();
          navigation.navigate("setting");
          screenProps.actions.setActive(4);    
        }
      })
    },   
  },
  {
    tabBarOptions: {
      showLabel: false,
      drawUnderStatusBar: true,
      navBarTopPadding: 24,
      style: { borderTopColor: "transparent" }
    },
    initialRouteName: "HOME"
  }
);

const mapStateToProps = (state) => ({
  intlData: state.IntlReducers
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      setActive: setActiveHistoryScreen,
      setNetworkConnect: setNetworkConnect
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(customTabNavigator);

// export default customTabNavigator;
