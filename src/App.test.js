import React from 'react';
import {render, act, fireEvent} from '@testing-library/react';
import App from './App';

window.localeStorage = {
  get: jest.fn(),
  set: jest.fn()
}

test.skip('renders learn react link', () => {
  
  const {getByTestId} = render(<App />)

  const element = getByTestId('form-button')

  act(() => {
    fireEvent.click(element)
  })

  expect(tree).toMatchSnapshot();

  expect(window.localStorage.get).toHaveBeenCalled()
});
