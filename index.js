const http=require('http');
const url=require('url');
const fs=require('fs');
const overview=fs.readFileSync('./starter/templates/template_overview.html','utf-8');
const product=fs.readFileSync('./starter/templates/template_product.html','utf-8');
const cards=fs.readFileSync('./starter/templates/template_cards.html','utf-8');
const data=fs.readFileSync('./starter/dev-data/data.json','utf-8');
const dataobj=JSON.parse(data);
const replaceElement=(temp,obj)=>{
let output=temp.replace(/{%PRODUCTNAME%}/g,obj.productName);
output=output.replace(/{%IMAGE%}/g,obj.image);
output=output.replace(/{%PRICE%}/g,obj.price);
output=output.replace(/{%FROM%}/g,obj.from);
output=output.replace(/{%NUTRIENTS%}/g,obj.nutrients);
output=output.replace(/{%QUANTITY%}/g,obj.quantity);
output=output.replace(/{%DESCRIPTION%}/g,obj.description);
output=output.replace(/{%ID%}/g,obj.id);
if(!obj.organic){
    output=output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
}
return output;
}
const server=http.createServer((req,res,err)=>{
   const url3=req.url;
   if(url3==='/' || url3==='/overview'){
       res.writeHead(200,{'Content-Type':'text/html'});
       const cards_rep =dataobj.map(el=> replaceElement(cards,el)).join('');
       const output=overview.replace(/{%PRODUCT_CARDS%}/g,cards_rep)
       console.log(cards_rep);
       res.end(output);
   }
   else if(url3==='/products'){}
});

server.listen(8000,()=>{
  console.log(`Server started on port ${server.address().port}`);
});