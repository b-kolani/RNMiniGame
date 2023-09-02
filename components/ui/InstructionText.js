import { Text, StyleSheet } from "react-native";

import Colors from "../../constants/colors";

function InstructionText({ children, style }) {
  /**We can pass styles as prop to merge it with the component existed styles.
    The style prop also takes an array of style objects. If
    you do pass an array, by the way the items passed in 
    the style array are parsed and evaluated from left to right.So the 
    right items, and the styles defined in the right items, 
    can overwrite the styles defined in the earlier items.So it is a kind
    of cascading style like CSS*/
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
}

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: "open-sans",
    color: Colors.accent500,
    fontSize: 24,
  },
});
