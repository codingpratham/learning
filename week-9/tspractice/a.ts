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

// function ageChecker(age:number) :boolean{
//     if(age<=18){
//         return true
//     }
//     else{
//         return false
//     }
// }

// let userAge:number = 25;

// console.log(ageChecker(userAge));

// function delayed(fn : ()=> void) :void{
//     setTimeout(fn ,1000)
// }

// delayed(()=>{
//     console.log('Hello from delayed function')
// })

interface User{
    firstName:string;
    age:number;
    
}

function isLegal(user:User)  {
    console.log(user.firstName);
    if(user.age>18){
        console.log("true");
        
    }
    else{
        console.log("false");
        
    }
}

isLegal(
    {
    firstName:"pratham",
    age:19
})