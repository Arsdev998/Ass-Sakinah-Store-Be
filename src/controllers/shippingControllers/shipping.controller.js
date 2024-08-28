import axios from "axios";
import qs from "qs";

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.common["key"] = process.env.SHIPPING_KEY;
axios.defaults.headers.post["Content-Type"] =
  "Application/x-www-form-urlencoded";

export const getProvince = async (req, res) => {
  try {
    const provinces = await axios.get("/province");
    console.log(process.env.BASE_URL);
    return res.status(200).json(provinces.data.rajaongkir.results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCity = async (req, res) => {
  try {
    const id = req.params.province_id;
    const city = await axios.get(`/city?province=${id}`);
    res.status(200).json(city.data.rajaongkir.results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCost = async (req, res) => {
  try {
    const { origin, destination, weight, courier } = req.params;
    const data = qs.stringify({
      origin: origin,
      destination: destination,
      weight: weight,
      courier: courier,
    });
    const cost = await axios.post("/cost",data);
    return res.status(200).json(cost.data.rajaongkir);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
