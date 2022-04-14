const axios = require("axios").default;
const config = require("../config.json")

const getScrutinio = async (token) => {
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
        let scrutinioGrezzo = await axios.get(`${config.argoBasicURL}/votiscrutinio`, options)
            .then(res => res.data);
        let scrutinio = []
        let id = 0;
        scrutinioGrezzo.forEach(scrutinioArray => {
            scrutinio.push({ id: id, Materia: scrutinioArray.desMateria, Voto: scrutinioArray.votoOrale.codVoto, Assenze: scrutinioArray.assenze })
            id++;
        })
        return scrutinio;
    }
    catch (err) {
        return false;
    }
}

export default getScrutinio;