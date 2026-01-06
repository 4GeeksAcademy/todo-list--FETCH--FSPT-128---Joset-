import React, { useState, useEffect } from "react";

const Home = () => {
    const [producto, setProducto] = useState("");
    const [listaCompra, setListaCompra] = useState([]);

  const USERNAME = "JosetSinPh";

// GET lista completa
const cargarLista = async () => {
    const resp = await fetch(`https://playground.4geeks.com/todo/users/${USERNAME}`);
    const data = await resp.json();
    console.log("Lista:", data);
    setListaCompra(data.todos || []);
};

// POST nueva tarea
const crearItem = (label) => {
    const task = { label: label.trim(), is_done: false };
    fetch(`https://playground.4geeks.com/todo/todos/${USERNAME}`, { // ← /todos/
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" }
    })
    .then(resp => resp.json())
    .then(data => {
        console.log("POST OK:", data);
        cargarLista();
    })
    .catch(error => console.error("POST error:", error));
};

// DELETE tarea por ID
const borrarItemServidor = (id) => {
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE"
    })
    .then(() => cargarLista())
    .catch(console.error);
};


    useEffect(() => {
        cargarLista();
    }, []);

    const actualizarInput = (e) => {
        setProducto(e.target.value);
    };

    const agregarItem = () => {
        if (!producto.trim()) return;
        console.log("Has agregado:", producto);
        crearItem(producto);
        setProducto("");
    };

    const eliminarItem = (index) => {
        const item = listaCompra[index];
        if (item?.id) {
            borrarItemServidor(item.id);
        }
    };

    return (
        <div className="container">
            <h2>Lista de la compra</h2>
            <div className="container_input">
                <input
                    type="text"
                    value={producto}
                    onChange={actualizarInput}
                    onKeyDown={(e) => e.key === "Enter" && agregarItem()} 
                    placeholder="¿Qué te falta?..."
                />
                <button className='btn-add' onClick={agregarItem}>Agregar</button>
            </div>
            <ul>
                {
                    listaCompra.length > 0 ? listaCompra.map((item, index) => {
                        return (
                            <li key={item.id || index}>
                                {item.label}
                                <button 
                                    className='btn-delete'
                                    onClick={() => eliminarItem(index)}
                                >
                                    X
                                </button>
                            </li>
                        );
                    })
                    : 
                    <p>No hay items</p>
                }
            </ul>
        </div>
    );
};

export default Home;
