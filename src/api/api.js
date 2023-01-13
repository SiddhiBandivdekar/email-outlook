import axios from "axios";

export const baseURL = "https://flipkart-email-mock.now.sh";

const fetchEmails = async (page) => {
  try {
    const response = await axios.get(`${baseURL}?page=${page}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchEmailBody = async (emailId) => {
  try {
    const response = await axios.get(`${baseURL}?id=${emailId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const markEmailRead = async (emailId) => {
  try {
    await axios.patch(`${baseURl}?id=${emailId}`, {
      read: true,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const markEmailUnRead = async (emailId) => {
  try {
    await axios.patch(`${baseURL}?id=${emailId}`, {
      read: false,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const markEmailFavourite = async (emailId) => {
  try {
    await axios.patch(`${baseURL}?id=${emailId}`, {
      favorite: true,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const markEmailUnFavorite = async (emailId) => {
  try {
    await axios.patch(`${baseURL}?id=${emailId}`, {
      favorite: false,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
