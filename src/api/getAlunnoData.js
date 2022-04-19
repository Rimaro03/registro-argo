const axios = require("axios").default;
const config = require("../config.json")

const getAlunnoData = async (token) => {
    const options = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Content-Type': 'application/json; charset=UTF-8',
            'x-key-app': 'ax6542sdru3217t4eesd9',
            'x-version': '2.1.0',
            'x-produttore-software': 'ARGO Software s.r.l. - Ragusa',
            'x-app-code': 'APF',
            'x-cod-min': 'SG26685',
            'x-auth-token': token,
        }
    }

    try {
        let res = await axios.get(`${config.argoBasicURL}/schede`, options).then(res => res.data[0])

        let alunnoData = {
            prgAlunno: res.prgAlunno,
            prgScuola: res.prgScuola,
            prgScheda: res.prgScheda
        }
        return alunnoData;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

export default getAlunnoData;