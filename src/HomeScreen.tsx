import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  MediaType,
  ImagePickerResponse,
} from 'react-native-image-picker';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/native';

interface ImagePickerAsset {
  uri: any;
}

const HomeScreen = ({ route }: { route: any }) => {
  const [selectedImages, setSelectedImages] = useState<ImagePickerAsset[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  useEffect(() => {
    const { resizedImage } = route.params || {};
    if (resizedImage) {
      
      setSelectedImages([...selectedImages, { uri: resizedImage }]);
    }
  }, [route.params]);

  const handleLaunchImageLibrary = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo' as MediaType,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      try {
        if (!response.didCancel && response.assets && response.assets.length > 0) {
          const selectedAsset = response.assets[0];
          setSelectedImages([...selectedImages, { uri: selectedAsset.uri }]);
        }
      } catch (error) {
        console.error('Error handling image library response:', error);
      }
    });
  };

  const handleLaunchCamera = () => {
    const options = {
      mediaType: 'photo' as MediaType,
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      try {
        if (!response.didCancel && response.assets && response.assets.length > 0) {
          const selectedAsset = response.assets[0];
          setSelectedImages([...selectedImages, { uri: selectedAsset.uri }]);
        }
      } catch (error) {
        console.error('Error handling camera response:', error);
      }
    });
  };
  const handleNextButtonPress = () => {
    if (selectedImageIndex !== null) {
      const selectedImage = selectedImages[selectedImageIndex];

      navigation.navigate('ResizeImage', { selectedImage });
    } else {
      

    }
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(selectedImageIndex === index ? null : index);
  };

  const isNextButtonVisible = selectedImageIndex !== null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
          {selectedImages.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleImageClick(index)}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: image.uri }}
                style={[
                  styles.selectedImage,
                  { borderColor: selectedImageIndex === index ? 'green' : 'transparent' },
                ]}
                resizeMode="cover"
              />
              {selectedImageIndex === index && (
                <View style={styles.checkmarkContainer}>
                  <Text style={styles.checkmark}>✔</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        {isNextButtonVisible && (
          <TouchableOpacity style={styles.button} onPress={handleNextButtonPress}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLaunchImageLibrary}>
        <Text style={styles.buttonText}>Library</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLaunchCamera}>
        <Text style={styles.buttonText}>Camera</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  selectedImage: {
    width: 110,
    height: 140,
    borderRadius: 5,
    margin: 4,
    borderWidth: 2,
  },
  checkmarkContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  checkmark: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 10,
    width: '75%',
    alignItems: 'center',
    marginVertical: 5,
    bottom: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;
