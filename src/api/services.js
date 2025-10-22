const STORAGE_KEY = 'registeredUsers';

const UserAPI = {

    users:JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
        { username: "admin", password: "1234", name: "Администратор" },
        { username: "user1", password: "pass1", name: "Иван" },
        { username: "user2", password: "pass2", name: "Ольга" }
    ],

    getAll: function () {
        return this.users;
    },

    get: function (id) {
        const isClient = (p) => p.id === id;
        return this.users.find(isClient);
    },

    delete: function (id) {
        const isNotDelClient = (p) => p.id !== id;
        this.users = this.users.filter(isNotDelClient);
        return true;
    },

    add: function (user) {
        if (!user.id)
            user = {
                ...user,
                id:
                    this.users.reduce((prev, current) => {
                        return prev.id > current.id ? prev : current;
                    }, 0).id + 1,
            };
        this.users = [...this.users, user];
        return user;
    },

    update: function (user) {
        this.get();
        this.users.shift(user);
        return user;
    },

    authenticate: function (username, password) {
        return this.users.find(
            (user) => user.username === username && user.password === password
        );
    },

    register: function (newUser) {
        const exists = this.users.some((u) => u.username === newUser.username);
        if (exists) return false;
        this.users.push(newUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.users));
        return true;
    },
};
export default UserAPI;