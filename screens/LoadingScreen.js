import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import firebase from 'firebase';

export default class LoadingScreen extends React.Component{
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "App" : "Auth")
    })
  }
  
  render() {
  return (
    <View style={styles.container}>
     <Text style={{color:'red'}}>Loading...</Text>
     <ActivityIndicator size='large'></ActivityIndicator>
    </View>
    )
  }
}
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'black'
  }
});
