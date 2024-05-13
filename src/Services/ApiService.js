import axios from "axios";

class Service {
  constructor() {
    this.domain = process.env.BACKEND_API_URL;
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
