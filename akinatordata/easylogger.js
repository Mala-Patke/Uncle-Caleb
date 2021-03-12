const fs = require('fs');

let template = `,
    {
        "id":"string",
        "name":"name",
        "il/grade":"IL#",
        "Gender":"string",
        "hair_color":"string",
        "ethnicity":"string",
        "goestokls":true,
        "hasgonetokls":true,
        "enjoy": [
            {
                "action":"string",
                "prompttype":"integer"
            },
            {
                "action":"string",
                "prompttype":"integer"
            }
        ],
        "unique": [
            {
                "action":"string",
                "prompttype":"integer"
            },
            {
                "action":"string",
                "prompttype":"integer"
            }
        ]
    }`;

let currentdata = fs.readFileSync('./akinator.json').toString();
const akinator = currentdata.slice(0, currentdata.length-2).concat(template, "\n]")

fs.writeFileSync('./akinator.json', akinator);
console.log('Logged!');