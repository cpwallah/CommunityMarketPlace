import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Firestore, collection, doc, getDocs, getFirestore, orderBy,query } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import { ScrollView } from 'react-native-gesture-handler';
import LatestItemList from '../Components/HomeScreen/LatestItemList';

export default function ExploreScreen() {
  const db=getFirestore(app);
  const [productList,setPorductList]=useState([]);
  useEffect(()=>{
    getAllProducts();
  },[])
  const getAllProducts=async()=>{
    setPorductList([]);
    const q=query(collection(db,'UserPost'),orderBy('createdAt','desc'));
    const snapshot=await getDocs(q);
    snapshot.forEach((doc)=>{
      setPorductList(productList=>[...productList,doc.data()]);
    })
  }
  return (
    <ScrollView style={{padding:5,paddingLeft:30}} >
      <Text style={{fontSize:30,fontWeight:'bold',marginTop:50}}>Explore More</Text>
      <LatestItemList latestItemList={productList}/> 
    </ScrollView>
  )
}