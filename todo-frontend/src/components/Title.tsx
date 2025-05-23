import { TitleProps } from "../types"

const Title = ({ titleInfo, onClick }: TitleProps) => {
  return (
    <header>
      <label id="sidebar_toggle" onClick={onClick}>
        <img src="images/hamburger.png" alt="Toggle Sidebar" />
      </label>
      <dl>
        <dt><time>{titleInfo.title}</time></dt>
        <dd>{titleInfo.numberTodos}</dd>
      </dl>
    </header>
  )
}

export default Title