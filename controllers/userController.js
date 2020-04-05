const fs = require('fs');
const path = require('path');

const users = JSON.parse(
  fs.readFileSync(path.normalize(`${__dirname}/../dev-data/data/users.json`))
);

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      users
    }
  });
};

module.exports = {
  getAllUsers
};