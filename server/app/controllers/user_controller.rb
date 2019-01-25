class UserController < ApplicationController

  def signup
    @user= User.create(user_params)
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
      render json: @user.items
    else
      render json: {error: 'Not a valid user.'}, status: 401
    end
  end



  private
  def user_params
   params.require(:user).permit(:username, :password, :first_name, :last_name, :email)
 end
end
