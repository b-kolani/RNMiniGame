import { useState } from "react";
import { TextInput, View, StyleSheet, Alert} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

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

  return (
    <View style={styles.rootContainer}>
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
      now we have new flexbox containers where every flexbox container contains 
      one button and each flexbox container here will again have a flex direction 
      of column and the button will stretch in there.And the two flexbox containers 
      we have here can now distribute the available space provided by the main View 
      container   */}
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

export default StartGameScreen;

/**By default RN containers use flexbox */
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
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
