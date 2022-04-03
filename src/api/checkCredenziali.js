const axios = require("axios").default;
const config = require("../config.json")

const checkCredenziali = async (username, password) => {
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
            'x-user-id': username,
            'x-pwd': password,
        }
    }

    try {
        let token = await axios.get(`${config.argoBasicURL}/login`, options)
            .then(res => res.data.token);
        return token;
    }
    catch (err) {
        return false;
    }

}

export default checkCredenziali;