import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, LayoutAnimation } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Fire from '../Fire';
import * as ImagePicker from 'expo-image-picker';
import UserPermissions from '../utilities/UserPermissions';

const firebase = require('firebase');
require("firebase/firestore");

export default class PostScreen extends React.Component{
state={
    text: '',
    image: null
}

componentDidMount() {
    UserPermissions.getCameraPermission()
}

handlePost = () => {
    Fire.shared
        .addPost({ text: this.state.text.trim(), localUri: this.state.image })
        .then(ref => {
            this.setState({ text: "", image: null});
            this.props.navigation.goBack();
    })
    .catch(error => {
        alert(error);
    });
};

pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [250,250]
    });

    if (!result.cancelled) {
        this.setState({ image: result.uri});
    }
};

    render() {
  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Ionicons name='md-arrow-back' size={50} color='orange'></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handlePost}>
                <Text style={{ fontWeight:'500', marginTop: 30}}>
                    Post
                </Text>
            </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
            <Image source={require("../assets/ALPHA.png")} style={styles.avatar}/>
            <TextInput 
                autoFocus={true} 
                multiline={true} 
                numberOfLines={4} 
                style={{flex:1}}
                placeholder='Queres partilhar alguma coisa?'
                onChangeText={text => this.setState({text})}
                value={this.state.text}
            ></TextInput>           
        </View>
        <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
            <Ionicons name='md-camera' size={32} color='black'></Ionicons>
        </TouchableOpacity>

        <View style={{marginHorizontal:32, marginTop:32, height:150}}>
            <Image source={{uri: this.state.image}} style={{width: "100%", height:'100%'}}></Image>
        </View>
    </SafeAreaView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 32,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: 'orange'
  },
  inputContainer:{
      margin:32,
      flexDirection:'row'
  },
  avatar:{
      width: 50,
      height:50,
      borderRadius:24,
      marginRight: 16
  },
  photo:{
      alignItems:'flex-end',
      marginHorizontal:32
  }
});
