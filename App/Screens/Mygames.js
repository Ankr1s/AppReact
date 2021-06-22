import * as React from 'react';
import { TouchableOpacity, Image ,SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input, ListItem , Avatar } from 'react-native-elements';
import Dialog from "react-native-dialog";
import { useState } from 'react';
import { ScrollView } from 'react-native';



export default function HomeScreen({route, navigation}) {

  

    const { email } = route.params;
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');

    const [visible, setVisible] = useState(false);

    
    const showDialog = () => {
      setVisible(true);
    };
  
    const handleCancel = () => {
      setVisible(false);
    };


    const addGame = () => {
        return fetch('https://servernodejhonny.herokuapp.com/games/addGame', {
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          name :name,
          startDate : startDate,
          finishDate : finishDate,
          duration : duration,
          description : description
        })
        }).then((response) => {
  
          if(!response.ok){
            alert('Compruebe los datos2')
            setVisible(false);
          }else{ 
             console.log('Juego añadido2')
             setVisible(false);
          }
        }).catch((error) => {
          console.error(error);
    });
    };

    const getMyGames = () => {
  
        return fetch('https://servernodejhonny.herokuapp.com/games/getGames', {
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email
        })
        }).then((response) => {
          if(!response.ok){
            return response.status;
          }else{
             return response.json()
          }
        }).then((json) => {
  
          if(json == 400){
            alert('Game not found')
          }else if(json == 500) {
            alert('Internal Error')
          }else {
            setData(json)
          }
        })
        .catch((error) => {
          console.error(error);
    });
    };

  
  
    return (
     <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }} >
        <View style={{ flexDirection: 'row' } }>
        <Text style={{ marginTop: 30, fontSize: 40, marginLeft: 30, marginRight: 30, marginBottom: 30 ,color: 'black'}} >Mis juegos</Text> 
          <TouchableOpacity
            style={{marginTop: 30,  marginLeft: 30, marginRight: 30, marginBottom: 30, backgroundColor : '#fca311', borderRadius: 10}}
             color = '#fca311'
               onPress={getMyGames}> 
                    <Text style = {{ color: 'black' , alignContent: 'center', paddingTop:15}}> Load Games </Text>
            </TouchableOpacity>
        </View>
        <View > 
        <Button title="Agrega un juego" onPress={showDialog} />
              <Dialog.Container visible={visible}>
                <Dialog.Title>Add Game</Dialog.Title>
                <Dialog.Description>
                 Agrega un juego!!
                </Dialog.Description>
                <Dialog.Input  placeholder='Nombre'
                onChangeText={name => setName(name)}></Dialog.Input>
                <Dialog.Input  placeholder='Fecha Incio'
                onChangeText={startDate => setStartDate(startDate)}></Dialog.Input>
                <Dialog.Input  placeholder='Fecha Finalizado'
                onChangeText={finishDate => setFinishDate(finishDate)}></Dialog.Input>
                <Dialog.Input  placeholder='Duracion'
                onChangeText={duration => setDuration(duration)}></Dialog.Input>
                <Dialog.Input  placeholder='Descripcion'
                onChangeText={description => setDescription(description)}></Dialog.Input>

                <Dialog.Button label="Cancel" onPress={handleCancel} />
                <Dialog.Button label="Subir" onPress={addGame} />
                </Dialog.Container>
      
        </View>
        <ScrollView>
        <View style={{ flex: 2, padding:5}} >
        {
          data.map((l, i) => (
            <ListItem key={i} bottomDivider 
              containerStyle={{backgroundColor:'white', paddingBottom:20, paddingTop: 20 }} 
               >
              <ListItem.Content>
                <ListItem.Title>Nombre :  {l.name}</ListItem.Title>
                <ListItem.Title>Fecha Incio :  {l.startDate}</ListItem.Title>
                <ListItem.Title>Fecha Finalizado :  {l.finishDate}</ListItem.Title>
                <ListItem.Title>Duracion :  {l.duration}</ListItem.Title>
                <ListItem.Title>Descripcion:   {l.description}</ListItem.Title>

              
              </ListItem.Content>
            </ListItem>
          ))
        }

        </View>
        </ScrollView>
     </View>
    );
  }
  

  