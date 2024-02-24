import { View, Text ,TouchableOpacity,Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function PostItem({item}) {
  const navigation=useNavigation();
  return (
    <TouchableOpacity style={{
        flex: 1,
margin: 2,
alignItems: 'center',
padding: 2,
borderRadius: 8,  // for rounded corners
borderWidth: 1,  // for border
borderColor: 'slategray'  // set the color for the border
      }} onPress={()=>navigation.push('product-detail',{
        product:item,
      })}>

        <Image
          source={{ uri: item.image }}
        
          style={{
            height: 170,
            width: 150,
            
            // resizeMode: 'contain',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: 'black',
          }}
          
          onError={(e) => console.log('Image Error:', e.nativeEvent.error)}
        />
        <View>
          
          <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 2 }}>{item.title}</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'blue' }}>${item.price}</Text>
          <Text style={{
color: 'blue',   // For text color
backgroundColor: '#87CEEB',  // For background color (use an appropriate color code)
marginTop: 1,
textAlign:'center',
padding: 1,

borderRadius: 999,  // For rounded corners (use a large value for a rounded effect)
}}>{item.category}</Text>
        </View>
      </TouchableOpacity>
  )
}