
import axios from 'axios';

export default async function axiosGet() {

    var data = new FormData();
    data.append('firstName', ' Lp ');

    await axios.get('http://34.213.106.173/explorer/#!/user/user_userSignUp', data)
        .then(function (response) {
            console.log(response);
            console.log(response.status);
            console.log(response.data.firstName);

        })
        .catch(function (error) {
            console.log(error);
        });
}