const { performance, PerformanceObserver } = require("perf_hooks")

const letters = ['a','b','c','d','e','f','g','h']
const iterations = 1000000;
let inString = '';

let characters = [];
let noSpaces = [];
let reversed = [];
let uppercase = [];
let outString = '';

const testInliningPerf = () => {
    const perfObserver = new PerformanceObserver(() => {});

    perfObserver.observe({ entryTypes: ["measure"], buffer: true })

    perfTestAverage([
        {name: 'Inline', test: performOperationsInline},
        {name: 'WithFunctions', test: performOperationsWithFunctions},
        {name: 'WithArrowFunctions', test: performOperationsWithArrowFunctions},
        {name: 'WithFunctionsAndDecl', test: performOperationsWithFunctionsAndDecl},
        {name: 'WithArrowFunctionsAndDecl', test: performOperationsWithArrowFunctionsAndDecl},
    ]);
}

function perfTestAverage(tests) {
    for(let index = 0; index < 10; index++) {
        inString = generateRandomString();
        
        for(let testIndex = 0; testIndex < tests.length; testIndex++) {
            perfTest(tests[testIndex].name, tests[testIndex].test);
        }
    }

    for(let testIndex = 0; testIndex < tests.length; testIndex++) {
        printAverageDuration(tests[testIndex].name);
    }
}

function generateRandomString() {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ';
    let charactersLength = characters.length;
    let length = Math.floor(Math.random() * 20) + 1;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function perfTest(name, test) {
    const startName = `${name}-start`;
    const endName = `${name}-end`;

    performance.mark(startName)

    for(index = 0; index < iterations; index ++) {       
        test()
    }

    performance.mark(endName)

    performance.measure(name, startName, endName);
}

function printAverageDuration(name) {
    const entries = performance.getEntriesByName(name);

    const totalDuration = entries.reduce((total, entry) => {
        return total + entry.duration;
    }, 0)

    console.log(name, totalDuration / entries.length);
}

function performOperationsInline() {
    characters = [];
    noSpaces = [];
    reversed = [];
    uppercase = [];
    outString = '';

    for(let index = 0; index < inString.length; index++) {
        characters.push(inString[index]);
    }

    for(let index = 0; index < characters.length; index++) {
        if (characters[index] !== " ") {
            noSpaces.push(characters[index])
        }
    }

    for(let index = noSpaces.length -1; index >= 0; index--) {
        reversed.push(noSpaces[index])
    }

    for(let index = 0; index < reversed.length; index++) {
        uppercase.push(reversed[index])
    }

    for(let index = 0; index < uppercase.length; index++) {
        outString.concat(uppercase[index])
    }
}

function performOperationsWithFunctions() {
    characters = [];
    noSpaces = [];
    reversed = [];
    uppercase = [];
    outString = '';

    joinString(
        uppercaseCharacters(
            reverseCharacters(
                removeSpaces(
                    splitString()
                )
            )
        )
    )
}

function splitString() {
    for(let index = 0; index < inString.length; index++) {
        characters.push(inString[index]);
    }
}

function removeSpaces() {
    for(let index = 0; index < characters.length; index++) {
        if (characters[index] !== " ") {
            noSpaces.push(characters[index])
        }
    }
}

function reverseCharacters() {
    for(let index = noSpaces.length -1; index >= 0; index--) {
        reversed.push(noSpaces[index])
    }
}

function uppercaseCharacters() {
    for(let index = 0; index < reversed.length; index++) {
        uppercase.push(reversed[index])
    }
}

function joinString() {
    for(let index = 0; index < uppercase.length; index++) {
        outString.concat(uppercase[index])
    }
}

function performOperationsWithArrowFunctions() {
    characters = [];
    noSpaces = [];
    reversed = [];
    uppercase = [];
    outString = '';

    joinStringArrow(
        uppercaseCharactersArrow(
            reverseCharactersArrow(
                removeSpacesArrow(
                    splitStringArrow()
                )
            )
        )
    )
}

const splitStringArrow = () => {
    for(let index = 0; index < inString.length; index++) {
        characters.push(inString[index]);
    }
}

const removeSpacesArrow = () => {
    for(let index = 0; index < characters.length; index++) {
        if (characters[index] !== " ") {
            noSpaces.push(characters[index])
        }
    }
}

const reverseCharactersArrow = () => {
    for(let index = noSpaces.length -1; index >= 0; index--) {
        reversed.push(noSpaces[index])
    }
}

const uppercaseCharactersArrow = () => {
    for(let index = 0; index < reversed.length; index++) {
        uppercase.push(reversed[index])
    }
}

const joinStringArrow = () => {
    for(let index = 0; index < uppercase.length; index++) {
        outString.concat(uppercase[index])
    }
}


function performOperationsWithFunctionsAndDecl() {
    joinStringDecl(
        uppercaseCharactersDecl(
            reverseCharactersDecl(
                removeSpacesDecl(
                    splitStringDecl(inString)
                )
            )
        )
    )
}

function splitStringDecl(input) {
    const chars = [];
    
    for(let index = 0; index < input.length; index++) {
        chars.push(input[index]);
    }

    return chars;
}

function removeSpacesDecl(input) {
    const chars = [];

    for(let index = 0; index < input.length; index++) {
        if (input[index] !== " ") {
            chars.push(input[index])
        }
    }

    return chars;
}

function reverseCharactersDecl(input) {
    const chars = [];

    for(let index = input.length -1; index >= 0; index--) {
       chars.push(input[index])
    }

    return chars
}

function uppercaseCharactersDecl(input) {
    const chars = [];

    for(let index = 0; index < input.length; index++) {
        chars.push(input[index])
    }

    return chars;
}

function joinStringDecl(input) {
    const output = '';

    for(let index = 0; index < input.length; index++) {
        output.concat(input[index])
    }

    return output
}



function performOperationsWithArrowFunctionsAndDecl() {
    joinStringArrowDecl(
        uppercaseCharactersArrowDecl(
            reverseCharactersArrowDecl(
                removeSpacesArrowDecl(
                    splitStringArrowDecl(inString)
                )
            )
        )
    )
}

const splitStringArrowDecl = (input) => {
    const chars = [];
    
    for(let index = 0; index < input.length; index++) {
        chars.push(input[index]);
    }

    return chars;
}

const removeSpacesArrowDecl = (input) => {
    const chars = [];

    for(let index = 0; index < input.length; index++) {
        if (input[index] !== " ") {
            chars.push(input[index])
        }
    }

    return chars;
}

const reverseCharactersArrowDecl = (input) => {
    const chars = [];

    for(let index = input.length -1; index >= 0; index--) {
       chars.push(input[index])
    }

    return chars
}

const uppercaseCharactersArrowDecl = (input) => {
    const chars = [];

    for(let index = 0; index < input.length; index++) {
        chars.push(input[index])
    }

    return chars;
}

const joinStringArrowDecl = (input) => {
    const output = '';

    for(let index = 0; index < input.length; index++) {
        output.concat(input[index])
    }

    return output
}

testInliningPerf();