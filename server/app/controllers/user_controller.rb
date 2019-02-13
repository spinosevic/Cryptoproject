require 'rubygems'
require 'bundler/setup'
require 'httparty'
require 'json'
require 'rubygems'
require 'base64'
require 'cgi'

class UserController < ApplicationController

  def signup
    @user= User.create(username:params[:user][:username], password:params[:user][:password], first_name:params[:user][:first_name], last_name:params[:user][:lastname], email: params[:user][:email],created: Time.now.strftime("%d-%m-%Y"), last_access: Time.now.strftime("%d-%m-%Y"))
    params[:user][:coins].map{|coin| Item.create(user_id: @user.id, coin: coin[:coin], amount: coin[:amount], price_per_unit: coin[:price_per_unit])}
    if @user.valid?
      render json: {username: @user.username, coins: @user.items, token: issue_token({id: @user.id}) }
    else
      render json: {error: @user.errors.full_messages}
    end
  end

  def signin
    @user = User.find_by(username: params[:user][:username])
    if @user && @user.authenticate(params[:user][:password])
      render json: {username: @user.username , coins: @user.items, token: issue_token({id: @user.id})}
    else
      render json: {error: 'Invalid username/password combination.'}, status: 401
    end
  end


  def dailyUpdate
      @user = get_current_user
      if @user
      @user.update(last_access: Time.now.strftime("%d-%m-%Y"), total: params[:user][:total])
      render json: {total: @user.total }
      else
        render json: {error: 'Not a valid user.'}, status: 401
      end
  end

  def getTotal
    @user = get_current_user
    if @user
    render json: {total: @user.total }
    else
      render json: {error: 'Not a valid user.'}, status: 401
    end
  end

  def validate
    @user = get_current_user
    if @user
      render json: {username: @user.username, token: issue_token({id: @user.id})}
    else
      render json: {error: 'Invalid username.'}, status: 401
    end
  end

  def getcoins
    @user = get_current_user
    if @user
      render json: {coins: @user.items, last_access: @user.last_access, total:@user.total, created: @user.created}
    else
      render json: {error: 'Not a valid user.'}, status: 401
    end
  end

  def getNotes
    @user = get_current_user
    if @user
      render json: {notes: @user.notes}
    else
      render json: {error: 'Not a valid user.'}, status: 401
    end
  end

  def deleteNote
    @user = get_current_user

    if @user
      @note = Note.find_by(id: params["note"]["id"])
      @note.delete
    else
      render json: {error: 'Not a valid user.'}, status: 401
    end
  end

  def saveNote
    @user = get_current_user

    if @user
        Note.create(content: params["note"], user_id: @user.id)
    else
      render json: {error: 'Not a valid user.'}, status: 401
    end
  end






  def buildBot
    @user = get_current_user
    if @user

    Bot.create(coin: params['botinfo']['coin'], percentage:params['botinfo']['oscillation'], middle_point:params['botinfo']['middle_value'], ratio:params['botinfo']['ratio'],user_id: @user.id)
    else
      render json: {error: 'Not a valid user.'}, status: 401
    end
    # @user = get_current_user
    # if @user
    #   Bot.create(coin: params['botinfo']['coin'], percentage:params['botinfo']['oscillation'], middle_point:params['botinfo']['middle_value'], ratio:params['botinfo']['ratio'],user_id: @user.id)
    #     last_operation=@user.bots.first.middle_point
    #     selling_mode=true
    #     coin=@user.bots.first.coin
    #     ratio=@user.bots.first.ratio
    #     market="BTC-#{coin}"
    #     while @user.bots.first.active
    #       ticker_price=0
    #       url_ticker ="https://bittrex.com/api/v1.1//public/getticker"
    #       ticker_response=  HTTParty.get(
    #                         url_ticker,
    #                         query: {
    #                         market: market
    #                                     }
    #                         )
    #       ticker_results=ticker_response["result"]
    #         if selling_mode==true
    #           ticker_price=ticker_results["Bid"]
    #         else
    #           ticker_price=ticker_results["Ask"]
    #         end
    #
    #       variation=((ticker_price - last_operation)/last_operation)*100
    #       puts "variation: #{variation}"
    #       percentage=@user.bots.first.percentage
    #       puts "percentage: #{percentage}"
    #
    #         if selling_mode==true
    #           # variation>0 && variation.abs>=percentage &&
    #           puts "SELLING MODE"
    #           url_balance ="https://api.bittrex.com/api/v1.1/account/getbalance?apikey=#{@user.api_key}&currency=#{coin}&nonce=#{Time.now.to_i}"
    #           sign_balance=OpenSSL::HMAC.hexdigest('sha512', @user.api_secret.encode("ASCII"),url_balance.encode("ASCII"))
    #           balance_response = HTTParty.get(
    #           url_balance,
    #           headers: {
    #             apisign: sign_balance
    #           }
    #         )
    #         balance=balance_response['result']['Balance']
    #         puts "balance: #{balance}"
    #
    #         balance_amount=balance*ratio
    #         puts "balance_amount: #{balance_amount}"
    #
    #         url_orderbook="https://api.bittrex.com/api/v1.1/public/getorderbook?market=BTC-#{coin}&type=sell"
    #         orderbook_response=  HTTParty.get(
    #                           url_orderbook,
    #                           query: {
    #                           market: market
    #                                       }
    #                           )
    #         best_deal=orderbook_response['result'].sort_by{|x| -x["Rate"]}.select{|y| y["Quantity"]>balance_amount}[0]
    #         puts "best deal: #{best_deal}"
    #       #   url_sell = "https://api.bittrex.com/api/v1.1/market/selllimit?apikey=#{@user.api_key}&market=BTC-#{coin}&quantity=#{balance_amount}&rate=#{best_deal["Rate"]}&nonce=#{Time.now.to_i}"
    #       #   sign_sell = OpenSSL::HMAC.hexdigest('sha512', api_secret.encode("ASCII"),url_sell.encode("ASCII"))
    #       #   sell_response = HTTParty.get(
    #       #   url_sell,
    #       #   headers: {
    #       #     apisign: sign_sell
    #       #   }
    #       # )
    #       # if sell_response["success"]==true
    #         last_operation = best_deal["Rate"]
    #
    #         selling_mode = !selling_mode
    #         gained_amount = best_deal["Rate"]*balance_amount
    #       # end
    #         elsif selling_mode==false
    #           # variation<0 && variation.abs>=percentage &&
    #           puts "BUYING MODE"
    #           url_orderbook="https://api.bittrex.com/api/v1.1/public/getorderbook?market=BTC-#{coin}&type=buy"
    #           orderbook_response=  HTTParty.get(
    #                             url_orderbook,
    #                             query: {
    #                             market: market
    #                                         }
    #                             )
    #           best_deal=orderbook_response['result'].sort_by{|x| x["Rate"]}.select{|y| y["Quantity"]>=(gained_amount/y["Rate"])}[0]
    #           balance_amount=gained_amount/best_deal["Rate"]
    #
    #         #   url_buy = "https://api.bittrex.com/api/v1.1/market/buylimit?apikey=#{@user.api_key}&market=BTC-#{coin}&quantity=#{balance_amount}&rate=#{best_deal["Rate"]}&nonce=#{Time.now.to_i}"
    #         #   sign_buy = OpenSSL::HMAC.hexdigest('sha512', api_secret.encode("ASCII"),url_buy.encode("ASCII"))
    #         #   buy_response = HTTParty.get(
    #         #   url_buy,
    #         #   headers: {
    #         #     apisign: sign_sell
    #         #   }
    #         # )
    #         # if buy_response["success"]==true
    #           last_operation = best_deal["Rate"]
    #           selling_mode = !selling_mode
    #         # end
    #       end
    #       sleep 2
    #     end
    # else
    #   render json: {error: 'Not a valid user.'}, status: 401
    # end
  end








  def apiKeys
    @user = get_current_user

    if @user
      @user.api_key = encode_key(params['apikeys']['apikey'])
      @user.api_secret = encode_key(params['apikeys']['apisecret'])
      @user.save
    else
      render json: {error: 'Not a valid user.'}, status: 401
    end
  end

  def getKeys
    @user = get_current_user
    if @user
      render json: {api_key: @user.api_key, api_secret: @user.api_secret}
    else
      render json: {error: 'Not a valid user.'}, status: 401
    end
  end
  def getBots
    @user = get_current_user
    if @user
      if @user.bots!=[]
        render json: {bots: @user.bots}
      else
        render json: {bots: "empty"}
      end
    else
      render json: {error: 'Not a valid user.'}, status: 401
    end
  end

  def getBalances
    @user = get_current_user
    if @user
      url_balances="https://api.bittrex.com/api/v1.1/account/getbalances?apikey=#{decode_key(@user.api_key)[0]}&nonce=#{Time.now.to_i}"
      sign=OpenSSL::HMAC.hexdigest('sha512', decode_key(@user.api_secret)[0].encode("ASCII"),url_balances.encode("ASCII"))
      response = HTTParty.get(
              url_balances,
              headers: {
                apisign: sign
              }
            )
            results=response['result']

      render json: {results: results}
    else
      render json: {error: 'Not a valid user.'}, status: 401
    end
  end


  def stopTheBot
    @user = get_current_user
    if @user
        @user.bots.first.active===false
        @user.bots.first.save
        @user.bots.first.delete
      render json: {results: "Bot Stopped"}
    else
      render json: {error: 'Not a valid user.'}, status: 401
    end
    end


  private
  def user_params
   params.require(:user).permit(:username, :password, :first_name, :last_name, :email)
 end
end
