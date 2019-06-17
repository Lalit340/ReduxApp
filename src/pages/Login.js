
import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    AsyncStorage,
} from 'react-native';

import styles from '../styles/Login.less';
import { connect } from 'react-redux';
import { LOGIN_EMAIL, LOGIN_PASSWORD, LOGIN_USER } from '../constants/ActionTypes';
import axios from "axios";
import Snackbar from "react-native-snackbar";



const mapStateToProps = state => ({ ...state.LoginReducer });
const mapDispatchToProps = dispatch => ({
    onChangeEmail: value =>
        dispatch({ type: LOGIN_EMAIL, key: 'email', value }),
    onChangePassword: value =>
        dispatch({ type: LOGIN_PASSWORD, key: 'password', value }),
    onSubmit: data =>
        dispatch({ type: LOGIN_USER, payload: data = data }),
    // closeError: () =>
    //     dispatch({ type: CLOSE_TOAST })
    // onUnload: () =>
    //     dispatch({ type: LOGIN_PAGE_UNLOADED })
});




class LoginPage extends Component {

    constructor(props) {
        super(props);

    }
    static navigationOptions = { header: null };

    getSignup() {
        this.props.navigation.navigate('Data');
    }
    password() {
        this.props.navigation.navigate('Forgot');
    }

    onEmail = (mail) => this.props.onChangeEmail(mail);
    onPassword = (pwd) => this.props.onChangePassword(pwd);


    signInValidation() {
        var email = '', pwd = '', mailValid;
        email = this.props.email;
        pwd = this.props.password;
        mailValid = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (email.trim() == '')
            alert('enter a valid username');
        else if (!mailValid.test(email))
            alert('enter a valid email');
        else if (pwd.trim() == '')
            alert('Enter  password');
        else if (pwd.trim().length < 8)
            alert('enter a valid password');
        else {
            console.log('validation is good');

            return true;
        }

    }

    loginFb() {

        fbLogin(user => {
            if (user) {
                this.setState({ pic: user.user.photoURL });
                var value = {
                    pic: user.user.photoURL,
                    userName: user.user.displayName,
                }
                AsyncStorage.setItem('FBValue', JSON.stringify(value));

                console.log(" user photo " + this.state.pic + '  ' + value)
                this.props.navigation.navigate('Drawer', { photo: this.state.pic });

            } else {
                alert('Login Not Success');
            }
        });
    }


    async sign() {
        let email, pwd;
        email = this.props.email;
        pwd = this.props.password;
        var validate = this.signInValidation();


        if (validate) {
            //     let data = new FormData();
            let data = {
                username: email,
                password: pwd,
            }
            this.props.onSubmit(data);



            // axios.post('http://34.213.106.173/api/user/login', data, {
            //     headers: {
            //         "Content-Type": 'application/json'
            //     }
            // }).then(response => {
            //     console.log(response);
            //     if (response.status == 200) {
            //         this.props.navigation.navigate('Drawer');
            //     } else {
            //         alert('enter a valid email & password ');
            //     }
            // }).catch(error => {
            //     alert('enter a valid email & password ');
            //     console.log(error);
            // });


        }

    }

    render() {
        const email = this.props.email;
        const pwd = this.props.password;
        let success, error;
        success = this.props.success.status;
        error = this.props.error.status;
        console.log(this.props.success + ': success');

        if (success === 200) {
            this.props.navigation.navigate('Drawer');
            Snackbar.show({
                title: 'Login Success',
                duration: Snackbar.LENGTH_SHORT,
            });

        } else if (error === 401) {
            Snackbar.show({
                title: 'Login Failed Do again',
                duration: Snackbar.LENGTH_SHORT,
            });
        }

        return (
            <View style={styles.container}>
                <View style={styles.container1}>
                    <Image
                        style={{ width: 80, height: 70 }}
                        source={require('../Images/f_IMG.jpg')}
                    />

                    <Text style={styles.welcome}>-- Welcome to FundooNotes --</Text>
                </View>
                <TextInput
                    style={styles.textBox}
                    placeholder='enter userId '
                    placeholderTextColor='#ffffff'
                    keyboardType='email-address'
                    onChangeText={(mail) => this.onEmail(mail)}
                    //  onSubmitEditing={() => this.pwd.focus()}
                    value={email}
                />
                <TextInput
                    style={styles.textBox}
                    placeholder='enter password '
                    placeholderTextColor='#ffffff'
                    secureTextEntry={true}
                    //  ref={(input) => this.pwd = input}
                    onChangeText={(pwd) => this.onPassword(pwd)}
                    value={pwd}
                />

                <View style={{ marginRight: 120 }}>
                    <TouchableOpacity onPress={() => this.password()}>
                        <Text style={styles.textPassword} >Forgotten Password ?</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container2}>
                    <TouchableOpacity style={styles.buttonEdit} onPress={() => this.sign()}>
                        <Text style={styles.textEdit} >Signin</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonEdit} onPress={() => { this.getSignup() }} >
                        <Text style={styles.textEdit} >Signup</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={{ fontSize: 25, color: 'green', marginTop: 50 }}> ---------- OR ---------- </Text>
                </View>

                <View style={styles.fbLogin}>
                    <TouchableOpacity onPress={() => this.loginFb()}>
                        <Image
                            style={{ width: 40, height: 40, marginRight: 15 }}
                            source={require('../Images/FaceBook.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            style={{ width: 37, height: 37 }}
                            source={require('../Images/google.jpg')} />
                    </TouchableOpacity>
                </View>

            </View>


        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

//export default LoginPage;


