import { render } from '@testing-library/react';
import Header from './Header';

test('should render a header', () => {
    renderComponent();
    expect(document.querySelector('.header')).toBeDefined();
});

test('header should contain an image', () => {
    renderComponent();
    expect(document.querySelector('img')).toBeDefined();
});

const renderComponent = () => {
    return render (
        <Header/>
    )
}