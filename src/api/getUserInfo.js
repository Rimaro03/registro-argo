const axios = require("axios").default;
const config = require("../config.json")

const getUserInfo = async(token) => {
    const dataOggi = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    const options = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers': 'x-cod-min, x-user-id, x-pwd, x-key-app',
            'Content-Type': 'application/json; charset=UTF-8',
            'x-key-app': 'ax6542sdru3217t4eesd9',
            'x-version': '2.1.0',
            'x-produttore-software': 'ARGO Software s.r.l. - Ragusa',
            'x-app-code': 'APF',
            'x-cod-min': 'SG26685',
            'x-auth-token': token
        }
    }

    try {
        let userinfo = await axios.get(`${config.argoBasicURL}/schede`, options)
            .then(res => res.data[0].alunno);
        return userinfo;
    }
    catch (err) {
        return false;
    }
}

export default getUserInfo;