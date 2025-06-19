const Lead = require('../models/Lead');

exports.listLeads = async (req, res, next) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (error) {
    next(error);
  }
};

exports.createLead = async (req, res, next) => {
  try {
    const { name, date, assigned, closed } = req.body;
    if (!name || !date) {
      return res.status(400).json({ message: 'Name and date are required' });
    }
    const newLead = new Lead({
      name,
      date,
      assigned: assigned || false,
      closed: closed || false,
    });
    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    next(error);
  }
};

exports.uploadCSV = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'CSV file is required' });
    }
    // TODO: Parse CSV file and add leads
    // For now, just return success
    res.json({ message: 'CSV uploaded successfully (parsing not implemented yet)' });
  } catch (error) {
    next(error);
  }
};

exports.updateLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, date, assigned, closed } = req.body;
    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    if (name) lead.name = name;
    if (date) lead.date = date;
    if (assigned !== undefined) lead.assigned = assigned;
    if (closed !== undefined) lead.closed = closed;
    const updatedLead = await lead.save();
    res.json(updatedLead);
  } catch (error) {
    next(error);
  }
};

exports.deleteLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedLead = await Lead.findByIdAndDelete(id);
    if (!deletedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json({ message: 'Lead deleted' });
  } catch (error) {
    next(error);
  }
};
