import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App.jsx';

it('shows a Login form', () => {
  // Create div ele in JSDom
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  // Looks inside the div to check if Login form is in there.
  expect(div.innerHTML).toContain('Login');
  // Find the div and remove App component to save memory.
  ReactDOM.unmountComponentAtNode(div); 
});