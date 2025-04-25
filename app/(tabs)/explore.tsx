import {
  StyleSheet,
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import CircleButton from "../components/CircleButton";
import EmojiPicker from "../components/EmojiPicker";
import IconButton from "../components/IconButton";
import { ImageSource } from "expo-image";
import EmojiSticker from "../components/EmojiSticker";
import EmojiList from "../components/EmojiList";
import domtoimage from "dom-to-image";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";

export default function TabTwoScreen() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef<View>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(
    undefined
  );
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log(result);
    } else {
      alert("You did not select any image.");
    }
  };

  if (status === null) {
    requestPermission();
  }

  const onSaveImageAsync = async () => {
    if (Platform.OS !== "web") {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.image} />
          ) : (
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
              }}
              style={styles.image}
            />
          )}
          {pickedEmoji && (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <IconButton icon="image" label="Gallery" onPress={pickImageAsync} />
        <CircleButton onPress={onAddSticker} />
        <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
      </View>
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>

      {/* <CameraView style={styles.camera} facing={facing}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={{}}>Flip Camera</Text>
        </TouchableOpacity>
      </CameraView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "50%",
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  button1: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 500,
    resizeMode: "cover",
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginVertical: 20,
  },
});
