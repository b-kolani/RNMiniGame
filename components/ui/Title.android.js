import { Text, StyleSheet, Platform } from "react-native";

/**Platform is a React Native builds-in API which allows us to
detect on which platform we're running our app so we can apply
different styles according to the platform.Now, we don't need 
to set up a dynamic listener here because the platform is not 
going to change whilst the app is running, unlike the dimensions,
instead, it is always the same for the entire lifetime of this app,
so we can use this platform API anywhere and we don't need to react 
to any changes. */
/**Another way to make different codes 
for different platforms is to write platform specific
component files or code files in general like this one 
Title.android.js is a component which holds android version
 title component or code specific to android devices */
/**Now you don't need to adjust your imports.In the places where 
Title component gets used, you should make sure that you don't have 
.ios or .android at the end and since our IDE added the .ios 
extension automatically so we must remove it, and we wanna make
sure you remove that on all the screens where the Title component 
is used because you still import as if the file would just be 
named Title.js, and under the hood, React Native will pick the 
proper file based on the platform on which you're running the app 
or the code*/
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
    //borderWidth: Platform.select({ ios: 0, android: 2 }), This is also another way to write different  codes for different platforms
    /**But here we will use the specific codes files or components for different platforms to made our app
    behaves differently on both platforms.So here we want to make Title component displays 
    with a border width on android platforms*/
    borderWidth: 2,
    /**Here we want to get 
    rid of border on iOS devices so we want 
    to set different styles based on the 
    platform so we can use the Platform API 
    to do that. */
    borderColor: "white",
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
