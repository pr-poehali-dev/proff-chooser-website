import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Profession {
  id: number;
  title: string;
  category: string;
  salary: string;
  description: string;
  demand: number;
}

interface TestQuestion {
  id: number;
  question: string;
  options: string[];
}

interface Story {
  id: number;
  name: string;
  profession: string;
  story: string;
  image: string;
}

const professions: Profession[] = [
  { id: 1, title: 'Frontend-разработчик', category: 'IT', salary: '150 000 - 300 000 ₽', description: 'Создание пользовательских интерфейсов веб-приложений', demand: 95 },
  { id: 2, title: 'Data Scientist', category: 'IT', salary: '200 000 - 400 000 ₽', description: 'Анализ данных и создание ML-моделей', demand: 90 },
  { id: 3, title: 'Product Manager', category: 'Менеджмент', salary: '180 000 - 350 000 ₽', description: 'Управление разработкой продукта', demand: 85 },
  { id: 4, title: 'UX/UI Дизайнер', category: 'Дизайн', salary: '120 000 - 250 000 ₽', description: 'Проектирование пользовательских интерфейсов', demand: 80 },
  { id: 5, title: 'DevOps Engineer', category: 'IT', salary: '180 000 - 350 000 ₽', description: 'Автоматизация и управление инфраструктурой', demand: 88 },
  { id: 6, title: 'Маркетолог', category: 'Маркетинг', salary: '100 000 - 200 000 ₽', description: 'Продвижение продуктов и услуг', demand: 75 },
  { id: 7, title: 'Backend-разработчик', category: 'IT', salary: '160 000 - 320 000 ₽', description: 'Разработка серверной части приложений и API', demand: 93 },
  { id: 8, title: 'Системный аналитик', category: 'IT', salary: '140 000 - 280 000 ₽', description: 'Анализ бизнес-процессов и формирование требований', demand: 82 },
  { id: 9, title: 'QA Engineer', category: 'IT', salary: '100 000 - 200 000 ₽', description: 'Тестирование и обеспечение качества ПО', demand: 84 },
  { id: 10, title: 'Контент-менеджер', category: 'Маркетинг', salary: '60 000 - 120 000 ₽', description: 'Создание и управление контентом на сайтах', demand: 70 },
  { id: 11, title: 'SMM-специалист', category: 'Маркетинг', salary: '70 000 - 150 000 ₽', description: 'Продвижение в социальных сетях', demand: 78 },
  { id: 12, title: 'HR-менеджер', category: 'Менеджмент', salary: '90 000 - 180 000 ₽', description: 'Подбор персонала и управление HR-процессами', demand: 76 },
  { id: 13, title: 'Графический дизайнер', category: 'Дизайн', salary: '80 000 - 160 000 ₽', description: 'Создание визуальных концепций и графики', demand: 74 },
  { id: 14, title: 'Motion-дизайнер', category: 'Дизайн', salary: '110 000 - 220 000 ₽', description: 'Создание анимации и видеоконтента', demand: 79 },
  { id: 15, title: 'Проектный менеджер', category: 'Менеджмент', salary: '150 000 - 300 000 ₽', description: 'Управление проектами от планирования до запуска', demand: 87 },
  { id: 16, title: 'SEO-специалист', category: 'Маркетинг', salary: '80 000 - 180 000 ₽', description: 'Продвижение сайтов в поисковых системах', demand: 77 },
  { id: 17, title: 'Бизнес-аналитик', category: 'Менеджмент', salary: '130 000 - 260 000 ₽', description: 'Анализ бизнес-метрик и оптимизация процессов', demand: 83 },
  { id: 18, title: 'Копирайтер', category: 'Маркетинг', salary: '60 000 - 140 000 ₽', description: 'Создание рекламных и информационных текстов', demand: 72 },
  { id: 19, title: 'Врач', category: 'Медицина', salary: '80 000 - 250 000 ₽', description: 'Диагностика, лечение и профилактика заболеваний', demand: 92 },
  { id: 20, title: 'Юрист', category: 'Юриспруденция', salary: '90 000 - 300 000 ₽', description: 'Правовое консультирование и защита интересов клиентов', demand: 81 },
  { id: 21, title: 'Экономист', category: 'Финансы', salary: '70 000 - 180 000 ₽', description: 'Анализ финансовых показателей и планирование бюджета', demand: 79 },
  { id: 22, title: 'Прокурор', category: 'Юриспруденция', salary: '100 000 - 200 000 ₽', description: 'Надзор за соблюдением законов и поддержание обвинения', demand: 68 },
  { id: 23, title: 'Программист', category: 'IT', salary: '120 000 - 280 000 ₽', description: 'Разработка программного обеспечения и приложений', demand: 94 },
];

