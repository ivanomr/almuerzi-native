import React from 'react';
import { Text, TextInput, View, StyleSheet, Button, Alert, AsyncStorage } from 'react-native';
import useFrom from '../hooks/useFrom'

const styles = StyleSheet.create({
    title:{
        fontSize:18,
        marginBottom:16
    },
    container:{
        flex:1,
        backgroundColor: '#fff',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:15
    },
    input:{
        height:40,
        borderColor:'#ccc',
        borderWidth:1,
        alignSelf:'stretch',
        marginBottom:10,
        paddingHorizontal:5
    }
})

export default ({navigation})=>{
    const initialState={
        email:'',
        password:''
    }
    const onSubmit= values=>{
        fetch('https://serverless-orcin.now.sh/api/auth/Login',{
           method:'POST',
           headers:{
               'Content-Type':'Application/json'
           },
           body:JSON.stringify(values) 
        })
        .then(x=>x.text())
        .then(x=>{
          try{
              return JSON.parse(x)
          }catch{
              throw x
          }  
        })
        .then(x=>{
            AsyncStorage.setItem('token',x.token)
            navigation.navigate('Meals')
        })
        .catch(e=>Alert.alert('Error',e))
    }
    const {subscribe,inputs,handleSubmit}=useFrom(initialState,onSubmit)


    return(
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput 
              value={inputs.email} 
              onChangeText={subscribe('email')} 
              style={styles.input} 
              placeholder='Email'
            />
            <TextInput
              value={inputs.password} 
              onChangeText={subscribe('password')}
              style={styles.input} 
              placeholder='Password' 
              secureTextEntry
            />
            <Button title='Iniciar Sesión' onPress={handleSubmit}/>
            <Button title='Registrarse' onPress={()=>navigation.navigate('Register')}/>        
        </View>
    )
}