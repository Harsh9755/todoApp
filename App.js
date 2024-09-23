import { useState } from 'react';
import 'react-native-get-random-values';
import * as React from 'react';
import { SQLiteProvider } from 'expo-sqlite/next';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import *  as FileSystem from  'expo-file-system';
import { Asset } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import TodoListScreen from './src/screens/TodoListScreen';
import TaskCreationScreen from './src/screens/TaskCreationScreen';
import { initializeDatabase } from './src/database';
const Stack = createNativeStackNavigator();

export default function App() {

  React.useEffect(()=>{
    initializeDatabase();
  },[]);

  // if(!dbLoaded)return(
  //   <View  style={{ flex:1}}>
  //         <ActivityIndicator size={"large"}/>
  //         <Text>Loading Database ...</Text>
  //     </View>
  // )
  return (
    <NavigationContainer>
    <React.Suspense>
      <SQLiteProvider databaseName='mySqliteDB.db' useSuspense>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TodoList" component={TodoListScreen} />
        <Stack.Screen name="TaskCreation" component={TaskCreationScreen} />
      </Stack.Navigator>
      </SQLiteProvider>
    </React.Suspense>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
