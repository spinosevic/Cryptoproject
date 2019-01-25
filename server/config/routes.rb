Rails.application.routes.draw do
 post 'signup', to: 'user#signup'
 post 'item', to: 'item#register'
 post 'signin', to: 'user#signin'
 post 'createnews', to: 'news#create'
 get 'getnews', to: 'news#getnews'
 get 'getcoins', to: 'user#getcoins'
 get 'validate', to: 'user#validate'
 get 'personalitems', to: 'user#personalitems'
end
