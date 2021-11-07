"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DBManager_1 = require("./DA/DBManager");
const products_route_1 = require("./routes/products.route");
const app = (0, express_1.default)();
const port = (_a = process.env['PORT']) !== null && _a !== void 0 ? _a : 3000;
const router = express_1.default.Router();
(0, DBManager_1.dbConnection)();
app.use('/', router);
(0, products_route_1.ProductsRouter)(router);
app.use((error, req, res, next) => {
    if (error) {
        res.status(500).json({ errorMessage: error.message });
    }
});
app.all('*', (req, res) => {
    res.status(404).json({ errorMessage: "Page does not exist." });
});
app.listen(port, () => {
    console.log(`Server has been started on port ${port}...`);
});
//# sourceMappingURL=index.js.map