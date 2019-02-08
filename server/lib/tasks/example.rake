task whatever: :environment do
@bot=Bot.all.first
@bot.active=false
@bot.save
puts "AAA"
end
