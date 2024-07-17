const { default: axios } = require("axios");

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: "https://doctor-appointment-booking-allb.onrender.com/api",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

const getCategory = () => axiosClient.get("/categories?populate=*");

const getDoctorList = () => axiosClient.get("/doctors?populate=*");

const getDoctorByCategory = (category) => axiosClient.get("/doctors?filters[categories][Name][$in]=" + category + "&populate=*");

const getDoctorById = (id) => axiosClient.get("/doctors/" + id + "?populate=*");

const bookAppointment = (data) => axiosClient.post("/appointments", data);

const sendEmail = (data) => axios.post('/api/sendEmail',data)

const getBookinglist = (email) => axiosClient.get("/appointments?filters[Email][$eq]=" +email+"&populate=*");

const deleteAppointment = (id) => axiosClient.delete('/appointments?filters[Date][$eq]'+date+'&populate')

// const getAppointmentDateTime = (date) => axiosClient.get('/appointments?filters')

export default {
  getCategory,
  getDoctorList,
  getDoctorByCategory,
  getDoctorById,
  bookAppointment,
  sendEmail,
  getBookinglist,
  deleteAppointment,
  // getAppointmentDateTime
};
