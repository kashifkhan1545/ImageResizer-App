import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/native';

const Description = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const goToTask = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.descriptionText}>
        Here is the Task Description. Here an image will be imported from the
        gallery to the screen where there should be a next button, and this
        button will navigate this picture to the next screen where its desired
        resolution will be set. and then there will be a button of export when
        I click on it image should be resized and it will be saved in the
        gallery of the phone and displayed on the screen also.
      </Text>

      <TouchableOpacity style={styles.button} onPress={goToTask}>
        <Text style={styles.buttonText}>Go To Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: 20,
    color: 'black',
    marginBottom: 20,
    bottom: 60,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    width: '75%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Description;
