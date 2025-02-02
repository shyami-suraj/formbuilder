import { BiTrashAlt } from "react-icons/bi"; 
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier } from 'dnd-core';
import { FormLayoutComponentChildrenType } from '../../../types/FormTemplateTypes';
import { FormControlNames, FormItemTypes } from '../../../utils/formBuilderUtils';
import { Checkbox, FormControl, FormControlLabel, FormGroup, MenuItem, Radio, RadioGroup, Select, Switch, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const selectedColor = 'var(--primary)';
const nonSelectedColor = 'rgba(0,0,0,0.1)';
const dateFormat = 'yyyy, MMM dd';

const renderItem = (item: FormLayoutComponentChildrenType) => {
  switch (item.controlName) {
    case FormControlNames.INPUTTEXTFIELD:
      return (
        <TextField 
          type={item.dataType}
          fullWidth={true}
          placeholder={item.placeholder}
          disabled
          variant='outlined'
        />
      );
    
    case FormControlNames.INPUTNUMBERFIELD: 
      return (
        <TextField 
          type="number" 
          fullWidth={true}
          placeholder={item.placeholder}
          disabled
          variant='outlined'
        />
      );



    case FormControlNames.CHECKBOX:
      return (
        <div className='m-t-20 p-l-0'>
          <FormControlLabel
            control={<Checkbox disabled />}
            style={{ marginLeft: '0px' }}
            label={item.placeholder}
          />
        </div>
      );
    
    case FormControlNames.RADIOGROUP:
      return (
        <FormControl>
          <RadioGroup name={item.controlName + item.id} row>
            {item.items?.map((i) => (
              <FormControlLabel value={i.value} key={i.value} control={<Radio />} label={i.label} />
            ))}
          </RadioGroup>
        </FormControl>
      );
    
    case FormControlNames.SELECTDROPDOWN:
      return (
        <FormControl style={{ minWidth: '100%' }}>
          <Select
            variant='outlined'
            disabled
            value={item.items && item.items[0].value}
          >
            {item.items?.map((i) => (
              <MenuItem key={i.value} value={i.value}>{i.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      );

    case FormControlNames.DATEFIELD:
      return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            slotProps={{ textField: { fullWidth: true } }}
            disabled
          />
        </LocalizationProvider>
      );



    case FormControlNames.FILEUPLOAD:
      return (
        <>
          <input
            style={{ display: 'none' }}
            id={item.controlName + item.id}
            type="file"
          />
          <label className='control-input-trigger-buttons' htmlFor={item.controlName + item.id}>
            <i className="fas fa-cloud-upload-alt"></i>
          </label>
        </>
      );



  

  

 

  

    default:
      return null; 
  }
}

interface ControlViewComponentProps {
  item: any;
  deleteControl: (itemId: string, containerId: string) => void;
  containerId: string;
  selectControl: (item: FormLayoutComponentChildrenType) => void;
  selectedControl: any;
  index: number;
  moveControl: (
    item: FormLayoutComponentChildrenType,
    dragIndex: number,
    hoverIndex: number,
    containerId: string
  ) => void;
}

function ControlViewComponent(props: ControlViewComponentProps) {
  const { item, deleteControl, containerId, selectControl, 
    selectedControl, index, moveControl } = props;

  let wrapperStyle = {
    border: '1px solid ' + nonSelectedColor,
    borderRadius: '9px',
    marginBottom: '20px',
    backgroundColor: 'white',
    cursor: 'pointer',
    boxShadow: '0 9px 90px #efefef',
  };

  // Check if it's the same type and id to change color.
  if (selectedControl && item.id === selectedControl.id && item.type === selectedControl.type) {
    wrapperStyle.border = '2px solid ' + selectedColor;
  }

  const handleDeleteControl: React.MouseEventHandler<HTMLSpanElement> = (event) => {
    deleteControl(item.id, containerId);
    if (event.stopPropagation) event.stopPropagation();
  }

  // Drag & Sort Code for functionality  
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    FormLayoutComponentChildrenType,
    void,
    { handlerId: Identifier | null }
  >({
    accept: FormItemTypes.CONTROL,
    collect(monitor: any) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: FormLayoutComponentChildrenType, monitor: any) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the item's height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex && dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex && dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveControl(item, dragIndex as number, hoverIndex, containerId);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: FormItemTypes.CONTROL,
    item: () => {
      return { ...item, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <>
      <div ref={ref} className='row w-100 align-items-stretch justify-content-end' onClick={() => selectControl(item)} style={{ ...wrapperStyle, opacity }}>
        <div className='col-12 p-20'>
          <div className='d-flex align-items-center justify-content-between'>
            <h5>{item.labelName + (item.required ? " *" : "")}</h5>
            <div className='control-actions'>
              <span style={{ cursor: 'grab' }}>
                <i className='fa fa-ellipsis-v'></i>
                <i className='fa fa-ellipsis-v'></i>
              </span>
              <span onClick={handleDeleteControl}><BiTrashAlt /></span>
            </div>
          </div>
          {item.description !== '' ? (
            <div className='mt-2'>
              <p>{item.description}</p>
            </div>
          ) : null}
          <div className='mt-3'>
            {renderItem(item)}
          </div>
        </div>
      </div>
    </>
  );
}

export default ControlViewComponent;