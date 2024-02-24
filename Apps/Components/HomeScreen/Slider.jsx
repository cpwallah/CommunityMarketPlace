import { View, Text, FlatList,Image } from 'react-native'
import React from 'react'

export default function Slider({sliderList}) {
  return (
    <View style={{marginTop:30}}>
      <FlatList
      data={sliderList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item,index})=>(
        <View>
            <Image source={{uri:item?.image}}
            style={{ height: 150, width: 175, resizeMode: 'contain', marginRight: 3, borderRadius: 15 }}

            /> 

        </View>
      )}
      ></FlatList>
    </View>
  )
}