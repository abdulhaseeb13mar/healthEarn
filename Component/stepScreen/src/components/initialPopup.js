import React from 'react';
import {Text, Button} from 'react-native';
import {Card, CardItem} from 'native-base';

export const InitialPopup = props => (
  <Card>
    <CardItem header bordered>
      <Text>Send your Data to Tangle</Text>
    </CardItem>
    <CardItem>
      <Text>this is a body and it is going to be wide</Text>
    </CardItem>
    <CardItem footer>
      <Button
        title="Send your Data to tangle"
        onPress={() => props.nextPopup()}
      />
    </CardItem>
  </Card>
);
