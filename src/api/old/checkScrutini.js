const axios = require("axios").default;
const config = require("../../config.json")

const checkScrutini = async (token) => {
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
        let periodiObj = {
            primo: false,
            secondo: false,
        }

        let periodi = await axios.get(`${config.argoBasicURL}/periodiclasse`, options)
            .then(res => res.data.dati);
        
        if(periodi[0].flgVotiVisibili){
            periodiObj.primo = true
        }
        if(periodi[1].flgVotiVisibili){
            periodiObj.secondo = true;
        }

        return periodiObj;
    }
    catch (err) {
        return false;
    }

}

export default checkScrutini;