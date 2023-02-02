import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Organisation = new Schema(
    {
        user:       {type: String},
        name:       {type: String},
        address:    {type: String},
        reg_number: {type: Number}
    }
)

export default mongoose.model("Organisation", Organisation, "organisations")
