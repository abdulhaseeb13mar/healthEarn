import React from 'react';
import {Text} from 'react-native';
import {Card, CardItem} from 'native-base';
import ProgressBar from 'react-native-progress/Bar';

export const SecondPopup = props => (
  <Card>
    <CardItem header bordered>
      <Text>Sending your Data to Tangle...</Text>
    </CardItem>
    <CardItem>
      <Text>{props.message ? props.message : 'Sending...'}</Text>
    </CardItem>
    <CardItem>
      <ProgressBar
        progress={props.progress}
        borderWidth={2}
        color="#3F51B5"
        height={10}
        animationConfig={{bounciness: 10}}
      />
    </CardItem>

    {/* <CardItem footer>
        <Button
          title="Send your Data to tangle"
          onPress={() => props.nextPopup()}
        />
      </CardItem> */}
  </Card>
);
