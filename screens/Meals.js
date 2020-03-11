import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ListItem from '../components/ListItem';
import UseFetch from '../hooks/useFetch';

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
        alignItems:'flex-start',
        justifyContent:'flex-start'
    },
    list:{
        alignSelf: 'stretch'
    }
})

const Meals = ({navigation}) => {
    
    const {loading,data:meals} = UseFetch('https://serverless-orcin.now.sh/api/meals')

    return(
        <View style={styles.container}>
            {loading ? <Text>Cargando...</Text> :

                <FlatList
                    style={styles.list}
                    data={meals}
                    keyExtractor={x=>x._id}
                    renderItem={({item})=>
                        <ListItem
                            onPress={()=>navigation.navigate('Modal',{_id:item._id})}
                            name={item.name}
                        />}
                />
            }
        </View>
    )
}

Meals.navigationOptions=({
    title:'Comidas disponibles',
})

export default Meals