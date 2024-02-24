import { View, Text ,Image, TextInput} from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { FontAwesome } from '@expo/vector-icons';

export default function Header() {
    const {user}=useUser();
  return (
    <View>
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <Image source={{uri:user?.imageUrl} } style={{borderRadius:17,width:50,height:50}} />
        <Text style={{fontSize:20, fontWeight: 'bold' }}>Welcome</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user?.fullName}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 13, paddingLeft:10,paddingRight:10,
       backgroundColor: 'white', marginTop: 15, borderRadius: 20 ,borderColor: '#6CB2EB',
       borderWidth: 2,}}
>
<FontAwesome name="search" size={24} color="gray" />
        <TextInput placeholder='Search'
        
        onChangeText={(value)=>console.log(value)}/>
        
      </View>
    </View>
  )
}