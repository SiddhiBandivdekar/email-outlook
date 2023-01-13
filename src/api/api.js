import axios from "axios";

const baseURL = "https://flipkart-email-mock.now.sh"

const fetchEmails = async (page) => {
    try{
        const response = await axios.get(`${baseURL}?page=${page}`);
        console.log(response.data)
    }
}