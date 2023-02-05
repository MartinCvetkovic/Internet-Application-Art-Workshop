import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Workshop = new Schema(
    {
        owner:              {type: String},
        name:               {type: String},
        main_img:           {type: String},
        date:               {type: String},
        place:              {type: String},
        short_description:  {type: String},
        long_description:   {type: String},
        map:                {type: String},
        images:             {type: Array},
        likes:              {type: Array},
        comments:           {type: Array},
        chats:              {type: Array},
        available_spots:    {type: Number},
        participants:       {type: Array},
        status:             {type: String}
    }
)

export default mongoose.model("Workshop", Workshop, "workshops")
