const axios = require("axios").default;
const config = require("../config.json")
const getOptions = require("./getOptions").default

const apiRequest = async(endpoint) => {
    const options = getOptions((window.localStorage.getItem("token")), JSON.parse(window.localStorage.getItem("alunnoData")))
    console.log(options.headers);
    try{
        console.log(`${config.argoBasicURL}/${endpoint}`);
        let request = await axios.get(`${config.argoBasicURL}/${endpoint}`, options).then(res => res)
        return request
    }
    catch(e){
        console.log(`ERRORE DURANTE LA RICHIESTA ALLE API ARGO\n${e}`);
        return false;
    }
}

export default apiRequest