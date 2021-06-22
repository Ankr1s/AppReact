import * as React from 'react';
import { TouchableOpacity, Image ,SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input, ListItem , Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native';


const list = [
  {
    name: 'Sniper Ghost Warrior Contracts 2',
    avatar_url: 'https://www.allkeyshop.com/blog/wp-content/uploads/SniperGhostWarriorContracts21.jpg',
    precio : '20.99 €',
    paginaweb : 'https://www.allkeyshop.com/blog/buy-sniper-ghost-warrior-contracts-2-cd-key-compare-prices/'
  },
];



export default function HomeScreen(props) {

  
    return (
     <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }} >
       <Text style={{ marginTop: 30, fontSize: 40, textAlign: 'center'}} >Mis Notificaciones</Text> 
        <View style={{ flexDirection: 'row' , justifyContent: 'center'} }>
        <TouchableOpacity
             style = {{ marginTop:10, marginBottom: 30, backgroundColor:'gray', borderRadius:30 }}
              >
                <Text style = {{ color: 'black', fontSize: 40, paddingRight:20, paddingLeft:20}}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
             style = {{ marginTop:10, marginBottom: 30, backgroundColor:'gray', borderRadius:30 }}
              >
                <Text style = {{ color: 'black', fontSize: 40, paddingRight:20, paddingLeft:20}}>-</Text>
            </TouchableOpacity>
        </View>
        <ScrollView>
        <View style={{ flex: 2, padding:5}} >
        {
          list.map((l, i) => (
            <ListItem key={i} bottomDivider 
              containerStyle={{backgroundColor:'white', paddingBottom:20, paddingTop: 20 }} 
               >
              <Avatar source={{uri: l.avatar_url}} size={100} rounded />
              <ListItem.Content>
                <ListItem.Title>Nombre :  {l.name}</ListItem.Title>
                <ListItem.Subtitle style={{color: 'blue', fontSize: 15}}>Precio :  {l.precio}</ListItem.Subtitle>
                <ListItem.Subtitle 
                  onPress={() =>
                    console.log('clikadooo')
                } >Pagina web :  {l.paginaweb}</ListItem.Subtitle>

              </ListItem.Content>
            </ListItem>
          ))
        }

        </View>
        </ScrollView>
     </View>
    );
  }
  

  