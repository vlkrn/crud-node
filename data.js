let users = [];
let currentId = 1;

module.exports = {
    getUsers: () => users,
    addUser: (user) => {
        user.id = currentId++;
        users.push(user);
    },

    getUserById: (id) => {
        return users.find(user => user.id === id);
    },

    updateUser: (id, updatedData) => {
        const userIndex = users.findIndex((user) => user.id === id);
        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...updatedData };
            console.log(updatedData)
            console.log(users[userIndex])
            return users[userIndex];
        }

        return null;
    },

    deleteUser: (id) => {
        const userIndex = users.findIndex((user) => user.id === id);
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            return true;
        }

        return false;
    },
};
