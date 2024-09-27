class Plato {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

class Menu {
    constructor() {
        this.platos = [];
    }

    agregarPlato(plato) {
        this.platos.push(plato);
    }
}

class Pedido {
    constructor(mesa) {
        this.mesa = mesa;
        this.platos = [];
    }

    agregarPlato(plato) {
        this.platos.push(plato);
    }

    calcularTotal() {
        let total = 0;
        for (let i = 0; i < this.platos.length; i++) {
            total += this.platos[i].precio;
        }
        return total;
    }
}

class Restaurante {
    constructor(nombre) {
        this.nombre = nombre;
        this.menu = new Menu();
        this.pedidos = [];
    }

    agregarPlato(plato) {
        this.menu.agregarPlato(plato);
    }

    crearPedido(mesa) {
        const pedido = new Pedido(mesa);
        this.pedidos.push(pedido);
        return pedido;
    }

    agregarPlatoAPedido(mesa, platoNombre) {
        const pedido = this.pedidos.find(p => p.mesa === mesa);
        const plato = this.menu.platos.find(p => p.nombre === platoNombre);
        if (pedido && plato) {
            pedido.agregarPlato(plato);
        } else {
            alert('Pedido o plato no encontrado');
        }
    }

    mostrarTotalPedido(mesa) {
        const pedido = this.pedidos.find(p => p.mesa === mesa);
        if (pedido) {
            return pedido.calcularTotal();
        } else {
            alert('Pedido no encontrado');
            return 0;
        }
    }
}

// Instancia del restaurante
const restaurante = new Restaurante('El Buen Sabor');

// Agregar un plato al menú
document.getElementById('agregarPlato').addEventListener('click', () => {
    const nombre = document.getElementById('nombrePlato').value;
    const precio = parseFloat(document.getElementById('precioPlato').value); // Cambiado a parseFloat para incluir decimales

    if (!nombre || isNaN(precio)) {
        alert('Por favor, ingresa un nombre válido y un precio numérico para el plato.');
        return;
    }

    const plato = new Plato(nombre, precio);
    restaurante.agregarPlato(plato);
    console.log('Plato agregado:', plato); // Mensaje de depuración
    document.getElementById('nombrePlato').value = '';
    document.getElementById('precioPlato').value = '';
});

// Crear un pedido
document.getElementById('crearPedido').addEventListener('click', () => {
    const mesa = parseInt(document.getElementById('numeroMesa').value);
    
    if (isNaN(mesa)) {
        alert('Por favor, ingresa un número de mesa válido.');
        return;
    }

    const pedido = restaurante.crearPedido(mesa);
    console.log('Pedido creado:', pedido); // Mensaje de depuración
    alert(`Pedido creado para la mesa ${mesa}.`);
    document.getElementById('numeroMesa').value = ''; // Limpiar el campo de mesa
});

// Agregar un plato a un pedido
document.getElementById('agregarPedido').addEventListener('click', () => {
    const mesa = parseInt(document.getElementById('numeroMesaPedido').value);
    const platoNombre = document.getElementById('platoPedido').value;

    if (isNaN(mesa) || !platoNombre) {
        alert('Por favor, ingresa un número de mesa y un nombre de plato válido.');
        return;
    }

    console.log('Intentando agregar plato:', platoNombre, 'a la mesa:', mesa); // Mensaje de depuración
    restaurante.agregarPlatoAPedido(mesa, platoNombre);
    document.getElementById('platoPedido').value = '';
    document.getElementById('numeroMesaPedido').value = '';
});

// Mostrar el total de un pedido
document.getElementById('mostrarTotal').addEventListener('click', () => {
    const mesa = parseInt(document.getElementById('numeroMesaTotal').value); // Cambiado para usar el ID correcto

    if (isNaN(mesa)) {
        alert('Por favor, ingresa un número de mesa válido.');
        return;
    }

    const total = restaurante.mostrarTotalPedido(mesa);
    document.getElementById('detalles').innerText = "Total para la mesa " + mesa + ": $" + total;
});
