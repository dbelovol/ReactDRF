import React from 'react'
import { normalize, schema } from 'normalizr';

export default function Normalize(){
    let originalData = [
      {
          "id": 1,
          "url": "starting page",
          "picture": "http://localhost:8000/page/pict.jpg",
          "parent": null,
          "header": "стартовая страница",
          "text": "",
          "features": []
      },
      {
          "id": 3,
          "url": "child page",
          "picture": "http://localhost:8000/page/pict.jpg",
          "parent": 1,
          "header": "дочерняя страница",
          "text": "некий текст",
          "features": []
      },
      {
          "id": 4,
          "url": "",
          "picture": null,
          "parent": null,
          "header": "",
          "text": "",
          "features": []
      }
  ]
  const pageSchema = new schema.Entity('pages');

  // or use shorthand syntax:
  const pageListSchema = [pageSchema];
  
const normalizedData = normalize(originalData, pageListSchema)
console.log(normalizedData)
return <p> Done</p>

}
