import { StyleSheet, Text, View, Dimensions } from "react-native";

import Colors from "../../constants/colors";

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

export default NumberContainer;

/**Dimensions is an API built into react-native  it's 
not a component we would use in our JSX code.
Instead it's a javaScript object which we can use 
anywhere in our javaScript code, *including
our styles to get information out of it.With 
the Dimensions API we can get information such as 
the device width or height */
/**Dimensions get method takes an argument, which is 
a string  which holds either a value of screen or window
On Android, screen is entire available width an height, 
including the status bar.Window argument is excluding the
status bar.So the actual part of the screen where the UI
should be painted and usable.*/
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: deviceWidth < 380 ? 12 : 24 /**This is used 
    to make content bit smaller or adaptive on different devices sizes */,
    margin: deviceWidth < 380 ? 12 : 24,
    borderRadius: 8 /**That's why we also 
    need a view because border radius is 
    not supported on the text element on 
    IOS hence we needed the View as a 
    wrapper. */,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: Colors.accent500,
    fontSize: deviceWidth < 380 ? 28 : 36,
    //fontWeight: "bold",
    fontFamily: "open-sans-bold",
  },
});
