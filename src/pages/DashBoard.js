
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, AsyncStorage } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
//import { getData, editTrash, editSelect, updatePin, editPhoto, uploadImage, getImage } from '../config/Implementation';
import { Avatar } from "react-native-elements";
import Modal from "react-native-modal";
import ImagePicker from "react-native-image-picker";
import styles from '../styles/DashBoard.less';
import axiosGet from '../UserService/implemetation';
import axios from 'axios';


const options = {
  title: 'Select Profile Pic',
  takePhotoButtonTitle: 'Teke a Photo',
  chooseFromLibraryButtonTitle: 'Take Photo from Gallery',

};


export default class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      click: true,
      note: [],
      pin: false,
      selectItem: false,
      isModal: false,
      photo: '',
      name: '',
      key: '',

    }
  }

  // static navigationOptions ={
  //   header : null,
  // }

  async imagePicker() {
    await ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          photo: response.uri,
        });
        //   editPhoto(this.state.photo, this.state.info, this.state.key);
        //   uploadImage(this.state.photo);
        //   getImage();
      }
    });
  }
  getClick() {
    this.setState({ click: !(this.state.click) });
  }
  getNote() {
    this.props.navigation.navigate('Note');
  }
  createNote() {
    this.props.navigation.navigate('Create');
  }

  componentDidMount() {
    var arr;
    // axiosGet();
    var data = new FormData();
    //data.append('firstName', ' Lp ');

    axios.get('http://34.213.106.173/api/user/getAdminUserList', data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(function (response) {
        console.log(response);
        console.log(response.status);
        console.log(response.data);

        console.log(response.data.data.data[0].firstName);

      })
      .catch(function (error) {
        console.log(error);
      });

  }





  goBack() {
    let info, keys;
    Object.keys(this.state.note).map((note) => {
      keys = note;
      info = this.state.note[keys];
      if (info.select) {
        // editSelect(this.state.selectItem, info, keys);
      }
    });
  }
  getPin() {
    let info, keys, selectList;
    console.warn('pin ' + this.state.pin)
    this.setState({ pin: !(this.state.pin) });
    Object.keys(this.state.note).map((note) => {
      keys = note;
      info = this.state.note[keys];
      selectList = false;
      if (info.select) {
        // updatePin(this.state.pin, info, keys);
        // editSelect(selectList, info, keys);
      }
    });


  }
  handleTrash() {
    let info, keys, trash, selectList;
    console.warn('this.state.note' + this.state.note);

    Object.keys(this.state.note).map((note) => {
      keys = note;
      info = this.state.note[keys];
      trash = true;
      selectList = false;
      if (info.select) {
        //editTrash(trash, info, keys);
        // editSelect(selectList, info, keys);
      }
    });

  }

  setAvatar = () => {
    this.setState({
      isModal: !(this.state.isModal),
    })
  }

  render() {


    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Dimensions.get('window').height;


    return (
      <View style={{ flex: 1 }} >

        <View style={styles.containers1}>
          <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
            <Image
              style={{ width: 30, height: 30, marginHorizontal: 20, marginVertical: 6 }}
              source={require('../Images/menu.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity  >
            <Text style={styles.textEdit} onPress={() => this.getNote()}>Search your Notes</Text>
          </TouchableOpacity>
          {
            this.state.click ?
              (<View>
                <TouchableOpacity onPress={() => this.getClick()}>
                  <Image
                    style={{ width: 30, height: 30, marginLeft: 110, marginVertical: 6 }}
                    source={require('../Images/rectangle.png')}
                  />
                </TouchableOpacity>
              </View>)
              : (<View>
                <TouchableOpacity onPress={() => this.getClick()}>
                  <Image
                    style={{ width: 30, height: 30, marginLeft: 110, marginVertical: 6 }}
                    source={require('../Images/squar.png')}
                  />
                </TouchableOpacity>
              </View>)
          }

          <View>
            <Avatar
              size="small"
              rounded
              source={{
                uri: this.state.photo
              }}
              onPress={() => this.setAvatar()}
              containerStyle={{ marginLeft: 17, marginVertical: 3 }}
            />
          </View>

        </View>

        <View style={{ flex: 1 }}></View>


        <View>
          <Modal
            style={{ marginTop: 500 }}
            isVisible={this.state.isModal}
            deviceHeight={deviceHeight / 1.27}
            deviceWidth={deviceWidth}
            hasBackdrop={true}
            onBackdropPress={() => this.setState({ isModal: false })}
          >

            <View style={{ alignItems: 'center' }}>
              <Avatar
                size='medium'
                rounded
                source={{
                  uri: this.state.photo
                }}
                onPress={() => { this.state.photo }}
              />
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.modalText}> {this.state.name} </Text>
            </View>


            <View style={{ flexDirection: 'row', }}>
              <TouchableOpacity onPress={() => this.imagePicker()}>
                <Text style={styles.buttonText}>Change Pic</Text>
              </TouchableOpacity>
              <Text>                                                       </Text>
              <TouchableOpacity onPress={() => this.setAvatar()}>
                <Text style={styles.buttonText2}>GO Back</Text>
              </TouchableOpacity>
            </View>

          </Modal>
        </View>

      </View>

    );
  }

}
