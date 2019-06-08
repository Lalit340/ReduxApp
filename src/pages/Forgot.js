
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,

} from 'react-native';

//import { forgotPassword } from '../config/Implementation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../styles/Forgot.less';





export default class Forgot extends Component {

    constructor() {
        super();
        this.state = {
            mail: '',

        }

    }

    static navigationOptions = () => ({
        headerStyle: {
            backgroundColor: '#42a5f5'
        },

    });

    forgot() {
        forgotPassword(this.state.mail);
    }

    render() {
        return (
            <View>
                <View>

                    <Text style={styles.header}> Please enter your email to search for your account </Text>
                    <TextInput
                        style={styles.textEdit}
                        placeholder='Enter your email '
                        placeholderTextColor='#3f51b5'
                        underlineColorAndroid='#3f51b5'
                        onChangeText={(mail) => this.setState({ mail })}
                        value={this.state.mail}
                    />

                </View>

                <View style={styles.button}>
                    <TouchableOpacity onPress={() => this.forgot()}>
                        <Text style={styles.buttonText}> Search Account </Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

}

