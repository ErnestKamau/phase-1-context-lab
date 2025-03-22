/* Your Code Here */

// Create an employee record from an array of data
function createEmployeeRecord(employeeData) {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

// Process multiple employee records from an array of arrays
function createEmployeeRecords(employeeArrays) {
  return employeeArrays.map(array => createEmployeeRecord(array));
}

// Add a time in event to an employee record
function createTimeInEvent(dateStamp) {
  const [date, time] = dateStamp.split(' ');
  const hour = parseInt(time);
  
  this.timeInEvents.push({
    type: "TimeIn",
    date: date,
    hour: hour
  });
  
  return this;
}

// Add a time out event to an employee record
function createTimeOutEvent(dateStamp) {
  const [date, time] = dateStamp.split(' ');
  const hour = parseInt(time);
  
  this.timeOutEvents.push({
    type: "TimeOut",
    date: date,
    hour: hour
  });
  
  return this;
}

// Calculate hours worked on a specific date
function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.find(event => event.date === date);
  const timeOut = this.timeOutEvents.find(event => event.date === date);
  
  return (timeOut.hour - timeIn.hour) / 100;
}

// Calculate wages earned on a specific date
function wagesEarnedOnDate(date) {
  const hoursWorked = hoursWorkedOnDate.call(this, date);
  return hoursWorked * this.payPerHour;
}

// Find an employee by first name
function findEmployeeByFirstName(collection, firstName) {
  return collection.find(record => record.firstName === firstName);
}

// Calculate total payroll for all employees
function calculatePayroll(employees) {
  return employees.reduce(function(total, employee) {
    return total + allWagesFor.call(employee);
  }, 0);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}