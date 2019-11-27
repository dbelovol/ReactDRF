import React from 'react'
import { normalize, schema } from 'normalizr';

export default function Normalize(){

//   const inputData = [
//     {
//         "id": "1",
//         "title": "My first post!",
//         "author": {
//             "id": "123",
//             "name": "Paul"
//         },
//         "comments": [
//             {
//                 "id": "249",
//                 "content": "Nice post!",
//                 "commenter": {
//                     "id": "245",
//                     "name": "Jane"
//                 }
//             },
//             {
//                 "id": "250",
//                 "content": "Thanks!",
//                 "commenter": {
//                     "id": "123",
//                     "name": "Paul"
//                 }
//             }
//         ]
//     },
//     {
//         "id": "2",
//         "title": "This other post",
//         "author": {
//             "id": "123",
//             "name": "Paul"
//         },
//         "comments": [
//             {
//                 "id": "251",
//                 "content": "Your other post was nicer",
//                 "commenter": {
//                     "id": "245",
//                     "name": "Jane"
//                 }
//             },
//             {
//                 "id": "252",
//                 "content": "I am a spammer!",
//                 "commenter": {
//                     "id": "246",
//                     "name": "Spambot5000"
//                 }
//             }
//         ]
//     }
// ]



//   const userProcessStrategy = (value, parent, key) => {
//     console.log("Here it is",key)
//     switch (key) {
//       case 'author':
//         return { ...value, posts: [parent.id] };
//       case 'commenter':
//         return { ...value, comments: [parent.id] };
//       default:
//         return { ...value };
//     }
//   };
  
//   const userMergeStrategy = (entityA, entityB) => {
//     return {
//       ...entityA,
//       ...entityB,
//       posts: [...(entityA.posts || []), ...(entityB.posts || [])],
//       comments: [...(entityA.comments || []), ...(entityB.comments || [])]
//     };
//   };
  
//   const user = new schema.Entity(
//     'users',
//     {},
//     {
//       idAttribute : (value, parent, key)=> {console.log(key); return value.id},
//       mergeStrategy: userMergeStrategy,
//       processStrategy: userProcessStrategy
//     }
//   );
  
//   const comment = new schema.Entity(
//     'comments',
//     {
//       commenter: user
//     },
//     {
//       processStrategy: (value, parent, key) => {
//         return { ...value, post: parent.id };
//       }
//     }
//   );
  
//   const post = new schema.Entity('posts', {
//     author: user,
//     comments: [comment]
//   });
  
//   const normalizedData = normalize(inputData, [post]);
// const data = { users: [{ id: '123', name: 'Beth' }], hoosers: [{ id: '123', name: 'Beth'}], age: 2};

// const user = new schema.Entity('users');
// const hooser = new schema.Entity('hoosers');
// //const responseSchema = new schema.Object({ users: new schema.Array(user) });
// // or shorthand
// const responseSchema = { users: [user], hoosers: [hooser] };
const page_data = {
    "id": 3,
    "url": "child page",
    "picture": "http://localhost:8000/media/pict.jpg",
    "parent": 1,
    "header": "дочерняя страница",
    "text": "некий текст",
    "text_blocks": [
        {
            "id": 2,
            "side": "L",
            "order": 2,
            "block": {
                "id": 6,
                "header": "block's header",
                "paragraphs": [{id:1, text: "fff"},{id:2, text: "mmm"} ]
            }
        },
        {
            "id": 3,
            "side": "L",
            "order": 2,
            "block": {
                "id": 8,
                "header": "block's header",
                "paragraphs": [{id:4, text: "eee"},{id:2, text: "zzz"} ]
            }
        },
    ],
    "table": [],
    "offer": [],
    "features": []


}

const paragraph = new schema.Entity('paragraphs')
const block = new schema.Entity('text_blocks',
{paragraphs: [paragraph]}
)
const page_block = new schema.Object(
{
    block: block
}
)

const page_array = new schema.Array(
page_block 

)

const page = new schema.Object(
{
    text_blocks: page_array
}
)

const normalizedData = normalize(page_data, page);
console.log(normalizedData)

const data = { owner:[ { id: 1, type: 'user', name: 'Anne' }, { id: 1, type: 'group', name: 'Anne' }, { id:3 , type: 'group', name: 'Anne' } ]};

const user = new schema.Entity('users');
const group = new schema.Entity('groups');
const unionSchema = new schema.Union(
  {
    user: user,
    group: group
  },
  'type'
);

const normalizedData1 = normalize(data, { owner: [unionSchema] });
console.log(normalizedData1)

return <p> Done</p>

}
