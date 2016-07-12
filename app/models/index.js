const User = require('./User');
const Client = require('./Client');

Client.hasMany(User);
User.belongsTo(Client);

function createUsers(index, client) {
  return User.create({
    firstName: "John" + client.id,
    lastName: "Hancock",
    clientId: client.id
  });
}

function createClients(index) {
  return Client.create({
    label: "Big boss " + index,
  });
}

function createMock() {
  Client.sync()
  .then(() => User.sync())
  .then(() => {
    for (var i = 0; i < 50; i++) {
      createClients(i)
        .then(client => {
          return createUsers(i, client);
        })
        .then(() => {
          console.log('finishing creating tables');
        });
    }
  });
}

createMock();

module.exports = {
  User,
  Client,
};
