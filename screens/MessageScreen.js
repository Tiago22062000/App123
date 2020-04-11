import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, LayoutAnimation } from 'react-native';

export default class MessageScreen extends React.Component{
render() {
  return (
    <View style={styles.container}>
        <Text>Message Screen</Text>
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
