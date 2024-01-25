import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProperty,
  deleteProperty,
  fetchAllResidancies,
  fetchSingleProperty,
  fetchUserAllProperties,
  fiterPropertiesByPrce,
  getEditProperty,
  getFilteredProprties,
  updateProperty,
} from "./PropertiesApi";

const initialState = {
  allProperties: [],
  created: {},
  singleProperty: {},
  userCreatedProperties: [],
  pending: false,
  update: false,
  delete: "",
  editProperty: {},
  updateSuccesProperty: {},
  createUpdate: false,
  addressError: false,
  filter: false,
};

export const getAllPropertiesAsync = createAsyncThunk(
  "property/fetchProperty",
  async () => {
    try {
      const response = await fetchAllResidancies();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getSinglePropertyAsync = createAsyncThunk(
  "property/fetchSingleProperty",
  async (propertyId) => {
    try {
      const response = await fetchSingleProperty(propertyId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getEditPropertyAsync = createAsyncThunk(
  "property/editProperty",
  async (data) => {
    try {
      const response = await getEditProperty(data.resId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createPropertyAsync = createAsyncThunk(
  "property/create",
  async (data) => {
    const response = await createProperty(data);
    return response.data;
  }
);

export const getUserAllCreatedPropertiesAsync = createAsyncThunk(
  "property/fetch",
  async () => {
    try {
      const response = await fetchUserAllProperties();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deletePropertyAsync = createAsyncThunk(
  "property/delete",
  async (data) => {
    const response = await deleteProperty(data.id);
    return response.data;
  }
);

export const updatePropertyAsync = createAsyncThunk(
  "property/update",
  async (data) => {
    try {
      const response = await updateProperty(data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getFilteredProprtiesAsync = createAsyncThunk(
  "property/filter",
  async (data) => {
    try {
      const response = await getFilteredProprties(data.keyword);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fiterPropertiesByPriceAsync = createAsyncThunk(
  "property/min-max",
  async (data) => {
    try {
      const response = await fiterPropertiesByPrce(data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const PropertiesSlice = createSlice({
  name: "property",
  initialState,

  reducers: {
    clearUpdate: (state) => {
      state.created = {};
    },
    reSetAddresError: (state) => {
      state.addressError = false;
    },
    reSetUpdateSuccProp: (state) => {
      state.updateSuccesProperty = {};
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllPropertiesAsync.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(getAllPropertiesAsync.rejected, (state, action) => {
        state.pending = false;
      })
      .addCase(getAllPropertiesAsync.fulfilled, (state, action) => {
        state.allProperties = action.payload;
        state.pending = false;
      })
      .addCase(getSinglePropertyAsync.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(getSinglePropertyAsync.fulfilled, (state, action) => {
        state.singleProperty = action.payload;
        state.pending = false;
      })
      .addCase(getSinglePropertyAsync.rejected, (state, action) => {
        state.pending = false;
      })
      .addCase(createPropertyAsync.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(createPropertyAsync.fulfilled, (state, action) => {
        state.created = action.payload;
        state.createUpdate = state.createUpdate ? false : true;
        state.update = state.update ? false : true;
        state.pending = false;
        state.addressError = false;
      })
      .addCase(createPropertyAsync.rejected, (state, action) => {
        state.pending = false;
        state.addressError = true;
      })
      .addCase(getUserAllCreatedPropertiesAsync.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(getUserAllCreatedPropertiesAsync.fulfilled, (state, action) => {
        state.userCreatedProperties = action.payload;
        state.update = state.update ? false : true;
        state.pending = false;
      })
      .addCase(getUserAllCreatedPropertiesAsync.rejected, (state, action) => {
        state.pending = false;
      })
      .addCase(deletePropertyAsync.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(deletePropertyAsync.fulfilled, (state, action) => {
        state.delete = action.payload;
        state.update = state.update ? false : true;
        state.pending = false;
      })
      .addCase(deletePropertyAsync.rejected, (state, action) => {
        state.pending = false;
      })
      .addCase(updatePropertyAsync.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(updatePropertyAsync.fulfilled, (state, action) => {
        state.updateSuccesProperty = action.payload;
        state.update = state.update ? false : true;
        state.pending = false;
      })
      .addCase(updatePropertyAsync.rejected, (state, action) => {
        state.pending = false;
      })
      .addCase(getEditPropertyAsync.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(getEditPropertyAsync.fulfilled, (state, action) => {
        state.editProperty = action.payload;
        state.update = state.update ? false : true;
        state.pending = false;
      })
      .addCase(getEditPropertyAsync.rejected, (state, action) => {
        state.pending = false;
      })
      .addCase(getFilteredProprtiesAsync.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(getFilteredProprtiesAsync.fulfilled, (state, action) => {
        state.allProperties = action.payload;
        state.update = state.update ? false : true;
        state.pending = false;
      })
      .addCase(getFilteredProprtiesAsync.rejected, (state, action) => {
        state.pending = false;
      })
      .addCase(fiterPropertiesByPriceAsync.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(fiterPropertiesByPriceAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.allProperties = action.payload;
        state.filter = state.filter ? false : true;
        state.pending = false;
      })
      .addCase(fiterPropertiesByPriceAsync.rejected, (state, action) => {
        state.pending = false;
      });
  },
});
export const { clearUpdate, reSetAddresError, reSetUpdateSuccProp } =
  PropertiesSlice.actions;

export const properties = (state) => state.properties.allProperties;
export const propertyUpdate = (state) => state.properties.update;
export const createUpdate = (state) => state.properties.createUpdate;
export const created = (state) => state.properties.created;
export const dltPropSucc = (state) => state.properties.delete;
export const editProp = (state) => state.properties.editProperty;
export const addressError = (state) => state.properties.addressError;
export const filter = (state) => state.properties.filter;
export const updateSuccProp = (state) => state.properties.updateSuccesProperty;
export const userAllProperties = (state) =>
  state.properties.userCreatedProperties;
export const singleProperty = (state) => state.properties.singleProperty;

export default PropertiesSlice.reducer;
