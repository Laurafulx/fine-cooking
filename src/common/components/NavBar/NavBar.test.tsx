import { fireEvent, render } from '@testing-library/react';
import NavBar from './NavBar';

const foodCategories = ['food1', 'food2', 'food3'];
const spyOnChange = jest.fn();

test('renders a navbar', () => {
    renderComponent();
    expect(document.querySelector('.nav-bar-container')).toBeDefined();
});

test('should render nav bar items based on props', () => {
    renderComponent();
    const navBarItems = document.querySelectorAll('.nav-bar-item');
    expect(navBarItems[0].innerHTML).toBe(foodCategories[0]);
    expect(navBarItems[1].innerHTML).toBe(foodCategories[1]);
    expect(navBarItems[2].innerHTML).toBe(foodCategories[2])
});

test('clicking a navbar item should trigger onchange function with the food type', () => {
    renderComponent();
    fireEvent.click(document.querySelectorAll('.nav-bar-item')[0]);
    expect(spyOnChange).toHaveBeenCalledWith(foodCategories[0]);

    fireEvent.click(document.querySelectorAll('.nav-bar-item')[2]);
    expect(spyOnChange).toHaveBeenCalledWith(foodCategories[2])
});

const renderComponent = () => {
    return render (
        <NavBar 
            onChange={spyOnChange}
            foodCategories={foodCategories}
        />
    )
}