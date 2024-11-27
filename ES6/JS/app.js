import sum from './lib.js'
import { learnLanguage, nationality, cut_beard } from './lib2.js'

let result = sum(1,2,3,4,5);
console.log(result);
console.log(learnLanguage, nationality, cut_beard);

// structures de données modernes

const obj = {
    firstname : "Samih"
}

const obj2 = {
    firstname : "Eliott"
}

let list = [obj, obj2];
// ici pour récupérer la valeur eliott je suis obligé de connaitre sa position
// console.log(list[1].firstname); // eliott

// avec MAP, je peux assigner une clef à l'objet eliott, pointer vers cette clef pour récupérer
// la valeur d'Eliott

let listPerson = new Map(
    [
        ["sam", "Samih"],
        ["bric", "Eliott"],
    ]
);

// pou récupérer eliott j'ai une clef en référence
console.log(listPerson.get('bric')); // Eliott

// je peux le faire du coup avec des objets plus compliqués
// ps : la clef peut être de n'importe quel type

let listObj = new Map(
    [
        ["sam", { firstname : "Samih", age : 33, hobbies : ["pêche", "chasse"] }],
        ["marc", { firstname : "Marc", age : 30, hobbies : ["code", "bmw"] }]
    ]
);

let marc = listObj.get("marc").hobbies;
console.log(marc);

listObj.set("maut",{ firstname : "Mautassem", age : 33, hobbies : ["code", "football"] });
console.log(listObj).get("maut");

let listClothes = new Set(["salopette dickies", "bonnet lacoste"]);
listClothes.add("Helas t-shirt");
//--------------------

// opérateur d'exponentation
const base = 2;
const exponent = 3;
console.log(base ** exponent); // 8

//includes
const fruits=["banan", "orange", "strawberry"];
console.log(fruits.includes("banana")); // true
console.log(fruits.includes("kiwi")); // false
