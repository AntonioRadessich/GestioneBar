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
	update(user) {
		for(var i = 0; i < storage.users.length; i++){
			if(storage.users[i].id == user.id){
				storage.users[i].email == user.email;
				storage.users[i].category == user.category;
			}
		}
		return user.id;
	}
    all() {
        return storage.users;
    }
};


users.insert({
    email: "antonio@unitn.com",
    category: "Manager"
});

module.exports = {
    users
};
