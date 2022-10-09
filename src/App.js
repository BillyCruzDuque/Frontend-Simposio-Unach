import React, { useState } from 'react';
import { Container, Card, CardContent, makeStyles, Grid } from '@material-ui/core';
import axios from 'axios';

import Swal from 'sweetalert2'

const baseUrl = 'http://localhost:8080/api/alumnos'



function App() {
  // eslint-disable-next-line no-unused-vars
  const [text, setText] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultWebCam, setScanResultWebCam] = useState('');

  const [matricula, setMatricula] = useState('');
  const [nombre, setNombre] = useState('');
  const [licenciatura, setLicenciatura] = useState('');
  const [turno, setTurno] = useState('');
  const [semestre, setSemestre] = useState('');
  const [grupo, setGrupo] = useState('');

  const classes = useStyles();

  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);

      axios.get(baseUrl + '/' + result).then(response => {

        if (response.data.alumno.matricula) {

          setMatricula(response.data.alumno.matricula);
          setNombre(response.data.alumno.nombre);
          setLicenciatura(response.data.alumno.licenciatura);
          setTurno(response.data.alumno.turno);
          setSemestre(response.data.alumno.semestre);
          setGrupo(response.data.alumno.grupo);

          var today = new Date();

          // obtener la fecha y la hora
          var now = today.toLocaleString();
          console.log(now.split(",")[0]);
          console.log(now.split(", ")[1]);

          axios.post('http://localhost:8080/api/asistencias', {
            matricula: response.data.alumno.matricula,
            fecha: now.split(",")[0],
            entrada: now.split(", ")[1]
          }).then(response => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Registro exitoso',
              showConfirmButton: true,
              timer: 2000
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            }).finally(() => {
              window.location.reload();
            }
            )

          }).catch(error => {
            console.log(error)
          })

        }
      }).catch(error => {
        console.log(error)
      }
      )
    }
  }
  return (
    <Container className={classes.conatiner}>
      <Card>
        <h2 className={classes.title}>Simposio</h2>
        <CardContent>
          <Grid container spacing={2}>

            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <h3>QR Escaner</h3>


              <input
                type="text"
                name='search'
                autoComplete='off'

                value={scanResultWebCam}
                onChange={(ev) => handleScanWebCam(ev.target.value)}
                maxLength={7}
                autoFocus
              >

              </input>
              <h3>Matricula: {scanResultWebCam}</h3>

            </Grid>


            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <h2>Datos de Registro</h2>

              <h3>Matricula: {matricula}</h3>
              <h3>Alumno: {nombre}</h3>
              <h3>Licenciatura: {licenciatura}</h3>
              <h3>Turno: {turno}</h3>
              <h3>Semestre: {semestre}</h3>
              <h3>Grupo: {grupo}</h3>


            </Grid>

            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <h2>Datos de Registro</h2>



            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  conatiner: {
    marginTop: 10
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#3f51b5',
    color: '#fff',
    padding: 20
  },
  btn: {
    marginTop: 10,
    marginBottom: 20
  }
}));
export default App;
