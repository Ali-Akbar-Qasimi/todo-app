import React from "react"

function App() {

	const [lists,setLists] = React.useState(()=>{
		const savedTodos = localStorage.getItem("list");
		if (savedTodos) {
		  return JSON.parse(savedTodos);
		} else {
		  return [];
		}
	})
	const [input,setInput] = React.useState('')

	console.log()
	
    function handleAdd(){
		
		if (input.trim() !== "") {
			setLists([
				...lists,
				{
					id: lists.length + 1,
					text: input.trim()
				}
			]);
			console.log(lists)
			setInput('')
		}
    }
	
	
	window.addEventListener('keypress',e=>{
		if(e.key === 'Enter'){
			handleAdd()
		}else{
			return
		}
	})
	
	function handleDelete(id){
		const removeItem = lists.filter((item)=>{
			return item.id !== id
		})
		setLists(removeItem)
	}
	
	function handleReset(){
		setLists(lists.splice( 0 , lists.length ))
	}
	
	React.useEffect(() => {
		localStorage.setItem('list',JSON.stringify(lists))
	},[lists])
	
  	return (
    	<>
			<div className='some-sing'>
				<button onClick={handleReset} className='btn'>Reset</button>
				<input autoFocus className='input' value={input} onChange={e=>setInput(e.target.value)} type='text'/>
				<button onClick={handleAdd} className='btn'>Add</button>
			</div>
			<div className='list'>
				{ lists !== null && lists.map(item=>(
					<div className='item' key={item.id}>
						<span>{item.text}</span>
						<button onClick={()=> handleDelete(item.id)} className='delete-btn'>Delete</button>
					</div>
				)) }
			</div>
		</>
	)
}

export default App