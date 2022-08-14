//Variables
/*Si vemos nuestro index podemos ver un div con un id llamado gasto, 
y un ul dentro, ahí vamos a ir insertando los gastos y también tenemos
el formulario que se llama agregar gasto, esas serán mis variables.*/
const formulario = document.querySelector('#agregar-gasto');//1.0
const gastoListado = document.querySelector('#gastos ul');//1.
/*const btnBorrar = document.querySelector(''); ya me estaba equivocando, este boton no existe si es que no
creamos antes dicho elemento... por lo que debería de colocarlo amm en dicho elemento yo creo, al hacer click pues pasa tal cosa
a menos que lo pueda seleccionar poniéndole una clase que use dicho boton por ejemplo.(eliminar por id), si click en btn entonces eliminalo
no, creo que lo tendría que seleccionar por su id, pero no recuerdo como hacerlo*/

//eventos
eventListeners();//1.0
function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);//1.2
    /*ese prompt que es un input va a tener una función que preguntará el presupuesto.*/
    formulario.addEventListener('submit', agregarGasto);//4.0
    /*El submit se ejecuta al momento de dar click en un boton
    de tipo submit, */

}
//clases
/*Un problema grande es que al tener un proyecto o problema, muchas personas 
tienden a irse al código cómo locos a programar y no se detienen ni un momento a ver que 
clases tienen que crear, ni cuantas clases tienen que crear, o qué funciones tienes que hacer, por
ello siempre es bueno detenerse un momento a observar y pensar en cómo va a quedar la aplicación, 
para que visualicemos cuántas clases o qué funciones tendríamos que tener.

De momento veremos las clases.*/
/*Así que ya viendo funcionando el programa, se nos ocurre dos clases, una de presupuesto y una de la
interfaz de usuario, no vamos a tener amm una clase para borrar un gasto, podríamos
poner todas las funciones de borrar o agregar HTML dentro de la misma clase.*/
class Presupuesto { //2.0
    /*Ahora, viendo nuevamente como funciona, pues debe de tener un presupuesto y también debe
    de tener el restante.*/
    constructor(presupuesto) {//2.2
        this.presupuesto = Number(presupuesto);//2.3
    /*Aquí nuevamente le colocamos Number, esto para 
    convertirlo de un string a un número, ya que no sabemos si el usuario nos colocará algo que no
    sea un número*/
        this.restante = Number(presupuesto);//2.6
        /*Ahora, algo más que yo le podría agregar a presupuesto, son
        los gastos, los gastos que yo vaya registrando en el formulario los puedo ir agregando como parte del
        presupuesto(O sea que es algo que pertenece ahí.) */
        this.gastos = [];//2.7
        /*Lo colocamos como un arreglo vacío por el momento, se irá llenando mientras 
        el usuario vaya metiendo dos datos, el nombre del gasto y la cantidad.
        Para ello pondremos objetos con las propiedades, yo imagino*/
    }
    nuevoGasto(gasto){//5.9
        /*Aquí ya tenemos el nuevo gasto, tenemos que pasarle el nuevo gasto y 
    pues tenemos que copiar al arreglo gasto como está, vacío.*/
        this.gastos = [...this.gastos, gasto]; //6.1
        /*Aquí ya le estamos añadiendo el nuevo gasto a gasto(esa es la referencia 
            que haces a los atributos en el mismo objeto, utilizando this.)
            Usamos el spread operator, tomamos una copia del constructor de this.gastos y le pasamos el nuevo
            gasto.
        console.log(this.gastos);Con esto nosotros ya estamos creando un arreglo dinámico(o sea que 
            cuando nosotros presionamos un boton se van agregandog nuevos arreglos con la información que nosotros
            le pasemos)*/
            this.calcularRestante();
        }
    calcularRestante(){//8.1
    /*A este método lo voy a mandar llamar una vez que agregue un nuevo gasto(para que descuente allí)
    Accedemos a el con this y punto, ya que estamos en la misma clase es cono mandarla llamar de otra manera*/
        /*Ahora, ¿Cómo podemos obtener el restante, bueno, una buena forma es obtener primero cuánto dinero tenemos gastado*/
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);//8.2
        /*Reduce itera sobre todos los elementos del arreglo y
    va acumulando los valores en un total, el primer parámetro es el valor acumulado(total), 
    el segundo es el objeto actual.
    El total lo vamos a ir calculando con la suma de gasto.cantidad(lo que hemos gastado en varo) y finalmente
    vamos a iniciar en 0.*/

