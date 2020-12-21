export class Topic
{
    constructor(
        public _id: string,
        public title: String,
        public content: String,
        public code: String,
        public lang: String,
        public date: String,
        public user: any,
        public comments: any
    ) 
    {   
    
    }
}

// var TopicSchema = Schema ({
//     title: String,
//     content: String,
//     code: String,
//     lang: String,
//     date: {type: Date, default: Date.now},
//     user: {type: Schema.ObjectId, ref: 'User'},
//     comments: [CommentsShema]
// });
