import React from 'react';
import { render } from '@testing-library/react';
import { CalcComponent } from './CalcComponent';

test('renders learn react link', () => {
  const { getByText } = render(<CalcComponent />);
  const computeButton = getByText(/=/i);
  expect(computeButton).toBeInTheDocument();
});
