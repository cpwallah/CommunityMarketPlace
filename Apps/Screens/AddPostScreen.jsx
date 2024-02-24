import { View, Text, TextInput,StyleSheet,Button, TouchableOpacity,Image, ToastAndroid, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addDoc, collection, getDocs, getFirestore} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes  } from "firebase/storage"
import { app } from '../../firebaseConfig';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '@clerk/clerk-expo';

export default function AddPostScreen() {
  const [image, setImage] = useState(null);
  const db = getFirestore(app);
  const storage = getStorage();
  const {user}=useUser();
  const [loading,setLoading]=useState(false);
  const [categoryList,setCategoryList]=useState([]);
  useEffect(()=>{
    getCategoryList();
  },[])
const getCategoryList=async()=>{
  setCategoryList([]);
  const querySnapshot=await getDocs(collection(db,'Category'));
  querySnapshot.forEach((doc)=>{
    console.log("Docs:",doc.data());
    setCategoryList(categoryList=>[...categoryList,doc.data()])  
  })
}
const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
};
   const onSubmitMethod=async(value)=>{
    setLoading(true);
    value.image=image,
    console.log(value)
    const resp=await fetch(image);
    const blob=await resp.blob();

    const storageRef = ref(storage, 'CommunityPost/'+Date.now()+".jpg");

// 'file' comes from the Blob or File API
uploadBytes(storageRef, blob).then((snapshot) => {
  console.log('Uploaded a blob or file!');
}).then((resp)=>{
  getDownloadURL(storageRef).then(async(downloadUrl)=>{
    console.log(downloadUrl);
    value.image=downloadUrl;
    value.userName=user.fullName;
    value.userEmail=user.primaryEmailAddress.emailAddress;
    value.userImage=user.imageUrl;
    const docRef=await addDoc(collection(db,"UserPost"),value);
    if(docRef.id){
      setLoading(false);
      Altert.alert('Post Added Successfully');
    }
  })
});

   }
  return (
    <KeyboardAvoidingView>
    <ScrollView style={{backgroundColor:'white'}}>
      
      <Text style={styles.maow}>Add Post</Text>
      <Text style={styles.line}>Create New Post And Start Selling</Text>
     <Formik  initialValues={{title:'',desc:'',category:'',address:'',price:'',image:'',userName:'',userEmail:'',
     userImage:'',createdAt:Date.now()}}
     onSubmit={value=>onSubmitMethod(value)} validate={(values)=>{
      const errors={}
      if(!values.title){
        console.log("Title is not present");
        ToastAndroid.show("Title must be there",ToastAndroid.SHORT)
        errors.name="Title must be there";
      }
      return errors;
     }}
     >
      {({handleChange,handleBlur,handleSubmit,values,setFieldValue,errors})=>(
        <View>
          <TouchableOpacity onPress={pickImage}>
            {image?
            <Image source={{uri:image}} style={{width:100,height:100,borderRadius:15, marginHorizontal: '8%'}}/>
            :
            <Image source={require('./../../assets/images/placeholder.png')} style={{width:100,height:100,borderRadius:15, marginHorizontal: '8%'}}/>
          }
          
          </TouchableOpacity>
          <TextInput
          style={styles.input}
          placeholder='Title'
          value={values?.title}
          onChangeText={handleChange('title')}
          />

          <TextInput
          style={styles.input}
          placeholder='Description'
          value={values?.desc}
          numberOfLines={5}
          onChangeText={handleChange('desc')}

          />
          <TextInput
          style={styles.input}
          placeholder='Price'
          value={values?.price}
          onChangeText={handleChange('price')}
          />
          <TextInput 
          style={styles.input}
          placeholder='Address'
          value={values?.address}
          
          onChangeText={handleChange('address')}

          />
          <Picker 
          selectedValue={values?.category}
          style={styles.input}
          onValueChange={itemValue=>setFieldValue('category',itemValue)}
          >
            {categoryList && categoryList.map((item,index)=>(
              <Picker.Item key={index} label={item?.name} value={item?.name}/>
            ))}
            {/* <Picker.Item label='Dropdown1' value={'Dropdown'}/>
            <Picker.Item label='Dropdown2' value={'Dropdown'}/> */}
          </Picker>
          
            <Button style={{marginHorizontal:'8%'}} onPress={handleSubmit} title="submit"/>
          
          
        </View>
        
      )}
     </Formik>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}
const styles=StyleSheet.create({
  input:{
    
    borderWidth:1,
    borderRadius:10,
    padding:5,
    paddingHorizontal:17,
    marginTop:15,
   
    marginBottom:5,
    fontSize:17,
    marginHorizontal: '8%',
    
  },
  maow:{
    padding:10,
    marginTop:30,
    fontSize:27,
    paddingHorizontal:20,

  },
  line:{
    fontSize:16,
     color:'gray',
     marginBottom:7,
     paddingHorizontal:20,
  }
})