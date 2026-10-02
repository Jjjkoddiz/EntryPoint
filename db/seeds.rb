def seed
  create_users
  create_companies
  create_internships
  create_favorites
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


def create_companies
  companies = [
    {
      name: "Avito",
      description: "Технологическая компания с продуктами и сервисами для миллионов пользователей.",
      website: "https://www.avito.ru",
      logo: "avito"
    },
    {
      name: "T-Bank",
      description: "Технологическая компания, развивающая цифровые продукты и сервисы.",
      website: "https://www.tbank.ru",
      logo: "tbank"
    },
    {
      name: "Ozon",
      description: "Технологическая компания в сфере электронной коммерции и цифровых сервисов.",
      website: "https://www.ozon.ru",
      logo: "ozon"
    },
    {
      name: "Yandex",
      description: "Технологическая компания, развивающая цифровые продукты и сервисы.",
      website: "https://yandex.ru",
      logo: "yandex"
    }
  ]

  companies.each do |company_data|
    company = Company.create!(company_data)
    puts "Company with id #{company.id} created"
  end
end


def create_internships
  internships = [
    {
      company: Company.find_by(name: "Avito"),
      title: "Стажёр продуктового дизайна",
      description: "Работа над интерфейсами цифровых продуктов, исследованием пользовательских сценариев и прототипированием.",
      location: "Москва",
      format: "Гибрид",
      salary: "До 80 000 ₽",
      deadline: Date.new(2026, 10, 15),
      source_url: "https://www.avito.ru"
    },
    {
      company: Company.find_by(name: "Avito"),
      title: "Стажёр UX/UI-дизайнер",
      description: "Проектирование интерфейсов и работа с дизайн-системой продукта.",
      location: "Москва",
      format: "Гибрид",
      salary: "До 75 000 ₽",
      deadline: Date.new(2026, 10, 20),
      source_url: "https://www.avito.ru"
    },
    {
      company: Company.find_by(name: "T-Bank"),
      title: "Стажёр продуктового дизайна",
      description: "Участие в разработке цифровых продуктов, создание прототипов и работа с пользовательскими сценариями.",
      location: "Москва",
      format: "Удалённо",
      salary: "До 90 000 ₽",
      deadline: Date.new(2026, 10, 25),
      source_url: "https://www.tbank.ru"
    },
    {
      company: Company.find_by(name: "T-Bank"),
      title: "Стажёр UX/UI-дизайна",
      description: "Проектирование пользовательских интерфейсов и работа в продуктовой команде.",
      location: "Москва",
      format: "Гибрид",
      salary: "До 85 000 ₽",
      deadline: Date.new(2026, 11, 1),
      source_url: "https://www.tbank.ru"
    },
    {
      company: Company.find_by(name: "Ozon"),
      title: "Стажёр продуктового дизайна",
      description: "Работа над интерфейсами e-commerce продуктов, прототипирование и визуализация решений.",
      location: "Москва",
      format: "Гибрид",
      salary: "До 80 000 ₽",
      deadline: Date.new(2026, 10, 30),
      source_url: "https://www.ozon.ru"
    },
    {
      company: Company.find_by(name: "Ozon"),
      title: "Стажёр UX-дизайнер",
      description: "Исследование пользовательских сценариев и проектирование цифровых интерфейсов.",
      location: "Москва",
      format: "Гибрид",
      salary: "До 75 000 ₽",
      deadline: Date.new(2026, 11, 5),
      source_url: "https://www.ozon.ru"
    },
    {
      company: Company.find_by(name: "Yandex"),
      title: "Стажёр продуктового дизайна",
      description: "Участие в создании цифровых продуктов, работа с интерфейсами и пользовательскими сценариями.",
      location: "Москва",
      format: "Гибрид",
      salary: "До 90 000 ₽",
      deadline: Date.new(2026, 11, 10),
      source_url: "https://yandex.ru"
    },
    {
      company: Company.find_by(name: "Yandex"),
      title: "Стажёр UX/UI-дизайнер",
      description: "Проектирование интерфейсов, прототипирование и работа с дизайн-системой.",
      location: "Москва",
      format: "Удалённо",
      salary: "До 85 000 ₽",
      deadline: Date.new(2026, 11, 15),
      source_url: "https://yandex.ru"
    }
  ]

  internships.each do |internship_data|
    internship = Internship.create!(internship_data)
    puts "Internship with id #{internship.id} created"
  end
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