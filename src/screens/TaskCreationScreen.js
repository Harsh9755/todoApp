import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { addTask, getTasksByGroup } from '../database'; // Assuming you have a function to fetch tasks

export default function TaskCreationScreen({ route, navigation }) {
  const { groupId } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks whenever the component mounts
    const fetchTasks = async () => {
      await getTasksByGroup(groupId,(task)=>{setTasks(task)});
    };
    fetchTasks();
  }, [groupId]);

  const handleAddTask = () => {
    if (title && description) {
      addTask(title, description, groupId,async () => {
        setTitle(''); 
        setDescription('');
        await getTasksByGroup(groupId,(task)=>{setTasks(task)});
        navigation.goBack();
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Task Title"
        value={title}
        onChangeText={(text)=>{setTitle(text)}}
        style={styles.input}
      />
      <TextInput
        placeholder="Task Description"
        value={description}
        onChangeText={(text)=>{setDescription(text)}}
        style={styles.input}
      />
      <Button title="Add Task" onPress={handleAddTask} />
      {/* {tasks.length === 0 && <Text>No tasks available.</Text>} Optional message */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10 },
});
