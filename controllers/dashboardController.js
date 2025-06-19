exports.getOverview = async (req, res, next) => {
  try {
    // TODO: Replace dummy data with real database queries
    const stats = {
      unassignedLeads: 12,
      leadsAssignedThisWeek: 34,
      activeSalespeople: 7,
      conversionRate: 45.6, // percentage
    };

    const graphData = [
      { date: '2024-09-01', conversion: 5 },
      { date: '2024-09-02', conversion: 8 },
      { date: '2024-09-03', conversion: 6 },
      { date: '2024-09-04', conversion: 10 },
      { date: '2024-09-05', conversion: 7 },
      { date: '2024-09-06', conversion: 9 },
      { date: '2024-09-07', conversion: 11 },
    ];

    res.json({ stats, graphData });
  } catch (error) {
    next(error);
  }
};
