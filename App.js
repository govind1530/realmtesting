/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Realm from 'realm';
import {v4 as uuidv4} from 'uuid';
import {TaskSchema, TASK_LIST_SCHEMA} from './Src/database/AllSchema/AllSchema';
const App = () => {
  const [taskList, setTaskList] = React.useState();

  async function CreateTask() {
    const createTask = await Realm.open({
      path: 'myrealm',
      schema: [TaskSchema],
    });
    createTask.write(() => {
      createTask.create(TASK_LIST_SCHEMA, {
        _id: uuidv4(),
        name: `${Math.floor(Date.now() / 1000)}`,
        status: Math.random() ? 'open' : 'close',
      });
    });
    createTask.close();
  }

  async function GetTask() {
    const getTask = await Realm.open({
      path: 'myrealm',
      schema: [TaskSchema],
    });

    const taskList = getTask.objects(TASK_LIST_SCHEMA);
    console.log(`The lists of tasks are: ${taskList.map(task => task)}`);
    let taskListArray = [];
    taskList.map(task =>
      taskListArray.push({name: task?.name, status: task?.status}),
    );
    setTaskList(taskListArray);
    getTask.close();
  }
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={() => CreateTask()}>
        <Text>Create Task</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => GetTask()}>
        <Text>Get Task</Text>
      </TouchableOpacity>

      <FlatList
        data={taskList}
        renderItem={items => {
          console.log('items------', items);
          return (
            <View>
              <Text>{items?.item?.name}</Text>
              <Text>{items?.item?.status}</Text>
            </View>
          );
        }}
        keyExtractor={(items, index) => items + index}
      />
    </SafeAreaView>
  );
};

export default App;
