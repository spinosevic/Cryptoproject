const cryptocurrencies = require('cryptocurrencies');
export function getCryptos() {
   let listInArrayForm= Object.keys(cryptocurrencies).map(function(e) {
  return  {value:e, label: cryptocurrencies[e]}

});
return listInArrayForm
console.log(listInArrayForm)
}
