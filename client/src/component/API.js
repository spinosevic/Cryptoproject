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
    this.dailyUpdate=this.baseUrl+'/dailyUpdate'
    this.getTotal=this.baseUrl+'/getTotal'
    this.saveNote=this.baseUrl+'/saveNote'
    this.getNotes=this.baseUrl+'/getNotes'
    this.deleteNote=this.baseUrl+'/deleteNote'
    this.updateCoins=this.baseUrl+'/updateCoins'
    this.apiKeys=this.baseUrl+'/apiKeys'
    this.getKeys=this.baseUrl+'/getKeys'
    this.getBalances=this.baseUrl+'/getBalances'
    this.buildBot=this.baseUrl+'/buildBot'
    this.getBots=this.baseUrl+'/getBots'
    this.stopTheBot=this.baseUrl+'/stopTheBot'
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

 static getnewsAPI () {
   var req = new Request(this.newsUrl);
   return fetch(req)
   .then(resp => resp.json())
 }

 static async handleNews (){
   return await API.getnewsAPI()
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

static getTotal2 () {
  const token= localStorage.getItem('token')
  return fetch(this.getTotal, {
    method: 'GET',
    headers: {
      'Authorization': token
    },
  })
  .then(resp => resp.json())
}

  static updateCoins (coins) {
    const token= localStorage.getItem('token')
    return fetch(this.updateCoins, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({coins})
    }).then(resp => console.log(resp.json()))
  }
  static updateCoins2 (coins) {
    const token= localStorage.getItem('token')
    return fetch(this.updateCoins, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({results: coins})
    })
  }

 static getCoinsCurrentValue (coins) {
   let string =''
   coins.map(coin=>{
     return string+=`${coin}%2C`
   })
   return fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${string}&vs_currencies=eur`)
  .then(resp => resp.json())

 }
 static getCoinSymbols () {
    return fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false')
   .then(resp => resp.json())
   .then(json => {
     let newArray=[]
     json.slice(0,100).map(function(e) {
      return newArray.push({value:e["symbol"], label: e["id"]})
  }
)
   return newArray
 })
 }


static getValue (coin) {
  return fetch(`https://api.coingecko.com/api/v3/coins/${coin}`)
 .then(resp => resp.json())
}


static firstCoinHistory(state){
  let total = 0
   const promises = state.coins.map(coin=>{
    return  fetch(`https://api.coingecko.com/api/v3/coins/${coin.coin}/history?date=${state.created}`)
    .then(resp => resp.json())
    .then(json=>{
      return total+=json.market_data.current_price.eur*coin.amount})
   })
   return Promise.all(promises)
 }

 static updateTotal(total){
   const token= localStorage.getItem('token')
   return fetch(this.dailyUpdate, {
     method: 'PUT',
     headers: {
       'Authorization': token,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({total: total})
   }).then(resp => console.log(resp.json()))
 }


 static getAllCoinsHistory(state, days, breakevenpoint){
    let arrayTotal = []
    for (let i = 1; i < days; i++){
     let day = new Date(API.changeDateFormatToUS(state.last_access))
     day.setDate(day.getDate() + i)
     let selectedDay = API.changeDataFormatfromDateToEU(day)
      const promises = state.coins.map(coin => {
        arrayTotal.push(fetch(`https://api.coingecko.com/api/v3/coins/${coin.coin}/history?date=${selectedDay}`)
          .then(resp => resp.json())
          .then(json => {
            return json.market_data.current_price.eur * coin.amount})
        )
      })
    }
    return Promise.all(arrayTotal)
  }

static last30days(selectedCoin){
  let arrayTotal = []
  for (let i = 30; i > 0; i--){
      let day = new Date()
      day.setDate(day.getDate() - i)
      let selectedDay = API.changeDataFormatfromDateToEU(day)
      arrayTotal.push(fetch(`https://api.coingecko.com/api/v3/coins/${selectedCoin.coin}/history?date=${selectedDay}`)
        .then(resp => resp.json())
        .then(json => json.market_data.current_price.eur*selectedCoin.amount)
      )
  }
  return Promise.all(arrayTotal)
}


  static changeDateFormatToUS (string){
    return `${string.slice(3,5)}/${string.slice(0,2)}/${string.slice(6)}`
  }

  static changeDataFormatfromDateToEU (date){
    return `${("0" + date.getDate()).slice(-2)}-${("0" + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`
  }

  static getNotes2 () {
    const token= localStorage.getItem('token')
    return fetch(this.getNotes, {
      method: 'GET',
      headers: {
        'Authorization': token
      },
    })
    .then(resp => resp.json())
    .then(notes=>notes.notes)
  }

  static deleteNote2 (note) {
    const token= localStorage.getItem('token')
    return fetch(this.deleteNote, {
      method: 'DELETE',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({note})
    })
  }

  static saveNote2 (note){
    const token= localStorage.getItem('token')
    return fetch(this.saveNote, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({note})
    })
  }

  static apiKeys (apikeys) {
    const token= localStorage.getItem('token')
    return fetch(this.apiKeys, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({apikeys})
    })
  }
  static apiKeys2 (apikeys) {
    const token= localStorage.getItem('token')
    return fetch(this.apiKeys, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({apikeys})
    })
  }
  static getKeys () {
    const token= localStorage.getItem('token')
    return fetch(this.getKeys, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    })
  }
  static getKeys2 () {
    const token= localStorage.getItem('token')
    return fetch(this.getKeys, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    })
    .then(res=>res.json())
  }

  static getBalances () {
    const token= localStorage.getItem('token')
    return fetch(this.getBalances, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    })
    .then(res=>res.json())
  }
  static getBalances2 () {
    const token= localStorage.getItem('token')
    return fetch(this.getBalances, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    })
    .then(res=>res.json())
  }

  static buildBot(botinfo){
    const token= localStorage.getItem('token')
    return fetch(this.buildBot, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({botinfo})
    })
  }
  static buildBot2(botinfo){
    const token= localStorage.getItem('token')
    return fetch(this.buildBot, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({botinfo})
    })
  }

  static getBots () {
    const token= localStorage.getItem('token')
    return fetch(this.getBots, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    })
    .then(res=>res.json())
  }
  static getBots2 () {
    const token= localStorage.getItem('token')
    return fetch(this.getBots, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    })
    .then(res=>res.json())
  }
  static stopTheBot(){
    const token= localStorage.getItem('token')
    return fetch(this.stopTheBot, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    })
    .then(res=>res.json())
  }
  static stopTheBot2(){
    const token= localStorage.getItem('token')
    return fetch(this.stopTheBot, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    })
    .then(res=>res.json())
  }




}

  API.init()

  export default API
