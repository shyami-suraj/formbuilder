import { generateID } from "./common";

export const FormControlNames = {
  INPUTTEXTFIELD: "text-field",
  INPUTNUMBERFIELD: "number-field",
  CHECKBOX: "checkbox",
  RADIOGROUP: "radio-group",
  SELECTDROPDOWN: "select-drop-down",
  DATEFIELD: "date-field",
  FILEUPLOAD: "file-upload",
};

export const FormTextDataTypes = {
  TEXT: "text",
  NUMBER: "number", 
};

export const FormItemTypes = {
  CONTROL: "control",
  CONTAINER: "container",
};

export const FormPublishStatus = {
  DRAFT: "draft",
  PUBLISHED: "published",
};

export const FormContainerList = [
  {
    id: '',
    controlName: "step-container",
    displayText: "Workflow Step",
    itemType: FormItemTypes.CONTAINER,
    icon: "fa fa-building",
    heading: "Container Heading",
    subHeading: "Container SubHeading",
  },
];

export const FormControlList = [
  {
    id: '',
    controlName: FormControlNames.INPUTTEXTFIELD,
    displayText: "Text Field",
    placeholder: "Placeholder for Text Field",
    description: "Some Description about the field",
    labelName: "Text Field",
    itemType: FormItemTypes.CONTROL,
    dataType: FormTextDataTypes.TEXT,
    icon: "fas fa-text-height",
    required: false,
    category: "text-elements",
    containerId: '',
  },
  {
    id: '',
    controlName: FormControlNames.INPUTNUMBERFIELD, 
    displayText: "Number Field",
    placeholder: "Enter a number",
    description: "Some Description about the number field",
    labelName: "Number Field",
    itemType: FormItemTypes.CONTROL,
    dataType: FormTextDataTypes.NUMBER,
    icon: "fas fa-hashtag",
    required: false,
    category: "number-elements",
    containerId: '',
  },
  {
    id: '',
    controlName: FormControlNames.RADIOGROUP,
    displayText: "Radio",
    description: "Some Description about the field",
    labelName: "Label for Radio",
    itemType: FormItemTypes.CONTROL,
    icon: "far fa-dot-circle",
    required: false,
    items: [
      {
        id: generateID(),
        value: "Button__-1",
        label: "Button 1",
      },
      {
        id: generateID(),
        value: "Button__-2",
        label: "Button 2",
      },
    ],
    category: "other-elements",
    containerId: '',
  },
  {
    id: '',
    controlName: FormControlNames.SELECTDROPDOWN,
    displayText: "Dropdown",
    description: "Some Description about the field",
    labelName: "Label for Dropdown",
    itemType: FormItemTypes.CONTROL,
    icon: "far fa-caret-square-down",
    required: false,
    items: [
      {
        id: generateID(),
        value: "Option__-1",
        label: "Option 1",
      },
      {
        id: generateID(),
        value: "Option__-2",
        label: "Option 2",
      },
    ],
    category: "other-elements",
    containerId: '',
  },
  {
    id: '',
    controlName: FormControlNames.CHECKBOX,
    displayText: "Checkbox",
    description: "Some Description about the field",
    labelName: "Label for Checkbox",
    placeholder: "Place Holder Text",
    itemType: FormItemTypes.CONTROL,
    icon: "far fa-check-square",
    required: false,
    category: "other-elements",
    containerId: '',
  },
  {
    id: '',
    controlName: FormControlNames.DATEFIELD,
    displayText: "Date Picker",
    description: "Some Description about the field",
    labelName: "Label for Date",
    itemType: FormItemTypes.CONTROL,
    icon: "far fa-calendar",
    required: false,
    category: "date-elements",
    containerId: '',
  },
  {
    id: '',
    controlName: FormControlNames.FILEUPLOAD,
    displayText: "Upload",
    description: "Some Description about the field",
    labelName: "Label for File Upload",
    itemType: FormItemTypes.CONTROL,
    icon: "fas fa-cloud-upload-alt",
    required: false,
    category: "media-elements",
    containerId: '',
  },
];