const storage = {
    users: []
};

const users = {
    insert(user) {
        let ids = storage.users.map(a => a.id);
        user.id = ( storage.users.length==0 ? 1 : Math.max(...ids) + 1);
        storage.users.push(user);
        return user.id;
    },
    all() {
        return storage.users;
    }
};


users.insert({
    email: "antonio@unitn.com"
});

module.exports = {
    users
};
