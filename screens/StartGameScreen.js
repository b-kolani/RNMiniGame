import { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

/** KeyboardAvoidingView is a component which you can use in your JSX code 
to wrap other content with it, other content that involves or contains an 
input field, and whenever the keyboard that opens up that content 
that holds your input element and other elements
can be moved up so that you can still access it, even though the keyboard is 
open.*/
function StartGameScreen({ onPickNumber }) {
  /**We use as initial state or value an empty string 
  instead of a number like zero, because actually I 
  will bind the enteredNumber to the text input and 
  even if you have number-pad as keyboard type to 
  enter only numbers as the input value, what you 
  will get as a value will always be a string.It will 
  always be of type string even if the text is a number 
  or contains a number; and that's the same as in the web.
  So what we get from TextInput will always be a string. 
  We can of course convert it thereafter  */
  const [enteredNumber, setEnteredNumber] = useState("");

  /**So any code that should react to device orientation
  or size changes, should go into the component function
  Because this function component, unlike the overall file code, 
  will get executed multiple times.React Native gives you an 
  alternative way of accessing the dimensions API, which allows you 
  to the react to device size or dimension changes inside of component
  functions.RN gives you a hook, the use Window dimensions hook,
  which you can use.*/
  /**When we call this hook, we gat back an object, on which you can use
  object de-structuring to get the width and height of the device.So now 
  here, we get width and height, but internally, this hook will watch the 
  device dimensions.And whenever they change, for example, because the 
  device gets rotated this component function (StartGameScreen) will get 
  executed again, and we will get an updated width and height.
  */
  /**You don't always have to use it like this,
  but it makes sense to use this hook instead of other
  way of using the dimensions API, if you need dynamic
  dimensions.If you are fine with locking in certain values initially,
  then you don't need this hook.But if you do want to adjust
  dynamically to changing sizes, you should use this hook
  instead of the other way of using it, which we saw
  before.*/
  const { width, height } = useWindowDimensions();

  /**When we pass this function as callback to the onChangeText 
  event in TextInput element the argument is passed automatically 
  to the callback and the argument will be the value entered by 
  the user. */
  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetInputHandler() {
    setEnteredNumber("");
  }

  function confirmInputHandler() {
    /**Convert the input value into a number */
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      // show alert ...
      /**The builds-in Alert API has a method called alert
      which takes 3 arguments */
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99.",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return; /**This makes sure that this function does not continue 
      its execution if one of this condition returns true.
      So that we cancel this function's execution.*/
    }
    /**This function takes the chosenNumber as argument which will 
    be set as the number picked by the user.This function is received 
    as prop by this component in App component*/
    onPickNumber(chosenNumber);
  }

  /**Now we can derive our margin top dynamically inside of this 
  component function based on this dynamic height or width, and 
  then use this in our JSX code.*/
  const marginTopDistance = height < 380 ? 30 : 100;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none" //This is really not import as we are expecting here numbers as input
              autoCorrect={false} // This also not matter as only numbers are expecting
              onChangeText={numberInputHandler}
              value={enteredNumber}
            />
            {/**Every button receives its own View.And the idea behind this is that 
      now we have new flex box containers where every flexbox container contains 
      one button and each flex box container here will again have a flex direction 
      of column and the button will stretch in there.And the two flexbox containers 
      we have here can now distribute the available space provided by the main View 
      container */}
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;

/**
 * Here we are using height instead of width because 
we are working with the orientation of the device screen. 
And in landscape mode we would applying styles based on the 
available height.
 */
/**This code here, where we get the device height, 
is only executed once when this component code, this entire 
file code is parsed and executed for the first time.
So if we adjust the screen orientation after starting this game,
this code down in styles here will not get executed again.
Yes, the component file, will execute again from time to time
for example when our state changes like the enteredNumber managed 
by the useState hook.But the code outside of this component function
will not be executed again.So therefore, if it's possible to switch the
orientation whilst using this game or this app in general, then you might 
not wanna use the dimensions API like this.You could
but you the might be locking in values that you don't really want thereafter
What you should do instead, is you should write this in more responsive way,
which adjusts to changing device orientations.
Instead of locking in the device height here like below and instead of setting
the margin top in the styles object.What you should do, is move that code
into your component function.*/
//const deviceHeight = Dimensions.get("window").height;

/**By default RN containers use flex box */
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    //marginTop: deviceHeight < 380 ? 30 : 100,
    alignItems: "center",
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    /**By default, a View takes only as 
    much space as is needed by its content.
    You can add flex with one as value to 
    enforce that a View container takes as 
    much space as available */
    flex: 1,
  },
});
