class API {

  static init () {
    this.baseUrl='http://localhost:3001'
    this.signupUrl=this.baseUrl+'/signup'
    this.signinUrl=this.baseUrl+'/signin'
    this.validateUrl=this.baseUrl+'/validate'
    this.itemUrl=this.baseUrl+'/item'
    this.newsUrl='https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=eb613f5fa10842a383014ef24f0a4740'
    this.createNews=this.baseUrl+'/createnews'
    this.getNewsUrl=this.baseUrl+'/getnews'
    this.getCoinsUrl=this.baseUrl+'/getcoins'

  }

  static signin (user) {
    return fetch(this.signinUrl, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({user})
    })
    .then(resp => resp.json())
  }

  static signup (user) {
   return fetch(this.signupUrl, {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({user})
   }).then(resp => resp.json())
 }

   static item (state) {
    return fetch(this.itemUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({state})
    }).then(resp => resp.json())
  }

 static validate () {
   const token= localStorage.getItem('token')
   return fetch(this.validateUrl, {
     method: 'GET',
     headers: {
       'Authorization': token
     },
   }).then(resp => resp.json())
 }

 static newsAPI () {
   var req = new Request(this.newsUrl);
   return fetch(req)
   .then(resp => resp.json())
   .then(json=>{
     return fetch(this.createNews, {
       method: "POST",
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({json})
     })
   })
 }

 static getNews () {
   return fetch(this.getNewsUrl)
   .then(resp => resp.json())
 }

 static getCoins () {
   const token= localStorage.getItem('token')
   return fetch(this.getCoinsUrl, {
     method: 'GET',
     headers: {
       'Authorization': token
     },
   })
   .then(resp => resp.json())
 }


 static getCoinSymbols () {
    return fetch('https://api.coingecko.com/api/v3/coins/list')
   .then(resp => resp.json())
   .then(json => {
     let newArray=[]
     json.slice(0,100).map(function(e) {
      return newArray.push({value:e["symbol"], label: e["id"]})

  })
   return newArray
 })
 }


static getValue (coin) {
  return fetch(`https://api.coingecko.com/api/v3/coins/${coin}`)
 .then(resp => resp.json())
}

}

  API.init()

  export default API
