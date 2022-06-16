/*const loadChart = (datas) => {
    if (matches2) {
      return (
        <RadarChart
          outerRadius={180}
          width={tableWidth}
          height={750}
          data={datas}
          sx={{}}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="Materia" stroke="white" />
          <PolarRadiusAxis angle={54} domain={[0, 10]} display="none" />
          <Radar
            name="Alunno"
            dataKey="Voto"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      );
    }
  };

  const loadCompareSwitch = () => {
    if (scrutini.secondo) {
      return (
        <FormGroup sx={{ alignContent: "flex-end" }}>
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Confronta periodi"
          />
        </FormGroup>
      );
    }
  };*/

/*  const checkLoader = () => {
    if (!checked) {
      return loadChart(chartData);
    } else {
      return secondoScrutinioTable();
    }
  };*/

/*const secondoScrutinioTable = () => {
    return (
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table sx={{ minwidth: 680 }} aria-label="Voti">
          <TableHead>
            <TableRow>
              {colonne.map((colonna, index) => (
                <TableCell key={index} align="left">
                  <strong>{colonna}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {datiScrutinio2.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.materia}
                </TableCell>
                <TableCell align="left">{row.voto}</TableCell>
                <TableCell align="left">{row.assenze}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const loadSecondaRiga = () => {
    if (scrutini.secondo) {
      let datiSecondoScrutinio = [];
      scrutinio2.forEach((voto) => {
        datiSecondoScrutinio.push(
          createData(voto.Materia, voto.Voto, voto.Assenze)
        );
      });
      setDatiScrutinio2(datiSecondoScrutinio);
      return (
        <Box sx={{ pt: 17, display: "flex", flexDirection: "row" }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography variant="h4">Scrutinio Finale</Typography>
            {secondoScrutinioTable()}
          </Box>
        </Box>
      );
    }
  };*/
