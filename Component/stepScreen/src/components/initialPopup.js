import React from 'react';
import {Text, Button} from 'react-native';
import {Card, CardItem} from 'native-base';
import moment from 'moment';

export const InitialPopup = props => (
  <Card>
    <CardItem header bordered>
      <Text>Please Send your Data</Text>
    </CardItem>
    <CardItem>
      <Text>
        You have not sent your data after{'\n'}
        {moment(props.lastSyncDate).format('DD MMMM YYYY')}{' '}
      </Text>
    </CardItem>
    <CardItem footer>
      <Button
        title="Send your Data to tangle"
        onPress={() => props.nextPopup()}
      />
    </CardItem>
  </Card>
);
