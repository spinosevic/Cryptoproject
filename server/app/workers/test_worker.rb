require 'sidekiq-scheduler'
class TestWorker
  include Sidekiq::Worker

  def perform(*args)
    @bots=Bot.all
    @bots.each{|bot|
      last_operation=bot.middle_point
      market="BTC-#{bot.coin}"
      ticker_price=0
      url_ticker ="https://bittrex.com/api/v1.1//public/getticker"
      ticker_response=  HTTParty.get(
                        url_ticker,
                        query: {
                        market: market
                                    }
                        )
      ticker_results=ticker_response["result"]
        if bot.selling_mode==true
          ticker_price=ticker_results["Bid"]
        else
          ticker_price=ticker_results["Ask"]
        end
      variation=((ticker_price - last_operation)/last_operation)*100
      puts "variation: #{variation}"
      percentage=bot.percentage
      puts "percentage: #{percentage}"


              if bot.selling_mode==true
                # variation>0 && variation.abs>=percentage &&
                puts "SELLING MODE"
                url_balance ="https://api.bittrex.com/api/v1.1/account/getbalance?apikey=#{bot.user.api_key}&currency=#{bot.coin}&nonce=#{Time.now.to_i}"
                sign_balance=OpenSSL::HMAC.hexdigest('sha512', bot.user.api_secret.encode("ASCII"),url_balance.encode("ASCII"))
                balance_response = HTTParty.get(
                url_balance,
                headers: {
                  apisign: sign_balance
                }
              )
              balance=balance_response['result']['Balance']
              puts "balance: #{balance}"

              balance_amount=balance*bot.ratio
              puts "balance_amount: #{balance_amount}"

              url_orderbook="https://api.bittrex.com/api/v1.1/public/getorderbook?market=BTC-#{bot.coin}&type=sell"
              orderbook_response=  HTTParty.get(
                                url_orderbook,
                                query: {
                                market: market
                                            }
                                )
              best_deal=orderbook_response['result'].sort_by{|x| -x["Rate"]}.select{|y| y["Quantity"]>balance_amount}[0]
              puts "best deal: #{best_deal}"
            #   url_sell = "https://api.bittrex.com/api/v1.1/market/selllimit?apikey=#{bot.user.api_key}&market=BTC-#{bot.coin}&quantity=#{balance_amount}&rate=#{best_deal["Rate"]}&nonce=#{Time.now.to_i}"
            #   sign_sell = OpenSSL::HMAC.hexdigest('sha512', bot.user.api_secret.encode("ASCII"),url_sell.encode("ASCII"))
            #   sell_response = HTTParty.get(
            #   url_sell,
            #   headers: {
            #     apisign: sign_sell
            #   }
            # )
            # if sell_response["success"]==true
              last_operation = best_deal["Rate"]
              bot.middle_point=last_operation
              bot.selling_mode = !bot.selling_mode
              bot.gained_amount = best_deal["Rate"]*balance_amount
              bot.save
            # end
          elsif bot.selling_mode==false
                # variation<0 && variation.abs>=percentage &&
                puts "BUYING MODE"
                url_orderbook="https://api.bittrex.com/api/v1.1/public/getorderbook?market=BTC-#{bot.coin}&type=buy"
                orderbook_response=  HTTParty.get(
                                  url_orderbook,
                                  query: {
                                  market: market
                                              }
                                  )
                best_deal=orderbook_response['result'].sort_by{|x| x["Rate"]}.select{|y| y["Quantity"]>=(bot.gained_amount/y["Rate"])}[0]
                balance_amount=bot.gained_amount/best_deal["Rate"]

              #   url_buy = "https://api.bittrex.com/api/v1.1/market/buylimit?apikey=#{bot.user.api_key}&market=BTC-#{bot.coin}&quantity=#{balance_amount}&rate=#{best_deal["Rate"]}&nonce=#{Time.now.to_i}"
              #   sign_buy = OpenSSL::HMAC.hexdigest('sha512', bot.user.api_secret.encode("ASCII"),url_buy.encode("ASCII"))
              #   buy_response = HTTParty.get(
              #   url_buy,
              #   headers: {
              #     apisign: sign_sell
              #   }
              # )
              # if buy_response["success"]==true
                last_operation = best_deal["Rate"]
                bot.middle_point=last_operation

                bot.selling_mode = !bot.selling_mode
                bot.save
              # end
            end

    }
  end

end
