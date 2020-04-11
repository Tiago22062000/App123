import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Ionicons} from '@expo/vector-icons';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import firebaseKeys from './Config';
import LoadingScreen from './screens/LoadingScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';

import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import ProfileScreen from './screens/ProfileScreen';
import NotificationScreen from './screens/NotificationScreen';
import MessageScreen from './screens/MessageScreen';

const AppContainer = createStackNavigator(
  {
    default: createBottomTabNavigator (
      {
        Home: {
          screen: HomeScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-home' size={24} color={tintColor}/>
          }
        },
        Message: {
          screen: MessageScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-chatboxes' size={24} color={tintColor}/>
          }
        },
        Post: {
          screen: PostScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => 
            <Ionicons 
              name='ios-add-circle' 
              size={48} 
              color='orange'
              style={{ 
                shadowColor:'#E9446A', 
                shadowOffset: { 
                  width:0,  
                  height:0, 
                  shadowRadius: 10, 
                  shadowOpacity: 0.3}}}
                  />
          }
        },
        Notification: {
          screen: NotificationScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-notifications' size={24} color={tintColor}/>
          }
        },
        Profile: {
          screen: ProfileScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-person' size={24} color={tintColor}/>
          }
        },
      },
      {
        defaultNavigationOptions:{
          tabBarOnPress: ({navigation, defaultHandler}) => {
            if (navigation.state.key === 'Post'){
              navigation.navigate('postModal')
            } else {
              defaultHandler()
            }
          }
        },

        tabBarOptions:{
          activeTintColor: 'orange',
          inactiveTintColor: 'black',
          showLabel: false
        }
      }
    ),
    postModal:{
      screen: ProfileScreen
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
)

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
}, {
  initialRouteName:''
}
)

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppContainer,
      Auth: AuthStack
    },
    {
      initialRouteName: 'Loading'
    }
  )
)