import USer from "../../models/USer.js";

export const updateUser = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await USer.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ message: "Berhasil di update", user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const data = await USer.find();
    const users = data.filter((user) => user.role === "user");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await USer.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "user tidak ditemukan" });
    }
     await user.deleteOne();
    return res.status(200).json({ message: "user berhasil di hapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
