import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/native';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';

type ResizeImageScreenRouteProp = RouteProp<ParamListBase, 'ResizeImage'>;

interface ResizeImageScreenProps {
  route: ResizeImageScreenRouteProp;
  navigation: any;
}

const resolutions = ['1080x1920', '2160x3840', '1080x1350', '2160x2700'];

const ResizeImageScreen: React.FC<ResizeImageScreenProps> = ({ route, navigation }) => {
  const { selectedImage } = route.params as { selectedImage: { uri: string } };
  const [selectedResolution, setSelectedResolution] = useState<string | null>(null);

  const handleResolutionSelection = (resolution: string) => {
    setSelectedResolution(resolution);
  };

  const handleExport = async () => {
    if (selectedResolution) {
      try {
        const resizedImageUri = await resizeImage(selectedImage.uri, selectedResolution);
        await saveToGallery(resizedImageUri);
  
        // Do not navigate to HomeScreen here, as saving to the gallery is successful
        Alert.alert('Success', 'Image saved to gallery!');
      } catch (error) {
        console.error('Error exporting image:', error);
        Alert.alert('Error', 'Failed to export the image. Please try again.');
      }
    } else {
      Alert.alert('Error', 'Please select a resolution before exporting.');
    }
  };
  
  const renderResolutionButtons = () => {
    return resolutions.map((resolution, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.resolutionButton, selectedResolution === resolution && styles.selectedResolution]}
        onPress={() => handleResolutionSelection(resolution)}
      >
        <Text>{resolution}</Text>
      </TouchableOpacity>
    ));
  };

  const resizeImage = async (uri: string, resolution: string): Promise<string> => {
    const [width, height] = resolution.split('x').map(Number);
  
    try {
      const resizedImage = await ImageResizer.createResizedImage(
        uri,
        width,  
        height, 
        'JPEG',
        100,
        0,
        undefined,
      );
  
      return resizedImage.uri;
    } catch (error) {
      console.error('Error resizing image:', error);
      throw error;
    }
  };
  
  const saveToGallery = async (uri: string) => {
    try {
      const destinationPath = `${RNFS.ExternalDirectoryPath}/resizedImage.jpg`;
      await RNFS.copyFile(uri, destinationPath);
    } catch (error) {
      console.error('Error saving image to gallery:', error);
      throw error;
    }
  };
  
  
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resize Your Image Here</Text>

      {selectedImage && <Image source={{ uri: selectedImage.uri }} style={styles.image} />}

      <Text style={styles.subtitle}>Select Resolution:</Text>
      <View style={styles.resolutionOptions}>{renderResolutionButtons()}</View>

      {selectedResolution && (
        <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
          <Text style={styles.exportButtonText}>Export Image</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'purple',
    bottom: 110,
  },
  image: {
    width: 200,
    height: 250,
    borderRadius: 10,
    marginVertical: 20,
    bottom: 110,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    bottom: 110,
    color:'purple',
  },
  resolutionOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    bottom:80,
  },
  resolutionButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedResolution: {
    backgroundColor: 'purple',
  },
  exportButton: {
    marginTop: 5,
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
  },
  exportButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ResizeImageScreen;
