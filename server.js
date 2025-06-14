// --------------- Day 1 Task ---------------

console.log('Server is running...');

// -- Task 1: Use process.argv to create a CLI tool.

// const name = process.argv[2];
// console.log(`Hello, ${name}`);

// const operator = process.argv[2];
// const num1 = Number(process.argv[3]);
// const num2 = Number(process.argv[4]);

// switch(operator){
//     case "add":
//         console.log('Addition: ' + (num1 + num2));
//         break;
    
//     case "sub":
//         console.log('Substraction: ' + (num1 - num2));
//         break;
    
//     default:
//         console.log('Give the correct value');
// }

// const action = process.argv[2];
// const filename = process.argv[3];
// const content = process.argv[4];


// -- Task 2: File Operations using fs.

import fs from 'fs';

const action = process.argv[2];
const filename = process.argv[3];
const message = process.argv[4];

switch(action) {
    case 'create':
        fs.writeFileSync(filename, message);
        console.log('File created successfully');
        break;
    
    case 'read':
        const data = fs.readFileSync(filename);
        console.log('Content: ', data.toString());
        break;

    case 'update':
        fs.appendFileSync(filename, message);
        console.log('File updated successfully');
        break;

    case 'delete':
        fs.unlinkSync(filename);
        console.log('file deleted successfully');
        break;

    default:
        console.log('Invalid action. Please use create, read, update, or delete. or file not found');
        break;
}

// fs.writeFileSync('text.txt', 'This file is created using fs module');
// fs.appendFileSync('text.txt','\nThis is the appended text');
// const data = fs.readFileSync('text.txt');
// console.log(data.toString());
