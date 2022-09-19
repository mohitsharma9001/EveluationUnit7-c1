import dns from "dns"
// const dns = require('dns'); 
dns.lookup('masaischool.com', (err, value) => { 
    if(err) { 
        console.log(err); 
        return; 
    } 
    console.log(value); 
}) 