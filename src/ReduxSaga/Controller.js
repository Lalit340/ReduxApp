import axios from 'axios';



const auth = {

    login(data) {
        try {
            return axios.post('http://34.213.106.173/api/user/login', data, {
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(response => {
                console.log(response);

                return response;

            })
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    signup(data) {
        try {
            return axios.post('http://34.213.106.173/api/user/userSignUp', data, {
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(response => {
                console.log(response);
                return response;

            })
        } catch (error) {
            console.log({ error });
            return error ;
        }

    }
}

export default auth;