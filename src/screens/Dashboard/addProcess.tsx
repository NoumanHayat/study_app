import React, { useState, useEffect } from 'react';
import { View, ImageBackground, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback, FlatList } from 'react-native';
import { Block, Button, Input, Image, Switch, Modal, Text } from '../../components/';
import { useTheme, useData } from '../../hooks/';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
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
  // ============================================================================

  return (
    <Block safeScroll flex={1}>
      <Block flex={1} margin={sizes.sm}>
        <Text h5>Process Name</Text>
        <Input onChangeText={(e) => { setProcess_name(e) }} placeholder='Process Name' />
        <Block margin={sizes.sm} style={{ justifyContent: 'center' }}>
          {steps?.map((title, index) => {

            return (
              <Block card marginTop={10} key={index}>
                <Text h5>{title.name}</Text>
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
                let newStep={
                  name:step,
                  time:0,
			            lastUpdate:0,
                  active:false
                }
                setSteps(item=>[...item,newStep]);
                
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
                let newItem={
                  processName:process_name,
                  batch:[],
                  steps
                }
                setData(temp => [...temp, newItem])
                navigation.push("Dashboard")
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