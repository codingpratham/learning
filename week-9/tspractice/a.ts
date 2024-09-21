// function helloWorld( firstName : string ){
//     console.log(`Hello ${firstName}`);
// }

// let Name :string ='Pratham'
// helloWorld(Name)

// function sum(a:number ,b:number){
//     return a+b
// }

// let x :number =2;
// let y :number= 1
// sum(x,y)
// console.log(sum(x,y));

function ageChecker(age:number) :boolean{
    if(age<=18){
        return true
    }
    else{
        return false
    }
}

let userAge:number = 25;

console.log(ageChecker(userAge));
