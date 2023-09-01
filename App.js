import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
  /**This state manage the number picked by the user.
  And initially this can be null, we could also set it to zero
  but we will set to undefined to make it clear that we have
  no number initially.  */
  const [userNumber, setUserNumber] = useState();

  /**And initially, this is actually true  because actually 
  the game hasn't started yet, so it's kind of over.*/
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  /**This hook allows to load fonts*/
  /**This hook returns an array in which the 
  first element is actually a boolean that indicates 
  whether the fonts have been loaded yet or not.
  So we can use this boolean to render our app
  loading component, which will then show the splash 
  screen until the fonts have been loaded.This 
  how we add custom fonts in RN*/
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
  /**So in that case, I will show the splash screen,
  and once the fonts have been loaded the component 
  will be re-executed, and then we will not show
  the splash screen anymore*/
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  /**In this function we in the end wanna 
  reset some data.We won't set again the setGameIsOver
  because we already set this to true above*/
  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  /**If a number has been chosen and that the game is over. 
  So if the game has been played or if it just hasn't started.
  If it just hasn't started, we don't wanna show this screen.
  So we will check if the game is over, and if userNumber is 
  truthy*/
  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover" /**It's very likely that the image you're using 
        is too small or too big for the screen size of the device on which 
        the app is running.And this prop controls how the image will be 
        resized if it doesn't have this same dimensions as the underlying device.
        Here I will use cover as value, which will make sure that the image always 
        covers up all the available space but not by distorting it, but instead 
        by zooming in or out*/
        style={styles.rootScreen}
        imageStyle={
          styles.backgroundImage
        } /**This style will make the background 
        image transparent to let the linear-gradient colors be visible.Note that RN 
        builds-in components are the combination of other core components of the RN 
        as we can look at the RN github repo. */
      >
        {/**This component ensure that the screen content is not going under the 
        notch and not closer to the device edges.Here the screen content*/}
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}
/**Note that it is important Views 
    containers only take as much space 
    as they need to fit their content 
    into themselves.The root View i.e 
    the main View container of the App 
    component; his content is other 
    components so if we apply the 
    background color it will cover 
    only the space needed by the root 
    View to fit its content.To fix that 
    we use flex property to tell to the 
    root View to take the entire available 
    space then the background color will 
    be applied everywhere*/

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});

/**To apply the linear-gradient style 
to the background we will use the 
expo-linear-gradient package provided 
by expo.To install this package we will 
use expo to install it like this expo 
install expo-linear-gradient we could 
use npm but by using expo install, 
will ensure that a fitting version 
is installed into this project.
So it would take look at the version 
of expo you are using in this project, 
and it will automatically install a 
dependency version that works well with 
that expo version.*/
