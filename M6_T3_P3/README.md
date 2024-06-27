# Práctica M6_T3_P3
<p align="justify">
En esta actividad llevaremos a cabo el proceso completo de emisión, almacenaje y verificación de credenciales (Trust Triangle). Como ejemplo, utilizaremos la emisión de un DNI por parte de la policía y su posterior uso para matricularse en un curso.
</p>

<div align="center">
  <img src="./img/triangle.png">
</div>

## Índice
<ul>
  <li>
    <a href="#emisión">Emisión</a>
  </li>
  <li>
    <a href="#verificación">Verificación</a>
  </li>
</ul>


## Emisión
Para que una entidad certificadora pueda emitir una credencial necesitará el DID del usuario. El DID se podrá crear con cualquier aplicación de cartera digital. Podremos ver un ejemplo de DID y su Document en [DID](DID.json).


    did:example:123456789abcdefghi

<p align="justify">
En este caso de expedición de DNI digital, la policía verificaría por método tradicional (DNI Físico) que el usuario es quien dice ser. Una vez verificado emitiría una credencial verificable (VC) y la enviaría a la cartera del usuario. A su vez la policía almacenaría la clave pública para su posterior verificación.  
</p>

El ejemplo de credencial verificable de un DNI lo podemos ver en [VC](VC.json). Se pueden diferenciar tres zonas: 

- **Metadata**
- **Claim**
- **Proof**

*Metadata* tendrá la información pertinente a la credencial, como el tipo, el emisor, fecha de emisión, etc...

    "id": "https://policia.es/credentials/1872",
    "type": [
        "VerifiableCredential",
        "Citizenship"
    ],
    "issuer": "https://policia.es/issuers/565049",
    "issuanceDate": "2024-02-10T19:23:24Z",

*Claim* tendrá la información sobre la que trata la credencial, como el nombre, apellido, fecha nacimiento, etc...

    "credentialSubject": {
        "id": "did:example:123456789abcdefghi",
        "name": "Pepito",
        "surname": "Pérez",
        "dateOfBirth": "1990-01-01",
        "document": "123456789V",
        "expiration": "2029-02-10"
    },

*Proof* en la prueba criptográfica y la firma que verifica que esa credencial es auténtica.

    "proof": {
        "type": "RsaSignature2018",
        "created": "2024-02-10T19:23:24Z",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "https://policia.es/issuers/565049#key-1",
        "jws": "eyJhbGciOiJSUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..TCYt5XsITJX1CxPCT8yAV-TVkIEq_PbChOMqsLfRoPsnsgw5WEuts01mq-pQy7UJiN5mgRxD-WUcX16dUEMGlv50aqzpqh4Qktb3rk-BuQy72IFLOqV0G_zS245-kronKb78cPN25DGlcTwLtjPAYuNzVBAh4vGHSrQyHUdBBPM"
    }

## Verificación
