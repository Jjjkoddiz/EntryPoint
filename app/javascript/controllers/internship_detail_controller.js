import { Controller } from "@hotwired/stimulus";

const q = (question, criterion, checklist) => ({
  question,
  criterion,
  checklist,
});

// =====================================
// ВОПРОСЫ АВИТО
// =====================================

const AVITO_TOPICS = [
  {
    title: "О себе и мотивации",
    questions: [
      q(
        "Расскажи о себе и как ты пришёл(а) в дизайн",
        "Мотивацию, связность рассказа и осознанность выбора профессии.",
        "Чем занимаюсь сейчас; как заинтересовался(ась) дизайном; какой опыт уже получил(а); куда хочу развиваться",
      ),
      q(
        "Почему ты хочешь развиваться именно в продуктовом дизайне?",
        "Понимаешь ли ты специфику продуктового дизайна и подходит ли тебе эта роль.",
        "Интерес к пользовательским задачам; работа с гипотезами; влияние на продукт; пример из своего опыта",
      ),
      q(
        "Почему ты хочешь пройти стажировку именно в нашей компании?",
        "Изучил(а) ли ты компанию и насколько осознанно откликаешься.",
        "Продукты компании; особенности дизайн-команды; интересующая задача; связь с личными целями",
      ),
      q(
        "Какие у тебя сильные стороны и что ты хочешь улучшить?",
        "Адекватность самооценки и готовность развиваться.",
        "1–2 сильные стороны с примерами; один навык для развития; план работы над ним",
      ),
    ],
  },
  {
    title: "Портфолио и кейсы",
    questions: [
      q(
        "Расскажи о проекте из портфолио, которым ты особенно гордишься",
        "Умение выделить главное, объяснить процесс и оценить результат.",
        "Задача; твоя роль; ключевое решение; результат; главный вывод",
      ),
      q(
        "Какой именно вклад ты внёс(ла) в этот проект?",
        "Самостоятельность и способность отделить личный вклад от командного.",
        "Состав команды; зона ответственности; принятые решения; помощь коллег; итоговый вклад",
      ),
      q(
        "Почему ты выбрал(а) именно такое решение?",
        "Аргументацию и связь дизайна с задачей пользователя и бизнеса.",
        "Исходная проблема; данные или наблюдения; рассмотренные варианты; причина выбора",
      ),
      q(
        "Расскажи о проекте, в котором что-то пошло не по плану",
        "Способность признавать ошибки, делать выводы и корректировать работу.",
        "Что произошло; почему; как ты отреагировал(а); что изменил(а); чему научился(ась)",
      ),
    ],
  },
  {
    title: "Продуктовое мышление",
    questions: [
      q(
        "С чего ты начинаешь работу над новой задачей?",
        "Умеешь ли ты сначала разобраться в проблеме, а не сразу рисовать интерфейс.",
        "Цель бизнеса; пользователь; проблема; ограничения; данные; критерии успеха",
      ),
      q(
        "Как ты проверяешь дизайн-гипотезы?",
        "Понимание исследований, прототипирования и итерационного подхода.",
        "Формулировка гипотезы; способ проверки; участники; наблюдения; решение по итогам",
      ),
      q(
        "Как понять, что дизайн-решение оказалось успешным?",
        "Умеешь ли ты связывать дизайн с измеримым результатом.",
        "Цель решения; пользовательская метрика; продуктовая метрика; качественная обратная связь",
      ),
      q(
        "Продакт просит добавить на экран новый баннер. Что ты будешь делать?",
        "Способность уточнять задачу, аргументировать решения и учитывать ограничения.",
        "Зачем нужен баннер; кому он полезен; какие есть данные; влияние на сценарий; альтернативы",
      ),
    ],
  },
  {
    title: "Командная работа",
    questions: [
      q(
        "Как ты взаимодействуешь с продактом и разработчиками?",
        "Понимание ролей и умение работать в продуктовой команде.",
        "Постановка задачи; совместные обсуждения; синхронизации; передача макетов; проверка реализации",
      ),
      q(
        "Расскажи о разногласии в команде и о том, как ты его решил(а)",
        "Конструктивность, эмпатию и способность договариваться.",
        "Причина разногласия; позиции сторон; аргументы; принятое решение; итог",
      ),
      q(
        "Как ты передаёшь дизайн в разработку?",
        "Аккуратность макетов и понимание процесса реализации.",
        "Состояния экранов; компоненты; адаптивы; комментарии; ограничения; дизайн-ревью",
      ),
      q(
        "Что ты сделаешь, если разработчик скажет, что решение невозможно реализовать?",
        "Гибкость и умение искать компромисс без потери пользовательской ценности.",
        "Выяснить ограничение; определить главное в решении; обсудить альтернативы; согласовать компромисс",
      ),
    ],
  },
  {
    title: "Софт-скиллы",
    questions: [
      q(
        "Как ты реагируешь на критику своей работы?",
        "Открытость к обратной связи и способность отделять себя от результата работы.",
        "Выслушать; уточнить конкретику; связать замечание с задачей; предложить следующий шаг",
      ),
      q(
        "Расскажи о своей ошибке или неудаче",
        "Честность, ответственность и способность учиться на опыте.",
        "Конкретная ситуация; твоя ответственность; исправление; полученный вывод",
      ),
      q(
        "Что ты делаешь, если задача сформулирована непонятно?",
        "Самостоятельность и умение работать в условиях неопределённости.",
        "Определить пробелы; задать вопросы; собрать контекст; зафиксировать цель и ограничения",
      ),
      q(
        "Как ты работаешь с несколькими задачами и дедлайнами одновременно?",
        "Организованность, реалистичную оценку сроков и умение расставлять приоритеты.",
        "Ценность задачи; срочность; объём работы; зависимости; коммуникация о рисках",
      ),
    ],
  },
  {
    title: "Вопросы работодателю",
    questions: [
      q(
        "Как устроена команда, в которую я могу попасть?",
        "С кем предстоит работать и как распределена ответственность.",
        "Состав команды; роль дизайнера; наличие наставника; взаимодействие с продактом и разработкой",
      ),
      q(
        "Как в команде устроен дизайн-процесс?",
        "Насколько системно команда работает над продуктом.",
        "Постановка задач; исследования; проверка гипотез; дизайн-ревью; работа после запуска",
      ),
      q(
        "Какие задачи получит стажёр в первые месяцы?",
        "Реальные обязанности и ожидания от стажёра.",
        "Первые задачи; уровень самостоятельности; критерии успеха; возможность работать над продуктом",
      ),
      q(
        "Как устроены обратная связь и развитие стажёра?",
        "Получишь ли ты поддержку и понятный маршрут роста.",
        "Наставник; регулярность встреч; оценка результатов; обучение; возможность получить оффер",
      ),
    ],
  },
];