const testQuestions: TestQuestion[] = [
  {
    id: 1,
    question: 'Что вам больше нравится?',
    options: ['Работать с данными и аналитикой', 'Создавать визуальные решения', 'Общаться с людьми', 'Решать технические задачи']
  },
  {
    id: 2,
    question: 'Какой формат работы предпочитаете?',
    options: ['Индивидуальная работа', 'Работа в команде', 'Руководство проектами', 'Консультирование']
  },
  {
    id: 3,
    question: 'Что для вас важнее?',
    options: ['Креативность', 'Стабильность', 'Высокий доход', 'Карьерный рост']
  },
  {
    id: 4,
    question: 'Какая рабочая среда вам комфортнее?',
    options: ['Офис с коллегами', 'Удалённая работа', 'Гибридный формат', 'Частые командировки']
  },
  {
    id: 5,
    question: 'Что вас больше мотивирует?',
    options: ['Творческая реализация', 'Решение сложных задач', 'Влияние на людей', 'Финансовый результат']
  },
  {
    id: 6,
    question: 'Как вы относитесь к обучению?',
    options: ['Постоянно изучаю новое', 'Учусь по необходимости', 'Предпочитаю стабильность', 'Люблю обучать других']
  },
  {
    id: 7,
    question: 'Какой темп работы вам подходит?',
    options: ['Быстрый и динамичный', 'Размеренный и стабильный', 'Проектный с дедлайнами', 'Гибкий, без жёстких рамок']
  },
  {
    id: 8,
    question: 'Что бы вы хотели видеть результатом своей работы?',
    options: ['Визуальный продукт', 'Технологическое решение', 'Довольных клиентов', 'Рост метрик и цифр']
  }
];

