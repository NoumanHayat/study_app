import React, { useState, useEffect } from 'react';
import { View, ImageBackground, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback, FlatList } from 'react-native';
import { Block, Button, Input, Image, Switch, Modal, Text } from '../../components/';
import { useTheme, useData } from '../../hooks/';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';

export default function Home(props) {
  const navigation = props.navigation;
  const { translations, data, setData } = useData();
  const [process, setProcess] = useState('01');
  const [showModal, setModal] = useState(false);
  const { assets, colors, gradients, sizes, icons, } = useTheme();

  // ============================================================================
  const [process_name, setProcess_name] = useState('');
  const [steps, setSteps] = useState([]);
  const [step, setStep] = useState('');
  const [refresh, setRefresh] = useState(false);
  // ============================================================================
  const deleteStep = (index) => {
    let temp=steps;
    temp.splice(index,1);
    setSteps(temp)
    setRefresh(!refresh);
  }

  return (
    <Block safeScroll flex={1}>
      <Block flex={1} margin={sizes.sm}>
        <Text h5>Process Name</Text>
        <Input onChangeText={(e) => { setProcess_name(e) }} placeholder='Process Name' />
        <Block margin={sizes.sm} style={{ justifyContent: 'center' }}>
          {steps?.map((title, index) => {
            return (
              <Block card row marginTop={10} key={index}>
                <Block flex={1}>
                  <Text h5>{title.name}</Text>
                </Block>
                <Block flex={0}>
                  <TouchableOpacity onPress={() => { deleteStep(index) }}>
                    <AntDesign name="delete" size={24} color="red" />
                  </TouchableOpacity>
                </Block>
              </Block>
            )
          })}
        </Block>
        <Block>
          <Input onChangeText={(e) => { setStep(e) }} primary placeholder="Step Name" />
          <Block margin={sizes.sm} row style={{ justifyContent: 'center' }}>
            <Button
              flex={1}
              gradient={gradients.info}
              margin={sizes.base}

              onPress={() => {
                if (step !== '') {
                  let newStep = {
                    name: step,
                    time: 0,
                    lastUpdate: 0,
                    active: false
                  }
                  setSteps(item => [...item, newStep]);
                } else {
                  alert("Please Step Name")
                }

              }}>
              <Text white bold transform="uppercase">
                Add Step
              </Text>
            </Button>
            <Button
              flex={1}
              gradient={gradients.info}
              margin={sizes.base}
              onPress={() => {
                if (process_name !== '' || steps.length !== 0) {
                  let newItem = {
                    processName: process_name,
                    batch: [],
                    steps
                  }
                  setData(temp => [...temp, newItem])
                  navigation.push("Dashboard")
                } else {
                  alert("Please Enter Details")
                }

              }}>
              <Text white bold transform="uppercase">
                Save
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>
    </Block >
  );
}