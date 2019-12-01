import React from 'react'
import { normalize, schema } from 'normalizr';
import {pageSchema, pagesSchema} from './Schema/schema.jsx'

export default function Normalize(){

const pages_data = [
    {
        "id": 0,
        "url": "Стартовая страница",
        "picture": "http://localhost:8000/media/images/pages/Depositphotos_19448249_xl-2015.jpg",
        "parent": 0,
        "header": "ТМК ПЛЮС",
        "text": "Освобождаем от рутины",
        "features": []
    },
    {
        "id": 6,
        "url": "кадровый аутсорсинг",
        "picture": "http://localhost:8000/media/images/pages/Depositphotos_33035993_xl-2015.jpg",
        "parent": 0,
        "header": "Кадровый аутсорсинг",
        "text": "Кадровый аутсорсинг (кадровое сопровождение) — это привлечение сторонних компаний, специализирующихся на управлении персоналом и обладающих необходимым опытом для обеспечения четкого функционирования всех HR-процессов. Клиенту остается лишь поставить необходимые задачи перед компанией, предоставляющей эти услуги.",
        "features": [
            {
                "id": 2,
                "name": "Ежемесячное обслуживание",
                "measure": "от 5 человек",
                "price": 6000.0
            },
            {
                "id": 3,
                "name": "Консультации",
                "measure": "Бесплатно",
                "price": null
            }
        ]
    },
    {
        "id": 7,
        "url": "Бухгалтерские услуги",
        "picture": "http://localhost:8000/media/images/pages/Depositphotos_11632587_xl-2015.jpg",
        "parent": 0,
        "header": "Бухгалтерские услуги",
        "text": "Бухгалтерское сопровождение — это не просто услуга, а комплексный подход по сопровождению бизнеса. Поэтому, необходимо подходить к выбору партнера взвешенно и разумно. Обращаясь к нам, Вы получите максимально полный и качественный учет, а также сможете пользоваться услугами наших юристов, налоговых консультантов и аудиторов, а персональный менеджер будет всегда готов помочь в решении Ваших задач.",
        "features": [
            {
                "id": 4,
                "name": "Сопровождение ООО",
                "measure": "руб",
                "price": 1700.0
            },
            {
                "id": 5,
                "name": "Сопровождение ИП",
                "measure": "руб",
                "price": 450.0
            },
            {
                "id": 6,
                "name": "Сопровождение АО",
                "measure": "руб",
                "price": 3000.0
            }
        ]
    },
    {
        "id": 8,
        "url": "регистрация предприятий",
        "picture": "http://localhost:8000/media/images/pages/Depositphotos_222670292_xl-2015_CBDZdsm.jpg",
        "parent": 0,
        "header": "регистрация предприятий",
        "text": "Регистрация юридического лица производится, как для новых проектов, так и для уже существующий, которые хотят вести деятельность официально или если необходимо изменить форму собственности. При любом сценарии, наши юристы помогут выбрать систему налогообложения, коды видов деятельности, а также проконсультируют по поводу выбора юридического адреса.",
        "features": [
            {
                "id": 7,
                "name": "регистрация ООО",
                "measure": "руб",
                "price": 8000.0
            },
            {
                "id": 8,
                "name": "С бухгалтерским обслуживанием",
                "measure": "Бесплатно",
                "price": null
            },
            {
                "id": 9,
                "name": "представитель",
                "measure": "руб",
                "price": 3500.0
            }
        ]
    },
    {
        "id": 9,
        "url": "Ликвидация предприятий",
        "picture": "http://localhost:8000/media/images/pages/Depositphotos_222670292_xl-2015_XZpWgOa.jpg",
        "parent": 0,
        "header": "Ликвидация предприятий",
        "text": "Добровольная ликвидация предприятия от компании «ТМК+» – это не только подготовка документов на ликвидацию компании, но и мини аудит с оценкой рисков и успешности процедуры. Наши юристы организуют процесс учитывая текущее состояние бухгалтерского и налогового учета, задолженностей и так далее. При необходимости, над проектом работают аудиторы и бухгалтеры, чтобы провести ликвидацию под ключ.",
        "features": [
            {
                "id": 10,
                "name": "Подготовка документов",
                "measure": "руб",
                "price": 10000.0
            },
            {
                "id": 11,
                "name": "консультации",
                "measure": "Бесплатно",
                "price": null
            },
            {
                "id": 12,
                "name": "представитель",
                "measure": "руб",
                "price": 13000.0
            }
        ]
    },
    {
        "id": 10,
        "url": "Бухгалтерское сопровождение",
        "picture": "http://localhost:8000/media/images/pages/Depositphotos_49571245_xl-2015.jpg",
        "parent": 7,
        "header": "Бухгалтерское сопровождение",
        "text": "onec quis nisl sit amet purus vulputate imperdiet quis vel ex. Etiam elit tortor, accumsan et ultricies non, volutpat vel odio. Fusce ac diam venenatis, pulvinar ante et, tincidunt mi. Fusce laoreet elit ac felis efficitur, quis porta arcu auctor. Nam pretium, est vitae dignissim finibus, dolor lectus volutpat leo, non efficitur nibh urna luctus tellus. Mauris viverra luctus felis vitae placerat. Ut interdum, magna ac lobortis sollicitudin, odio risus tempus diam, sed pretium augue lacus eu leo. Vivamus accumsan porttitor libero non eleifend. Proin suscipit hendrerit consectetur. Morbi et ex sit amet arcu rhoncus consectetur nec nec ipsum. Cras id justo vel tortor consequat dignissim et id est. Suspendisse cursus sollicitudin rutrum. Proin a est vitae dolor lobortis dignissim a a quam. Sed eget turpis id nunc sagittis hendrerit in sit amet magna. Nulla aliquet quis eros a lacinia. Morbi euismod aliquet ipsum, vel sagittis mauris bibendum ut.",
        "features": [
            {
                "id": 13,
                "name": "Сопровождение ООО",
                "measure": "руб",
                "price": 1800.0
            },
            {
                "id": 14,
                "name": "Сопровождение ИП",
                "measure": "руб",
                "price": 500.0
            },
            {
                "id": 15,
                "name": "Сопровождение кадров",
                "measure": "руб",
                "price": 2000.0
            }
        ]
    }
]

const page_data = {
    "id": 10,
    "url": "Бухгалтерское сопровождение",
    "picture": "http://localhost:8000/media/images/pages/Depositphotos_49571245_xl-2015.jpg",
    "parent": 7,
    "header": "Бухгалтерское сопровождение",
    "text": "onec quis nisl sit amet purus vulputate imperdiet quis vel ex. Etiam elit tortor, accumsan et ultricies non, volutpat vel odio. Fusce ac diam venenatis, pulvinar ante et, tincidunt mi. Fusce laoreet elit ac felis efficitur, quis porta arcu auctor. Nam pretium, est vitae dignissim finibus, dolor lectus volutpat leo, non efficitur nibh urna luctus tellus. Mauris viverra luctus felis vitae placerat. Ut interdum, magna ac lobortis sollicitudin, odio risus tempus diam, sed pretium augue lacus eu leo. Vivamus accumsan porttitor libero non eleifend. Proin suscipit hendrerit consectetur. Morbi et ex sit amet arcu rhoncus consectetur nec nec ipsum. Cras id justo vel tortor consequat dignissim et id est. Suspendisse cursus sollicitudin rutrum. Proin a est vitae dolor lobortis dignissim a a quam. Sed eget turpis id nunc sagittis hendrerit in sit amet magna. Nulla aliquet quis eros a lacinia. Morbi euismod aliquet ipsum, vel sagittis mauris bibendum ut.",
    "text_blocks": [
        {
            "id": 8,
            "side": "L",
            "order": 1,
            "block": {
                "id": 2,
                "header": "ответ на вопрос - зачем это нужно",
                "paragraphs": [
                    {
                        "id": 6,
                        "text": "Mauris sit amet quam metus. Pellentesque sit amet urna id neque pulvinar sodales. Vestibulum ut augue rutrum, finibus lorem ac, lacinia nisi. In vel dui rhoncus, interdum sem vel, bibendum erat. Sed fermentum auctor elit, nec faucibus mauris tincidunt quis. Nulla a fringilla purus. Ut commodo congue dui id faucibus. Nam eget mi libero. Curabitur sed volutpat mi, eu fermentum purus. Suspendisse mollis vehicula libero, id finibus ex hendrerit commodo. Donec accumsan urna sit amet orci ultrices, quis euismod libero posuere. Ut vel fermentum ligula."
                    }
                ]
            }
        },
        {
            "id": 9,
            "side": "L",
            "order": 20,
            "block": {
                "id": 3,
                "header": "Бла-бла-бла про бухгалтерское сопровождение",
                "paragraphs": [
                    {
                        "id": 7,
                        "text": "Mauris sit amet quam metus. Pellentesque sit amet urna id neque pulvinar sodales. Vestibulum ut augue rutrum, finibus lorem ac, lacinia nisi. In vel dui rhoncus, interdum sem vel, bibendum erat. Sed fermentum auctor elit, nec faucibus mauris tincidunt quis. Nulla a fringilla purus. Ut commodo congue dui id faucibus. Nam eget mi libero. Curabitur sed volutpat mi, eu fermentum purus. Suspendisse mollis vehicula libero, id finibus ex hendrerit commodo. Donec accumsan urna sit amet orci ultrices, quis euismod libero posuere. Ut vel fermentum ligula.\r\n Vivamus accumsan porttitor libero non eleifend. Proin suscipit hendrerit consectetur. Morbi et ex sit amet arcu rhoncus consectetur nec nec ipsum. Cras id justo vel tortor consequat dignissim et id est. Suspendisse cursus sollicitudin rutrum. Proin a est vitae dolor lobortis dignissim a a quam. Sed eget turpis id nunc sagittis hendrerit in sit amet magna. Nulla aliquet quis eros a lacinia. Morbi euismod aliquet ipsum, vel sagittis mauris bibendum ut."
                    }
                ]
            }
        }
    ],
    "link_blocks": [
        {
            "id": 6,
            "side": "R",
            "order": 3,
            "block": {
                "id": 2,
                "header": "Вам также может быть интересно",
                "position": "S",
                "links": [
                    {
                        "id": 5,
                        "text": "Mauris sit amet quam metus. Pellentesque sit amet urna id neque pulvinar sodales.",
                        "measure": "руб/мес",
                        "price": 4000.0,
                        "page": 9
                    },
                    {
                        "id": 6,
                        "text": "Mauris sit amet quam metus. Pellentesque sit amet urna id neque pulvinar sodales.",
                        "measure": "руб",
                        "price": 8000.0,
                        "page": 8
                    },
                    {
                        "id": 7,
                        "text": "Mauris sit amet quam metus. Pellentesque sit amet urna id neque pulvinar sodales.",
                        "measure": "руб",
                        "price": 6000.0,
                        "page": 6
                    }
                ]
            }
        }
    ],
    "avatar_blocks": [
        {
            "id": 6,
            "side": "L",
            "order": 3,
            "block": {
                "id": 2,
                "header": "Слово клиенту",
                "position": "U",
                "avatars": [
                    {
                        "id": 4,
                        "header": "Бородатый мужик",
                        "name": "Петр Житников",
                        "position": "Директор ООО \"ЗагородСтрой\"",
                        "speech": "Прямая речь клиента. О том, как все замечательно. С конкретным примером. Вариант - сэкономили на налогах такую-то сумму.",
                        "photo": "http://localhost:8000/media/images/avatars/Depositphotos_208431120_xl-2015_1_uRl8yNR.jpg",
                        "circle": true
                    }
                ]
            }
        },
        {
            "id": 7,
            "side": "R",
            "order": 1,
            "block": {
                "id": 3,
                "header": "Слово специалисту",
                "position": "U",
                "avatars": [
                    {
                        "id": 5,
                        "header": "Главбух",
                        "name": "Некрасова Алла Алексеевна",
                        "position": "Главный бухгалтер",
                        "speech": "Прямая речь сотрудника. О том, как важно доверить не абы кому, а профессионалам с большой буквы.",
                        "photo": "http://localhost:8000/media/images/avatars/Depositphotos_169429666_xl-2015.jpg",
                        "circle": false
                    }
                ]
            }
        }
    ],
    "icon_blocks": [
        {
            "id": 6,
            "side": "L",
            "order": 4,
            "block": {
                "id": 2,
                "header": "Преимущества работы с нами",
                "position": "U",
                "icons": [
                    {
                        "id": 7,
                        "text": "Mauris sit amet quam metus. Pellentesque sit amet urna id neque pulvinar sodales. Vestibulum ut augue rutrum, finibus lorem ac, lacinia nisi. In vel dui rhoncus, interdum sem vel, bibendum erat",
                        "name": "fa fa-comments",
                        "header": "Преимущество 1"
                    },
                    {
                        "id": 8,
                        "text": "Mauris sit amet quam metus. Pellentesque sit amet urna id neque pulvinar sodales. Vestibulum ut augue rutrum, finibus lorem ac, lacinia nisi. In vel dui rhoncus, interdum sem vel, bibendum erat.",
                        "name": "fa fa-stamp",
                        "header": "Преимущество 2"
                    },
                    {
                        "id": 9,
                        "text": "Mauris sit amet quam metus. Pellentesque sit amet urna id neque pulvinar sodales. Vestibulum ut augue rutrum, finibus lorem ac, lacinia nisi. In vel dui rhoncus, interdum sem vel, bibendum erat.",
                        "name": "fa fa-wallet",
                        "header": "Преимущество 3"
                    }
                ]
            }
        },
        {
            "id": 7,
            "side": "R",
            "order": 2,
            "block": {
                "id": 3,
                "header": "Что вы получаете",
                "position": "S",
                "icons": [
                    {
                        "id": 10,
                        "text": "Mauris sit amet quam metus. Pellentesque sit amet urna id neque pulvinar sodales. Vestibulum ut augue rutrum, finibus lorem ac, lacinia nisi. In vel dui rhoncus, interdum sem vel, bibendum erat.",
                        "name": "fa fa-tags",
                        "header": "Фича 1"
                    },
                    {
                        "id": 11,
                        "text": "Mauris sit amet quam metus. Pellentesque sit amet urna id neque pulvinar sodales. Vestibulum ut augue rutrum, finibus lorem ac, lacinia nisi. In vel dui rhoncus, interdum sem vel, bibendum erat.",
                        "name": "fa fa-tags",
                        "header": "Фича 2"
                    },
                    {
                        "id": 12,
                        "text": "Mauris sit amet quam metus. Pellentesque sit amet urna id neque pulvinar sodales. Vestibulum ut augue rutrum, finibus lorem ac, lacinia nisi. In vel dui rhoncus, interdum sem vel, bibendum erat.",
                        "name": "fa fa-tags",
                        "header": "Фича 3"
                    }
                ]
            }
        }
    ],
    "table": [
        {
            "id": 1,
            "side": "L",
            "order": 5,
            "table": {
                "id": 1,
                "header": "Таблица с тарифами",
                "subheader": "Количество операций в месяц",
                "cols": 7,
                "rows": 5,
                "col_header": "; 0; 1-9; 10-20; 21-70;71-125; Свыше 125",
                "row_header": "ИП на УСН; ООО на УСН; ИП на ОСН; ООО на",
                "measure": "руб",
                "table_rows": [
                    {
                        "id": 1,
                        "row": "500; 600;800; 1000; 2000; Обратитесь к менеджеру"
                    },
                    {
                        "id": 2,
                        "row": "500; 1000;1300; 1500; 2500; Обратитесь к менеджеру"
                    },
                    {
                        "id": 3,
                        "row": "1100; 1500; 2000; 4000; 5000; Обратитесь к менеджеру"
                    },
                    {
                        "id": 4,
                        "row": "2100; 2500; 3000; 5000; 6000; Обратитесь к менеджеру"
                    }
                ]
            }
        }
    ],
    "offer": [
        {
            "id": 1,
            "side": "L",
            "order": 5,
            "offer": {
                "id": 1,
                "header": "Оффер",
                "measure": "%",
                "text": "Mauris sit amet quam metus. Pellentesque sit amet urna id neque pulvinar sodales. Vestibulum ut augue rutrum, finibus lorem ac, lacinia nisi. In vel dui rhoncus, interdum sem vel, bibendum erat. Sed fermentum auctor elit, nec faucibus mauris tincidunt quis. Nulla a fringilla purus.",
                "value": "15"
            }
        }
    ]
}


const normalizedData = normalize(page_data, pageSchema);

console.log(normalize(page_data, page), normalize(pages_data, pagesSchema))

// const data = { owner:[ { id: 1, type: 'user', name: 'Anne' }, { id: 1, type: 'group', name: 'Anne' }, { id:3 , type: 'group', name: 'Anne' } ]};

// const user = new schema.Entity('users');
// const group = new schema.Entity('groups');
// const unionSchema = new schema.Union(
//   {
//     user: user,
//     group: group
//   },
//   'type'
// );

// const normalizedData1 = normalize(data, { owner: [unionSchema] });
// console.log(normalizedData1)

return <p> Done</p>

}
