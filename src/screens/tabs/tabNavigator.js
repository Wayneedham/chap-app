import * as React from "react";
import { Text, View, Image } from "react-native";
import {
  createBottomTabNavigator,
  StackNavigator
} from "react-navigation";
import homeScreen from "./home/homeScreen";
import createScreen from "./home/createScreen";
import detailsScreen from "./home/detailScreen";
import settingScreen from "./setting/settingScreen";
import profileScreen from "./setting/profileScreen";
import videoScreen from "./setting/videoScreen";

import historyScreen from "./history/historyScreen";
import detectScreen from "./detect/detectScreen";

import styles from "./tabNavigatorStyle";
import colorStyle from "../../sharedStyles/colorStyle";
import fonts from "../../sharedStyles/fontStyle";


export const HomeStack = StackNavigator(
  {
    home: {
      screen: homeScreen
    },
    details: {
      screen: detailsScreen
    },
    create:{
      screen: createScreen
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


export const SettingStack = StackNavigator(
  {
    setting: {
      screen: settingScreen
    },
    profile: {
      screen: profileScreen
    },
    video: {
      screen: videoScreen
    },
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
  
  render() {
    return (
      <BaseNavigator/>
    );
  }
}
historyScreen
export const BaseNavigator = createBottomTabNavigator(
  {
    HOME: {
      screen: HomeStack,
      navigationOptions: ({ screenProps }) => ({
        tabBarIcon: ({ focused }) =>
          screenProps.isActiveMenu ? (
            <View style={styles.tabItem_container}>
              <Image
                resizeMode="contain"
                source={require("../../../assets/icons/icon_tab_home.png")}
                style={[
                  styles.tabaricon,
                  { tintColor: colorStyle.colorInactiveTab }
                ]}
              />
              <Text
                allowFontScaling={false}
                style={[styles.unfocusedicontext, fonts.montserrat_medium]}
              >
                {" "}
                Home{" "}
              </Text>
            </View>
          ) : (
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
                Home{" "}
              </Text>
            </View>
          ),
        tabBarOnPress: ({ navigation, defaultHandler, jumpToIndex }) => {
          defaultHandler();
          navigation.navigate("home");
        }
      })
    },
    DETECT: {
      screen: detectScreen,
      navigationOptions: ({ screenProps }) => ({
        tabBarIcon: ({ focused }) =>
          screenProps.isActiveMenu ? (
            <View style={styles.tabItem_container}>
              <Image
                resizeMode="contain"
                source={require("../../../assets/icons/icon_tab_home.png")}
                style={[
                  styles.tabaricon,
                  { tintColor: colorStyle.colorInactiveTab }
                ]}
              />
              <Text
                allowFontScaling={false}
                style={[styles.unfocusedicontext, fonts.montserrat_medium]}
              >
                {" "}
                Detection{" "}
              </Text>
            </View>
          ) : (
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
                Detection{" "}
              </Text>
            </View>
          )
      })
    },
    HISTORY: {
      screen: historyScreen,
      navigationOptions: ({ screenProps }) => ({
        tabBarIcon: ({ focused }) =>
          screenProps.isActiveMenu ? (
            <View style={styles.tabItem_container}>
              <Image
                resizeMode="contain"
                source={require("../../../assets/icons/icon_tab_home.png")}
                style={[
                  styles.tabaricon,
                  { tintColor: colorStyle.colorInactiveTab }
                ]}
              />
              <Text
                allowFontScaling={false}
                style={[styles.unfocusedicontext, fonts.montserrat_medium]}
              >
                {" "}
                History{" "}
              </Text>
            </View>
          ) : (
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
                History{" "}
              </Text>
            </View>
          )
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
              Settings{" "}
            </Text>
          </View>
        ),
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          const { isFocused } = navigation;
          if (!isFocused()) {
            defaultHandler();
          }        
        }
      })
    },   
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: { borderTopColor: "transparent" }
    },
    initialRouteName: "HOME"
  }
);

export default customTabNavigator;
