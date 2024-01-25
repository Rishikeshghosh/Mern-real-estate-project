import axios from "axios";

export const fetchAllResidancies = async () => {
  return axios.get(
    "https://real-estate-backend-1-jnar.onrender.com/api/residancy/getallresidancies"
  );
};

export const fetchSingleProperty = (propertyId) => {
  try {
    return axios.get(
      `https://real-estate-backend-1-jnar.onrender.com/api/residancy/${propertyId}`
    );
  } catch (error) {
    console.log(error);
  }
};
export const getEditProperty = async (propertyId) => {
  try {
    return axios.get(
      `https://real-estate-backend-1-jnar.onrender.com/api/residancy/${propertyId}`
    );
  } catch (error) {
    console.log(error);
  }
};

export const createProperty = async (data) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post(
    "https://real-estate-backend-1-jnar.onrender.com/api/residancy/create",
    data,
    config
  );
};

export const fetchUserAllProperties = async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(
    "https://real-estate-backend-1-jnar.onrender.com/api/user/created/properties",
    config
  );
};

export const deleteProperty = async (resId) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(
    `https://real-estate-backend-1-jnar.onrender.com/api/residancy/delete/${resId}`,
    config
  );
};

export const updateProperty = async (data) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.patch(
    `https://real-estate-backend-1-jnar.onrender.com/api/residancy/update/${data.resId}`,
    data,
    config
  );
};
export const getFilteredProprties = async (data) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(
    `https://real-estate-backend-1-jnar.onrender.com/api/residancy/filter/${data}`,

    config
  );
};
export const fiterPropertiesByPrce = (data) => {
  console.log(data);

  return axios.post(
    `https://real-estate-backend-1-jnar.onrender.com/api/residancy/filter/price`,
    data
  );
};
