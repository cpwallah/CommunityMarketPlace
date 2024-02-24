import { View, Text, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import PostItem from './PostItem';

export default function LatestItemList({latestItemList,heading}) {
  return (
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{heading}</Text>
      <FlatList
        data={latestItemList}
        numColumns={2}
        // horizontal={true}
        renderItem={({ item, index }) => (
          <PostItem item={item}/>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
