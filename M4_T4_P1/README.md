## Práctica M4_T4_P1
Para esta práctica de una red social descentralizada he creado un Smart Contract (M4_T4_P1.sol) que contiene lo siguiente:  

El contrato lo he llamado Social Network y tiene dos funciones.

Primero se declara un Struct para crear un tipo de dato, este será **Message** que contendrá las propiedades sender, name y content.  

    struct Message {
        address sender;
        string name;
        string content;
    }

Con el Struct Message crearemos un array donde iremos guardando los mensajes que se vayan creando.

    Message[] messages;

La primera función que tiene el contrato es **writeMessage** esta sirve para crear un mensaje solo si el mensaje tiene una longitud menor o igual a 300 caracteres. Esta función es de escritura y acepta dos parámetros, el primero es el nombre del usuario y el segundo es el mensaje en sí. Además, a la hora de crear el item dentro del array se guarda también la dirección de la persona que conecta al contrato (**msg.sender**).

    function writeMessage(string memory name, string memory mes) public {
        require(
            bytes(mes).length <= 300,
            "Message exceeds maximum length"
        );
        messages.push(Message(msg.sender, name, mes));
    }

La segunda función es **getAllMessages**. Esta función es de lectura y devuelve la variable **messages**.

    function getAllMessages() public view returns (Message[] memory) {
        return messages;
    }

Con este contrato cumpliríamos:
- Una función para escribir un mensaje de una longitud máxima de 300 caracteres.
- Una función para leer todos los mensajes escritos hasta el momento.
- Añadir un mecanismo para identificar a la persona (con su seudónimo) que ha escrito el mensaje.

Para desplegar y usar el contrato nos vamos a la pestaña de **Deploy & run transactions** de Remix. Elegimos el entorno, una billetera con la que pagar el despliegue y el contrato que vamos a desplegar.  

![](./img/deploy.PNG)

Le damos al botón de **Deploy** y esperamos a que se despliegue el contrato.

![](./img/contract_deployed.PNG)

Con el contrato desplegado podremos empezar a interactuar con él. Si nos fijamos tendremos dos botones para interactuar. Corresponden a las dos funciones **writeMessage y getAllMessages**.  

En la parte de writeMessage tenemos que introducir dos parámetros separados por comas. Los ponemos y ejecutamos.
