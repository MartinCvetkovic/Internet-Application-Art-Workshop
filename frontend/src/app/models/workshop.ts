import { Comment } from "./comment";
import { Participant } from "./participant";

export class Workshop {
        _id:                string;
        owner:              string;
        name:               string;
        main_img:           string;
        date:               string;
        place:              string;
        short_description:  string;
        long_description:   string;
        map:                string;
        images:             Array<string>;
        likes:              Array<string>;
        comments:           Array<Comment>;
        chats:              Array<Array<Object>>;
        available_spots:    Number;
        participants:       Array<Participant>;
        status:             string;
}
