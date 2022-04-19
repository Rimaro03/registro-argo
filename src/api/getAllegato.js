const axios = require("axios").default;
const config = require("../config.json")

const getAllegato = async (token, prgMessaggio, prgAllegato) => {
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
        },
    }

    const json = JSON.stringify({
        prgMessaggio: prgMessaggio,
        prgAllegato: prgAllegato,
    })

    try {
        let allegato = await axios.post(`${config.argoBasicURL}/messaggiobachecanuova`, json, options)
            .then(res => res.data);
        return allegato;
    }
    catch (err) {
        return err;
    }
}

export default getAllegato;