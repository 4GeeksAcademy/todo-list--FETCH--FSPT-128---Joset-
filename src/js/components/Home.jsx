import React, { useState } from "react";

const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([])

	const handleOnChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleOnClick = () => {
		setTodos([...todos, inputValue])
		setInputValue ("")
	}

	const handleDelete = (index) =>{
		const updateTodos = todos.filter((todos, i) => i !== index )
		setTodos(updateTodos)
	}

	return (
		<div className="container">
			<h2>Lista de la compra</h2>
			<div className="container_input">
				<input
					type="text"
					value={inputValue}
					onChange={handleOnChange}
					 onKeyDown={(e) => e.key === "Enter" && handleOnClick()} 
					placeholder="¿Qué te falta?..."
				/>
				<button className='btn-add' onClick={handleOnClick}>Agregar</button>
			</div>
			<ul>
				{
					todos.length > 0 ? todos.map((todo, index) => {
						return (
							<li key={index} > {todo} 
							<button 
							className='btn-delete'
							onClick={()=> {handleDelete(index)}}>X</button></li>
							
						)
					})
					: 
					<p>No hay items</p>
				}

			</ul>
		</div>
	)
}

export default Home;
