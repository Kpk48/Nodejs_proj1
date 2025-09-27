const http=require('http');
const url=require('url');
const fs=require('fs');
const overview=fs.readFileSync('./starter/templates/template_overview.html','utf-8');
const tempProduct=fs.readFileSync('./starter/templates/template_product.html','utf-8');
const cards=fs.readFileSync('./starter/templates/template_cards.html','utf-8');
const data=fs.readFileSync('./starter/dev-data/data.json','utf-8');
const dataObj=JSON.parse(data);
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
const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    // Overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });

        const cardsHtml = dataObj.map(el => replaceElement(cards, el)).join('');
        const output = overview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);

        // Product page
    } else if (pathname === '/product') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const product = dataObj[query.id];
        const output = replaceElement(tempProduct, product);
        res.end(output);

        // API
    } else if (pathname === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data);

        // Not found
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>');
    }
});
server.listen(8000,()=>{
  console.log(`Server started on port ${server.address().port}`);
});