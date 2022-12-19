import { forwardRef } from 'react';
import { imageBaseUrl } from '../../base-url/based-url';
export const ComponentToPrint = forwardRef(( props, ref ) => {
  return (
  <div ref={ref}>
    {props.content}
  </div>
)});

