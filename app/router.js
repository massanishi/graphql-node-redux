const Router = require("falcor-router");
const $ref = require('falcor').Model.ref;
const models = require("./models");
const User = models.User;

const mock = {
  content: 'content',
  sub: 'subtitle',
};

module.exports = new Router([
  {
    route: "title",
    get: (path) => {
      console.log('path:', path);
      return { path: [ "title" ], value: $ref({hi: 's'}) };
    },
  },
  {
    route: "user",
    get: () => {
      return User.findOne({ where: { firstName: "John" } }).then(user => {
        return { path: [ "user" ], value: $ref(user) }
      })
      // return { path: [ "user" ], value: 'user' };
    },
  },
  // {
  //   route: "users",
  //   get: () => {
  //     return User.findAll().then(users => {
  //       return { path: [ "users" ], value: $ref(users) }
  //     });
  //   },
  // },
  // {
  //   route: "users[{integers:indices}].firstName",
  //   get: (path) => {
  //     // path contains any object value. Ex) path.indices.
  //     return User.findAll().then(users => {
  //       const array = [];
  //       return path[1].map(index => {
  //         const u = users[index];
  //         if (!u) {
  //           return {
  //             path: ['users', index],
  //             value: null,
  //           };
  //         }

  //         return {
  //           path: ['users', index, 'firstName'],
  //           value: u.firstName,
  //         };
  //       });
  //     });
  //   },
  // },
  // {
  //  get specfic user index
  //   route: "users[{integers:indices}]",
  //   get: (path) => {
  //     // path contains any object value. Ex) path.indices.
  //     return User.findAll().then(users => {
  //       console.log('path:', typeof path[1][0]);
  //       return path[1].map(index => {
  //         // console.log('users[0]:', users[index]);
  //         return { path: [ "users", index ], value: $ref(users[index]) }
  //       });
  //     });
  //   },
  // },
  {
    // get users in range.
    // It returns: 
    // {
    //   users: {
    //     0: {},
    //     1: {}
    //   }
    // }
    route: "users[{integers:indices}]",
    get: (path) => {
      // path contains any object value. Ex) path.indices.
      return User.findAll().then(users => {
        const array = [];
        return path[1].map(index => {
          const u = users[index];
          if (!u) {
            return {
              path: ['users', index],
              value: null,
            };
          }

          return {
            path: ['users', index],
            value: $ref(u),
          };
        });
      });
    },
    route: "users[{integers:indices}]['firstName', 'lastName']",
    get: (path) => {
      return User.findAll().then(users => {
        const array = [];
        path[1].forEach(index => {
          const u = users[index];
          if (!u) {
            array.push({
              path: ['users', index],
              value: null,
            });
          } else {
            path[2].forEach(key => {
              array.push({
                path: ['users', index, key],
                value: u[key],
              });
            });
          }
        });
        return array;
      });
    },
    setValue: (path) => {
      return User.findById(path[1][0]).then(user => {
        user[path[2]] = user[path[2][0]]
        return u.save();
      }).then(u => {
        console.log('u:', u);
        return {
          path: ['users', 'firstName'],
          value: u.firstName,
        };
      });
    }
  },
])