    /*Ahora el restante lo vamos a calcular como el resultado del presupuesto menos lo que hemos gastado*/
    this.restante = this.presupuesto - gastado;//8.3
    /*Pero esté método que a fin de cuentas es una función necesita ser llamado en algún lugar y necesitamos mostrarlo
    en el HTML, o sea que ese restante hay que ponerlo en el span de restante jajaj
    
    NOTA: AL ESTAR EN LA MISMA CLASE DE PRESUPUESTO, PODEMOS MANDARLA LLAMAR EN LAS PARTES DONDE ESTA YA HAYA SIDO
    LLAMADA O ESA ES UNA TEORÍA  MUY MÍA*/
    }   
    eliminarGasto(id){//aqui se le pone un parámetro de id para saber cual queremos eliminar
        this.gastos = this.gastos.filter(gasto => gasto.id !== id);/*Accedemos al arreglo, filtramos el mismo
        arreglo, filtramos sobre cada gasto y vamos a acceder a gasto.id, y vamos a traernos todos excepto el id que queremos 
        eliminar.
    console.log(this.gastos);  De esta manera se van a ir eliminando los gastos del arreglo
    para actualizar el html nos vamos a agregarGastoListado */ 
    }
}
/*Ahora, toca instanciar el presupuesto.
Pero vemos que nuestro constructor requiere de presupuesto, entonces no es un buen lugar 
para instanciar, otra opción sería que a las alturas de ya haber pasado la validación en 
la función de preguntarPresupuesto ya tenemos un presupuesto valido claramente.
EL PROBLEMA ES QUE SI MOVEMOS La instancia 
const presupuesto = new Presupuesto(presupuestoUsuario);
y le pasamos el presupuesto del usuario, si lo va a crear en el constructor, pero
el problema es que la variable presupuesto que guarda la instancia del objeto
sólo estaría en la función preguntarPresupuesto, como en local, por lo que no podremos
reutilizarla.
La mejor opción es crear la variable desde afuera y ponerla sin ningún valor
(Seguir viendo después de la validación)*/
let presupuesto;//2.4Instanciar el presupuesto
class UI {//2.1
    /*Ahora nuestra class de UI amm no requerimos que tenga un constructor, ya que serán acciones que
dependerán de lo que haga el usuario, o más bien, dependerán de la clase de presupuesto*/
    insertarPresupuesto(cantidad){//3.0
        /*Extraer los valores, estos valores los colocaremos en los spans, uno se llama presupuesto
        y otro restante.*/
        const {presupuesto, restante } = cantidad; // 3.1   Esto es- destructuring de objetos
        //agregarlos al html, ya hay un espacio(span) en donde los pondremos, no tenemos que crear nada
        document.querySelector('#total').textContent = presupuesto;//3.3
        document.querySelector('#restante').textContent = restante;//3.4
        /*Usualmente se generan variables con un selector, pero también podemos hacerlo de esta manera.*/
    }
    imprimirAlerta(mensaje, tipo){//4.6
        const divmensaje = document.createElement('div');//4.8
        divmensaje.classList.add('text-center', 'alert');//4.9
        //Alert es una clase de boostrap
        /*Después evaluamos si es de tipo error, agrega una clase a esta alerta*/
        if(tipo === 'error'){//5.0
            /*Creo que el tipo ya es algo amm quizás nativo o del framework de css, al no dar lo 
        que se espera activa algo*/
            divmensaje.classList.add('alert-danger');//5.1
        }else {
            divmensaje.classList.add('alert-success');//5.2
        }
        //MENSAJE DE ERROR
        divmensaje.textContent = mensaje; //5.3
        //Insertar en el html
        document.querySelector('.primario').insertBefore(divmensaje, formulario);//5.4
        /*Este primario porque es el primer contenedor de la izquierda donde
    lo quiero colocar.*/
    setTimeout(()=> {//5.5
        divmensaje.remove();/*Para eliminar dicha clase lo puedo hacer con un 
        limite de tiempo*/
    },2000)
    };

