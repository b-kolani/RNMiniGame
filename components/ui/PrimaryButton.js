import { View, Text, Pressable, StyleSheet } from "react-native";

import Colors from "../../constants/colors";

function PrimaryButton({ children, onPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable /**Put the Pressable container 
      outside as the main container the button 
      feedback or button pressed effect will only 
      be visible on the View element and the nested 
      Text element.To make it visible on the hole 
      element we outsourced the View element to change 
      it as the main container  */
        /**We can passe arrays as values of the style property 
      as we did it below */
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: Colors.primary600 }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },

  /**Unlike to CSS in web there is no inheritance in react-native styling
  approach.If we apply the following styles properties color and textAlign on 
  the container as we did it in CSS on the web thus the descendants
  won't inherit of these styles; then we apply them directly on the descendant 
  Note that the styling approach in RN looks like CSS but it's not CSS. 
  Styling in RN is Js  */
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
