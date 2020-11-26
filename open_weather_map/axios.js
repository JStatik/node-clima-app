const axios = require( 'axios' );
const api_id = process.env.API_ID;

const getClima = ( ciudad ) => {
    return new Promise( ( resolve, reject ) => {
        if( !ciudad ) return reject( 'Ingrese una ciudad válida' );

        axios.get( `https://api.openweathermap.org/data/2.5/weather?q=${ encodeURI( ciudad ) }&appid=${ api_id }&units=metric&lang=es` )
            .then( res => {
                const { data } = res;
                const { name, sys, coord, weather, main } = data;

                const dataCiudad = {
                    ciudad: name,
                    pais: sys.country,
                    lat: coord.lat,
                    lng: coord.lon,
                    clima: {
                        descripcion: weather[ 0 ].description.replace( /^\w/, ( letra ) => letra.toUpperCase() ),
                        temperatura: `${ main.temp } ºC`,
                        sensacion_termica: `${ main.feels_like } ºC`,
                        temperatura_max: `${ main.temp_max} ºC`,
                        temperatura_min: `${ main.temp_min } ºC`,
                        humedad: `${ main.humidity } %`,
                    }
                };

                return resolve( dataCiudad );
            } )
            .catch( err => {
                const { status } = err.response;

                if( status === 404 || status === 400 || status === 500 ) return reject( 'Ciudad no encontrada' );
            } );
    } );
};

module.exports = {
    getClima
}
