import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { getTasksByGroup, toggleTaskStatus, deleteTask } from '../database';

export default function TaskDetailScreen({ route, navigation }) {
  const { groupId } = route.params; // Assuming groupId is passed
  const [tasks, setTasks] = useState([]);

  // Function to fetch tasks for the given group
  const loadTasks = () => {
    getTasksByGroup(groupId, (fetchedTasks) => {
      setTasks(fetchedTasks); // Set tasks state with fetched tasks
    });
  };

  useEffect(() => {
    loadTasks();
  }, [groupId]);

  const handleToggleStatus = (taskId, completed) => {
    toggleTaskStatus(taskId, !completed, () => {
      loadTasks(); // Reload tasks after toggling status
    });
  };

  const handleDelete = (taskId) => {
    deleteTask(taskId, () => {
      loadTasks(); // Reload tasks after deletion
    });
  };

  const renderTaskItem = ({ item }) => (
    <View style={styles.taskCard}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDescription}>{item.description}</Text>
      <Text style={styles.taskStatus}>
        Status: {item.completed ? 'Completed' : 'Incomplete'}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title={item.completed ? "Mark as Incomplete" : "Mark as Complete"}
          onPress={() => handleToggleStatus(item.id, item.completed)}
          color={item.completed ? "#FFA500" : "#4CAF50"}
        />
        <Button
          title="Delete"
          onPress={() => handleDelete(item.id)}
          color="#FF6347"
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1} // Set grid layout with 2 columns
        renderItem={renderTaskItem}
        contentContainerStyle={styles.gridContainer}
      />
      <Button
        title="Add Task"
        onPress={() => navigation.navigate('TaskCreation', { groupId })} // Use groupId, not item.id
        color="#4CAF50"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gridContainer: {
    justifyContent: 'space-between',
  },
  taskCard: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 10,
  },
  taskStatus: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
