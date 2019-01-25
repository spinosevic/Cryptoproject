class NewsController < ApplicationController
  def create
    News.delete_all
    params[:json][:articles].map{|article| News.create(title: article[:title], description: article[:description], url: article[:url], urlToImage: article[:urlToImage], content: article[:content], publishedAt: article[:publishedAt])}
  end
  def getnews
    @allnews=News.all
    render json: {results: @allnews}
end

end
