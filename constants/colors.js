const Colors = {
    primary500: "#72063c",
    primary600: "#640233",
    primary700: "#4e0329",
    primary800: "#3b021f",
    accent500: "#ddb52f",
  };
  /**Here the properties names are related to the colors differences.So 
  primary refer to the color shade or variation of the base or pure of the color, 
  and accent is used for the base or pure color. */
  
  export default Colors;
  /**Notice that we are using different colors in different places of the app. 
  I' m using colors in the StartGameScreen component, in the primaryButtonComponent,
  in the Title component.And having all these colors in all these places is not ideal. 
  It's just as in web development with CSS. 
  If you're using the same colors in different places which you typically are, repeating 
  them manually is annoying because you always have to copy the exact same hex codes, and 
  if you would change to color at some point and even if it's just 
  a slight change, a small change, you would have to apply that in different files 
  of your project, which of course is not great.Now in CSS, you could solve this problem 
  by using CSS variables, CSS custom properties.
  But this feature doesn't exist with RN because we're not using CSS here.
  Therefore what is commonly done in RN, is that you create a helper file that exposes 
  certain constant values like the colors you're using.
  So we grouped all these colors in an object called Colors to manage all these
  colors in  the same place.Now we can manage the colors in one global place, and then 
  use these colors in multiple components, and changes therefore only to be made in one place,
  instead of many places.*/
  