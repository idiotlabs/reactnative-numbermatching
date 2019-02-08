import React, { Component } from 'react';
import {
  Modal,
  View,
  Image,
  Text,
  TouchableHighlight,
  Linking,
  StyleSheet
} from 'react-native';

export default class ManualModal extends Component {
  constructor(props) {
    super(props);
  }

  _onModalClose(visible) {

    this.props.action();
  }

  render() {
    return (
      <View>
        <Modal
        animationType={"slide"}
        transparent={true}
        style={styles.ftreContainer}
        visible={this.props.firstModal}
        onRequestClose={() => {
          alert("Modal has been closed.");
        }}
        >
        <View style={styles.ftreContainer}>
          <View style={styles.ftreTitleContainer}>
            <Text style={styles.ftreTitle}>읽어주세요</Text>
          </View>
          <View style={styles.ftreDescriptionContainer}>
            <Text style={styles.ftreDescription} allowFontScaling={true}>
              어플에 대한 사용방법을 링크로 겁니다.{"\n"}
              설명서를 보시고 사용해보시기 바랍니다.{"\n"}
              {"\n"}
              <Text style={{color: 'blue'}}
                    onPress={() => Linking.openURL('http://13.209.18.181/numbermatching')}>
                http://13.209.18.181/numbermatching{"\n"}
              </Text>
              {"\n"}
              추후 좀 더 편의성 높게{"\n"}
              Tutorial등과 같은 기능을 넣는 것을{"\n"}
              생각해보고 적용하도록 나가겠습니다.{"\n"}
              {"\n"}
              감사합니다.
            </Text>
          </View>
          <View style={styles.ftreExitContainer}>
            <TouchableHighlight
            onPress={() => {
              this._onModalClose(false);
            }}
            >
              <View style={styles.ftreExitButtonContainer}>
                <Text style={styles.ftreExitButtonText}>Exit</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        </Modal>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  ftreContainer:{
    backgroundColor:'#fff',
    flex:1,
    marginTop:70,
    marginBottom:40,
    marginLeft:20,
    marginRight:20,
    borderRadius:20,
    borderWidth:1,
    borderColor:'red'
  },
  ftreTitle:{
    color:'#333',
    fontWeight:'bold',
    fontSize:20,
    textAlign:'center',
    margin:10,
  },
  ftreDescription:{
    color:'#333',
    fontSize:15,
    marginRight:20,
    marginLeft:20,
    lineHeight:30,
  },
  ftreCloseIcon:{
    alignSelf:'flex-end',
    flex:0.5,
    marginRight:10
  },
  ftreTitleContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  ftreDescriptionContainer:{
    flex:6.5
  },
  ftreExitContainer:{
    flex:2,
    justifyContent:'flex-start',
    alignItems:'center',
  },
  ftreExitButtonContainer:{
    width:200,
    height:40,
    backgroundColor:'red',
    borderRadius:10,
    justifyContent:'center',
  },
  ftreExitButtonText:{
    color:'white',
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center'
  }
});
