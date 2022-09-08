import React, { useState, useLayoutEffect } from 'react';
import { Block, Button, Modal, Text, Input, Image, Switch } from '../../components/';
import { ImageBackground, Dimensions, View, TouchableOpacity, FlatList } from 'react-native';
import { useTheme, useData } from '../../hooks/';
import AntDesign from 'react-native-vector-icons/AntDesign';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableWithoutFeedback } from 'react-native';

const App = (props) => {
  const { assets, colors, gradients, sizes, icons, } = useTheme();
  // borderTopStartRadius: 45,
  //       borderTopEndRadius: 45,
  const [process, setProcess] = useState('01');
  const [showModal, setModal] = useState(false);
  const [step, setStep] = useState([1, 2, 3, 4]);
  //       // bottom: 35, 
  return (
    <Block safeScroll flex={1}  >
      <Block style={{ borderBottomStartRadius: 25, borderBottomEndRadius: 25, }} align="center" justify='center' backgroundColor={'#3676EC'} height={sizes.width * 0.60} >
        <Text white>Timing</Text>
        <Text h1 white>7:43:00</Text>
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
                  onPress={() => {
                    alert(
                      ' <Button flex={1} gradient={gradients.custom5} marginBottom={sizes.base} > <Text white bold transform="uppercase"> title</Text></Button>',
                    );
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
                    alert(
                      ' <Button flex={1} gradient={gradients.custom5} marginBottom={sizes.base} > <Text white bold transform="uppercase"> title</Text></Button>',
                    );
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
