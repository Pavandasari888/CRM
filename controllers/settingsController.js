const Settings = require('../models/Settings');

exports.listSettings = async (req, res, next) => {
  try {
    const settings = await Settings.find();
    res.json(settings);
  } catch (error) {
    next(error);
  }
};

exports.createSetting = async (req, res, next) => {
  try {
    const { key, value } = req.body;
    if (!key || value === undefined) {
      return res.status(400).json({ message: 'Key and value are required' });
    }
    const newSetting = new Settings({
      key,
      value,
    });
    const savedSetting = await newSetting.save();
    res.status(201).json(savedSetting);
  } catch (error) {
    next(error);
  }
};

exports.updateSetting = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { key, value } = req.body;
    const setting = await Settings.findById(id);
    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    if (key) setting.key = key;
    if (value !== undefined) setting.value = value;
    const updatedSetting = await setting.save();
    res.json(updatedSetting);
  } catch (error) {
    next(error);
  }
};

exports.deleteSetting = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedSetting = await Settings.findByIdAndDelete(id);
    if (!deletedSetting) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    res.json({ message: 'Setting deleted' });
  } catch (error) {
    next(error);
  }
};