    agregarGastoListado(gastos){//6.6
        //MANDAR LLAMAR EL LIMPIADO
        this.limpiarHTML()
        /*console.log(gasto);Este tendrá la referencia de el contructor, sthis.gastos, si vamos
        pasando más gastos se irán pasando cada vez que agreguemos, por lo que si 
        le ponemos un nuevo gasto y un nuevo gasto se irán agregando uno tras de otro
        esto junto con el ui.nombreetodo() y sacar gastos es como un push*/
        /*por lo tanto ya podríamos iterar sobre el con un forEach e ir imprimiendo el HTML.*/
        
        //ITERAR SOBRE LOS GASTOS QUE SE VAYAN AGREGANDO
        /*El array será gastos, ya que ese definimos en el constructor y con ese estamos trabajando*/
        gastos.forEach(gasto => { //6.7
            /*Ahora, para no escribir tanto, como gasto.cantidad, gasto.nombre etc
            pues lo que haremos será utilizar destructuring*/
            const {cantidad, nombreGasto, id} = gasto;//6.8
            //Crear un LI
            const nuevoGasto = document.createElement('li');//6.9
            nuevoGasto.className = 'list-group-item d-flex justify-content between align-items-center';//7.0
            /*agregarle el id a nuestro elemento*/
            nuevoGasto.dataset.id = id;//7.1
            /*se va al objeto gasto, toma el id y lo pasa a gasto, que es la posición 
            que estamos iterando, o sea cada uno que yo agregue se le agregará esto*/ 
            //AGREGAR EL HTML DEL GASTO
            nuevoGasto.innerHTML = `${nombreGasto} <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>`;//7.2

            //BOTON PARA BORRAR EL GASTO
            const btnBorrar = document.createElement('button');/*7.3  ¿Como seleccionar un elemento que yo mismo cree como lo es un boton de borrar que se
            agrega de manera dinámica?, así jeje*/
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');//7.4
            btnBorrar.innerHTML = 'Borrar &times';//7.5
            /*Estas son entidades html que las
            tomaría como texto si le ponemos text content*/

            btnBorrar.onclick = () => {
                eliminarGasto(id);/*Como tenemos el id arriba en el destructuring pues le pasamos el id
                ESTA ES LA FORMA EN LA QUE LE PASARÍAMOS UN PARÁMETRO*/
                
            }
            nuevoGasto.appendChild(btnBorrar);//7.6
            //AGREGAR AL HTML
            gastoListado.appendChild(nuevoGasto);//7.7
            //quiero que si presiona btn borrar, se borre el elemento del html, creo tengo que agregar un nuevo método en esta clase

        });
    }
    //LIMPIAR HTML
    limpiarHTML(){//7.8
        while (gastoListado.firstChild) {//Si gasto listado tiene algo //7.9
            gastoListado.removeChild(gastoListado.firstChild);//8.0
            /*A este método lo puedo mandar llamar desde el 
            otro para que ejecute su función con this.limpiarHTML();*/
        }
    }
    actualizarRestante(restante){//8.6
        document.querySelector('#restante').textContent = restante;//8.7
    }
    //Por cada nueva funcionalidad es un nuevo método(entre funciones y métodos se comunican por destructuring
    comprobarPresupuesto(presupuestoOBJETO){
        //Extraer los valores que necesitaremos del objeto...
        const {presupuesto, restante} = presupuestoOBJETO;
        const restanteDiv = document.querySelector('.restante');
        //Comprobar 25%
        if((presupuesto / 4 ) > restante){//Esto me va a sacar el 75% 
            restanteDiv.classList.remove('alert-success');//Esta clase es la que le da los colores
        /*Restante < presupuesto * .76*/
            restanteDiv.classList.add('alert-danger');
        }else if((presupuesto / 2 ) > restante){
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning');//clase bootstrap amarillo
        }
        /*Si el presupuesto es menor o igual a 0, imprime una alerta.*/
        if (restante <= 0) {
            ui.imprimirAlerta('El presupuesto se ha terminado', 'error');
            formulario.querySelector('button[type="submit"]').disabled = true;;
        }
    }
    
}
const ui = new UI();//2.8
/*Ahora, viendo nuevamente la funcionalidad de la app, podemos ver que abajo en la
función de presupuesto, ya tenemos un presupuesto valido, y si vemos la app finalizada, una vez que yo
defino un presupuesto y es válido, se agrega el HTML a presupuesto y a restante, eso es algo que podríamos
hacer, porque a estas alturas ya tenemos un presupuesto.

Así que ahora veremos cómo pasar el presupuesto hacia la clase de UI, e insertar presupuesto y restante
O sea sería cómo conectar presupuesto, que es una variable de fuera, con nuestra clase de UI, esto
para que en html se nos agregue el presupuesto que hemos asignado.(ir dentro de class UI)
*/
//funciones
function preguntarPresupuesto(){//1.3
    /*const presupuestoUsuario = prompt('¿Cual es tu presupuesto?');*/
    /*Ahora, debo de preguntar si el tipo de texto ingresado es 
    numero, (básiamente una validación.)*/
    /*Esto a fin de cuentas será una validación para poder pasar
    al siguiente nivel.*/
    const presupuestoUsuario = prompt('Coloca un presupuesto');//1.4
 /*Si recargo y no agrego nada sería igual a un string vacío, es
 decir que me está dando nada, por lo tanto tenemos que validar esa
 parte*/     
 //Validación 1.5
    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
/*
1.Si es igual a un string vacío entonces deberemos preguntarle al
usuario de nueva cuenta que coloque un presupuesto valido.*/
window.location.reload();/*De eso se encarga este código, de
recargar la ventana actual, por lo que se volverá a colocar el prompt*/

/*
2.La siguiente validación es si el usuario le da cancelar, 
cuando se le da cancelar me regresa un nullconsole.log(presupuestoUsuario);
Por lo que también debería revisar o validar por si presupuesto usuario
es igual a un null.
window.location.reload(); es dicha solución.*/
/*
3.El siguiente es cuando coloca una letra, yo quiero validar por
dicha letra, también quiero que me convierta mi presupuesto en 
números, de string a numeros, por lo que yo haría amm
un parseInt o parseFloat, pero hay una mejor opción que es Number

Si le colocamos una letra o una palabra por ejemplo ya habiéndolo
convertido en número, me saldrá en consola un NaN, que significa
not a number(no es un número), podríamos verificar por eso.
Pero hay una función interesante que se llama isNaN, esta si no es un número
va a retornar true, si es un número va a retornar false.
*/
/*4.El último es si el presupuesto es negativo, también que nos
recargue la página.*/
}/*Pero ya una vez que pasemos la validación, o sea, ya teniendo un presupuesto
    ya asignado, sería asignarle un valor, y será el valor que el usuario haya colocado
    (en nuestro caso sería el e.target.value) que el usuario haya colocado*/
