import { useState, useEffect } from 'react';
import Datos from './Datos';


const MiApi = () => {

  const [datos, setDatos] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    consultarDatos();
  }, []);

  const consultarDatos = async () => {
    const url = 'https://www.feriadosapp.com/api/laws.json';
    const respuesta = await fetch(url);
    const {data} = await respuesta.json();

    const feriados = data.map((feriado) => {
      return {
        id: feriado.id,
        content: feriado.content,
      };
    });
    setDatos(feriados);
  };

  return (
    <div>
      <div className="mb-5">
        <label htmlFor="busqueda">Busqueda</label>
        <input 
        id="busqueda"
        type="text"
        placeholder="Buscar Feriado"
        className="form-control"
        value={busqueda}
        onChange={(e) => {
        setBusqueda(e.target.value);
        }}
        />
      </div>

      <div className="col">
        {
          datos.filter((el) => {
            if(busqueda === ''){
              return el;
            } else if (
              el.content
              .toLocaleLowerCase()
              .includes(busqueda.toLocaleLowerCase())
            ){
              return el;
            }
          })
          .map((item) => (
            <Datos key={item.id} item={item} />
          ))
        }
      </div>      
    </div>
  );
};

export default MiApi;