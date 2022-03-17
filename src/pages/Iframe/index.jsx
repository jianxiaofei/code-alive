import React from 'react';
import ExampleTrap from '../Example/Others/梯形标签页.htm';

export default function Iframe(props) {
  const src = props.page || ExampleTrap;
  
  return <iframe frameBorder="0" width="100%" height="100%" src={src} />;
}
