import React, { FunctionComponent } from "react";
import { Button } from "@mui/material";
import { makeStyles } from 'tss-react/mui';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropContainerComponent from './subcomponents/DropContainerComponent';
import EditPropertiesComponent from './subcomponents/EditPropertiesComponent';
import { isMobile as libIsMobile, isTablet as libIsTablet } from "react-device-detect";
import LeftSidebar from "./LeftSidebar";
import useFormBuilder from "./hooks/useFormBuilder";
import useFormPreview from './hooks/useFormPreview';
import { Publish, RemoveRedEye } from "@mui/icons-material";
import { FormItemTypes } from "../../utils/formBuilderUtils";
import FormPreview from './subcomponents/FormPreview';
import { TemplateType } from "../../types/FormTemplateTypes";
import { useNavigate } from "react-router-dom";



interface FormBuilderProps {
  template: TemplateType
}

const useStyles = makeStyles()(() => ({
  textField: {
    minWidth: "100%",
    maxWidth: "100%",
  },
  sidebarHeight: {
    height: "calc(100vh - 63px);",
    overflowY: "auto",
  },
}));

const FormBuilder: FunctionComponent<FormBuilderProps> = (props) => {
  const {
    handleItemAdded,
    saveForm,
    deleteContainer,
    deleteControl,
    editContainerProperties,
    editControlProperties,
    moveControl,
    moveControlFromSide,
    publishForm,
    selectControl,
    selectedTemplate,
    formLayoutComponents,
    selectedControl,
  } = useFormBuilder({ template: props.template });

  const { showPreview, openPreviewDrawer, closePreviewDrawer } = useFormPreview();
  const { classes } = useStyles();
  const navigate = useNavigate();

  const generateShareableUrl = () => {
    const baseUrl = window.location.origin; 
    const formId = selectedTemplate?.id; 
    return `${baseUrl}/formbuilder/${formId}`; 
  };

  const handleShare = () => {
    const shareableUrl = generateShareableUrl();
    navigator.clipboard.writeText(shareableUrl).then(() => {
      alert("Shareable URL copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="wrapper">
          <div className="row">
            <div className={classes.sidebarHeight + " sidebar col-lg-3"} style={{ paddingLeft: "30px !important" }}>
              <div className="container">
                <LeftSidebar handleItemAdded={handleItemAdded} formLayoutComponents={formLayoutComponents} />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="container p-20 h-100">
                {/* Form Details and Action */}
                <div className="row mb-5">
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-between">
                      <h4 className="mb-0">{selectedTemplate?.formName}</h4>
                      <div className="action-buttons d-flex">
                        <Button onClick={() => navigate('/')} className="mx-2">Cancel</Button>
                        <div className="border-right"></div>
                        <Button onClick={saveForm} className="mx-2">Save</Button>
                        <Button className="mx-2" variant="outlined" onClick={openPreviewDrawer} endIcon={<RemoveRedEye />}>Preview</Button>
                        <Button onClick={publishForm} className="mx-2" color="primary" endIcon={<Publish />} disableElevation variant="contained">Publish</Button>
                        <Button onClick={handleShare} className="mx-2" color="secondary">Share</Button> {/* Share Button */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-20" style={{ overflowY: "auto", height: "calc(100vh - 180px)" }}>
                  <div className="row mb-5">
                    {formLayoutComponents.map((layout, index) => (
                      <DropContainerComponent
                        key={layout.container.id}
                        index={index}
                        layout={layout.container}
                        selectedControl={selectedControl}
                        childrenComponents={layout.children}
                        deleteContainer={deleteContainer}
                        deleteControl={deleteControl}
                        selectControl={selectControl}
                        accept={FormItemTypes.CONTROL}
                        moveControl={moveControl}
                      />
                    ))}
                  </div>
                  <div className="row mb-5">
                    <DropContainerComponent
                      accept={FormItemTypes.CONTAINER}
                      name={"Parent Component"}
                      handleItemAdded={handleItemAdded}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.sidebarHeight + " sidebar col-lg-3"}>
              <div className="container">
                <EditPropertiesComponent
                  selectedControl={selectedControl}
                  selectControl={selectControl}
                  formLayoutComponents={formLayoutComponents}
                  moveControlFromSide={moveControlFromSide}
                  editContainerProperties={editContainerProperties}
                  editControlProperties={editControlProperties}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Preview Drawer */}
        <FormPreview
          screenType="mobile"
          showPreview={showPreview}
          formLayoutComponents={formLayoutComponents}
          closePreviewDrawer={closePreviewDrawer}
        />
      </DndProvider>
    </>
  );
};

export default FormBuilder;