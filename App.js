/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {SafeAreaView, Text, Pressable} from 'react-native';

import codePush from 'react-native-code-push';

import Realm from 'realm';

const TestSchema = {
  name: 'Test',
  properties: {
    name: 'string',
  },
};

const realm = new Realm({
  schema: [TestSchema],
});

const App = () => {
  const [object, setObject] = useState(undefined);

  realm.addListener('change', () => {
    const objects = realm.objects('Test');
    setObject(objects[objects.length - 1]);
  });

  const handleWrite = () => {
    realm.write(() => {
      realm.create('Test', {name: Math.random().toString()});
    });
  };

  return (
    <SafeAreaView>
      {object && <Text>{object.name}</Text>}

      <Pressable
        onPress={handleWrite}
        style={{padding: 20, backgroundColor: 'blue'}}>
        <Text>Create one</Text>
      </Pressable>
    </SafeAreaView>
  );
};

// export default App;
export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE,
})(App);
