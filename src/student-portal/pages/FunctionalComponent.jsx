import React, { useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import PrintIcon from '@mui/icons-material/Print';
import { ComponentToPrint } from './ComponentToPrint';

export const FunctionalComponent = (props) => {
  const componentRef = useRef();

  const [text, setText] = useState('Hello world!');

  return (
    <div >
      <ReactToPrint
        trigger={() => <Button variant="outlined"  startIcon={<PrintIcon />}>
        Print
      </Button>}
        content={() => componentRef.current}
      />
      <ComponentToPrint ref={componentRef} text={text} content = {props.content}/>
    </div>
  );
};