import React from 'react'
import Items from './Items'

function App() {
	const [numberOfItems,setNumberOfItems] = React.useState(Items.items.length)
	const [list,setList] = React.useState()

	const input = document.querySelector('input')
    function handleAdd(){
		input.focus()
		if(input.value !== ''){
			Items.items.push({id: Items.items.length, text : input.value})
			setNumberOfItems(oldNumberOfItems => oldNumberOfItems + 1)
			input.value = ''
			console.log(Items.items)
		}else{
			return false
		}
    }


	window.addEventListener('keypress',e=>{
		if(e.key === 'Enter'){
			if(input.value !== ''){
				handleAdd()
			}else{
				return false
			}
		}
	})
	
	function handleDelete(e){
		Items.items.splice(e.target.dataset.value,1)
		setNumberOfItems(oldNumberOfItems => oldNumberOfItems - 1)
		if(numberOfItems ===  0){
			Items.items.splice(0, Items.items.length)
		}
		console.log(Items.items)
	}

	function handleReset(){
		Items.items.splice(0, Items.items.length)
		setNumberOfItems(oldNumberOfItems => oldNumberOfItems = 0)
	}
	React.useEffect(() => {
		setList(oldList => oldList = Items.items.map(item=>{
			return(
				<div className='item' key={item.id}>
					<span>{item.text}</span>
					<button onClick={handleDelete} data-value={item.id} className='delete-btn'>Delete</button>
				</div>
			)
		}))
	},[numberOfItems])
	
  	return (
    	<>
			<div className='some-sing'>
				<button onClick={handleReset} className='btn'>Reset</button>
				<input autoFocus className='input' type='text'/>
				<button onClick={handleAdd} className='btn'>Add</button>
			</div>
			<div className='list'>
				{ list }
			</div>
		</>
	)
}

export default App