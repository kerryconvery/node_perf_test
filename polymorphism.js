const { performance, PerformanceObserver } = require("perf_hooks")

const iterations = 100000;

class Shape {
    getArea() {
        return 0;
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();

        this.radius = radius;
    }
    getArea() {
        return this.radius * this.radius * Math.PI; 
    }
}

class Square extends Shape {
    constructor(size) {
        super();
        
        this.size = size;
    }
    
    getArea() {
        return this.size * 2; 
    }
}

class Triangle extends Shape {
    constructor(base, height) {
        super();

        this.base = base;
        this.height = height;
    }

    getArea() {
        return 0.5 * this.base * this.height; 
    }
}

class Rectangle extends Shape {
    constructor(length, height) {
        super();

        this.length = length;
        this.height = height;
    }

    getArea() {
        return this.length * this.height;
    }
}

const circle = {
    type: 'CIRCLE',
    radius: 10
}

const square = {
    type: 'SQUARE',
    size: 15,
}

const triangle = {
    type: 'TRIANGLE',
    base: 15,
    height: 20,
}

const rectangle = {
    type: 'RECTANGLE',
    length: 25,
    height: 5,
}

const getCircleArea = (shape) => () => {
    return shape.radius * shape.radius * Math.PI;
}

const getSquareArea = (shape) => () => {
    return shape.size * 2;
}

const getTriangleArea = (shape) => () => {
    return 0.5 * shape.base * shape.height;
}

const getRectangleArea = (shape) => () => {
    return shape.length * shape.height;
}

const getShapeAreaC = getCircleArea(circle);
const getShapeAreaS = getSquareArea(square);
const getShapeAreaT = getTriangleArea(triangle);
const getShapeAreaR = getRectangleArea(rectangle);

const circleObj = new Circle(circle.radius);
const squareObj = new Square(square.size);
const triangleObj = new Triangle(triangle.base, triangle.height);
const rectangleObj = new Rectangle(rectangle.length, rectangle.height);

function getObjectArea(shape) {
    return shape.getArea();
}

function getShapeArea (shape) {
    switch(shape.type) {
        case 'CIRCLE': return shape.radius * shape.radius * Math.PI;
        case 'SQUARE': return shape.size * 2;
        case 'TRIANGLE': return 0.5 * shape.base * shape.height;
        case 'RECTANGLE': return shape.length * shape.height;
    }

    return 0;
}

function getShapeAreaUsingIf(shape) {
    if (shape.type === 'CIRCLE') {
        return shape.radius * shape.radius * Math.PI
    }

    if (shape.type === 'SQUARE') {
        return shape.size * 2
    }

    if (shape.type === 'TRIANGLE') {
        return 0.5 * shape.base * shape.height
    }

    if (shape.type === 'RECTANGLE') {
        return shape.length * shape.height;
    }

    return 0;
}

const ShapeMap = {
    'CIRCLE': (shape) => shape.radius * shape.radius * Math.PI,
    'SQUARE': (shape) => shape.size * 2,
    'TRIANGLE': (shape) => 0.5 * shape.base * shape.height,
    'RECTANGLE': (shape) => shape.length * shape.height
}

function getShapeAreaUsingMap(shape) {
    return ShapeMap[shape.type](shape);
}


const testInliningPerf = () => {
    const perfObserver = new PerformanceObserver(() => {});

    perfObserver.observe({ entryTypes: ["measure"], buffer: true })

    perfTestAverage([
        {name: 'SwitchStatement', test: testUsingSwitchStatement},
        {name: 'CurriedFunctions', test: testUsingCurriedFunctions},
        {name: 'Classes', test: testUsingClasses},
        {name: 'IfStatements', test: testUsingIfStatements},
        {name: 'Map', test: testUsingMap}
    ]);
}

function perfTestAverage(tests) {
    for(let index = 0; index < 10; index++) {
        for(let testIndex = 0; testIndex < tests.length; testIndex++) {
            perfTest(tests[testIndex].name, tests[testIndex].test);
        }
    }

    for(let testIndex = 0; testIndex < tests.length; testIndex++) {
        printAverageDuration(tests[testIndex].name);
    }
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

function testUsingSwitchStatement() {
    getShapeArea(circle);
    getShapeArea(square);
    getShapeArea(triangle);
    getShapeArea(rectangle);
}

function testUsingCurriedFunctions() {
    getShapeAreaC();
    getShapeAreaS();
    getShapeAreaT();
    getShapeAreaR();
}

function testUsingClasses() {
    getObjectArea(circleObj);
    getObjectArea(squareObj);
    getObjectArea(triangleObj);
    getObjectArea(rectangleObj);
}

function testUsingIfStatements() {
    getShapeAreaUsingIf(circle);
    getShapeAreaUsingIf(square);
    getShapeAreaUsingIf(triangle);
    getShapeAreaUsingIf(rectangle);
}

function testUsingMap() {
    getShapeAreaUsingMap(circle);
    getShapeAreaUsingMap(square);
    getShapeAreaUsingMap(triangle);
    getShapeAreaUsingMap(rectangle);
}

testInliningPerf();