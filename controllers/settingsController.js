let settings = {
  leadAssignmentRules: 'Equal distribution',
  adminControls: {
    allowEmployeeDeletion: true,
    confirmUploads: true,
  },
};

exports.getSettings = async (req, res, next) => {
  try {
    res.json(settings);
  } catch (error) {
    next(error);
  }
};

exports.updateSettings = async (req, res, next) => {
  try {
    const { leadAssignmentRules, adminControls } = req.body;
    if (leadAssignmentRules) settings.leadAssignmentRules = leadAssignmentRules;
    if (adminControls) settings.adminControls = { ...settings.adminControls, ...adminControls };
    res.json(settings);
  } catch (error) {
    next(error);
  }
};
