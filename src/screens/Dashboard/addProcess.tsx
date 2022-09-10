import React, { useState, useEffect } from 'react';
import { View, ImageBackground, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback, FlatList } from 'react-native';
import { Block, Button, Input, Image, Switch, Modal, Text } from '../../components/';
import { useTheme, useData } from '../../hooks/';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { ScrollView } from 'react-native-gesture-handler';

export default function Home() {
  const { translations } = useData();
  const [process, setProcess] = useState('01');
  const [showModal, setModal] = useState(false);
  const { assets, colors, gradients, sizes, icons, } = useTheme();
  return (
    <Block safeScroll flex={1}>
      <Block flex={1} margin={sizes.sm}>
        <Text h5>Process Name</Text>
        <Input placeholder='Process Name' />
        <Block margin={sizes.sm} style={{ justifyContent: 'center' }}>
          <Text h4>Step's</Text>
          <Input margin={5} placeholder='Step 1' />
          <Input margin={5} placeholder='Step 2' />
          <Input margin={5} placeholder='Step 3' />
        </Block>
        <Block margin={sizes.sm} row style={{ justifyContent: 'center' }}>
          <Button
            flex={1}
            gradient={gradients.info}
            margin={sizes.base}
            
            onPress={() => {
              alert(
                ' <Button flex={1} gradient={gradients.custom6} marginBottom={sizes.base} > <Text white bold transform="uppercase"> title</Text></Button>',
              );
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
              alert(
                ' <Button flex={1} gradient={gradients.custom6} marginBottom={sizes.base} > <Text white bold transform="uppercase"> title</Text></Button>',
              );
            }}>
            <Text white bold transform="uppercase">
              Save
            </Text>
          </Button>
        </Block>
      </Block>
    </Block>
  );
}