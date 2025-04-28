import { useState } from 'react'
import { FormattedTodo, DateParts, TodoField, ModalProps } from '../types'

const Title = ({ title, onChange }: {title: string, onChange: (name: string, value: string) => void}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange('title', event.target.value)
  }

  return (
    <li>
      <label htmlFor="title">Title</label>
      <input type="text" name="title" id="title" placeholder={"Item Name"} value={title || ""} onChange={handleChange}/>
    </li>
  )
}

const DueDate = ({ date, onChange }: {date: DateParts, onChange: (name: string, value: DateParts) => void}) => {
  const handleChange = (
    dateField: string,
    event: React.ChangeEvent<HTMLSelectElement>, 
  ) => {
    const newDate = {...date, [dateField]: event.target.value}
    onChange('date', newDate)
  }

  return (
    <li>
      <label htmlFor="due">Due Date</label>
      <div className="date">
        <select id="due_day" name="due_day" value={date.day} onChange={(event) => handleChange('day', event)}>
          <option value="">Day</option>
          <option value="01">1</option>
          <option value="02">2</option>
          <option value="03">3</option>
          <option value="04">4</option>
          <option value="05">5</option>
          <option value="06">6</option>
          <option value="07">7</option>
          <option value="08">8</option>
          <option value="09">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
          <option value="31">31</option>
        </select>  /
        <select id="due_month" name="due_month" value={date.month} onChange={(event) => handleChange('month', event)}>
          <option value="">Month</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select> /
        <select id="due_year" name="due_year" value={date.year} onChange={(event) => handleChange('year', event)}>
          <option value="">Year</option>
          <option>2014</option>
          <option>2015</option>
          <option>2016</option>
          <option>2017</option>
          <option>2018</option>
          <option>2019</option>
          <option>2020</option>
          <option>2021</option>
          <option>2022</option>
          <option>2023</option>
          <option>2024</option>
          <option>2025</option>
        </select>
      </div>
    </li>
  )
}

const Description = ({ description, onChange }: {description: string, onChange: (field: string, value: string) => void}) => {
  const handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange('description', event.target.value)
  }

  return (
    <li>
      <label htmlFor="description">Description</label>
      <textarea cols={50} name="description" rows={7} placeholder={description || "Description"} onChange={handleDescription}></textarea>
    </li>
  )
}

const ModalForm = ({ onSubmit, todo, onComplete }) => {
  const [newTodo, setNewTodo] = useState({...todo})
  const date: DateParts = {'year': newTodo.year, 'month': newTodo.month, 'day': newTodo.day}

  const handleChange = (property: TodoField, value: string | DateParts): void => {
    if (property === "date") {
      const dateValue = value as DateParts
      setNewTodo({...newTodo, 'year': dateValue.year, 'month': dateValue.month, 'day': dateValue.day})
    } else {
      setNewTodo({...newTodo, [property]: value})
    }
  }

  const onClick = (event, id) => {
    event.preventDefault()
    onComplete(id)
  }

  return (
    <div className="modal" id="form_modal" style={{top: (window.scrollY + 200) + 'px'}}>
      <form action="" method="post" onSubmit={(event) => onSubmit(event, newTodo)}>
      <fieldset>
        <ul>
          <Title title={newTodo.title} onChange={handleChange}/>
          <DueDate date={date} onChange={handleChange}/>
          <Description description={newTodo.description} onChange={handleChange}/>
          <li>
            <input type="submit" value="Save" />
            <button name="complete" onClick={(e) => onClick(e, newTodo.id)}>Mark As Complete</button>
          </li>
        </ul>
      </fieldset>
    </form>
    </div>
  )
}

const Modal = ({
  displayModal,
  onClose,
  todo,
  handleSubmit,
  onComplete }: ModalProps ) => {
  if (!displayModal) return null

  return (
    <>
      <div className="modal" id="modal_layer" onClick={onClose}></div>
      <div className="modal" id="form_modal" style={{top: (window.scrollY + 200) + 'px'}}>
        <ModalForm onSubmit={handleSubmit} todo={todo} onComplete={onComplete}/>      
      </div>
    </>
  )
}

export default Modal