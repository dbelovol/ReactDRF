import React from 'react'
import { slugify as address} from 'transliteration';
import urlJoin from 'url-join';
import random from 'random';
/*
 * Начальное состояние приложения для режима разработки
 * API не подключен
 */
 
 const dataArray = [
     "/", //0
    "Кадровый аутсорсинг", //1
    "Бухгалтерские услуги",//2
    "Регистрация компаний",//3
    "Восстановление бухгалтерской отчетности",//4
    "Экспресс аудит",//5
    "Нулевая отчетность",//6
    "Составление 3-НДФЛ для физических лиц",//7
    "Подготовка и сдача отчетности по алкоголю",//8
    "Консультирование по вопросам бухгалтерского и налогового учета",//9
    "Подготовка и подача налоговой декларации",//10
    "Налоговая оптимизация",//11
    "Восстановление бухгалтерской отчетности при УСН",//12
    "Бухгалтерское обслуживание ТСЖ", //13
    "Бухгалтерское обслуживание ресторана",//14
    "Расчет заработной платы",//15
    "Бухгалтерский консалтинг",//16
    "Бухгалтерское сопровождение УСН",//17
    "Регистрация юридических лиц",//18
    "Регистрация ИП",//19
    "Регистрация ООО",//20
    "Регистрация НКО",//21
    "Регистрация АО",//22
    "По доверенности через представителя",//23
    "С иностранным учредителем",//24
    "С несколькими учредителями",//25
    "С минимальным уставным капиталом",//26
    "С типовым уставом",//27
    "В России для иностранных граждан",//28
    "Ликвидация юридических лиц",//29
    "Ликвидация ИП",//30
    "Ликвидация ООО",//31
    "Ликвидация ООО с долгами",//32
    "Ликвидация ООО с нулевым балансом",//33
    "Реорганизация ООО",//34
    "Ликвидация компаний",//35
    "Удаленная бухгалтерия",//36
    "Абонентское бухгалтерское обслуживание",//37
    ];
    
    const pagePictures = [
    "/IMG/Depositphotos_33035993_xl-2015.jpg",
    "/IMG/Depositphotos_11632587_xl-2015.jpg",
    "/IMG/Depositphotos_222670292_xl-2015.jpg",
    "/IMG/Depositphotos_49571245_xl-2015.jpg"
    ]
        
    const transformedDataArray = dataArray.map(el => address(el))
    let urlDataArray=[]
    
    function node (prev_node,tree,level, url){
        if (tree[prev_node].childs) {
            tree[prev_node].level = level
            urlDataArray[prev_node]= url
            for (const i of tree[prev_node].childs.values()) {
                node (i,tree,level+1, urlJoin(url, transformedDataArray[i]))
            }
        }
         else {
             tree[prev_node].level = level
             urlDataArray[prev_node]= url

        }
    }
                
    
    const start_tree = {
        0: {
            parent:0
        },
        1: {
            parent:0
        },
        2: {
            parent:0
        },
        3: {
            parent:0
        },
        35: {
            parent:0
        },
        4: {
            parent:2
        },
        5: {
            parent:2
        },
        6: {
            parent:2
        },
        7: {
            parent:2
        },
        8: {
            parent:2
        },
        9: {
            parent:2
        },
        10: {
            parent:2
        },
        11: {
            parent:2
        },
        36: {
            parent:2
        },
        37: {
            parent:2
        },
        18: {
            parent:3
        },
        19: {
            parent:3
        },
        20: {
            parent:3
        },
        21: {
            parent:3
        },
        22: {
            parent:3
        },
        29: {
            parent:35
        },
        30: {
            parent:35
        },
        31: {
            parent:35
        },
        32: {
            parent:35
        },
        33: {
            parent:35
        },
        34: {
            parent:35
        },
        12: {
            parent:4
        },
        23: {
            parent:20
        },
        24: {
            parent:20
        },
        25: {
            parent:20
        },
        26: {
            parent:20
        },
        27: {
            parent:20
        },
        28: {
            parent:20
        },
        13: {
            parent:37
        },
        14: {
            parent:37
        },
        15: {
            parent:37
        },    
        16: {
            parent:37
        },
        17: {
            parent:37
        },
    };
    /*const tree = {
         0:{
             childs: [1,2,3,35],
             level: 0,
             current: 2,
             parent: 0,
         },
         
         2: {
             childs: [4,5,6,7,8,9,10,11,36,37],
             level: 1,
             current:4,
             parent:0
         },
         3: {
             childs: [18,19,20,21,22],
             level: 1,
             current: 0,
             parent: 0
         },
         35: {
             childs: [29,30,31,32,33,34],
             level: 1,
             current:0,
             parent: 0,
         },
         4:{
             childs: [12],
             level: 2,
             current: 0,
             parent: 2
         },
         20:{
             childs: [23,24,25,26,27,28],
             level: 2,
             current: 0,
             parent: 3,
         },
         37:{
             childs: [13,14,15,16,17],
             level: 2,
             current:0,
             parent: 2,
         },
     };
    */ 
     for (let [key,value] of Object.entries(start_tree)) {
        if (start_tree[value.parent].childs) { 
            start_tree[value.parent].childs.push(key)
        }
        else {
            start_tree[value.parent].childs=[]
            start_tree[value.parent].childs[0]=key
        }
     }
     
     const ind = start_tree[0].childs.findIndex((el) => el == 0)
     start_tree[0].childs.splice(ind,(ind >= 0 ? 1 :0))
     
     node (0,start_tree,0,"/")
     
    //  for (var i = 0; i < 3 ; i++) {
    //      for (let [key,value] of Object.entries(start_tree)) {
    //          if (value.level == i) {
    //              for (var j in value.childs){
    //                  urlDataArray[value.childs[j]]=urlJoin(urlDataArray[key],transformedDataArray[value.childs[j]])
    //              }
    //          }
    //      }
    //  }
    
    const randomPict  =  random.uniformInt(0,pagePictures.length-1)
    const pages = urlDataArray.map((el,i) => ({id: i, name: dataArray[i], url: el, picture: pagePictures[ randomPict()]}))
    
    export const initialState = {
        pages: pages,
        tree: start_tree,
        currentPage: 0
    }
    
    export default function Data () {
    
    return (
        <>
            {pages.map((item,i) => <div key={i}> {item.name}&nbsp;{item.url}&nbsp;{i} </div>)}
            
        </>
    )
}
