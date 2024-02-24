import { View, Text, FlatList ,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
export default function Categories({categoryList}) {
  const navigation=useNavigation();
  return (
    <View style={{marginTop:10}}>
      <Text style={{ fontWeight: 'bold',fontSize:20}}>Categories</Text>
      <FlatList data={categoryList}
      numColumns={4}
      renderItem={({item,index})=>index<=6&&(
        <TouchableOpacity onPress={()=>navigation.navigate('item-list',{
          category:item.name,
        })} style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
          borderWidth: 1,
          borderColor: 'gray',
          backgroundColor:'lightblue',
          margin: 2,
          height: 80,
          borderRadius: 8, // Use borderRadius for rounded corners in React Native
        }}
        >
          <Image source={{uri:item.icon}}
        style={{ width: 70, height: 70 }}/>
        <Text style={{fontSize:12,marginTop:1}}>{item.name}</Text>
          </TouchableOpacity>
      )} 
      />   
    </View>
  )
}