import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, LayoutAnimation } from 'react-native';

export default class NotificationScreen extends React.Component{
render() {
  return (
    <View style={styles.container}>
        <Text>Notification Screen</Text>
    </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  }
});
