import React, { useState, useEffect } from 'react';
import { View, ImageBackground, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback, FlatList } from 'react-native';
import { Block, Button, Input, Image, Switch, Modal, Text } from '../../components/';
import { useTheme, useData } from '../../hooks/';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { ScrollView } from 'react-native-gesture-handler';

export default function Home(props) {
  const navigation = props.navigation;
  const { translations, data, setData, displayTime,sendReport } = useData();
  const [completeData, setCompleteData] = useState(data ? data : []);
  const [process, setProcess] = useState('01');
  const [showModal, setModal] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState(0);
  console.log("================================================")
  // console.log(completeData[selectedProcess]?.batch.length)
  console.log("================================================")

  const { assets, colors, gradients, sizes, icons, } = useTheme();
  return (
    <Block safeScroll flex={1}>
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

      {completeData[selectedProcess]?.batch.map((item, index) => {


        return (
          <Block key={index} card margin={10}>
            <Text h4>Batch {index + 1}</Text>
            {item?.steps.map((step, indexTow) => {
              return (
                <Block  key ={indexTow} row margin={4}>
                  <Block flex={1} style={{ justifyContent: 'center' }}><Text h5>{step.name}</Text></Block>
                  <Block flex={1} marginLeft={'50%'}>
                    <Text>{step.time}</Text>
                  </Block>
                </Block>
              )
            })}
            <Text h5>Comment</Text>
            <Text>{item?.comment}</Text>
          </Block>
        )
      })}
      {/* <Block card margin={10}>
        <Text h4>Batch 1</Text>
        <Block row margin={4}>
          <Block flex={1} style={{ justifyContent: 'center' }}><Text h5>Step 1</Text></Block>
          <Block flex={1} marginLeft={'50%'}>
            <Text>49.4 mins</Text>
          </Block>
        </Block>
        <Block row margin={4}>
          <Block flex={1} style={{ justifyContent: 'center' }}><Text h5>Step 1</Text></Block>
          <Block flex={1} marginLeft={'50%'}>
            <Text>49.4 mins</Text>
          </Block>
        </Block>
        <Block row margin={4} >
          <Block flex={1} style={{ justifyContent: 'center' }}><Text h5>Step 1</Text></Block>
          <Block flex={1} marginLeft={'50%'}>
            <Text>49.4 mins</Text>
          </Block>
        </Block>
      </Block> */}

      <Block margin={10}>
        {completeData[selectedProcess]?<Button
          flex={1}
          gradient={gradients.custom6}
          marginBottom={sizes.base}
          onPress={() => {
            let abc=completeData[selectedProcess].batch.map((item,index)=>{
              let responce={Comment:item.comment , Steps:item.steps}
              // let responce2 =item.steps
              return responce;
            })
            console.log(completeData[selectedProcess].processName)
            let report={
              processName:completeData[selectedProcess].processName,
              batch:abc
            }
            sendReport(report);
            alert("Report is Sended");
            navigation.push("Dashboard");
          }}>
          <Text white bold transform="uppercase">
            Send Report
          </Text>
        </Button>
      : <Text ></Text>}
        </Block>

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
    </Block>
  );
}