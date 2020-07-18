const getUsers = async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await userModel.findById(req.params.id);
    // if (!user) res.status(404).send("No user here")
    res.send(user);
  } catch {
    res.status(500).send(err);
    console.log('Not a valid user');
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    // if (!user) res.status(404).send("No user here")
    res.send(user);
  } catch {
    res.status(500).send(err);
    console.log('Not a valid user');
  }
};

const newUser = async (req, res) => {
  const user = new userModel(req.body);

  try {
    await user.save();
    res.send(user);
  } catch (err) {
    console.log('there was an error');
    res.status(500).send(err);
  }
};

const updateUser = async (req, res) => {
  const user = new userModel(req.body);

  try {
    await user.save();
    res.send(user);
  } catch (err) {
    console.log('there was an error');
    res.status(500).send(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);

    if (!user) res.status(404).send('No user here');
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getUsers,
  getUser,
  newUser,
  updateUser,
  deleteUser,
};
