"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleCheck = void 0;
const roleCheck = (req, res, next) => {
    var _a;
    console.log(":::req?.query.", req === null || req === void 0 ? void 0 : req.query);
    console.log(":::req?.query.", req === null || req === void 0 ? void 0 : req.query);
    console.log(":::req?.query.", req === null || req === void 0 ? void 0 : req.query);
    console.log(":::req?.query.", req === null || req === void 0 ? void 0 : req.query);
    const role = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.role;
    if (!role || role != 'admin') {
        throw new Error('Role should be admin');
    }
    next();
};
exports.roleCheck = roleCheck;