// =====================================
// ВОПРОСЫ ЯНДЕКС ПОИСКА
// =====================================

// Шесть тем и по четыре вопроса.
// Часть универсальных вопросов заменяется
// на вопросы, связанные с Поиском и ИИ.

const YANDEX_CHANGES = {
  "0-1": q(
    "Почему тебе интересно развивать продукты на стыке поиска и ИИ?",
    "Осознанность выбора направления и понимание особенностей продукта.",
    "Интерес к поиску; пользовательские задачи; возможности ИИ; ограничения технологии; личная мотивация",
  ),

  "0-2": q(
    "Почему ты хочешь пройти стажировку именно в Яндекс Поиске?",
    "Знакомство с продуктом и интерес к задачам команды.",
    "Возможности Поиска; пользовательские сценарии; интересующие проблемы; навыки для развития",
  ),

  "1-0": q(
    "Расскажи о проекте, где ты улучшал(а) пользовательский сценарий",
    "Умение видеть проблему и объяснять последовательность решений.",
    "Исходный сценарий; проблема пользователя; исследование; решение; проверка результата",
  ),

  "1-2": q(
    "Как ты определяешь, какие элементы интерфейса действительно нужны?",
    "Умение обосновывать состав интерфейса.",
    "Задача пользователя; контекст; приоритеты; альтернативы; проверка гипотез",
  ),

  "2-0": q(
    "Как бы ты начал(а) улучшать интерфейс поисковой выдачи?",
    "Подход к исследованию сложного продукта и умение формулировать проблему.",
    "Тип запроса; пользовательская цель; текущий сценарий; данные; ограничения; метрики",
  ),

  "2-1": q(
    "Как проверить гипотезу о новом способе взаимодействия с ИИ?",
    "Понимание прототипирования и проверки решений.",
    "Гипотеза; прототип; сценарии; тестирование; наблюдения; критерии успеха",
  ),

  "2-2": q(
    "Как понять, что новое решение в Поиске стало полезнее?",
    "Связь интерфейсных изменений с пользовательским опытом.",
    "Успешность поиска; скорость достижения цели; понятность ответа; поведение пользователя; обратная связь",
  ),

  "2-3": q(
    "Что делать, если ИИ показал неправильный или неполный ответ?",
    "Умение проектировать нестандартные состояния и учитывать доверие пользователя.",
    "Причина ошибки; способ исправления; понятная обратная связь; альтернативный сценарий; прозрачность",
  ),

  "3-0": q(
    "Как работать над новым компонентом вместе с разработчиками?",
    "Понимание совместной работы над интерфейсами и дизайн-системой.",
    "Потребность; варианты компонента; состояния; ограничения; обсуждение; документация",
  ),

  "3-2": q(
    "Как передать разработчику интерфейс с большим количеством состояний?",
    "Системность мышления и аккуратность передачи дизайна.",
    "Основной сценарий; ошибки; загрузка; пустые состояния; адаптивы; поведение компонентов",
  ),

  "4-2": q(
    "Что делать, если поведение ИИ невозможно предсказать заранее?",
    "Способность работать с неопределённостью.",
    "Возможные результаты; крайние случаи; ограничения; тестовые сценарии; вопросы к команде",
  ),

  "5-0": q(
    "Как дизайнеры взаимодействуют с разработкой и командами машинного обучения?",
    "Помогает понять процесс создания ИИ-функций.",
    "Роли специалистов; обсуждения; ограничения моделей; прототипирование; тестирование",
  ),

  "5-2": q(
    "Над какими задачами работает дизайнер-стажёр в Яндекс Поиске?",
    "Помогает выяснить обязанности и степень самостоятельности.",
    "Первые проекты; дизайн-система; пользовательские сценарии; наставничество; результат",
  ),
};

