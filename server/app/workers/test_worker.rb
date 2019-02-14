require 'sidekiq-scheduler'
class TestWorker < ApplicationController
  include Sidekiq::Worker

  def perform(*args)
    @bots=Bot.all
    @bots.each{|bot|
      api_key=decode_key(bot.user.api_key)[0]
      api_secret=decode_key(bot.user.api_secret)[0]
      last_operation=bot.middle_point
      market="BTC-#{bot.coin}"
      ticker_price=0

      ticker_results=ticker_results(market)
        if bot.selling_mode==true
          ticker_price=ticker_results["Bid"]
        else
          ticker_price=ticker_results["Ask"]
        end
      variation=((ticker_price - last_operation)/last_operation)*100
      puts "variation: #{variation}"
      percentage=bot.percentage
      puts "percentage: #{percentage}"


              if variation>0 && variation.abs>=percentage && bot.selling_mode==true

                puts "SELLING MODE"
              balance=get_balance(api_key,api_secret,bot.coin)
              puts "balance: #{balance}"

              balance_amount=balance*bot.ratio
              puts "balance_amount: #{balance_amount}"

              best_deal=orderbook(market,bot.coin,"buy").sort_by{|x| -x["Rate"]}.select{|y| y["Quantity"]>balance_amount}[0]
              puts "best deal: #{best_deal}"
            sell_response=market_action(api_key,api_secret,bot.coin,balance_amount,best_deal["Rate"],"sell")
            if sell_response["success"]==true
              new_balance=balance
              while balance==new_balance
                new_balance=get_balance(api_key,api_secret,bot.coin)
              end
              last_operation = best_deal["Rate"]
              bot.middle_point=last_operation
              bot.selling_mode = !bot.selling_mode
              bot.gained_amount = best_deal["Rate"]*balance_amount
              bot.save
            end
          elsif variation<0 && variation.abs>=percentage && bot.selling_mode==false

                puts "BUYING MODE"
              buy_balance=get_balance(api_key,api_secret,bot.coin)
                best_deal=orderbook(market,bot.coin,"sell").sort_by{|x| x["Rate"]}.select{|y| y["Quantity"]>=(bot.gained_amount/y["Rate"])}[0]
                puts "best deal: #{best_deal}"
                balance_amount=bot.gained_amount/best_deal["Rate"]
                buy_response=market_action(api_key,api_secret,bot.coin,balance_amount,best_deal["Rate"],"buy")
              if buy_response["success"]==true
                new_buy_balance=balance
                while balance=new_buy_balance
                new_buy_balance=get_balance(api_key,api_secret,bot.coin)
                end
                last_operation = best_deal["Rate"]
                bot.middle_point=last_operation
                bot.selling_mode = !bot.selling_mode
                bot.save
              end
            end

    }
  end

end
