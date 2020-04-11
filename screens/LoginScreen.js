import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Image, StatusBar, LayoutAnimation} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component{
    static navigationOptions = {
        headerShown: false
    };

  state={
      email:'',
      password:'',
      errorMessage: null
  };

  handleLogin = () => {
    const { email, password} = this.state;
    
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => this.setState({errorMessage: error.message}))
  }
render() {
  return (
    <View style={styles.container}>
        <StatusBar barStyle='light-content'></StatusBar>
        <Text style={styles.greeting}>{'Bem-vindo à\nRide n\'Go'}</Text>

        <View style={styles.errorMessage}>
            {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
        </View>

        <View style={styles.form}>
            <View>
                <Text style={styles.inputTitle}>Email</Text>
                <TextInput 
                    style={styles.input} 
                    autoCapitalize='none' 
                    onChangeText={email => this.setState({email})}
                    value={this.state.email}
                ></TextInput>
            </View>

            <View>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput 
                    style={styles.input} 
                    secureTextEntry 
                    autoCapitalize='none'
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                ></TextInput>
            </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={{color:'#FFF'}}>Sign In</Text>
        </TouchableOpacity>
        
        <View style={{alignSelf:'center', marginTop:32, flexDirection:'row'}}>
            <Text style={{color:'black'}}>Ainda não tens conta? </Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                <Text style={{  color:'red'}}>Regista-teeeeeeeeee</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  greeting:{
    marginTop:32,
    fontSize:18,
    textAlign:'center'
  },
  errorMessage:{
      height:72,
      alignItems:'center',
      justifyContent:'center',
      marginHorizontal:30
  },
  error:{
      color:'red',
      fontSize:13,
      textAlign:'center'
  },
  form:{
      marginBottom:48,
      marginHorizontal:30
  },
  inputTitle:{
      color:'orange',
      fontSize:10,
      textTransform:'uppercase'
  },
  input:{
      borderBottomColor:'blue',
      borderBottomWidth: StyleSheet.hairlineWidth,
      height:40,
      fontSize:15,
      color:'green'
  },
  button:{
      marginHorizontal:30,
      backgroundColor:'orange',
      borderRadius:4,
      height:52,
      alignItems:'center',
      justifyContent:'center'
  }
});