const YANDEX_TOPICS = AVITO_TOPICS.map((topic, ti) => ({
  ...topic,

  questions: topic.questions.map(
    (question, qi) => YANDEX_CHANGES[`${ti}-${qi}`] || question,
  ),
}));

// =====================================
// STIMULUS-КОНТРОЛЛЕР
// =====================================

export default class extends Controller {
  static targets = [
    "tab",
    "panel",
    "topics",
    "questionCard",
    "questionCategory",
    "questionTitle",
    "questionPosition",
    "questionBackCategory",
    "questionCriteriaLabel",
    "questionCriteria",
    "questionChecklist",
    "questionBackPosition",
    "dots",
  ];

  connect() {
    const company = this.element.dataset.internshipDetailCompanyValue;

    this.topics = company === "yandex" ? YANDEX_TOPICS : AVITO_TOPICS;

    this.topicIndex = 0;
    this.questionIndex = 0;
    this.questionFlipped = false;

    this.selectPanel("stages");

    if (this.hasTopicsTarget) {
      this.buildTopics();
      this.renderQuestion();
    }
  }

  // ВКЛАДКИ

  selectTab(event) {
    this.selectPanel(event.currentTarget.dataset.tab);
  }

  tabKeydown(event) {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];

    if (!keys.includes(event.key)) return;

    event.preventDefault();

    const current = this.tabTargets.indexOf(event.currentTarget);
    let next = current;

    if (event.key === "ArrowRight") {
      next = (current + 1) % this.tabTargets.length;
    }

    if (event.key === "ArrowLeft") {
      next = (current - 1 + this.tabTargets.length) % this.tabTargets.length;
    }

    if (event.key === "Home") next = 0;
    if (event.key === "End") next = this.tabTargets.length - 1;

