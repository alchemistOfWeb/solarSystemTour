import path from "../config/path.js";

import del from "del";

const clear = () => {
    return del(path.root);
}

export default clear;
