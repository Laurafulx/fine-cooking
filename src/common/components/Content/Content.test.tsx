import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Content from './Content';
import fetch from "jest-fetch-mock";

const selectedFood = 'Pasta'
const apiKey = 'a681d478d3e54a2cbee852a14c29b9af'

const mockRecipeData =
    [
        {
            id: 1,
            image: 'image_url_1',
            imageType: 'image_type_1',
            title: 'title_1',
            isEditable: false
        },
        {
            id: 2,
            image: 'image_url_2',
            imageType: 'image_type_2',
            title: 'title_2',
            isEditable: false
        },
        {
            id: 3,
            image: 'image_url_3',
            imageType: 'image_type_3',
            title: 'title_3',
            isEditable: false
        },
    ]

beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify({ results: mockRecipeData }));
});

test('should render content', async () => {
    await waitFor(() => renderComponent());
    expect(document.querySelector('.content')).toBeDefined();
});

test('should render a recipe name and image for each item returned from the api', async () => {
    await waitFor(() => renderComponent());
    
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${selectedFood}&number=20`)

    expect(document.querySelectorAll('.recipe-title-text')[0].textContent).toBe(mockRecipeData[0].title);
    expect(document.querySelectorAll('.recipe-title-text')[1].textContent).toBe(mockRecipeData[1].title);
    expect(document.querySelectorAll('.recipe-title-text')[2].textContent).toBe(mockRecipeData[2].title)
});

test('each item should have a cross icon and an edit icon', async () => {
    await waitFor(() => renderComponent());

    expect(document.querySelectorAll('.pencil-icon').length).toBe(3);
    expect(document.querySelectorAll('.cross-icon').length).toBe(3);
});

test('clicking the cross next to a recipe should remove it from the ui', async () => {
    await waitFor(() => renderComponent());

    expect(document.querySelectorAll('.recipe-title-text').length).toBe(3);
    expect(document.querySelectorAll('.recipe-title-text')[2]).toBeDefined();

    fireEvent.click(document.querySelectorAll('.cross-icon')[2]);

    expect(document.querySelectorAll('.recipe-title-text').length).toBe(2);
    expect(document.querySelectorAll('.recipe-title-text')[2]).not.toBeDefined();
});

test('clicking the pencil next to a recipe name should make it editable', async () => {
    await waitFor(() => renderComponent());

    const recipeTitle = document.querySelectorAll('.recipe-title')[0];

    expect(recipeTitle.querySelector('recipe-title-text')).toBeDefined();
    expect(recipeTitle.querySelector('recipe-title-input')).toBe(null);
    
    fireEvent.click(document.querySelectorAll('.pencil-icon')[0]);

    expect(recipeTitle.querySelector('recipe-title-text')).toBe(null);
    expect(recipeTitle.querySelector('recipe-title-input')).toBeDefined()
});

test('pressing save on editing an item should change this in the ui', async () => {
    await waitFor(() => renderComponent());

    expect(document.querySelectorAll('.recipe-title-text')[1].textContent).toBe(mockRecipeData[1].title);

    fireEvent.click(document.querySelectorAll('.pencil-icon')[1]);
    const newText = 'abc'
    fireEvent.change(document.querySelector('.recipe-title-input') as HTMLInputElement, { target: { value: newText } });
    fireEvent.click(document.querySelector('.save-icon') as Element)
    
    expect(document.querySelectorAll('.recipe-title-text')[1].textContent).toBe(newText);
});

const renderComponent = () => {
    render(<Content selectedFood={selectedFood}/>);
}