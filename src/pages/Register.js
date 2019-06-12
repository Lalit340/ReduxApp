
import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import styles from '../styles/Register.less';
import { USER_EMAIL, USER_FIRSTNAME, USER_LASTNAME, USER_PASSWORD1, USER_PASSWORD2, DATE_OF_BIRTH, MOBILE_NUMBER, REGISTRATION_START } from '../constants/ActionTypes';
import { connect } from 'react-redux';
import Snackbar from "react-native-snackbar";
import { put } from "redux-saga/effects";

//import register from '../config/Implementation';
//import saveData from '../config/AsyncStorage';

const mapStateToProps = state => ({ ...state.RegisterReducer });
const mapDispatchToProps = dispatch => ({
    onChangeFNAME: value =>
        dispatch({ type: USER_FIRSTNAME, key: 'fName', value }),
    onChangeLNAME: value =>
        dispatch({ type: USER_LASTNAME, key: 'lName', value }),
    onChangeNumber: value =>
        dispatch({ type: MOBILE_NUMBER, key: 'phNo', value }),
    onChangeDOB: value =>
        dispatch({ type: DATE_OF_BIRTH, key: 'dob', value }),
    onChangeEMAIL: value =>
        dispatch({ type: USER_EMAIL, key: 'uMail', value }),
    onChangePASSWORD1: value =>
        dispatch({ type: USER_PASSWORD1, key: 'uPwd1', value }),
    onChangePASSWORD2: value =>
        dispatch({ type: USER_PASSWORD2, key: 'uPwd2', value }),
    onSubmit: data =>
        dispatch({ type: REGISTRATION_START, payload: data = data }),
    // closeError: () =>
    //     dispatch({ type: CLOSE_TOAST })
    // onUnload: () =>
    //     dispatch({ type: LOGIN_PAGE_UNLOADED })
});


class SingupPage extends Component {

    constructor(props) {
        super(props);
    }


    static navigationOptions = { header: null };

    signin() {
        this.props.navigation.navigate('Login');
    }

    validation() {
        var user = '', pwd = '', pwd1 = '', fName = '', lName = '', mobNo = '', dob = '', phoneNo, pattern, mailValid;
        //asigning values to  variable
        user = this.props.uMail;
        pwd = this.props.uPwd1;
        pwd1 = this.props.uPwd2;
        fName = this.props.fName;
        lName = this.props.lName;
        dob = this.props.dob;
        mobNo = this.props.phNo;

        mailValid = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        phoneNo = /^\d{10}$/;
        pattern = /^([0-9]{2})-([0-9]{2})-([0-9]{4})$/;

        if (user.trim() === '')
            alert('UserName is needed');
        else if (!mailValid.test(user))
            alert('enter a valid username');
        else if (pwd.trim() === '' && pwd.trim().length < 8)
            alert('password  is needed');
        else if (pwd !== pwd1)
            alert('insert a valid password ')
        else if (fName.trim() === '' || fName.trim().length < 4)
            alert('Enter a proper formed name');
        else if (lName.trim() === '' || lName.trim().length < 2)
            alert('Enter a proper formed LastName');
        else if (mobNo.trim().length < 10 || !phoneNo.test(mobNo))
            alert('Enter a valid Mobile number');
        else if (dob.trim() == '' || !pattern.test(dob))
            alert('Enter DOB Currectly');
        else {
            console.log('validation succeeded');
            return true;
        }
    }

    firstName = (fName) => this.props.onChangeFNAME(fName)
    lastName = (lName) => this.props.onChangeLNAME(lName);
    mobNo = (mobNo) => this.props.onChangeNumber(mobNo)
    doBirth = (dob) => this.props.onChangeDOB(dob);
    user = (user) => this.props.onChangeEMAIL(user);
    password1 = (pwd1) => this.props.onChangePASSWORD1(pwd1);
    password2 = (pwd2) => this.props.onChangePASSWORD2(pwd2);



