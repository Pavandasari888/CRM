let leads = [
  { id: '1', name: 'Lead One', date: '2024-09-01', assigned: true, closed: false },
  { id: '2', name: 'Lead Two', date: '2024-09-02', assigned: false, closed: false },
];

exports.listLeads = async (req, res, next) => {
  try {
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
    const newLead = {
      id: (leads.length + 1).toString(),
      name,
      date,
      assigned: assigned || false,
      closed: closed || false,
    };
    leads.push(newLead);
    res.status(201).json(newLead);
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
    const lead = leads.find(l => l.id === id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    if (name) lead.name = name;
    if (date) lead.date = date;
    if (assigned !== undefined) lead.assigned = assigned;
    if (closed !== undefined) lead.closed = closed;
    res.json(lead);
  } catch (error) {
    next(error);
  }
};

exports.deleteLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const index = leads.findIndex(l => l.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    leads.splice(index, 1);
    res.json({ message: 'Lead deleted' });
  } catch (error) {
    next(error);
  }
};
