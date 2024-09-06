const getFirstName = (fullName) => {
  return fullName.split(" ")[0];
};

const getLength = (arr) => {
  return arr.length;
};

const mul = (n1, n2) => n1 * n2;

module.exports = { getFirstName, getLength, mul };
