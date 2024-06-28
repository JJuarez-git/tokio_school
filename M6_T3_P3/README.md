# Práctica M6_T3_P3
<p align="justify">
En esta actividad llevaremos a cabo el proceso completo de emisión, almacenaje y verificación de credenciales (Trust Triangle). Como ejemplo, utilizaremos la emisión de un DNI por parte de la policía y su posterior uso para matricularse en un curso.
</p>

<div align="center">
  <img src="./img/triangle.png" height="350">
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
En este caso de expedición de DNI digital, la policía verificaría por método tradicional (DNI Físico) que el usuario es quien dice ser. Una vez verificado emitiría una credencial verificable (VC) y la enviaría a la cartera del usuario. A su vez la policía almacenaría la clave pública en la blockchain para su posterior verificación.  
</p>

El ejemplo de credencial verificable de un DNI lo podemos ver en [VC](VC.json). Se pueden diferenciar tres zonas: 

- **Metadata**
- **Claim(s)**
- **Proof(s)**

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

*Proof* es la prueba criptográfica y la firma que verifica que esa credencial es auténtica.

    "proof": {
        "type": "RsaSignature2018",
        "created": "2024-02-10T19:23:24Z",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "https://policia.es/issuers/565049#key-1",
        "jws": "eyJhbGciOiJSUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..TCYt5XsITJX1CxPCT8yAV-TVkIEq_PbChOMqsLfRoPsnsgw5WEuts01mq-pQy7UJiN5mgRxD-WUcX16dUEMGlv50aqzpqh4Qktb3rk-BuQy72IFLOqV0G_zS245-kronKb78cPN25DGlcTwLtjPAYuNzVBAh4vGHSrQyHUdBBPM"
    }

## Verificación
Con la credencial verificable ya en la cartera del usuario, este la podrá usar para registrarse en un curso. La entidad académica le pedirá al usuario la credencial para poder identificarse. Antes de que el usuario envíe la VC a la entidad académica, este deberá firmarla con DID y crear una presentación verificable ([VP](VP.json)).

En la presentación verificable podemos diferenciar tres zonas:

- **Metadata**
- **Verifiable Crendential(s)**
- **Proof(s)**

*Metadata* tendrá la información pertinente a la credencial, como el tipo, el emisor, fecha de emisión, etc...

    "type": "VerifiablePresentation"

*Verifiable Crendential* tendrá la credencial que vamos a firmar.

    "verifiableCredential": [
        {
            "@context": [
                "https://www.w3.org/2018/credentials/v1",
                "https://www.w3.org/2018/credentials/examples/v1"
            ],
            "id": "https://policia.es/credentials/1872",
            "type": [
                "VerifiableCredential",
                "Citizenship"
            ],
            "issuer": "https://policia.es/issuers/565049",
            "issuanceDate": "2024-02-10T19:23:24Z",
            "credentialSubject": {
                "id": "did:example:123456789abcdefghi",
                "name": "Pepito",
                "surname": "Pérez",
                "dateOfBirth": "1990-01-01",
                "document": "123456789V",
                "expiration": "2029-02-10"
            },
            "proof": {
                "type": "RsaSignature2018",
                "created": "2024-02-10T19:23:24Z",
                "proofPurpose": "assertionMethod",
                "verificationMethod": "https://policia.es/issuers/565049#key-1",
                "jws": "eyJhbGciOiJSUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..TCYt5XsITJX1CxPCT8yAV-TVkIEq_PbChOMqsLfRoPsnsgw5WEuts01mq-pQy7UJiN5mgRxD-WUcX16dUEMGlv50aqzpqh4Qktb3rk-BuQy72IFLOqV0G_zS245-kronKb78cPN25DGlcTwLtjPAYuNzVBAh4vGHSrQyHUdBBPM"
            }
        }
    ],

*Proof* es la prueba criptográfica y la firma que verifica que esa presentación es auténtica.

    "proof": {
        "type": "RsaSignature2018",
        "created": "2024-02-10T19:30:00Z",
        "proofPurpose": "authentication",
        "verificationMethod": "did:example:123456789abcdefghi#keys-1",
        "challenge": "1f44d55f-f161-4938-a659-f8026467f126",
        "domain": "4jt78h47fh47",
        "jws": "eyJhbGciOiJSUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..kTCYt5XsITJX1CxPCT8yAV-TVIw5WEuts01mq-pQy7UJiN5mgREEMGlv50aqzpqh4Qq_PbChOMqsLfRoPsnsgxD-WUcX16dUOqV0G_zS245-kronKb78cPktb3rk-BuQy72IFLN25DYuNzVBAh4vGHSrQyHUGlcTwLtjPAnKb78"
    }

Con la presentación firmada por el usuario, este podrá enviarla a la entidad académica para que la verifiquen con la clave pública previamente almacenada en la blockchain por la policía. Finalmente con la presentación verificada por la entidad, el usuario podrá acceder al curso.

Todo este proceso se ha llevado de manera descentralizada y con unos tiempos de espera mínimos. A su vez, el usuario podrá reutilizar esa credencial para identificarse en cualquier sitio que acepte este tipo de proceso.
