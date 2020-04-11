import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Image, TouchableOpacity, StatusBar } from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import Fire from '../Fire';
import {Ionicons} from '@expo/vector-icons';
import UserPermissions from '../utilities/UserPermissions';
import * as ImagePicker from 'expo-image-picker';

export default class RegisterScreen extends React.Component{
    static navigationOptions = {
        headerShown: false
    }; 
    
  state={
      user: {
        name: '',
        email:'',
        password:'',
        avatar: null
      },
      errorMessage: null
  };

  handlerPickAvatar = async() => {
      UserPermissions.getCameraPermission()

      let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowEditing: true,
          aspect: [4,3]
      });

      if (!result.cancelled) {
          this.setState({ user: { ...this.state.user, avatar: result.uri}});
      }
  };

  handleSignUp = () => {
      Fire.shared.createUser(this.state.user);
     };

render() {
  return (
    <View style={styles.container}>
        <StatusBar barStyle='light-content'></StatusBar>

        <View style={{top:64, alignItems: 'center', width:'100%'}}>
            <Text style={styles.greeting}>{'Preencha o\nFormulário'}</Text>
            <TouchableOpacity  style={styles.avatarPlaceholder} onPress={this.handlerPickAvatar}>
                <Image source={{uri: this.state.user.avatar}} style={styles.avatar} />
                <Ionicons name='ios-add' size={40} color='red' style={{marginTop:8, marginLeft:2}} />
            </TouchableOpacity>
        </View>

        <View style={styles.errorMessage}>
            {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
        </View>

        <View style={styles.form}>
            <View>
                <Text style={styles.inputTitle}>Name</Text>
                <TextInput 
                    style={styles.input} 
                    autoCapitalize='none' 
                    onChangeText={name => this.setState({user: { ...this.state.user, name} })}
                    value={this.state.user.name}
                ></TextInput>
            </View>

            <View>
                <Text style={styles.inputTitle}>Email</Text>
                <TextInput 
                    style={styles.input} 
                    autoCapitalize='none' 
                    onChangeText={email => this.setState({user: { ...this.state.user, email} })}
                    value={this.state.user.email}
                ></TextInput>
            </View>

            <View>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput 
                    style={styles.input} 
                    secureTextEntry 
                    autoCapitalize='none'
                    onChangeText={password => this.setState({user: { ...this.state.user, password} })}
                    value={this.state.user.password}
                ></TextInput>
            </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
            <Text style={{color:'#FFF'}}>Registrar</Text>
        </TouchableOpacity>
        
        <View style={{alignSelf:'center', marginTop:32, flexDirection:'row'}}>
            <Text style={{color:'black'}}>Ainda não tens conta? </Text>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={{  color:'red'}}>Entra</Text>
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
  }, 
  avatar:{
      position: 'absolute',
      width:80,
      height:80,
      borderRadius:50
  },
  avatarPlaceholder:{
      width: 100,
      height:100,
      backgroundColor: '#E1E2E6',
      borderRadius:50,
      marginTop:40,
      justifyContent:'center',
      alignItems:'center'
  }
});
