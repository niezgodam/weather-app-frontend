import axios from "axios";

class Service {
  constructor() {
    this.domain = "https://weather-app-backend-augf.onrender.com/api/";
  }

  async get(latitude, longitude) {
    try {
      const response = await axios.get(`${this.domain}${latitude}/${longitude}/`);
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}

export default Service;
