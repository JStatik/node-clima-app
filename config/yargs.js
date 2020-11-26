const { argv } = require( 'yargs' )
                    .options( {
                        ciudad: {
                            alias: 'c',
                            desc: 'Ciudad de la que se requiere el clima',
                            demand: true
                        }
                    } )
                    .help();

module.exports = argv;
