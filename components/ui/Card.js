import { StyleSheet, View, Dimensions } from "react-native";

import Colors from "../../constants/colors";

function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

export default Card;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  card: {
    justifyContent: "center" /**This will position elements along 
        the main axis which by default is top to bottom because 
        the default flex direction with RN is column */,
    alignItems:
      "center" /**This will position items along the cross axis which is the opposite of the main axis*/,
    marginTop: 36,
    marginHorizontal: deviceWidth < 300 ? 18 : 36,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 4 /*This property will gives a shadow to the element
        border is specific for android when react
        native compile his builds-in components in both iOS and Android native components or languages so only 
        Android native language can understand it not iOS will use another 
        approach below to make it on iOS devices and emulators  */,

    /**With these four properties below the shadow effect will be 
        applied on the element on iOS devices or emulators */
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
