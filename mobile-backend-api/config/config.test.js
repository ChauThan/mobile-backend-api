var config = {
    env: 'development',
    db: {
        client: 'mysql',
        connection: {
            host    : '127.0.0.1',
            user    : 'root',
            password: 'vagrant',
            database: 'backendapi',
            charset : 'utf8',
            port    : '33066'
        }
    },
    token: {
        text: 'randomtext',
        expireInMinutes: 1440
    }
}

module.exports = config;