"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server = require("./server");
const Database = require("./database");
const Configs = require("./configurations");
console.log(`Running enviroment ${process.env.NODE_ENV || "dev"}`);
console.log(`Running enviroment ${process.env.MONGO_URL || "dev"}`);
// Catch unhandling unexpected exceptions
process.on('uncaughtException', (error) => {
    console.error(`uncaughtException ${error.message}`);
});
// Catch unhandling rejected promises
process.on('unhandledRejection', (reason) => {
    console.error(`unhandledRejection ${reason}`);
});
// Init Database
const dbConfigs = Configs.getDatabaseConfig();
const database = Database.init(dbConfigs);
// Starting Application Server
const serverConfigs = Configs.getServerConfigs();
Server.init(serverConfigs, database).then((server) => {
    server.start(() => {
        console.log(`Server running at: ${process.env.NODE_ENV || server.info.uri}`);
    });
});
//# sourceMappingURL=index.js.map