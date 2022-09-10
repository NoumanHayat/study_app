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
  const [process, setProcess] = useState('01');
  const [showModal, setModal] = useState(false);
  const [step, setStep] = useState([1, 2, 3, 4]);
  // let interval;
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

  const [pause, setPause] = useState(false);
  const [displayTimeString, setDisplayTimeString] = useState('00:00:00');
  const [time, setTime] = useState(0);

  

  useEffect(() => {
    if (!pause) {
      setTimeout(() => {
        setPause(true);
      }, 200);
    }
  }, [pause]);

  if (!pause) return null;
  return (
    <Block safeScroll flex={1}  >
      <Block style={{ borderBottomStartRadius: 25, borderBottomEndRadius: 25, }} align="center" justify='center' backgroundColor={'#3676EC'} height={sizes.width * 0.60} >
        <Text white>Timing</Text>
        <Text h1 white>{displayTimeString}</Text>
        
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
              {process}
            </Text>
            <Image
              source={assets.arrow}
              color={colors.white}
              transform={[{ rotate: '90deg' }]}
            />
          </Block>
        </Button>
      </Block>
      <Block flex={1} margin={sizes.sm}>
        <Text h5 marginBottom={sizes.sm}>Batch 1</Text>
        {step.map((item) => {
          return (
            <Block card row margin={4} key={item}>
              <Block flex={1} style={{ justifyContent: 'center' }}><Text h5>Step 1</Text></Block>
              <Block flex={1} row>
                <Button
                  flex={1}
                  gradient={gradients.divider}
                  style={{ margin: 5 }}
                  onPress={async () => {
                    // console.log('handleLeftButtonPress');
                    // setPause(false);
                    let interval;
                    if (!pause) {
                      interval = setInterval(() => {
                        setTime((p) => p + 1);
                        console.log(time)
                        setDisplayTimeString(displayTime(time))
                      }, 1000);
                    } else {
                      clearInterval(interval);
                    }

                  }}>
                  <Text bold transform="uppercase">
                    <AntDesign name="pause" size={24} color="black" />
                  </Text>
                </Button>
                <Button
                  flex={1}
                  gradient={gradients.divider}
                  style={{ margin: 5 }}          // style={{ margin: 5 }}
                  onPress={() => {
                    // handleRightButtonPress()
                    console.log("react-native-stopwatch-timer")
                    setPause(true)
                  }}>
                  <Text bold transform="uppercase">
                    <AntDesign name="rightcircle" size={20} color="black" />
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
        <Button
          flex={1}
          gradient={gradients.info}
          margin={sizes.base}
          onPress={() => {
            alert(
              ' <Button flex={1} gradient={gradients.custom5} marginBottom={sizes.base} > <Text white bold transform="uppercase"> title</Text></Button>',
            );
          }}>
          <Text white bold transform="uppercase">
            New Batch
          </Text>
        </Button>
      </Block>
      <Modal visible={showModal} onRequestClose={() => setModal(false)}>
        <FlatList
          keyExtractor={(index) => `${index}`}
          data={['01', '02', '03', '04', '05']}
          renderItem={({ item }) => (
            <Button
              marginBottom={sizes.sm}
              onPress={() => {
                setProcess(item);
                setModal(false);
              }}>
              <Text p semibold transform="uppercase">
                {item}
              </Text>
            </Button>
          )}
        />
      </Modal>
    </Block >
  );

};
export default App;
