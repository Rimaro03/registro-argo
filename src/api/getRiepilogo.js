const axios = require("axios").default;
const config = require("../config.json")

const getRiepilogo = async(token) => {
    const current = new Date();
    let day = current.getDate();
    let month = current.getMonth() + 1;
    current.getMonth() + 1 < 10 ? month = `0${month}` : month = month;
    const dataOggi = current.getFullYear() + '-' + month + '-' + day;

    console.log(dataOggi);
    console.log(token);

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
            'x-prg-alunno': 6224,
            'x-prg-scheda': 1,
            'x-prg-scuola': 1,
        }
    }

    try {
        let riepilogo = await axios.get(`${config.argoBasicURL}/oggi?datGiorno=${dataOggi}`, options)
            .then(res => res.data.dati);
        return riepilogo;
    }
    catch (err) {
        return false;
    }
}

export default getRiepilogo;