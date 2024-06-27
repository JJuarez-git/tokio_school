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
    <a href="#almacenaje">Almacenaje</a>
  </li>
  <li>
    <a href="#verificación">Verificación</a>
  </li>
</ul>


## Emisión


    DID Document

    {
        "@context": [
            "https://www.w3.org/ns/did/v1",
            "https://w3id.org/security/suites/ed25519-2020/v1"
        ],
        "id": "did:example:123456789abcdefghi",
        "authentication": [
            {
                "id": "did:example:123456789abcdefghi#keys-1",
                "type": "Ed25519VerificationKey2020",
                "controller": "did:example:123456789abcdefghi",
                "publicKeyMultibase": "zH3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
            }
        ]
    }

## Almacenaje

## Verificación
