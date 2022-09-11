import React, { useState, useLayoutEffect, useEffect, useCallback, useRef } from 'react';
import { Block, Button, Modal, Text, Input, Image, Switch } from '../../components/';
import { ImageBackground, Dimensions, View, TouchableOpacity, FlatList } from 'react-native';
import { useTheme, useData } from '../../hooks/';
import AntDesign from 'react-native-vector-icons/AntDesign';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableWithoutFeedback } from 'react-native';
// import CircularProgress from 'react-native-circular-progress-indicator';
const getTime = () => {
  const d = new Date();
  return (d.getTime());
}
const App = (props) => {
  const { assets, colors, gradients, sizes, icons, } = useTheme();
  const { translations, data, setData, displayTime } = useData();
  const navigation = props.navigation;
  const [completeData, setCompleteData] = useState(data ? data : []);
   console.log(completeData[0] ? completeData[0] : 's')
  const [showModal, setModal] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [comment, setComment] = useState('');
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
        <Text h5 marginBottom={sizes.sm}>Batch {(completeData[selectedProcess]?.batch.length)+1}</Text>
        {completeData[selectedProcess]?.steps?.map((item, index) => {
          // console.log(item)
          return (
            <Block Block card row margin={4} key={index} >
              <Block flex={1} style={{ justifyContent: 'center' }}><Text h5>{item.name}</Text></Block>
              <Block flex={1} row>
                <Button
                  flex={1}
                  gradient={gradients.divider}
                  style={{ margin: 5 }}
                  onPress={async () => {
                    console.log(item.active)
                    if (!item.active) {
                      item.lastUpdate = getTime();
                    } else {
                      item.time = item.time + (getTime() - item.lastUpdate);
                      item.lastUpdate = 0;
                    }
                    item.active = !item.active;
                    // let display= displayTime(item.time/1000);
                    setRefresh(!refresh)
                  }}>
                  <Text bold transform="uppercase">
                    {item.active ? <AntDesign name="pause" size={24} color="blue" /> : <AntDesign name="rightcircle" size={20} color="black" />}
                  </Text>
                </Button>
                <Button
                  flex={1}
                  style={{ margin: 5 }}
                  gradient={gradients.divider}
                  onPress={() => {
                      item.time = 0;
                    setRefresh(!refresh)
                  }}>
                  <Text bold transform="uppercase">
                    <AntDesign name="delete" size={24} color="red" />
                  </Text>
                </Button>
              </Block>
            </Block>
          )
        })}
        {completeData[0] ? <Input multiline={true} onChangeText={(e) => { setComment(e) }} placeholder="Please Enter Comment" /> : <Text ></Text>}
        {completeData[0] ? <Button
          flex={1}
          gradient={gradients.info}
          margin={sizes.base}
          onPress={() => {
            let formatting = completeData[selectedProcess]?.steps.map((item, index) => {
              let time = displayTime(item.time);
              let name = item.name;
              return { name, time }
            })

            let newBatch = {
              comment,
              steps: formatting
            }
            let batch =completeData[selectedProcess].batch;
            batch.push(newBatch)
            completeData[selectedProcess].batch[batch];
            navigation.push("Dashboard")
          }}>
          <Text white bold transform="uppercase">
            New Batch
          </Text>
        </Button> : <Text ></Text>}

      </Block>
      {/* ========================================================================================= */}
      <Modal visible={showModal} onRequestClose={() => setModal(false)}>
        <FlatList
          keyExtractor={(index) => `${index}`}
          data={completeData ? completeData.map((item, index) => { return item.processName }) : ['none']}
          renderItem={({ item, index }) => (
            <Button
              marginBottom={sizes.sm}
              onPress={() => {
                setSelectedProcess(index);
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