presupuesto = new Presupuesto(presupuestoUsuario);//2.5
    /*console.log(presupuesto); y aquí ya podemos ver el presupuesto asignado */
    /*Ahora, cuando instanciamos un presupuesto lógicamente el restante será el mismo presupuesto, no hemos 
    definido ningún gasto, la lógica nos dice que todavía tenemos el presupuesto totalmente disponible.
    Por lo que podríamos poner en el constructor
    this.restante = Number(presupuesto);

    Entonces el mismo constructor lo vamos a utilizar en dos propiedades diferentes
    */
    
    /*asignando UI a presupuesto para colocarlo al HTML*/
    ui.insertarPresupuesto(presupuesto);//3.2
    /*Le podríamos haber pasado también únicamente el presupuesto
    del usuario, pero bueh, le estaremos pasando todo el objeto*/
}
/*Ahora nos toca validar el formulario por así decirlo.
Ir a formulario, trabajaremos con esa variable*/

function agregarGasto(e){//4.1
    /*Cuando queremos hacer una validación siempre nos referimos al
formulario, si el evento es submit nos regresará de ese formulario el boton*/
    e.preventDefault();//4.2
    //Leer los datos del formulario
    /*Para leer los datos de un form por un evento submit necesitamos tener los campos seleccionados*/
    const nombreGasto = document.querySelector('#gasto').value;//4.3
    const cantidad = Number(document.querySelector('#cantidad').value);//4.4
    /*El .value es para amm por ejemplo, si yo pongo, comida en el campo del input
    me va a arrojar el valor de lo que puse en mi campo, esto con una sóla línea de 
    código. de otra manera podría hacerlo así
    gasto.value = e.target.value, el number es para convertir un string en número*/

    //Validar que los dos campos no estén vacíos.
    if(nombreGasto === '' || cantidad === ''){//4.5
        /*Obviamente no lo vamos
    a mostrar sólo por consola, por lo que nos tenemos que ir a la clase de UI y 
    generarle otro método
        console.log('Ambos campos son obligatorios');
       GENERAR OTRO MÉTODO EN LA CLASE DE UI 
        */
       ui.imprimirAlerta('Ambos campos son obligatorios', 'error');//4.7
       /*Estos son los
       valores reales que tomará alerta*/
       /*Colocamos un return para que no se ejecute la siguiente línea, es como, si ya tenemos un error, no 
       queremos mostrar dos errores, es muy instuitivo...*/
       return; 
       
    }  else if(cantidad <= 0 || isNaN(cantidad)){//5.6
        /*Si alguien pone un número negativo, o si no ponen un número*/
        ui.imprimirAlerta('Tu presupuesto tiene que estar en números.', 'error');//5.7
        return; 
    }   
    /*Generando un objeto con el gasto(usaremos un object literal)*/
    const gasto = {nombreGasto, cantidad, id: Date.now()};//5.8
    /*Esta sintaxis es lo contrario a un destructuring de objetos,
    mientras que el destructuring extrae con una sintaxis de estas/ const {nombreGasto, cantidad} = gasto
    La otra sintaxis lo une a la variable de gasto, o sea junta el valor de nombre de gasto, y el valor(el contenido)
    de cantidad y los une a una variable.
   
   Ahora, nosotros vamos a querer eliminar valores, por lo que necesitaremos un id, anteriormnete los objetos
   se creaban igualando la propiedad del objeto con el valor creado
   const gasto {
    nombre = nombre;
    cantidad = cantidad;
   };
   pero como js dice pss estos dos son iguales entonces ya sólo se le pone nombre y cantidad, 
   pero como el id no será igual a id, le tenemos que colocar bien el valor de la propiedad.
   id: Date.now(), con ese Date.now(), ya nos pone un identificador único para dichos.

    PARA COMUNICAR ESTE OBJETO CON LA CLASE PRESUPUESTO, TENEMOS QUE AGREGARLE UN MÉTODO A PRESUPUESTO Y LO MÁS
    SEGURO ES QUE TENGAMOS QUE INSTANCIARLO ACÁ.*/

    //añade un nuevo gasto
    presupuesto.nuevoGasto(gasto);//6.0
    /*Recordemos que estamos trabajando con nuestro objeto presupuesto
    entonces mandamos llamar el método nuevoGasto para agregarlo y le pasamos nuestro objeto que
    recién creamos(gasto);*/
   //console.log(gasto);
   /*Con esto ya unimos el valor de nombre gasto a un objeto, ahora 

   lo que tenemso que hacer es con dicho objeto lo tengo que pasar o subir al array que tengo en mi 
   clase u objeto de presupuesto, creo es en la clase.
   Algo así, pero también tendríamos que restarle esto de gasto al presupuesto*/

   /*Y una vez que agregamos un nuevo gasto lo que yo quiero es que se eliminé el contenido de los formularios 
   que se haga como un reset, creo que si había dicha función jajaj y un mnesjae de alerta de correcto*/
   ui.imprimirAlerta('Gasto agregado correctamente');//6.2
   /*No evaluaremos si es de tipo error ni nada de eso ya que
   tenemos una validación arriba y este cae en el else, de correcto, de verde, de bien*/
   
   //IMPRIMIR LOS GASTOS, (HTML), IR HASTA EL FINAL.
/*Presupuesto siempre va a tener la referencia hacia presupuesto restante y gastos(nuestro costructor), por
lo tanto mandaremos llamar a nuestra variable que se encarga de todo lo estético y le crearemos un nuevo método(si, 
    si se puede crear un nuevo método de un objeto desde una función, pero se debe de poner en la clase igual)*/
  //Extrayendo valor del constructor, para sólo sacar uno y no todos
    const { gastos, restante } = presupuesto;//6.5 //DESPUES LE AGREGAMOS EL 8.4(restante)
    ui.agregarGastoListado(gastos);//6.4
   /*Si yo paso de nuevo el objeto me imprimirá todo el objeto, el cuál incluye
   presupuesto, restante y gastos.
   Algo que podemos hacer es aplicar destructuring y sacar los gastos de presupuesto, 
   de esa forma sólo le estaremos pasando los gastos, no todo.
   esto junto con agregar el método vendrían siendo algo así como un push al array,
   básicamente*/
/*Ahora, aquí le estamos pasando del objeto presupuesto, le estamos dando los gastos y abajo el restante, 
pues ahora yo quiero una alerta que indique que si va decreciendo el presupuesto, me ponga el restante en rojo*/

   /*Ahora ya que extraimos también el restante del objeto, vamos a crear un nuevo método(actualizar restante)*/
   ui.actualizarRestante(restante);//De esta forma, ui ya sabe que hay en la otra clase.// 8.5(imprimir el html del restante)
   /*Esta la vamos a poner en ui para que aparezca*/

   //Nueva funcionalidad(una alerta de control de gastos).
   ui.comprobarPresupuesto(presupuesto);/*mando llamar nuevamente a ui, ya que esa instancia se encarga de eso.
   Le estoy pasando el presupuesto porque estamos comprobando lo que hemos gastado, junto al presupuesto para nuestra 
   funcionalidad que a fin de cuentas será una alerta que dependerá de eso.*/
  
   /*COMO REINICIAMOS EL FORMULARIO UNA VEZ AGREGAMOS UN NUEVO GASTO, pues nos colocaríamos después de qué queremos
   que ocurra dicha acción, a formulario le pondríamos un reset*/
    //REINICIA EL FORMULARIO
   formulario.reset();//6.3
   /*Y de esta manera reiniciamos el formulario*/
}
//Función para eliminar elementos del presupuesto(remuve)