    getLoggedIn() {
        var check = this.validation();

        if (check) {

            var data = {
                firstName: this.props.fName,
                lastName: this.props.lName,
                phoneNumber: this.props.phNo,
                password: this.props.uPwd1,
                imageUrl: "",
                role: "",
                service: "advance",
                username: this.props.fName,
                email: this.props.uMail,
                emailVerified: true,

            }
            this.props.onSubmit(data);

            // axios.post('http://34.213.106.173/api/user/userSignUp', data, {
            //     headers: {
            //         "Content-Type": 'application/json'
            //     }
            // }).then(response => {
            //     console.log(response);

            // }).catch(error => {
            //     console.log({ error });
            // }
            // );

            // alert('inserted');
        }
    }

    render() {

        var email, pwd1, pwd2, fName, lName, dob, phno;
        email = this.props.uMail;
        pwd1 = this.props.uPwd1;
        pwd2 = this.props.uPwd2;
        fName = this.props.fName;
        lName = this.props.lName;
        dob = this.props.dob;
        phno = this.props.phNo;
        console.log(this.props.success, ': it is props success');
        console.log(this.props.error, ': it is props error');


        if (this.props.success === 200) {
            this.props.navigation.navigate('Login');
            Snackbar.show({
                title: 'Registration Success',
                duration: Snackbar.LENGTH_SHORT,
            })
           // put({ type: REGISTRATION_SUCCESS, payload: '' })

        } else if (this.props.error === 401) {
            Snackbar.show({
                title: 'Registration failed',
                duration: Snackbar.LENGTH_SHORT,
            })
          //  put({ type: REGISTRATION_FAIL, payload: '' })

        } else if (this.props.error === 500) {

            Snackbar.show({
                title: 'Registration failed',
                duration: Snackbar.LENGTH_SHORT,
            })
           // put({ type: REGISTRATION_FAIL, payload: '' })

        }


        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.container1}>
                        <Image
                            style={{ width: 80, height: 70 }}
                            source={require('../Images/f_IMG.jpg')}
                        />
                        <Text style={styles.welcome}>-- Welcome to FundooNotes --</Text>
                        <Text style={styles.welcome1}>Registration page</Text>
                    </View>

                    <TextInput
                        style={styles.textBox}
                        placeholder='enter First Name '
                        placeholderTextColor='#ffff'
                        onChangeText={(firstName) => this.firstName(firstName)}
                        //onSubmitEditing={() => this.pwd1.facus()}
                        value={fName}

                    />

                    <TextInput
                        style={styles.textBox}
                        placeholder='enter Last Name '
                        placeholderTextColor='#ffffff'
                        //ref={(input) => this.pwd1 = input}
                        onChangeText={(lastName) => this.lastName(lastName)}
                        value={lName}

                    />

                    <TextInput
                        style={styles.textBox}
                        placeholder='enter mobile number '
                        placeholderTextColor='#ffffff'
                        onChangeText={(mobNo) => this.mobNo(mobNo)}
                        value={phno}
                    />

                    <TextInput
                        style={styles.textBox}
                        placeholder='enter DOB dd-MM-yyyy '
                        placeholderTextColor='#ffffff'
                        onChangeText={(dob) => this.doBirth(dob)}
                        value={dob}
                    />
                    <TextInput
                        style={styles.textBox}
                        placeholder='enter username '
                        placeholderTextColor='#ffffff'
                        onChangeText={(user) => this.user(user)}
                        value={email}
                    />

                    <TextInput
                        style={styles.textBox}
                        placeholder='enter password '
                        placeholderTextColor='#fff'
                        secureTextEntry={true}
                        onChangeText={(pwd) => this.password1(pwd)}
                        value={pwd1}
                    />

                    <TextInput
                        style={styles.textBox}
                        placeholder='enter password '
                        placeholderTextColor='#fff'
                        secureTextEntry={true}
                        onChangeText={(pwd1) => this.password2(pwd1)}
                        value={pwd2}
                    />

                    <TouchableOpacity style={styles.buttonEdit} onPress={() => this.getLoggedIn()}>
                        <Text style={styles.textEdit}  >Register</Text>
                    </TouchableOpacity>

                    <View style={styles.container2}>

                        <Text style={styles.rowEdit}>Already have account?</Text>

                        <TouchableOpacity onPress={() => this.signin()}>
                            <Text style={styles.textEdit1} > Singin</Text>
                        </TouchableOpacity>

                    </View>

                </View >
            </ScrollView>

        );
    }
}


//export default SingupPage;

export default connect(mapStateToProps, mapDispatchToProps)(SingupPage);


