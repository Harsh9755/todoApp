import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { getGroups, addGroup, initializeDatabase } from '../database'; // Ensure initializeDatabase is imported

export default function HomeScreen({ navigation }) {
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState('');

  // Initialize the database when the component mounts
  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = () => {
    getGroups((fetchedGroups) => {
      setGroups(fetchedGroups);
    });
  };

  const handleAddGroup = () => {
    if (newGroup.trim()) {
      addGroup(newGroup, () => {
        setNewGroup(''); // Clear input field
        loadGroups(); // Reload groups
      });
    } else {
      console.log('Group name cannot be empty');
    }
  };

  // Render each group as a styled grid item
  const renderGroupItem = ({ item }) => (
    <TouchableOpacity
      style={styles.groupItem}
      onPress={() => navigation.navigate('TodoList', { groupId: item.id })}
    >
      <Text style={styles.groupItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Groups</Text>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Setting grid design with 2 columns
        contentContainerStyle={styles.gridContainer}
        renderItem={renderGroupItem}
      />
      <TextInput
        placeholder="New Group"
        value={newGroup}
        onChangeText={(text) => setNewGroup(text)}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleAddGroup} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Group</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gridContainer: {
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  groupItem: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  groupItemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});