/*Una vez que ya pasamos todas las validaciones lo que queremos hacer es agregar ese nuevo gasto
hacia la clase de presupuesto, restar la cantidad(a restante) y listar los gastos en la parte superior
con el array que creamos*/

/*Vamos a continuear trabajando, lo siguiente que quiero hacer es crear un objeto con esta info, comida, gasto y también
le vamos a generar un id(este por si decidimos eliminar dicho gasto).*/

/*Ahora lo que quiero hacer es mostrar los gastos en el HTML(ver en ui.insertarPresupuesto), le pasamos el objeto completo
en lugar de sólo pasarle el presupuesto.*/

/**UNA VEZ que vayamos agregando gastos lo lógico es que vaya restando el restante.
Para esto necesitaremos un nuevo método que a fin de cuentas es una función.
Esta estará en presupuesto claramente ya que de ahí le tenemos que agarrar el restante y le tenemos que descontar
del array de gastos el valor de los gastos().

*/
function eliminarGasto(id){
    console.log(id);/*Con esto ya accedimos al valor
    del id que vamos a presionar, del boton o elemento por así decirlo.
    o sea, de esta manera ya sabemos cuál elemento estamos eliminando
    por medio de presionar un boton(un elemento)*/
    
    /*Mandamos llamar a nuestro objeto de presupuesto con nuestra función, es literalmente
    agregarle la función del amm de la clase por así decirlo(esto se debe de pasar a la clase)*/
    presupuesto.eliminarGasto(id);
    /*Y le pasamos el mismo id*/

    const {gastos} = presupuesto;
    ui.agregarGastoListado(gastos);
    
}





