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

      <Block card margin={10}>
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
      </Block>
      <Block card margin={10}>
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
      </Block>
      <Block card margin={10}>
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
      </Block>
      <Block card margin={10}>
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
      </Block>
      <Block margin={10}>
      <Button
        flex={1}
        gradient={gradients.custom6}
        marginBottom={sizes.base}
        onPress={() => {
          alert(
            ' <Button flex={1} gradient={gradients.custom6} marginBottom={sizes.base} > <Text white bold transform="uppercase"> title</Text></Button>',
          );
        }}>
        <Text white bold transform="uppercase">
          Send Report
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
    </Block>
  );
}