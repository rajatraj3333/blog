const str = "this iis javascript "


const strarr =str.split('')

const obj ={}

strarr.forEach(item=>{
    if(strarr[item]===obj[item]) obj[item]=1;
else{
    obj[item]++
}



})


for (const key in obj) {
    
    console.log(`${key}:${obj[key]}`);

    
}