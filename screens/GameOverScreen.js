import { Image, View, StyleSheet, Text } from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
  return (
    <View style={styles.rootContainer}>
      <Title>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/success.png")}
        />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>
        rounds to guess the number
        <Text style={styles.highlight}>{userNumber}</Text>.
      </Text>
      <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
  );
}

export default GameOverScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150 /**The borderRadius be half your 
    width or height, and width and height should be the same 
    amount so that we create a square and then by setting border
    radius to half our width or height, we 
    actually create a circle.That is how we can
    create such a circle image.*/,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden" /**We add this property
    to make sure that we hide the square or the rectangular 
    nature of the actual image*/,
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24 /**Note that the text that's nested
    into another text element also is resized.This is not
    inheritance at work, but instead this is related to how 
    this is compiled to a Native Component internally. 
    If we have a view that contains a text and we add a font
    size to the view it would not affect any nested text 
    elements in the view.Nested text elements inside of other text
    elements, however, are affected by the text specific styles
    you do set on the parent text component though.*/,
    textAlign: "center",
    marginBottom: 24,
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});
