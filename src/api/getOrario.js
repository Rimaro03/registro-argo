const axios = require("axios").default;

const getOrario = async() => {
    try{
        let request = await axios.get(`https://orario.gbfactory.net/js/orario.js`).then(res => res.data)
        return request
    }
    catch(e){
        console.log(`ERRORE DURANTE LA RICHIESTA DELL'ORARIO`);
        return false;
    }
}

export default getOrario