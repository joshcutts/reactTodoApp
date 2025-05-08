const AddNewTodoBtn = ({ onClick }: {onClick: () => void}) => {  
  return (
    <label htmlFor="new_item" onClick={onClick}>
      <img src="./images/plus.png" alt="Add Todo Item" />
      <h2>Add new to do</h2>
    </label>
  )
}

export default AddNewTodoBtn