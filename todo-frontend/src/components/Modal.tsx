import { useState, useEffect } from 'react'
import { FormattedTodo } from '../types'

const Title = ({ title, setTitle }) => {
  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  return (
    <li>
      <label htmlFor="title">Title</label>
      <input type="text" name="title" id="title" placeholder={"Item Name"} value={title || ""} onChange={handleTitle}/>
    </li>
  )
}

const DueDate = ({ day, setDay, month, setMonth, year, setYear }) => {
  const handleChange= (
    event: React.ChangeEvent<HTMLSelectElement>, 
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(event.target.value)
  }

  return (
    <li>
      <label htmlFor="due">Due Date</label>
      <div className="date">
        <select id="due_day" name="due_day" value={day} onChange={(event) => handleChange(event, setDay)}>
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
        <select id="due_month" name="due_month" value={month} onChange={(event) => handleChange(event, setMonth)}>
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
        <select id="due_year" name="due_year" value={year} onChange={(event) => handleChange(event, setYear)}>
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

const Description = ({ description, setDescription }: {setDescription: React.Dispatch<React.SetStateAction<string>>}) => {
  const handleDescription = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value)
  }

  return (
    <li>
      <label htmlFor="description">Description</label>
      <textarea cols={50} name="description" rows={7} placeholder={description || "Description"} onChange={handleDescription}></textarea>
    </li>
  )
}

const ModalForm = ({ handleSubmit, todo, onComplete }) => {
  const [title, setTitle] = useState('')
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (todo) {
      setTitle(todo.title || '')
      setDay(todo.day || '')
      setMonth(todo.month || '')
      setYear(todo.year || '')
      setDescription(todo.description || '')
    } else {
      resetForm()
    }
  }, [todo])
  
  const resetForm = () => {
    setTitle('')
    setDay('')
    setMonth('')
    setYear('')
    setDescription('')
  }

  const newTodo = {
    title,
    day,
    month,
    year,
    description,
    completed: false,
    id: todo?.id || '',
  }

  const onClick = (event, id) => {
    event.preventDefault()
    onComplete(id)
  }

  return (
    <form action="" method="post" onSubmit={(event) => handleSubmit(event, newTodo, resetForm)}>
            <fieldset>
              <ul>
                <Title title={title} setTitle={setTitle} />
                <DueDate day={day} setDay={setDay} month={month} setMonth={setMonth} year={year} setYear={setYear} />
                <Description description={description} setDescription={setDescription}/>
                <li>
                  <input type="submit" value="Save" />
                  <button name="complete" onClick={(e) => onClick(e, newTodo.id)}>Mark As Complete</button>
                </li>
              </ul>
            </fieldset>
          </form>
  )
}

const Modal = ({displayModal, handleDisplayModal, todo, handleSubmit, onComplete }: {displayModal: boolean, todo: FormattedTodo | null} ) => {
  if (!displayModal) return null

  return (
    <>
      <div className="modal" id="modal_layer" onClick={handleDisplayModal}></div>
      <div className="modal" id="form_modal" style={{top: (window.scrollY + 200) + 'px'}}>
        <ModalForm handleSubmit={handleSubmit} todo={todo} onComplete={onComplete}/>      
      </div>
    </>
  )
}

export default Modal