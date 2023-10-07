import { useRef, useEffect, useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState(JSON.parse(window.localStorage.getItem("items")) || []);
  const[currentIndex, setCurrentIndex] = useState(-1)
  
    let itemName = useRef();
    let itemQuantity = useRef();
    
  function handleSubmit(event) {
    event.preventDefault();
    const updateItem = [...items]
    
    if(currentIndex >= 0){
      updateItem[currentIndex] = { item: event.target.itemName.value, quantity: event.target.itemQuantity.value }
      setItems(updateItem)
      setCurrentIndex(-1)
    } else {
      setItems([...updateItem, {item: event.target.itemName.value, quantity: event.target.itemQuantity.value}])
    }  
  }
  
  function handleDelete(index){
    window.confirm("Do you want to delete?") &&
    setItems(items.filter((_, i) => i !== index))
  }

  function handleEdit(index){
    setCurrentIndex(index)
    itemName.current.value = items[index].item
    itemQuantity.current.value = items[index].quantity
  }
  
  useEffect(() => {
    itemName.current.focus();
  }, [])

  useEffect(() => {
    window.localStorage.setItem("items", JSON.stringify(items))
  })

  return (
    <div className="container">
      <h1>Inventory List</h1>
      <form style={{justifyContent:'center'}} onSubmit={handleSubmit}>
          <input placeholder='Item Name' 
          style={{border: '1px solid #7633fg'}} 
          ref={itemName}
           required name="itemName" />
          <input placeholder='Item Quantity' 
          style={{border: '1px solid #7633fg'}} 
          ref={itemQuantity}
          required name="itemQuantity" />
          <button placeholder='Save' type='Submit'>
            {currentIndex >= 0 ? "Save" : "Add"}
          </button>
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
