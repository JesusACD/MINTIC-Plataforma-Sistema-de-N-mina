const pdf = require('html-pdf');

function genpdf(nombre, apellido, cedula, cargo, salario, fecha_string, fecha_contrato){

    const content = `
    <!doctype html>
        <html>
        <head>
                <meta charset="utf-8">
                <title>PDF Result Template</title>
                <style>
                    h4 {
                        color: black;
                        text-align: center;
                    }
                    #contenido {
                        margin-bottom: 100px;
                        margin-left: 100px;
                        margin-right: 100px;
                        justify-content:baseline;
                        text-align: justify;
                        font-size: small;
                    }
                    #pageHeader {
                        margin-left: 100px;
                        font-size:xx-small;
                    }
                    body {
                        margin: 10px;
                        border-color: black;
                        max-width: 800px;
                    }
                </style>
            </head>
            <body>
                <div id="pageHeader" style="border-bottom: 1px solid #ddd; padding-bottom: 5px;">
                    <p>${fecha_string.toUpperCase()}</p>
                </div>
                <h4>CARULLA S.A</h4>
                <br/>
                <h4>CERTIFICA</h4>
                <div id= 'contenido'>
                    <p>Que ${nombre} ${apellido} identificado(a) con cédula de ciudadanía ${cedula}, labora para nosotros desde el ${fecha_contrato} desempeñando el cargo de ${cargo}, con contrato a termino indefinido y devengando un salario mensual de $${salario}.</p>
                    <br/>
                    <br/>
                    <br/>
                    <p>Cordialmente,</p>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <p>JESUS CARRANZA DE LA CRUZ</p>
                    <p>Coordinador de Gestión Humana</p>
                </div>
            
            </body>
        </html>
    `;
    
    pdf.create(content).toFile(`utils/${cedula}.pdf`, function(err, res) {
        if (err){
            console.log(err);
        } else {
            console.log(res);
        }
    });
}

exports.genpdf = genpdf;
