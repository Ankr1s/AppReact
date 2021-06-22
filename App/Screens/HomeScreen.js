import * as React from 'react';
import { View,Text,  Button, Linking ,ActivityIndicator, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input, ListItem , Avatar } from 'react-native-elements';
import { useState } from 'react';
import { ScrollView } from 'react-native';




export default function HomeScreen({route, navigation}){

  const[isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [game, setGame] = useState([]);
  const { email } = route.params;

 
  const getGamesFromApi = () => {
    setLoading(true);
      return fetch('https://servernodejhonny.herokuapp.com/search/searchGame', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        gameName: game
      })
      }).then((response) => {
        if(!response.ok){
          setLoading(false);
          return response.status;
        }else{
          setLoading(false)
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
       <View style={{ marginTop: 0 }}>
         <Button
                color = '#00003e'
                onPress={() =>
                    navigation.navigate('MyGames',{
                      email: email
                    })
                }
                 title="Mis juegos"/>
          </View>
        <View style={{ marginTop: 30 }}>
        <Text style={{ marginTop: 30, fontSize: 20 , textAlign: 'center' }} >Busca tu juego</Text>
        <Input
          placeholder='Search game'
          onChangeText={game => setGame(game)}
          leftIcon={
              <Icon
              name='card-search'
              size={24}
              color='black'
              />
          }
          />

          <Button
                color = '#fca311'
                onPress={getGamesFromApi}
                 title=" Buscar "/>

        </View>
        <ScrollView>
        <View style={{ flex: 2, padding:5}} >
        {
          
         data.map((l, i) => (
            <ListItem key={i} bottomDivider 
              containerStyle={{backgroundColor:'white', paddingBottom:20, paddingTop: 20 }} 
               >
              <Avatar source={{uri: l.imgGame}} size={100} rounded />
              <ListItem.Content>
                <ListItem.Title style={{ fontSize: 30, fontWeight: 'bold'}} > {l.web}</ListItem.Title>
                <ListItem.Subtitle style={{ fontSize: 20}}> 
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black'}}> Precio :  </Text> {l.precio}</ListItem.Subtitle>
                <ListItem.Subtitle  style={{ fontSize: 20, fontWeight: 'bold', color: '#fca311'}}
                  onPress={() =>{
                      Linking.openURL(l.buyUrl)
                    alert("Url copiada")             }
                }> Go to the page </ListItem.Subtitle>

              </ListItem.Content>
            </ListItem>
          ))
        }

        </View>
        </ScrollView>
        {
          isLoading &&
          <View style={styles.loading}>
            <ActivityIndicator 
            size="large" 
            color="#fca311"
            animating = {isLoading} />
          </View>
         
        }
     </View>
    );
  }
  

  const styles = StyleSheet.create({
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
  })

  