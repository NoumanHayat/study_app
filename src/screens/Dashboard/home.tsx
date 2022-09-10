import React, { useState, useLayoutEffect, useEffect, useCallback, useRef } from 'react';
import { Block, Button, Modal, Text, Input, Image, Switch } from '../../components/';
import { ImageBackground, Dimensions, View, TouchableOpacity, FlatList } from 'react-native';
import { useTheme, useData } from '../../hooks/';
import AntDesign from 'react-native-vector-icons/AntDesign';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableWithoutFeedback } from 'react-native';
// import CircularProgress from 'react-native-circular-progress-indicator';
const App = (props) => {
  const { assets, colors, gradients, sizes, icons, } = useTheme();
  const { translations, data, setData } = useData();

  const [completeData, setCompleteData] = useState(data ? data : []);
  console.log(completeData[0] ? completeData[0] : 's')
  const [showModal, setModal] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState(0);
  // const [step, setStep] = useState(data[0]?data[0].detail.step.name:[]);
  const padToTwo = (number) => (number <= 9 ? `0${number}` : number);
  const displayTime = (seconds: number) => {
    let minutes = 0;
    let hours = 0;
    if (seconds < 0) {
      seconds = 0;
    }

    if (seconds < 60) {
      return `00:00:${padToTwo(seconds)}`
    }

    let remainseconds = seconds % 60;
    seconds = (seconds - remainseconds) / 60;

    if (minutes < 60) {
      return `00:00:${padToTwo(seconds)}:${padToTwo(remainseconds)}`;
    }

    let remainminutes = minutes % 60;
    hours = (minutes - remainminutes) / 60;
    return `${padToTwo(hours)}:${padToTwo(remainminutes)}:${padToTwo(remainseconds)}`;
  }
  return (
    <Block safeScroll flex={1}  >
      <Block style={{ borderBottomStartRadius: 25, borderBottomEndRadius: 25, }} align="center" justify='center' backgroundColor={'#3676EC'} height={sizes.width * 0.60} >
        <Text white>Timing</Text>
      </Block>
      <Block flex={1} margin={sizes.sm}>
        <Text h5 marginBottom={sizes.sm}>Select Process</Text>
        <Button
          flex={1}
          row
          gradient={gradients.info}
          onPress={() => setModal(true)}>
          <Block
            row
            align="center"
            justify="space-between"
            paddingHorizontal={sizes.sm}>
            <Text white bold transform="uppercase" marginRight={sizes.sm}>
              {completeData[0] ? completeData[0].processName : "Select Process"}
            </Text>
            <Image
              source={assets.arrow}
              color={colors.white}
              transform={[{ rotate: '90deg' }]}
            />
          </Block>
        </Button>
      </Block>
      {/* ============================================================================================== */}
      <Block flex={1} margin={sizes.sm}>
        <Text h5 marginBottom={sizes.sm}>Batch 1</Text>
        {completeData[selectedProcess]?.steps?.map((item, index) => {
          console.log(item)
          return(
            <Block Block card row margin = { 4} key = { index } >
              <Block flex={1} style={{ justifyContent: 'center' }}><Text h5>{item.name}</Text></Block>
              <Block flex={1} row>
                <Button
                  flex={1}
                  gradient={gradients.divider}
                  style={{ margin: 5 }}
                  onPress={async () => {
                    console.log("Start")
                  }}>
                  <Text bold transform="uppercase">
                    <AntDesign name="pause" size={24} color="black" />
                    {/* <AntDesign name="rightcircle" size={20} color="black" /> */}

                  </Text>
                </Button>
                <Button
                  flex={1}
                  style={{ margin: 5 }}
                  gradient={gradients.divider}
                  // style={{ margin: 5 }}
                  onPress={() => {
                    alert(
                      ' <Button flex={1} gradient={gradients.custom5} marginBottom={sizes.base} > <Text white bold transform="uppercase"> title</Text></Button>',
                    );
                  }}>
                  <Text bold transform="uppercase">
                    <AntDesign name="delete" size={24} color="black" />
                  </Text>
                </Button>
              </Block>
              </Block>
          ) 
        })}

    </Block>
      {/* ========================================================================================= */ }
    </Block >
  );

};
const options = {
  container: {

    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
  },
};
export default App;
