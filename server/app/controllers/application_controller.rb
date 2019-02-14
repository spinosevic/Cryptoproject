class ApplicationController < ActionController::API

  def issue_token(data)
    JWT.encode(data, secret)
  end

  def encode_key(data)
    JWT.encode(data,secret)
  end

  def decode_key(data)
    JWT.decode(data, secret)
  end
  def get_current_user
    id = decoded_token['id']
    User.find_by(id: id)
  end

  def decoded_token
    token = request.headers['Authorization']
    begin
      JWT.decode(token, secret).first
    rescue JWT::DecodeError
      {}
    end
  end

  def ticker_results(market)
    url_ticker ="https://bittrex.com/api/v1.1//public/getticker"
    ticker_response=  HTTParty.get(
                      url_ticker,
                      query: {
                      market: market
                                  }
                      )
    return ticker_response["result"]
  end

  def orderbook(market,coin,action)
    url_orderbook="https://api.bittrex.com/api/v1.1/public/getorderbook?market=BTC-#{coin}&type=#{action}"
    orderbook_response=  HTTParty.get(
      url_orderbook,
      query: {
      market: market
     }
      )
      return orderbook_response["result"]
  end


  def market_action(api_key,api_secret,coin,balance_amount,rate,action)
    url= "https://api.bittrex.com/api/v1.1/market/#{action}limit?apikey=#{api_key}&market=BTC-#{bot.coin}&quantity=#{balance_amount}&rate=#{rate}&nonce=#{Time.now.to_i}"
    sign= OpenSSL::HMAC.hexdigest('sha512', api_secret.encode("ASCII"),url.encode("ASCII"))
    return response = HTTParty.get(
    url,
    headers: {
      apisign: sign
    }
  )
  end
  def get_balance(api_key,api_secret,coin)
    url_balance ="https://api.bittrex.com/api/v1.1/account/getbalance?apikey=#{api_key}&currency=#{coin}&nonce=#{Time.now.to_i}"
    sign_balance=OpenSSL::HMAC.hexdigest('sha512', api_secret.encode("ASCII"),url_balance.encode("ASCII"))
    balance_response = HTTParty.get(
    url_balance,
    headers: {
      apisign: sign_balance
    }
  )
  return balance_response['result']['Balance']
end
  def secret
    ENV["ENCODE_SECRET"]
  end
end
