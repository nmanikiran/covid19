import axios from "axios";

export { getCountryWiseData, fetchAllStats };

const getCountryWiseData = async () => {
  return await axios.get(`${process.env.VUE_APP_API}/countries`);
};

const fetchAllStats = async () => {
  return await axios.get(`${process.env.VUE_APP_API}/all`);
};
