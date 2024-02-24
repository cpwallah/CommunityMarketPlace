import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react'
import { SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import exploring from './../../assets/images/exploring.png'
import logout from './../../assets/images/logout.webp'
import myproduct from './../../assets/images/myproduct.jpg'
import { FlatList } from 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { ClerkProvider,} from "@clerk/clerk-expo";

export default function ProfileScreen() {
  const {user}=useUser();
  const navigation=useNavigation();
  const { isLoaded,signOut } = useAuth();
  
  const menuList=[
    {
      id:1,
      name:'My Products',
      icon:myproduct,
      path:'my-product'
    },
    {
      id:2,
      name:'Explore',
      icon:exploring,
      path:'explore',
    },
    {
      id:3,
      name:'Name',
      icon:logout,
      url:'',
    },
    {
      id:4,
      name:'LogOut',
      icon:logout,
    },
  ]
  const onMenuPress=(item)=>{
    // const { signOut } = useAuth();
    if (item.path === 'my-product') {
      navigation.navigate(item.path);
      return;
    }
    if(item.name=='LogOut'){
      handleLogout();

    }
  }
  const handleLogout = async () => {
    try {
      await signOut();
      // Perform any additional actions after successful logout if needed
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <GestureHandlerRootView style={{padding:5,backgroundColor:'white'}}>
      <View style={{alignItems:'center',marginTop:14,justifyContent:'center'}}>
        <Image source={{uri:user?.imageUrl}} style={{width:100,height:100,borderRadius:45,marginTop:45}}/>
        <Text style={{fontWeight:'bold',fontSize:25,marginTop:2}}>{user?.fullName}</Text>
        <Text style={{fontSize:18,marginTop:2,color:'gray'}}>{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>
      <FlatList data={menuList} numColumns={3}
      style={{marginTop:20}}
      renderItem={({item,index})=>(
        <TouchableOpacity  style={{
          flex: 1,
          padding: 3,
          margin: 4,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'gray', // You can set the color of the border
          borderRadius: 8, // Optional: Add border radius for rounded corners
          backgroundColor:'lightblue',
          margin:12,

        }}
        onPress={() => onMenuPress(item)}
        >
          
          {item.icon&& <Image source={item?.icon} style={{width:50,height:50}}/>}
          <Text style={{fontSize:12,color:'blue'}}>{item?.name}</Text>
        </TouchableOpacity>
      )}/>
        
    </GestureHandlerRootView>
  )
}