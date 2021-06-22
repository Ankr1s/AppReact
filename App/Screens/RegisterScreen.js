import React from 'react';
import { useState } from 'react';
import { View,Text,Button,Dimensions,StyleSheet,TouchableOpacity,Platform, TextInput, Image } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const RegisterScreen = ({ navigation }) => {

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Register = () => {

        if(email != '' && password != ''){
               
        if(email == ""  || email.indexOf() == -1){
            setEmailError('Email incorrecto.');
        }else{
            setEmailError('');
        }
        
        if(password.length < 6){
            setPasswordError('Contraseña invalida (tamaño minimo 6)');
        }else{
            setPasswordError('');
        }

        if(passwordError == '' && emailError == ''){
            return fetch('https://servernodejhonny.herokuapp.com/users/register', {
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
    
            if(response.status == 400){
                alert('Email en uso.')
            } else if(response.status == 200){
                alert('Cuenta Creada!')
                navigation.navigate('HomeScreen',{
                    email: email
                  })
            }else if(response.status == 500){ 
                alert('Internal Error')
            }
          }).catch((error) => {
            console.error(error);
      });
        }
        else{
            alert('Comprube los datos.')
        }
     
      }else{
          alert('Rellene los campos.')
      }
        }
        

    


    return(
        <View style={styles.container} >
            <View style={styles.header} >
            <Text style={{fontSize: 40 , textAlign: 'center', color: 'white' }} >Registro</Text>
            </View>
            <View style={styles.footer} >
                <Text style={styles.textSubtitle} > Email </Text>
                <Input
                placeholder='Enter an email'
                onChangeText={email => setEmail(email)}
                onChange={() => setEmailError('') }
                leftIcon={
                    <Icon
                         name='email'
                        size={24}
                        color='#fca311'
                />
                }
                 />
                <Text style = {{ color: 'red', fontSize: 15 , paddingBottom:20}} >{emailError} </Text>
                <Text style={styles.textSubtitle}> Password </Text>
                <Input
                secureTextEntry={true}
                placeholder='Enter a password'
                onChangeText={password => setPassword(password)}
                onChange={() => setPasswordError('') }
                leftIcon={
                    <Icon
                         name='lock'
                        size={24}
                        color='#fca311'
                />
                }
                 />
                <Text style = {{ color: 'red', fontSize: 15 , paddingBottom:20}} >{passwordError} </Text>
            <Button
                color = '#fca311'
                onPress={Register}
                 title="Registrate"/>
            </View>
        
        </View>
    );

};

export default RegisterScreen;





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
        flex:5,
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
    }
    
})