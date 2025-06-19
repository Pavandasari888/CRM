let employees = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', empId: 'EMP001', status: 'Active' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', empId: 'EMP002', status: 'Active' },
];

exports.getAllPeople = async (req, res, next) => {
  try {
    res.json(employees);
  } catch (error) {
    next(error);
  }
};

exports.createEmployee = async (req, res, next) => {
  try {
    const { name, email, empId, status } = req.body;
    if (!name || !email || !empId) {
      return res.status(400).json({ message: 'Name, email, and employee ID are required' });
    }
    const newEmployee = {
      id: (employees.length + 1).toString(),
      name,
      email,
      empId,
      status: status || 'Active',
    };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
  } catch (error) {
    next(error);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, empId, status } = req.body;
    const employee = employees.find(emp => emp.id === id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    if (name) employee.name = name;
    if (email) employee.email = email;
    if (empId) employee.empId = empId;
    if (status) employee.status = status;
    res.json(employee);
  } catch (error) {
    next(error);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const index = employees.findIndex(emp => emp.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    employees.splice(index, 1);
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    next(error);
  }
};
