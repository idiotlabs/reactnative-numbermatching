import React, { Component } from 'react';
import {
  AppRegistry,
  Alert,
  StyleSheet,
  Dimensions,
  View,
  Text,
} from 'react-native';

import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import RNShake from 'react-native-shake';

export default class example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      findNumber: '',
      areaNumber: '',
      numberX: 0,
      numberY: 0,
      numberRotate: 0,
      deviceWidth: Dimensions.get('window').width,
      deviceHeight: Dimensions.get('window').height,
      firstX: 0,
      firstY: 0,
      areaX: 0,
      laterX: 0,
      laterY: 0,
      firstArea: 0,
      firstFlag: true,
      timeoutFlag: true,
    };
  }

  componentWillMount() {
    RNShake.addEventListener('ShakeEvent', () => {
      // this.InitAll();

      Alert.alert(
        '다시 시작',
        '다시 시작하시겠습니까?',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'OK', onPress: () => this.InitAll()},
        ],
        { cancelable: false }
      )
    });
  }

  componentWillUnmount() {
    RNShake.removeEventListener('ShakeEvent');
  }

  _onStrokeStart = (x, y) => {
    if (this.state.firstFlag) {
      this.setState({ firstFlag: false })

      this.setState({ firstX: x })
      this.setState({ firstY: y })

      standardX = this.state.deviceWidth / 2;
      standardY = this.state.deviceHeight / 4;

      areaX = Math.floor(x / standardX);
      areaY = Math.floor(y / standardY);

      console.log(areaX);
      this.setState({ areaX: areaX })

      if (areaX == 0 && areaY == 0) {
        this.setState({ areaNumber: 1 })
      }
      else if (areaX == 0 && areaY == 1) {
        this.setState({ areaNumber: 2 })
      }
      else if (areaX == 0 && areaY == 2) {
        this.setState({ areaNumber: 3 })
      }
      else if (areaX == 0 && areaY == 3) {
        this.setState({ areaNumber: 4 })
      }
      else if (areaX == 1 && areaY == 0) {
        this.setState({ areaNumber: 5 })
      }
      else if (areaX == 1 && areaY == 1) {
        this.setState({ areaNumber: 6 })
      }
      else if (areaX == 1 && areaY == 2) {
        this.setState({ areaNumber: 7 })
      }
      else if (areaX == 1 && areaY == 3) {
        this.setState({ areaNumber: 8 })
      }

      // number position
      margin = 30

      if (areaX == 0) {
        // standardX ~ this.state.deviceWidth
        numberX = Math.floor(standardX + Math.random() * ((this.state.deviceWidth - margin) - standardX));
      }
      else if (areaX == 1) {
        // 0 ~ standardX
        numberX = Math.floor(margin + Math.random() * (standardX - margin));
      }

      numberY = Math.floor(margin + Math.random() * ((this.state.deviceHeight - margin) - margin));

      this.setState({ numberX: numberX })
      this.setState({ numberY: numberY })

      // number rotate
      numberRotate = Math.floor(0 + Math.random() * (360 - 0));

      this.setState({ numberRotate: numberRotate })
    }
  }

  _onStrokeChanged = (x, y) => {
    this.setState({ laterX: x })
    this.setState({ laterY: y })

    if (this.state.timeoutFlag) {
      this.setState({timeoutFlag: false})
      setTimeout( () => {
        if (this.state.areaX == 0) {
          if (this.state.firstX <= this.state.laterX) {
            this.GenerateNumber();
          }
          else {
            this.setState({ findNumber: this.state.areaNumber });
          }
        }
        else if (this.state.areaX == 1) {
          if (this.state.firstX >= this.state.laterX) {
            this.GenerateNumber();
          }
          else {
            this.setState({ findNumber: this.state.areaNumber });
          }
        }

      }, 100)
    }
  }

  GenerateNumber = () => {
    const min = 1;
    const max = 8;
    const rand = Math.floor(min + Math.random() * (max - min));

    this.setState({ findNumber: rand });
  }

  InitAll = () => {
    this.canvas.clear()

    this.setState({
      findNumber: '',
      firstFlag: true,
      timeoutFlag: true,
    });
  }

  render() {
    const numberX = this.state.numberX
    const numberY = this.state.numberY
    const numberRotate = this.state.numberRotate

    const numberStyle = {
      position: 'absolute',
      left: numberX,
      top: numberY,
      color: '#333',
      fontSize: 50,
      fontWeight: 'bold',
      transform: [{ rotate: numberRotate + 'deg'}]
    }

    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <SketchCanvas
            ref={ref => this.canvas = ref}
            style={{ flex: 1 }}
            strokeColor={'white'}
            strokeWidth={30}
            onStrokeStart={this._onStrokeStart}
            onStrokeChanged={this._onStrokeChanged}
          />
          <Text style={numberStyle}>
            {this.state.findNumber}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#333',
  }
});

AppRegistry.registerComponent('example', () => example);
