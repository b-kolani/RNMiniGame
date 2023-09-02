import { Text, StyleSheet, Platform } from "react-native";

/**Platform is a React Native builds-in API which allows us to
detect on which platform we're running our app so we can apply
different styles according to the platform.Now, we don't need 
to set up a dynamic listener here because the platform is not 
going to change whilst the app is running, unlike the dimensions,
instead, it is always the same for the entire lifetime of this app,
so we can use this platform API anywhere and we don't need to react 
to any changes. */

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold" /**We removed fontWeight 
    because this font which we load, is already bold. */,
    fontSize: 24,
    //fontWeight: "bold",
    color: "white",
    textAlign: "center",
    //borderWidth: Platform.OS === "android" ? 2 : 0; This is one of the ways we can use the Platform API
    //borderWidth: Platform.select({ ios: 0, android: 2 }),his is also another way to write different  codes for different platforms
    /**But here we will use the specific codes files or components for different platforms to made our app
    behaves differently on both platforms.So here we want to make Title component displays 
    without the border width on ios platforms.We can get rid of all border
    since we want no border.*/
    //borderWidth: 2,
    /**Here we want to get 
    rid of border on iOS devices so we want 
    to set different styles based on the 
    platform so we can use the Platform API 
    to do that. */
    //borderColor: "white",
    padding: 12,
    maxWidth: "80%" /**You can use relative units like this, and we have
    used them before, to control widths and heights
    and that you can not just set the width and height itself
    but that you can also set max width or min width besides the 
    regular width to create more responsive sizes.Because when you
    set the width, then it's always that width.   */,
    width: "80%" /**This would be the default, but we could then also
    at max width 80% to make sure that 300px is taken, unless that would
    be more than 80% of the parent container, in which case 80%
    become active.*/,
  },
});
