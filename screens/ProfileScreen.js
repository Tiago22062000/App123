import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Button, Image, LayoutAnimation } from 'react-native';
import Fire from '../Fire';
import * as firebase from 'firebase';


export default class ProfileScreen extends React.Component{

    state = {
       user: {}
    };

    unsuscribe = null

    componentDidMount() {
        const user = this.props.uid || Fire.shared.uid;

        this.unsuscribe = Fire.shared.firestore
            .collection("users")
            .doc(user)
            .onSnapshot(doc => {
                this.setState({ user: doc.data() });
            });
    }

    componentWillUnmount() {
        this.unsuscribe();
    }

    signOutUser = () => {
        firebase.auth().signOut();
    };

render() {
  return (
    <View style={styles.container}>
        <View style={{marginTop: 64, alignItems: 'center'}}>
            <View style={styles.avatarContainer}>
                <Image 
                    style={styles.avatar}
                    source={
                        this.state.user.avatar
                            ? { uri: this.state.user.avatar }
                            : require("../assets/ALPHA.png")
                    }
                />
            </View>
            <Text style={styles.name}>{this.state.user.name}</Text>
            <TouchableOpacity onPress={this.signOutUser}>
                <Text>LOGOUT</Text>
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
  avatarContainer:{
      shadowColor:'#151734',
      shadowRadius: 15,
      shadowOpacity: 0.4
  },
  avatar:{
    width: 135,
    height: 135,
    borderRadius: 68
  },
  name:{
      marginTop: 24,
      fontSize: 16,
      fontWeight: '500'
  }
});
