class ItemController < ApplicationController
  def register
    @user=User.find_by(username: params[:user][:username])
    Item.create(user_id: @user.id, coin: params[:coin], amount: params[:amount], initial_price: params[:initial_price])
  end

  def update
    @user = get_current_user
    if @user
      @user.items.destroy_all
      params['results'].map{|coin| Item.create(user_id: @user.id, coin: coin[:coin], amount: coin[:amount], price_per_unit: coin[:price_per_unit])}
    else
      render json: {error: 'Not a valid user.'}, status: 401
    end
  end
end
