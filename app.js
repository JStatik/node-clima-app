const dotenv = require( 'dotenv' ).config();
const colors = require( 'colors' );
const argv = require( './config/yargs' );
const { getClima } = require('./open_weather_map/axios');

if( dotenv.error ) {
    return console.log( colors.red( dotenv.error ) );
}

const { ciudad } = argv;

getClima( ciudad )
    .then( res => console.log( colors.yellow( res ) ) )
    .catch( err => console.log( colors.red( err ) ) );
