def seed
  # create_users
  create_admin
  create_companies
  create_internships
  # create_favorites
end


def create_users
  users = [
    {
      email: "anna@example.com",
      password: "testtest"
    },
    {
      email: "maria@example.com",
      password: "testtest"
    },
    {
      email: "alex@example.com",
      password: "testtest"
    }
  ]

  users.each do |user_data|
    user = User.create!(user_data)
    puts "User with id #{user.id} created"
  end
end


def create_admin
  user_data = {
    email: "ignat@yandex.ru",
    password: "testtest",
    admin: true,
    name: "Игнат Васильев",
    phone: "89168275230"
  }
  
  user = User.create!(user_data)
  puts "Admin created with id #{user.id}"
end

def create_companies
  companies = [
    { name: "Авито", description: "Технологическая компания.", website: "https://www.avito.ru", logo: "avito" },
    { name: "Яндекс", description: "Технологическая компания.", website: "https://yandex.ru", logo: "yandex" }
  ]
  companies.each { |data| Company.create!(data) }
end


def create_internships
  internships = [
    {
      company: Company.find_by(name: "Авито"),
      title: "Стажёр — продуктовый дизайнер (Design Bootcamp)",
      description: "Работа над интерфейсами цифровых продуктов.",
      location: "Москва",
      format: "Гибрид",
      salary: "До 80 000 ₽",
      deadline: Date.new(2026, 10, 15),
      source_url: "https://www.avito.ru"
    },
    {
      company: Company.find_by(name: "Яндекс"),
      title: "Дизайнер-стажёр продукта в Яндекс Поиск",
      description: "Участие в создании цифровых продуктов.",
      location: "Москва",
      format: "Офис",
      salary: "До 90 000 ₽",
      deadline: Date.new(2026, 11, 10),
      source_url: "https://yandex.ru"
    }
  ]
  internships.each { |data| Internship.create!(data) }
end


def create_favorites
  users = User.all
  internships = Internship.all

  users.each do |user|
    internships.sample(2).each do |internship|
      favorite = Favorite.create!(
        user: user,
        internship: internship
      )

      puts "Favorite with id #{favorite.id} created"
    end
  end
end


seed