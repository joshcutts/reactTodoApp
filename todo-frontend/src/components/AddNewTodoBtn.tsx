const AddNewTodoBtn = ({ handleDisplayModal }: {handleDisplayModal: React.MouseEventHandler<HTMLLabelElement>}) => {
  return (
    <label htmlFor="new_item" onClick={handleDisplayModal}>
      <img src="./images/plus.png" alt="Add Todo Item" />
      <h2>Add new to do</h2>
    </label>
  )
}

export default AddNewTodoBtn