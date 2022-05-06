const axios = require("axios").default;

const getOrario = async (classe) => {
  console.log(classe);
  const options = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Content-Type": "application/json; charset=UTF-8",
    },
  };

  try {
    let request = await axios
      .get(`http://orario.gbfactory.net/js/orario.js`, options)
      .then((res) => res.data[classe]);
    return request;
  } catch (e) {
    console.log(`ERRORE DURANTE LA RICHIESTA DELL'ORARIO\n${e}`);
    return false;
  }
};

export default getOrario;
