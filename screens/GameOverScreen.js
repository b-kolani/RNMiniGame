import {
  Image,
  View,
  StyleSheet,
  Text,
  useWindowDimensions,
  ScrollView,
} from "react-native";

import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
  const { width, height } = useWindowDimensions();

  let imageSize = 300;
  let titleSize = 24;

  if (width < 380) {
    imageSize = 150;
  }

  if (height < 400) {
    imageSize = 80;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>GAME OVER!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
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
    </ScrollView>
  );
}

export default GameOverScreen;

//const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  imageContainer: {
    /**Here before changes the width and the height are
    hard coded to 300px, and hard coding values like this 
    is very often not good idea because you don't know on 
    which device size your app will run in the end.
    So we can solve this with the dimensions AIP might be 
    better than using an alternative like percentage 
    values which are also relative, because we wanna
    ensure that width and height do have the same 
    value.If we set both 50% as value but the problem
    is that these values are now not the same. 
    Yes, they are both 50%, but 50% of different values
    The width of the container will not be the same as 
    the height, so 50% of the available width, will be a 
    different number than 50% of the available height.
    And, therefore, percentage values are not helpful here.
    Instead, this is a great scenario for the dimensions API,
    because we wanna have a hard coded value, but the hard coded 
    value should be different for different devices sizes.*/
    //width: deviceWidth < 300 ? 150 : 300,
    //height: deviceWidth < 300 ? 150 : 300,
    //borderRadius: deviceWidth < 300 ? 75 : 150
    /**The borderRadius be half your 
    width or height, and width and height should be the same 
    amount so that we create a square and then by setting border
    radius to half our width or height, we 
    actually create a circle.That is how we can
    create such a circle image.*/
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden" /**We add this property
    to make sure that we hide the square or the rectangular 
    nature of the actual image*/,
    margin: 36,
  },
  image: {
    /**Here we set the width and the height
    to 100%, which refers to the container,  */
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
