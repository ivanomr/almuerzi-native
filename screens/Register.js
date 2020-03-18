import React from 'react';
import {Text, TextInput, View, StyleSheet, Button, Alert } from 'react-native';
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
    const onSubmit = values => {
       fetch('https://serverless-orcin.now.sh/api/auth/register',{
           method:'POST',
           headers:{
            'Content-Type':'Application/json',
           },
           body:JSON.stringify(values)
       })
       .then(x=>x.text())
       .then(x=>{
           if(x==='usuario creado con éxito'){
              return Alert.alert(
                   'Exito',
                   x,
                   [
                       { text:'Ir al inicio',onPress:()=>navigation.navigate('Login') }
                   ]
               )
           }
           Alert.alert(
               'Error',
               x
           ) 
       })

    }
    const {subscribe,inputs,handleSubmit}=useFrom(initialState,onSubmit)

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            <TextInput 
              autoCapitalize='none'
              value={inputs.email} 
              onChangeText={subscribe('email')} 
              style={styles.input} 
              placeholder='Email'
            />
            <TextInput
              autoCapitalize='none'
              value={inputs.password} 
              onChangeText={subscribe('password')}
              style={styles.input} 
              placeholder='Password' 
              secureTextEntry
            />
            <Button title='Enviar' onPress={handleSubmit}/>
            <Button title='Volver al Inicio' onPress={()=>navigation.navigate('Login')}/>        
        </View>
    )
}