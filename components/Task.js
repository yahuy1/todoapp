import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Task = (props) => {

  return (
    <View style={styles.item}>
      {/* <View style={styles.itemLeft}> */}
        {/* <View style={styles.square}></View> */}
        <Text style={styles.itemText}>{props.text}</Text>
      {/* </View> */}
      <View style= {(props.done === "false") ? styles.circular : styles.done}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemText: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    maxWidth: "90%",
    fontWeight: '600',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 10,
  },
  done: {
    width: 12,
    height: 12,
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: 'blue',
  }
});

export default Task;