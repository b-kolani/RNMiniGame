import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

/**This is the function which the program or device will use to 
guess the number and it will help us as we need to output the guess made by the phone,
we enter as we pay against the device. 
This function generates a random number between the min and max values set as parameters, 
and a third one pass as an exclude number  which allows us to exclude a certain number 
from being generated; which will be important for making sure that we can't immediately 
guess the number chosen by the user, because here I wanna make sure that the phone is not
able to guess the correct number right at the start. 
Therefore the exclude parameter allows me to exclude that single number
so that the phone can't win automatically in the first round.
It's a little extra difficulty that's added here for the phone.*/
function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

/**These extra variables  which we manage outside of the component function
so that the variables won't change just because the component is reevaluated*/
let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  /**This function generateRandomBetween will be 
  executed whenever the game screen component is 
  executed.So whenever it is reevaluated, which 
  will be the case whenever a new guess is set.So 
  therefore regenerate it a new random number 
  whenever that happens and we take our current
  min and max boundaries into account here.The 
  problem with that just is that if we do it like 
  this, we execute this function, even at the point 
  of time where min boundary and max boundary are the
  same because we derived our final result.Now we don't 
  do this in the nextGuessHandler function because this 
  handler can't be executed anymore as soon as we have 
  the final result, because the buttons won't be shown 
  anymore because we move to that game over screen.
  But the problem is that this component function
  is rerendered one time where the current guess is equal
  to the userNumber.This will execute before useEffect is 
  evaluated, so before we can move on to the game over state.
  The work around is to hard code our default min and max values
  here by replacing minBoundary and maxBoundary respectively by
  1 and 100.Because we only need this once, anyways, we only need
  this initialGuess initially, anyways and thereafter, we don't care 
  about this.An alternative solution could be to use the useMemo
  hook provided by React to avoid that the code below executed
  again.So as soon as we reach the correct number we are redirect
  to the game over screen.*/
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const { width, height } = useWindowDimensions();

  /**Now useEffect runs after the component rerendered cycle.
  Hence we only trigger this function  that moves to the
  game over screen after this component has been executed once.
  Now, this is early enough to avoid that the user is able to 
  press these buttons again because the latest buttons won't 
  have rendered yet.The buttons with the updated state won't have
  rendered yet.*/
  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
    /**For the dependencies array the simple rule is that
    all the variables, all the values that you use in this 
    function  should be added as dependencies */
  }, [currentGuess, userNumber, onGameOver]);

  /**There I have an effect which I wanna execute
  whenever this game screen component is rendered 
  for the first the time.So whenever it was not part of 
  the rendered UI and now became part of the interface.*/
  useEffect(() => {
    (minBoundary = 1), (maxBoundary = 100);
  }, []);

  /**This function job is to derive or to obtain or to calculate such a
  new number.The parameter direction which then could be a string that 
  is either 'lower' as argument if the new number should be lower than the previous number 
  or 'greater' as argument if it should be greater */
  function nextGuessHandler(direction) {
    // direction => 'lower', 'greater'

    /**At some point, it freezes  with a maximum call stack size exceeded error. 
    So it looks like we're somehow entering an infinite loop ins ome place.And that causes 
    the app to crash and this happens when we give a bad direction to the device
    so we lead in an infinite loop and the app crashed.So we should let the phone know
    if the guess was too high or too low and we should not be able to say you need to guess 
    higher if actually you need to guess lower.So we need to make a check at the beginning of
    the function.We should check if the direction is lower and at the same time
    the currentGuess that was made is smaller than the choice made by the user i.e than the 
    userNumber, which we get through props.Because if the currentGuess is smaller and we're 
    saying that you need to guess lower, then we are lying because you already guessed lower 
    than the userNumber, so telling you that you need to guess even lower is a lie. The same 
    would be true for the opposite, if we say the direction is greater but the current guess 
    is actually greater than the userNumber, then we're also misleading the phone into a wrong 
    direction.And this is what causes the infinite loop in the end.
    */
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      /**If we know that the new number should be lower than the previous number,
    we know that our minimum boundary was okay but the max boundary needs to be adjusted 
    because it was too high.Otherwise the new number wouldn't have to be lower.We know the 
    currentGuess was too high, so it makes no sense to guess a number even bigger; because 
    if we have to guess lower, we know that the currentGuess was too big, otherwise we wouldn't 
    have to guess lower.And therefore, we know that the currentGuess is definitely the upper 
    boundary.Actually, it's the currentGuess minus one even  because if the currentGuess would 
    have been the right number, we would have won.So it has to be the currentGuess minus one.
    But since the maxBoundary is excluded here when calling generateRandomBetween function, we 
    should not deduct minus one.So we set our new maxBoundary below.Because if we do so, we
    actually exclude a number that could be the valid guess.So setting maxBoundary to 
    currentGuess is fine.It will be our currentGuess, which then will automatically be excluded
    by generateRandomBetween because of how this function works.*/
      maxBoundary = currentGuess;
    } else {
      /**The minBoundary, unlike the maxBoundary is included in the set of possible results
    and therefore, we have to add plus one so that we don't guess the same minBoundary again
    We would exclude it also by making plus one because currentGuess is excluded but still, 
    this is an adjustment we can make here.*/
      minBoundary = currentGuess + 1;
    }

    console.log(minBoundary, maxBoundary);
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
  }

  const guessRoundsListLength = guessRounds.length;

  /**We wanna display a layout that is optimized for more width.
  In landscape mode this component is not usable so wwe fix it with
  the code below.This is variable is our default layout */
  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        {/**{guessRounds.map((guessRound) => (
          <Text key={guessRound}>{guessRound}</Text>
        ))}*/}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={
                guessRoundsListLength - itemData.index
              } /**This will deduct the round number */
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    marginTop: 10,
  },
  instructionText: {
    marginBottom: 12,
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
  buttonsContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
  listContainer: {
    /**This will make the flatList inside its parent
    container to be scrollable and don't go outside 
    of my screen*/
    flex: 1,
    padding: 16,
  },
});
