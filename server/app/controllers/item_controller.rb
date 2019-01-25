class ItemController < ApplicationController
  def register
    @user=User.find_by(username: params[:user][:username])
    Item.create(user_id: @user.id, coin: params[:coin], amount: params[:amount], initial_price: params[:initial_price])
  end
end
