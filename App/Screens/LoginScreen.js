import React from 'react';
import { useState } from 'react';
import { TouchableOpacityBase } from 'react-native';
import { View,Text,Button,Dimensions,StyleSheet,TouchableOpacity,Platform, TextInput, Image } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';




export default function LoginScreen({navigation}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    
  const Login = () => {
      return fetch('https://servernodejhonny.herokuapp.com/users/login', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
      }).then((response) => {

        if(!response.ok){
          alert('Compruebe los datos')
        }else{ 
           console.log('iniciando sesion')
           navigation.navigate('HomeScreen',{
            email: email
            
          })

        }
      }).catch((error) => {
        console.error(error);
  });
  };

    return(
        <View style={styles.container} >
            <View style={styles.header} >
            <View style={styles.userContainer}>
                        <Image style={styles.userImagen} source={ require('../MyDrawer/logo.jpg')} />
            </View>
            </View>
            <View style={styles.footer} >
                <Text style={styles.textSubtitle} > Email </Text>
                <Input
                placeholder='Enter your email'
                onChangeText={email => setEmail(email)}
                defaultValue={email}
                leftIcon={
                    <Icon
                         name='email'
                        size={24}
                        color='#fca311'
                />
                }
                 />
                <Text style={styles.textSubtitle}> Password </Text>
                <Input
                secureTextEntry={true}
                onChangeText={password => setPassword(password)}
                placeholder='Enter your password'
                leftIcon={
                    <Icon
                         name='lock'
                        size={24}
                        color='#fca311'
                />
                }
                 />
            <TouchableOpacity
             style = {styles.botton}
             color = '#fca311'
               // onPress={Login}>  navigation.navigate('HomeScreen')
               onPress={Login}> 
                    <Text style = {{textAlign: 'center', color: 'white'}}> INICIAR SESION </Text>
            </TouchableOpacity>
            <Button
                color = '#fca311'
                onPress={() =>
                    navigation.navigate('RegisterScreen')
                }
                 title="Registrarse"/>
            </View>
        
        </View>
    );

};


const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: '#00003e' ,
    },
    header:{
        flex:1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingBottom: 40
    },
    footer:{
        flex:3,
        backgroundColor: 'white',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingHorizontal:20,
        paddingVertical: 30
    },
    action:{
        flexDirection: 'row',
        marginTop:10,
        borderBottomWidth:1,
        borderBottomColor: 'blue'
    },
    textInput:{
        flex: 1,
        paddingLeft: 10,
        color: '#fca311'
    },
    textSubtitle:{
        color:'#14213d',
        fontSize: 20
    },
    userContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    userImagen: {
        width: 300,
        height: 300
    },
    botton: {
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#fca311',
        shadowColor: "#84A4FF",
        shadowOffset: {
        width: 0,
        height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 3
    }
    
})