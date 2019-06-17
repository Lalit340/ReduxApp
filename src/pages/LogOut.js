import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
//import { logOut, fbLogout } from '../config/Implementation';

import Dialog from "react-native-dialog";
import { LOGOUT_OPEN, LOGOUT_CLOSE } from '../constants/ActionTypes';
import { connect } from "react-redux";


const mapStateToProps = state =>({ click : state.LogoutReducer.click });
const mapDispatchToProps = dispatch => ({
    onLogoutOpen: () =>
        dispatch({ type: LOGOUT_OPEN }),
    onLogoutClose: () =>
        dispatch({ type: LOGOUT_CLOSE }),
    // onChangePassword: value =>
    //     dispatch({ type: LOGIN_PASSWORD, key: 'password', value }),
    // onSubmit: data =>
    //     dispatch({ type: LOGIN_USER, payload: data = data }),
    // closeError: () =>
    //     dispatch({ type: CLOSE_TOAST })
    // onUnload: () =>
    //     dispatch({ type: LOGIN_PAGE_UNLOADED })
});


 class Log extends Component {

    constructor() {
        super();
        // this.state = {
        //     dialog: true,
        // }
    }

    async mainPage() {
        // var user = await AsyncStorage.getItem('data');
        // alert(user);
        // console.log( "user details :"+ user );
        //  logOut();
        //  fbLogout();

        AsyncStorage.clear();

        var info = await AsyncStorage.getItem('data');
        //  alert(info);
        console.log("user details :" + info);

        this.props.navigation.navigate('Login');
    }

    async back() {
        await this.props.onLogoutClose();
        await this.props.navigation.goBack();
        await this.props.onLogoutOpen();
    }

    render() {
        console.log(this.props.click);
        return (

            <Dialog.Container visible={this.props.click}>
                <Dialog.Description>
                    Do you want to logout this account?
                        </Dialog.Description>
                <Dialog.Button label="no" onPress={() => this.back()} />
                <Dialog.Button label="Yes" onPress={() => this.mainPage()} />
            </Dialog.Container>

        );
    }
}

export default connect(mapStateToProps ,mapDispatchToProps )(Log);