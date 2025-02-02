import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TemplateType } from "../../types/FormTemplateTypes";
import axios from "axios";
import moment from "moment";
import _ from "lodash";
import { closeCircularProgress, openCircularProgress } from "../uireducers/progress";
import { generateID } from "../../utils/common";

interface AddTemplateType {
  formName: string;
}

// Base URL for the mock API
const API_URL = "http://localhost:3000/templates";

// Logic to Get All Templates
export const getAllTemplates = createAsyncThunk(
  "formBuilderEntity/getAllTemplates",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(openCircularProgress());
    const response = await axios.get(API_URL);
    thunkAPI.dispatch(closeCircularProgress());
    return response.data;
  }
);

// Logic to get Single Template
export const getSingleTemplate = createAsyncThunk(
  "formBuilderEntity/getSingleTemplate",
  async (id: string, thunkAPI) => {
    thunkAPI.dispatch(openCircularProgress());
    const response = await axios.get(`${API_URL}/${id}`);
    thunkAPI.dispatch(closeCircularProgress());
    return response.data;
  }
);

// Logic to Add Template
export const addTemplate = createAsyncThunk(
  "formBuilderEntity/addTemplate",
  async (data: AddTemplateType, thunkAPI) => {
    const currentDateTime = moment().unix() * 1000;
    const template: TemplateType = {
      id: generateID(),
      formName: data.formName,
      createdAt: currentDateTime,
      creator: "Test User",
      formLayoutComponents: [],
      lastPublishedAt: 0,
      publishHistory: [],
      publishStatus: "draft",
      updatedAt: 0,
    };
    const response = await axios.post(API_URL, template);
    return response.data;
  }
);

// Logic to delete a template
export const deleteTemplate = createAsyncThunk(
  "formBuilderEntity/deleteTemplate",
  async (id: string, thunkAPI) => {
    thunkAPI.dispatch(openCircularProgress());
    await axios.delete(`${API_URL}/${id}`);
    thunkAPI.dispatch(closeCircularProgress());
    return id; // Return the id of the deleted template
  }
);

// Logic to save template
export const saveTemplate = createAsyncThunk(
  "formBuilderEntity/saveTemplate",
  async (data: TemplateType, thunkAPI) => {
    thunkAPI.dispatch(openCircularProgress());
    const response = await axios.put(`${API_URL}/${data.id}`, data);
    thunkAPI.dispatch(closeCircularProgress());
    return response.data;
  }
);

const slice = createSlice({
  name: "formBuilderEntity",
  initialState: {
    allTemplates: [] as TemplateType[],
    selectedTemplate: null as TemplateType | null,
  },
  reducers: {
    setSelectedTemplateNull: (state) => {
      state.selectedTemplate = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTemplates.fulfilled, (state, action) => {
      state.allTemplates = action.payload;
    });
    builder.addCase(getSingleTemplate.fulfilled, (state, action) => {
      state.selectedTemplate = action.payload;
    });
    builder.addCase(
      addTemplate.fulfilled,
      (state, action: PayloadAction<TemplateType>) => {
        state.allTemplates.push(action.payload);
      }
    );
    builder.addCase(saveTemplate.fulfilled, (state, action) => {
      const index = state.allTemplates.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.allTemplates[index] = action.payload;
      }
    });
    builder.addCase(deleteTemplate.fulfilled, (state, action) => {
      state.allTemplates = state.allTemplates.filter((t) => t.id !== action.payload);
    });
  },
});

export const { setSelectedTemplateNull } = slice.actions;

export default slice.reducer;