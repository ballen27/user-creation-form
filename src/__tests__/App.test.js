// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const titleElement = screen.getByText('Create user');
//   expect(titleElement).toBeInTheDocument();
// });


import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders user creation form', () => {
  render(<App />);
  const userCreationForm = screen.getByText('Create user');
  expect(userCreationForm).toBeInTheDocument();
});