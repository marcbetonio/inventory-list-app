import './App.css';
import { useRef, useEffect, useState } from 'react';

function App() {

  //const todoFromLocalStorage = JSON.parse(localStorage.getItem('item') || [])

  const[items, setItems] = useState([])
  const[newItem, setNewItem] = useState()
  const[newQuantity, setNewQuantity] = useState()
  const[currentIndex, setCurrentIndex] = useState(-1)

  //Refs

  let itemName = useRef();
  let itemQuantity = useRef();

  //useEffect(() => {
  //  localStorage.setItem("item", JSON.stringify(items))
  //}, [items])

  useEffect(() => {
    itemName.current.focus();
  }, [])

  function handleItemChange(event){
    setNewItem(event.target.value)
  }

  function handleQuantityChange(event){
    setNewQuantity(event.target.value)
  }

  function handleSubmit(event){
    event.preventDefault();
    if(currentIndex >= 0){
      const updateItem=[...items]
      updateItem[currentIndex] = { item: newItem, quantity: newQuantity }
      setItems(updateItem)
      setCurrentIndex(-1)
    }else{if(itemName.current.value === "" || itemQuantity.current.value === ""){
      window.alert("Add item name and quantity")
    }else{
      setItems([...items, {item: newItem, quantity: newQuantity}])
    }
  }  
    setNewItem("")
    setNewQuantity("")
  }

  function handleDelete(index){
    window.confirm("Do you want to delete?") &&
    setItems(items.filter((item, i) => i !== index))
  }

  function handleEdit(index){
    setCurrentIndex(index)
    const{item, quantity} = items[index]
    setNewItem(item)
    setNewQuantity(quantity)
  }

  return (
    <div className="container">
      <h1>Inventory List</h1>
      <form style={{justifyContent:'center'}} onSubmit={handleSubmit}>
        <div>
          <input placeholder='Item Name' 
          style={{border: '1px solid #7633fg'}} 
          ref={itemName}
          value={newItem}
          onChange={handleItemChange} />

          <input placeholder='Item Quantity' 
          style={{border: '1px solid #7633fg'}} 
          ref={itemQuantity}
          value={newQuantity}
          onChange={handleQuantityChange} />

            <button placeholder='Save' type='Submit'>
              {currentIndex >= 0 ? "Save" : "Add"}
            </button>
        </div>
      </form>

      <ul style={{width:420}}>

        {items.map((item, index) => (
          <li key={index} 

          style={{borderBottom: '1px solid #333'}}>
              {item.item} ({item.quantity})
              <div>

                <button placeholder='Edit'
                onClick={() => handleEdit(index)}>Edit</button>

                <button placeholder='Delete'
                onClick={() => handleDelete(index)}>Delete</button>
                
              </div>
              
          </li>))}
      </ul>

    </div>
  );
}

export default App;