    this.selectPanel(this.tabTargets[next].dataset.tab);
    this.tabTargets[next].focus();
  }

  selectPanel(key) {
    this.tabTargets.forEach((tab) => {
      const active = tab.dataset.tab === key;

      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    this.panelTargets.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== key;
    });
  }

  // ПЕРЕВОРОТ ЭТАПОВ

  flipStage(event) {
    const card = event.currentTarget;
    const flipped = card.classList.toggle("is-flipped");

    card.setAttribute("aria-pressed", String(flipped));
  }

  // ТЕМЫ ВОПРОСОВ

  buildTopics() {
    this.topicsTarget.replaceChildren();

    this.topics.forEach((topic, index) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "growy-detail-topic";
      button.setAttribute("aria-pressed", String(index === 0));

      button.addEventListener("click", () => this.setTopic(index));

      const label = document.createElement("span");
      label.textContent = topic.title;

      const count = document.createElement("span");
      count.textContent = String(topic.questions.length);

      button.append(label, count);
      this.topicsTarget.appendChild(button);
    });
  }

  setTopic(index) {
    this.topicIndex = index;
    this.questionIndex = 0;
    this.questionFlipped = false;
    this.renderQuestion();
  }

  // ЛИСТАНИЕ

  previousQuestion() {
    const questions = this.topics[this.topicIndex].questions;

    this.questionIndex =
      (this.questionIndex - 1 + questions.length) % questions.length;

    this.questionFlipped = false;
    this.renderQuestion();
  }

  nextQuestion() {
    const questions = this.topics[this.topicIndex].questions;

    this.questionIndex = (this.questionIndex + 1) % questions.length;

    this.questionFlipped = false;
    this.renderQuestion();
  }

  // ПЕРЕВОРОТ ВОПРОСА

  flipQuestion() {
    this.questionFlipped = !this.questionFlipped;
    this.updateQuestionFace();
  }

  updateQuestionFace() {
    const card = this.questionCardTarget;

    card.classList.toggle("is-flipped", this.questionFlipped);
    card.setAttribute("aria-pressed", String(this.questionFlipped));

    card
      .querySelector(".growy-detail-question-front")
      .setAttribute("aria-hidden", String(this.questionFlipped));

    card
      .querySelector(".growy-detail-question-back")
      .setAttribute("aria-hidden", String(!this.questionFlipped));
  }

  // ОБНОВЛЕНИЕ КАРТОЧКИ

  renderQuestion() {
    const topic = this.topics[this.topicIndex];
    const item = topic.questions[this.questionIndex];

    const position = `${this.questionIndex + 1}/${topic.questions.length}`;

    this.questionCategoryTarget.textContent = topic.title;
    this.questionBackCategoryTarget.textContent = topic.title;
    this.questionTitleTarget.textContent = item.question;

    this.questionCriteriaLabelTarget.textContent =
      this.topicIndex === this.topics.length - 1
        ? "Что помогает выяснить"
        : "Что проверяют";

    this.questionCriteriaTarget.textContent = item.criterion;
    this.questionChecklistTarget.textContent = item.checklist;

    this.questionPositionTarget.textContent = position;
    this.questionBackPositionTarget.textContent = position;

    // АКТИВНАЯ ТЕМА

    this.topicsTarget
      .querySelectorAll(".growy-detail-topic")
      .forEach((button, i) => {
        const active = i === this.topicIndex;

        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });

    // ПАГИНАЦИЯ

    this.dotsTarget.replaceChildren();

    topic.questions.forEach((_, i) => {
      const dot = document.createElement("button");

      dot.type = "button";
      dot.className = "growy-detail-quiz-dot";

      dot.classList.toggle("is-active", i === this.questionIndex);

      dot.setAttribute(
        "aria-label",
        `Вопрос ${i + 1} из ${topic.questions.length}`,
      );

      dot.setAttribute("aria-current", String(i === this.questionIndex));

      dot.addEventListener("click", () => {
        this.questionIndex = i;
        this.questionFlipped = false;
        this.renderQuestion();
      });

      this.dotsTarget.appendChild(dot);
    });

    this.updateQuestionFace();
  }
}
