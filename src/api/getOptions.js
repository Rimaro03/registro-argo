const getOptions = (token, alunnoData) => {
  const options = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Content-Type": "application/json; charset=UTF-8",
      "x-key-app": "ax6542sdru3217t4eesd9",
      "x-version": "2.1.0",
      "x-produttore-software": "ARGO Software s.r.l. - Ragusa",
      "x-app-code": "APF",
      "x-cod-min": "SG26685",
      "x-auth-token": token,
      "x-prg-alunno": alunnoData.prgAlunno,
      "x-prg-scheda": alunnoData.prgScheda,
      "x-prg-scuola": alunnoData.prgScuola,
    },
  };
  return options;
};

export default getOptions;
