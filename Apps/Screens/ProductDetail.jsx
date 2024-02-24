import { View, Text,Image, TouchableOpacity, Linking ,Share, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { Firestore, collection, deleteDoc, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
export default function ProductDetail({navigation}) {
    const {params}=useRoute();
    const [product,setProduct]=useState([]);
    const {user}=useUser();
    const db=getFirestore(app);
    const nav=useNavigation();
    useEffect(()=>{
        params&& setProduct(params.product);
        sharebutton();
    },[params,navigation]);
    const sharebutton=()=>{
        navigation.setOptions({
            headerRight: () => (
               
                <AntDesign name="sharealt" size={24} color="white"
                style={{marginRight:15}}  onPress={()=>shareProduct()}/>
               
                
            ),
          });
      
    }
    const shareProduct=async()=>{
        const content={
            message:product?.title+"\n"+product?.desc,
        }   
        Share.share(content).then(resp=>{
            console.log(resp);
        },(error)=>{
            console.log(error);
        })   
    }
    const sendEmailMessage = () => {
        const subject = 'Regarding ' + product.title;
        const body = "Hi " + product.userName + "\n" + "I am interested in this product";
        const emailUrl = `mailto:${product.userEmail}?subject=${subject}&body=${body}`;
      
        Linking.openURL(emailUrl).catch((err) => console.error('An error occurred', err));
      }
      const deleteUserPost=()=>{
        Alert.alert('Do you want to delete this',"Are you suer you want to delete this",[
          {
            text:'Yes',
            onPress:()=>deleteFromFirestore()

          },
          {
            text:'Cancel',
            onPress:()=>console.log("Cancel Pressed"),
            style:'cancel',
          }
        ]);
        
      }
      const deleteFromFirestore=async()=>{
        const q=query(collection(db,'UserPost'),where('title','==',product.title))
        const snapshot=await getDocs(q);
        snapshot.forEach(doc=>{
          deleteDoc(doc.ref).then(resp=>{
            nav.goBack();
          })
        })
      }
  return (
    
    <ScrollView>
      <Image style={{height:320,width:'full'}}source={{uri:product.image}}/>
      <View style={{padding:10}}>
        <Text style={{fontSize:24,fontWeight:'bold'}}>{product?.title}</Text>
        <View style={{ alignItems: 'baseline' }}>
            <Text style={{ backgroundColor: 'lightblue', padding: 1, paddingHorizontal:2, borderRadius: 35 }}>
                {product.category}
            </Text>
        </View>
        <Text style={{marginTop:10,fontWeight:'bold',fontSize:20,}}>Description</Text>
        <Text style={{fontSize:17,color:'gray',}}>{product?.desc}</Text>
      </View>
      <View style={{ padding: 3, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: 'lightblue' }}>
        <Image source={{uri:product.userImage}} style={{width:60,height:60,borderRadius:35}}/>
        <View>
            <Text style={{fontWeight:'bold',fontSize:18}}>{product.userName}</Text>
            <Text style={{color:'gray',}}>{product.userEmail}</Text>
        </View>
      </View>
      {user?.primaryEmailAddress.emailAddress==product.userEmail?
       <TouchableOpacity onPress={()=>deleteUserPost()} style={{ marginTop: 20, width:"full",height:40, zIndex: 40,justifyContent:'center',alignItems:'center', backgroundColor: 'red', borderRadius: 15 }}>
       <Text style={{alignItems:'center',color:'white',fontSize:20}}>Delete Post</Text>
     </TouchableOpacity>
     :
     <TouchableOpacity onPress={()=>sendEmailMessage()} style={{ marginTop: 20, width:"full",height:40, zIndex: 40,justifyContent:'center',alignItems:'center', backgroundColor: '#4299e1', borderRadius: 15 }}>
        <Text style={{alignItems:'center',color:'white',fontSize:20}}>Send Message</Text>
      </TouchableOpacity>
    }
           
    </ScrollView>
  )
}