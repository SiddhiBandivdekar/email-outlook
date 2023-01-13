import axios from "axios";

const baseURL = "https://flipkart-email-mock.now.sh";

const fetchEmails = async (page) => {
  try {
    const response = await axios.get(`${baseURL}?page=${page}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchEmailBody = async (emailId) => {
  try {
    const response = await axios.get(`${baseURL}?id=${emailId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
