import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState({});
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([task,...taskItems])
    setTask({});
  }

  const handleDeleteTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    let newItem = itemsCopy[index];
    newItem.done = (newItem.done === "false" ? "true" : "false");
    itemsCopy.splice(index, 1);
    setTaskItems(newItem.done === "true" ? [...itemsCopy, newItem] : [newItem, ...itemsCopy]);
  }

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

      {/* Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>To Do</Text>
        <View style={styles.items}>
          {/* This is where the tasks will go! */}
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity 
                  key={index}  
                  onPress={() => completeTask(index)}
                  onLongPress={() => handleDeleteTask(index)}
                >
                  <Task text={item.content} done={item.done} /> 
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
        
      </ScrollView>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput 
          style={styles.input} 
          placeholder={'Write a task'} 
          value={task.content} 
          // multiline
          onChangeText={(text) => setTask({content: text, done: "false"})}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    color: 'blue',
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
    fontWeight: '600',
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderColor: 'blue',
    borderWidth: 1,
  },
  addText: {
    color: 'blue',
    fontSize: 35,
  },
});
