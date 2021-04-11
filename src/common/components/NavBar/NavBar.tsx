import { NavBarProps } from './NavBar.types';

const NavBar = ({onChange, foodCategories}: NavBarProps): JSX.Element => {

  const onClick = (foodType: string): void => {
    onChange(foodType)
  }

  return (
    <div className="nav-bar-container">
      <div className="nav-bar-content">
        <ul>

          {foodCategories.map((foodType, index) =>
            <li 
              className="nav-bar-item"
              key={'food-' + index} 
              onClick={() => onClick(foodType)}>
              {foodType}
            </li>
          )}

        </ul>
      </div>
    </div>
  )
}

export default NavBar;