const stories: Story[] = [
  {
    id: 1,
    name: 'Анна Петрова',
    profession: 'UX/UI Дизайнер',
    story: 'Начинала с графического дизайна, через 3 года освоила UX. Сейчас работаю в крупной IT-компании и руковожу командой из 5 дизайнеров.',
    image: '👩‍💻'
  },
  {
    id: 2,
    name: 'Михаил Сидоров',
    profession: 'Frontend-разработчик',
    story: 'Самоучка без технического образования. За 2 года прошёл путь от джуниора до мидла. Работаю удалённо из любой точки мира.',
    image: '👨‍💻'
  },
  {
    id: 3,
    name: 'Екатерина Волкова',
    profession: 'Product Manager',
    story: 'Перешла из маркетинга в продуктовый менеджмент. Запустила 3 успешных продукта, которыми пользуются миллионы людей.',
    image: '👩‍💼'
  }
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [testStarted, setTestStarted] = useState<boolean>(false);
  const [testCompleted, setTestCompleted] = useState<boolean>(false);

  const categories = ['Все', 'IT', 'Дизайн', 'Менеджмент', 'Маркетинг', 'Медицина', 'Юриспруденция', 'Финансы'];
  
  const filteredProfessions = selectedCategory === 'Все' 
    ? professions 
    : professions.filter(p => p.category === selectedCategory);

  const handleTestAnswer = () => {
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setTestCompleted(true);
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setTestStarted(false);
    setTestCompleted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <Icon name="Briefcase" size={28} />
              Карьерный навигатор
            </h1>
            <nav className="hidden md:flex gap-6">
              <a href="#catalog" className="text-foreground hover:text-primary transition-colors font-medium">Каталог</a>
              <a href="#test" className="text-foreground hover:text-primary transition-colors font-medium">Тест</a>
              <a href="#stories" className="text-foreground hover:text-primary transition-colors font-medium">Истории</a>
            </nav>
          </div>
        </div>
      </header>

      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h2 className="text-5xl font-bold mb-6">Найдите свой путь к успеху</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Профессиональная платформа для выбора карьеры. Каталог профессий, тестирование и реальные истории успеха
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" className="font-semibold" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>
              <Icon name="Search" size={20} className="mr-2" />
              Исследовать профессии
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20 font-semibold" onClick={() => document.getElementById('test')?.scrollIntoView({ behavior: 'smooth' })}>
              <Icon name="ClipboardList" size={20} className="mr-2" />
              Пройти тест
            </Button>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Каталог профессий</h2>
            <p className="text-muted-foreground text-lg">Изучите востребованные специальности с актуальными данными о зарплатах</p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="font-medium"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessions.map((profession, index) => (
              <Card key={profession.id} className="hover:shadow-lg transition-all duration-300 border-slate-200 animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl">{profession.title}</CardTitle>
                    <Badge variant="secondary">{profession.category}</Badge>
                  </div>
                  <CardDescription className="text-base">{profession.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground font-medium">Зарплата:</span>
                      <span className="font-semibold text-primary">{profession.salary}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground font-medium">Спрос на рынке:</span>
                        <span className="font-semibold">{profession.demand}%</span>
                      </div>
                      <Progress value={profession.demand} className="h-2" />
                    </div>
                    <Button className="w-full font-medium" variant="outline">
                      <Icon name="Info" size={18} className="mr-2" />
                      Подробнее
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="test" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Тест на профориентацию</h2>
            <p className="text-muted-foreground text-lg">Ответьте на вопросы и получите рекомендации по выбору профессии</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="shadow-xl border-slate-200">
              <CardHeader>
                {!testStarted && !testCompleted && (
                  <div className="text-center py-8">
                    <Icon name="Target" size={64} className="mx-auto mb-6 text-primary" />
                    <CardTitle className="text-2xl mb-4">Готовы узнать свой профессиональный путь?</CardTitle>
                    <CardDescription className="text-base mb-6">
                      Тест займёт всего 3 минуты. Получите персональные рекомендации на основе ваших ответов
                    </CardDescription>
                    <Button size="lg" onClick={() => setTestStarted(true)} className="font-semibold">
                      <Icon name="Play" size={20} className="mr-2" />
                      Начать тест
                    </Button>
                  </div>
                )}

                {testStarted && !testCompleted && (
                  <>
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-lg">Вопрос {currentQuestion + 1} из {testQuestions.length}</CardTitle>
                        <span className="text-sm text-muted-foreground font-medium">{Math.round(((currentQuestion + 1) / testQuestions.length) * 100)}%</span>
                      </div>
                      <Progress value={((currentQuestion + 1) / testQuestions.length) * 100} className="h-2" />
                    </div>
                    <CardDescription className="text-xl font-medium text-foreground mb-6">
                      {testQuestions[currentQuestion].question}
                    </CardDescription>
                  </>
                )}

                {testCompleted && (
                  <div className="text-center py-8">
                    <Icon name="CheckCircle" size={64} className="mx-auto mb-6 text-green-500" />
                    <CardTitle className="text-2xl mb-4">Тест завершён!</CardTitle>
                    <CardDescription className="text-base mb-8">
                      На основе ваших ответов мы рекомендуем обратить внимание на следующие направления:
                    </CardDescription>
                    <div className="space-y-4 mb-8">
                      <Card className="bg-primary/5 border-primary/20">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Icon name="TrendingUp" size={24} className="text-primary" />
                            Frontend-разработчик
                          </CardTitle>
                          <CardDescription>Соответствие: 92%</CardDescription>
                        </CardHeader>
                      </Card>
                      <Card className="bg-accent/5 border-accent/20">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Icon name="TrendingUp" size={24} className="text-accent" />
                            UX/UI Дизайнер
                          </CardTitle>
                          <CardDescription>Соответствие: 85%</CardDescription>
                        </CardHeader>
                      </Card>
                    </div>
                    <Button onClick={resetTest} variant="outline" className="font-medium">
                      <Icon name="RotateCcw" size={18} className="mr-2" />
                      Пройти тест заново
                    </Button>
                  </div>
                )}
              </CardHeader>

              {testStarted && !testCompleted && (
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {testQuestions[currentQuestion].options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto py-4 px-6 text-left justify-start hover:bg-primary hover:text-white hover:border-primary transition-all font-medium"
                        onClick={handleTestAnswer}
                      >
                        <span className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-semibold">
                            {String.fromCharCode(65 + index)}
                          </span>
                          {option}
                        </span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </section>

      <section id="stories" className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Истории успеха</h2>
            <p className="text-muted-foreground text-lg">Вдохновляющие примеры людей, которые нашли своё призвание</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <Card key={story.id} className="hover:shadow-xl transition-all duration-300 border-slate-200 animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">{story.image}</div>
                  <CardTitle className="text-xl mb-2">{story.name}</CardTitle>
                  <Badge variant="secondary" className="mx-auto">{story.profession}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{story.story}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы начать свой карьерный путь?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Пройдите тест на профориентацию и получите персональные рекомендации
          </p>
          <Button size="lg" variant="secondary" className="font-semibold" onClick={() => document.getElementById('test')?.scrollIntoView({ behavior: 'smooth' })}>
            <Icon name="Rocket" size={20} className="mr-2" />
            Начать сейчас
          </Button>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400">© 2024 Карьерный навигатор. Профессиональный выбор карьеры</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;