const axios = require("axios").default;
const config = require("../config.json")
const options = require("./options.json")

export default apiRequest = async(endpoint) => {
    try{
        let request = await axios.get(`${config.argoBasicURL}/${endpoint}`, options)
        .then((res)=>{
            res.data.dati
        })
        return request
    }
    catch(e){
        console.log(e);
    }
}