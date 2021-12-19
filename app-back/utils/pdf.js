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



function pagopdf(mes, mes_num, ano, nombre, apellido, cedula, cargo, salario, pagos_extras_mes, descuentos_ley, permisos_NR_mes, total_pago){

    const content = `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>PDF Result Template</title>
    <style>
      table {
        overflow-x: auto;
        margin: 20px 0!important;
        border-top: 2px solid #2a2e30;
        background: #fafafa;
        border-spacing: 0;
        border-right: 1px solid silver;
        border-bottom: 1px solid silver;
        display: list-item;
        padding-left: 5px;
        }
        tbody {
            margin: 20px;
        }

        tr {
            padding: 7px;
            color: #333!important;
            line-height: 22px;
        }
        td {
            padding-right: 10px;
            padding-left: 10px;
            padding-top: 2px;
            padding-bottom: 2px;
        }
        
      #contenido {
        margin-bottom: 100px;
        margin-left: 100px;
        margin-right: 100px;
        justify-content: baseline;
        text-align: justify;
        font-size: medium;
      }
      #pageHeader {
        margin-left: 100px;
        font-size: medium;
      }
      body {
        margin: 10px;
        border-color: black;
        max-width: 800px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div
      id="pageHeader"
    >
      <p>Volante de Pago de Nomina - Carulla S.A </p>
    </div>
    <div id="contenido">
        <table>
            <tbody>
                <tr>
                    <td><strong>Periodo de pago</strong></td>
                    <td><strong>${mes} - ${ano}</strong></td>
                </tr>
            </tbody>
        </table>
      <table>
        <tbody>
            <tr>
              <td><strong>Información Empleado</strong></td>
              <td><strong></strong></td>
            </tr>
            <tr>
              <td>Nombre</td>
              <td>${nombre} ${apellido}</td>
            </tr>
            <tr>
              <td>Cédula</td>
              <td>${cedula}</td>
            </tr>
            <tr>
              <td>Cargo</td>
              <td>${cargo}</td>
            </tr>
          </tbody>
        <tbody>
          <tr>
            <td><strong>Concepto</strong></td>
            <td><strong>Valor</strong></td>
          </tr>
          <tr>
            <td>(+) Salario básico</td>
            <td>$${salario}</td>
          </tr>
          <tr>
            <td>(+) Comisiones</td>
            <td>$${pagos_extras_mes}</td>
          </tr>
          <tr>
            <td>(-) Salud y pensión</td>
            <td>$${descuentos_ley}</td>
          </tr>
          <tr>
            <td>(-) Otros Descuentos</td>
            <td>$${permisos_NR_mes}</td>
          </tr>
          <tr>
            <td><strong>Total devengado&nbsp;</strong></td>
            <td><strong>$${total_pago}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>

    `;
    
    pdf.create(content).toFile(`utils/${cedula}-${mes_num}-${ano}.pdf`, function(err, res) {
        if (err){
            console.log(err);
        } else {
            console.log(res);
        }
    });
}

exports.genpdf = genpdf;
exports.pagopdf = pagopdf;
