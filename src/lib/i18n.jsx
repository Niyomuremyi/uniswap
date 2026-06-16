import { createContext, useContext, useState } from 'react';

const STORAGE_KEY = 'uniswap_lang';

const translations = {
  en: {
    'nav.home': 'Home', 'nav.browse': 'Browse', 'nav.sell': 'Sell', 'nav.partners': 'Partners',
    'nav.about': 'About', 'nav.dashboard': 'My Dashboard', 'nav.logout': 'Logout', 'nav.login': 'Login / Register',

    'footer.tagline': 'Buy and sell student essentials, and find language partners — right on your campus.',
    'footer.explore': 'Explore', 'footer.browseItems': 'Browse items', 'footer.sellItem': 'Sell an item',
    'footer.partners': 'Language partners', 'footer.about': 'About us', 'footer.account': 'Account',
    'footer.login': 'Login / Register', 'footer.dashboard': 'My dashboard',
    'footer.copyright': '© 2026 Uniswap — Student Marketplace', 'footer.madeBy': 'Built by students, for students',

    'common.contactSeller': 'Contact seller', 'common.openWhatsApp': 'Open WhatsApp', 'common.connect': 'Connect',
    'common.teaches': 'Teaches', 'common.wantsToLearn': 'Wants to learn', 'common.delete': 'Delete', 'common.cancel': 'Cancel',

    'cat.All': 'All', 'cat.Furniture': 'Furniture', 'cat.Appliances': 'Appliances', 'cat.Electronics': 'Electronics',

    'cond.Like new': 'Like new', 'cond.Good': 'Good', 'cond.Fair': 'Fair',
    'campus.Main Campus': 'Main Campus', 'campus.East Campus': 'East Campus', 'campus.South Campus': 'South Campus',
    'home.heroCard1Title': 'Mini Fridge', 'home.heroCard1Meta': 'Good · Main Campus',
    'home.heroCard2Title': 'Used Laptop', 'home.heroCard2Meta': 'Good · Main Campus',
    'home.heroCard3Title': 'Bluetooth Speaker', 'home.heroCard3Meta': 'Like new · South Campus',

    'home.heroTag': '♻ Student Marketplace',
    'home.heroTitle1': 'Buy & sell student', 'home.heroTitle2': 'essentials on campus',
    'home.heroText': "Don't waste money buying new or throw good things away. Sell what you don't need, find what you do — right here with fellow students. Plus, find a language partner to learn together.",
    'home.browseBtn': 'Browse items', 'home.sellBtn': 'Sell your stuff',
    'home.statItems': 'Items listed', 'home.statCats': 'Categories', 'home.statPartners': 'Language partners', 'home.statStudent': 'Student to student',
    'home.howTitle1': 'How Uniswap', 'home.howTitle2': 'works', 'home.howSub': 'Three simple steps',
    'home.step1Title': 'Post your item', 'home.step1Text': 'List anything you no longer need in a minute.',
    'home.step2Title': 'Connect', 'home.step2Text': 'A buyer contacts you directly on WhatsApp.',
    'home.step3Title': 'Swap & save', 'home.step3Text': 'Meet on campus, hand over, done. Money saved, waste avoided.',
    'home.featuredTitle1': 'Featured', 'home.featuredTitle2': 'items', 'home.featuredSub': 'Fresh from fellow students', 'home.viewAll': 'View all',
    'home.ctaTitle1': 'Learn a language with a', 'home.ctaTitle2': 'partner',
    'home.ctaText': 'New in the country? Find someone to practise with, and teach yours in return.', 'home.findPartner': 'Find a partner',

    'browse.title1': 'Browse', 'browse.title2': 'items', 'browse.sub': 'Find what you need from fellow students',
    'browse.searchPlaceholder': 'Search items...', 'browse.sortNewest': 'Newest',
    'browse.sortLow': 'Price: Low to High', 'browse.sortHigh': 'Price: High to Low',
    'browse.itemsFound': 'items found', 'browse.noResults': 'No items match your search.', 'browse.loginFav': 'Please log in to save favourites.',

    'sell.title1': 'Sell an', 'sell.title2': 'item', 'sell.sub': 'Post something you no longer need',
    'sell.itemName': 'Item name', 'sell.category': 'Category', 'sell.condition': 'Condition',
    'sell.price': 'Price (¥)', 'sell.campus': 'Campus', 'sell.description': 'Description',
    'sell.namePlaceholder': 'e.g. Mini Fridge', 'sell.pricePlaceholder': 'e.g. 150',
    'sell.campusPlaceholder': 'e.g. Main Campus', 'sell.descPlaceholder': 'Describe the item, its condition, etc.',
    'sell.contactNote': 'Buyers will contact you on:', 'sell.fromAccount': '(from your account)',
    'sell.post': 'Post item', 'sell.errAll': 'Please fill in all fields.', 'sell.errPrice': 'Please enter a valid price.',
    'sell.needPre': 'Please ', 'sell.needMid': 'log in', 'sell.needPost': ' to sell',
    'sell.needText': 'You need an account to post an item for sale.', 'sell.loginBtn': 'Login / Register',

    'login.tabLogin': 'Login', 'login.tabRegister': 'Register',
    'login.welcome1': 'Welcome', 'login.welcome2': 'back', 'login.welcomeSub': 'Log in to your account',
    'login.email': 'Email', 'login.password': 'Password', 'login.passwordPlaceholder': 'Your password',
    'login.create1': 'Create', 'login.create2': 'account', 'login.createSub': 'Join free and start swapping',
    'login.fullName': 'Full name', 'login.namePlaceholder': 'Your name',
    'login.campusLabel': 'University / Campus', 'login.campusPlaceholder': 'e.g. Main Campus',
    'login.phoneLabel': 'Phone / WhatsApp', 'login.createPwPlaceholder': 'Create a password',
    'login.loginBtn': 'Log in', 'login.createBtn': 'Create account',
    'login.errWrong': 'Wrong email or password. New here? Create an account.',
    'login.errAll': 'Please fill in all fields.', 'login.errEmail': 'Please enter a valid email.',
    'login.errPw': 'Password must be at least 4 characters.', 'login.errExists': 'An account with this email already exists.',

    'dash.hi': 'Hi, ', 'dash.tabProfile': 'Profile', 'dash.tabItems': 'My Items',
    'dash.tabPartner': 'Partner Profile', 'dash.tabFavs': 'Favourites',
    'dash.name': 'Name', 'dash.email': 'Email', 'dash.campus': 'University / Campus', 'dash.phone': 'Phone / WhatsApp',
    'dash.noItems': "You haven't posted any items yet.", 'dash.postItem': 'Post an item',
    'dash.noPartner': "You haven't created a language-partner profile yet.", 'dash.createPartner': 'Create one',
    'dash.noFavs': 'No favourites yet. Tap the heart on any item to save it.', 'dash.browseItems': 'Browse items',
    'dash.needLogin': 'Please log in', 'dash.needLoginText': 'Log in to see your dashboard.',

    'partners.title1': 'Language', 'partners.title2': 'partners', 'partners.sub': 'Find someone to practise with — and teach yours in return',
    'partners.postBtn': '+ Post your partner profile', 'partners.formTitle': 'Your partner profile',
    'partners.teachLabel': 'Language you teach', 'partners.teachPlaceholder': 'e.g. English',
    'partners.learnLabel': 'Language you want to learn', 'partners.learnPlaceholder': 'e.g. Chinese',
    'partners.contactLabel': 'Contact (phone / WhatsApp)', 'partners.noteLabel': 'Short note / availability',
    'partners.notePlaceholder': 'e.g. Free evenings & weekends', 'partners.cancel': 'Cancel', 'partners.postProfile': 'Post profile',
    'partners.loginHintPre': 'Want to offer or find a partner? ', 'partners.loginHintLink': 'Log in', 'partners.loginHintPost': ' to post your profile.',
    'partners.searchPlaceholder': 'Search by language or name...', 'partners.errAll': 'Please fill in what you teach, what you want to learn, and your contact.',
    'partners.found': 'partners', 'partners.noResults': 'No partners match your search.',

    'about.title1': 'About', 'about.title2': 'Uniswap', 'about.sub': 'A student marketplace built to save money, cut waste, and bring campus together',
    'about.problemA': 'The ', 'about.problemB': 'problem',
    'about.problemText': 'Every year, students arrive on campus and buy everything new — mattresses, fridges, rice cookers, cupboards, and more. When they graduate, those same items are often thrown away or wasted. New students keep buying new, even though good items sit unused all around them. On top of that, international students often struggle to learn the local language because they have no one to practise with.',
    'about.solutionA': 'Our ', 'about.solutionB': 'solution',
    'about.solutionText': 'Uniswap connects students so they can buy and sell their essentials directly — quickly and mostly within the same campus. Sellers earn from things they no longer need, buyers save money, and far less goes to waste. We also help students find language partners, so learning a new language becomes part of campus life.',
    'about.offersTitle1': 'What Uniswap', 'about.offersTitle2': 'offers',
    'about.buyTitle': 'Buy & Sell', 'about.buyText': 'Post furniture, appliances, and electronics in seconds. Buyers contact you directly on WhatsApp. Simple, fast, and student-to-student.', 'about.browseBtn': 'Browse items',
    'about.partnerTitle': 'Language Partners', 'about.partnerText': 'Offer the language you speak and find someone to help you learn theirs. A friendly exchange that makes campus life easier.', 'about.findPartner': 'Find a partner',
    'about.whyTitle1': 'Why it', 'about.whyTitle2': 'matters',
    'about.val1Title': 'Save money', 'about.val1Text': 'Buy quality second-hand from students instead of paying full price for new.',
    'about.val2Title': 'Reduce waste', 'about.val2Text': 'Good items get reused instead of thrown away when students graduate.',
    'about.val3Title': 'Connect students', 'about.val3Text': 'Trade quickly and safely with people on your own campus.',
    'about.val4Title': 'Learn together', 'about.val4Text': 'Find a language partner to practise with and teach your own language.',
    'about.teamTitle1': 'Our', 'about.teamTitle2': 'team', 'about.teamSub': 'The students behind Uniswap',
    'about.role1': 'Idea & Research', 'about.role2': 'Design', 'about.role3': 'Development',
    'about.ctaTitle1': 'Join your campus', 'about.ctaTitle2': 'marketplace', 'about.ctaText': 'Create an account and start swapping today.', 'about.getStarted': 'Get started',
  },

  zh: {
    'nav.home': '首页', 'nav.browse': '浏览', 'nav.sell': '出售', 'nav.partners': '语伴',
    'nav.about': '关于', 'nav.dashboard': '我的中心', 'nav.logout': '退出登录', 'nav.login': '登录 / 注册',

    'footer.tagline': '买卖学生必需品，并在校园里找到语言伙伴。',
    'footer.explore': '探索', 'footer.browseItems': '浏览物品', 'footer.sellItem': '出售物品',
    'footer.partners': '语言伙伴', 'footer.about': '关于我们', 'footer.account': '账户',
    'footer.login': '登录 / 注册', 'footer.dashboard': '我的中心',
    'footer.copyright': '© 2026 Uniswap — 学生市场', 'footer.madeBy': '由学生打造，为学生服务',

    'common.contactSeller': '联系卖家', 'common.openWhatsApp': '打开 WhatsApp', 'common.connect': '联系',
    'common.teaches': '教授', 'common.wantsToLearn': '想学', 'common.delete': '删除', 'common.cancel': '取消',

    'cat.All': '全部', 'cat.Furniture': '家具', 'cat.Appliances': '电器', 'cat.Electronics': '电子产品',

    'cond.Like new': '几乎全新', 'cond.Good': '良好', 'cond.Fair': '一般',
    'campus.Main Campus': '主校区', 'campus.East Campus': '东校区', 'campus.South Campus': '南校区',
    'home.heroCard1Title': '迷你冰箱', 'home.heroCard1Meta': '良好 · 主校区',
    'home.heroCard2Title': '二手笔记本电脑', 'home.heroCard2Meta': '良好 · 主校区',
    'home.heroCard3Title': '蓝牙音箱', 'home.heroCard3Meta': '几乎全新 · 南校区',

    'home.heroTag': '♻ 学生二手市场',
    'home.heroTitle1': '买卖学生', 'home.heroTitle2': '校园生活必需品',
    'home.heroText': '不要花钱买新的，也不要把好东西扔掉。把你不需要的卖掉，找到你需要的——就在这里，和同学一起。还能找到语言伙伴一起学习。',
    'home.browseBtn': '浏览物品', 'home.sellBtn': '出售你的物品',
    'home.statItems': '已发布物品', 'home.statCats': '分类', 'home.statPartners': '语言伙伴', 'home.statStudent': '学生对学生',
    'home.howTitle1': 'Uniswap', 'home.howTitle2': '如何运作', 'home.howSub': '三个简单步骤',
    'home.step1Title': '发布物品', 'home.step1Text': '一分钟内发布你不再需要的任何东西。',
    'home.step2Title': '联系', 'home.step2Text': '买家通过 WhatsApp 直接联系你。',
    'home.step3Title': '交换并省钱', 'home.step3Text': '在校园见面，交付，完成。省钱又减少浪费。',
    'home.featuredTitle1': '精选', 'home.featuredTitle2': '物品', 'home.featuredSub': '来自同学的最新发布', 'home.viewAll': '查看全部',
    'home.ctaTitle1': '和伙伴一起', 'home.ctaTitle2': '学习语言',
    'home.ctaText': '刚到这个国家？找一个人一起练习，同时教对方你的语言。', 'home.findPartner': '寻找语伴',

    'browse.title1': '浏览', 'browse.title2': '物品', 'browse.sub': '从同学那里找到你需要的',
    'browse.searchPlaceholder': '搜索物品...', 'browse.sortNewest': '最新',
    'browse.sortLow': '价格：从低到高', 'browse.sortHigh': '价格：从高到低',
    'browse.itemsFound': '件物品', 'browse.noResults': '没有符合搜索的物品。', 'browse.loginFav': '请先登录再收藏。',

    'sell.title1': '出售', 'sell.title2': '物品', 'sell.sub': '发布你不再需要的东西',
    'sell.itemName': '物品名称', 'sell.category': '分类', 'sell.condition': '成色',
    'sell.price': '价格 (¥)', 'sell.campus': '校区', 'sell.description': '描述',
    'sell.namePlaceholder': '例如：迷你冰箱', 'sell.pricePlaceholder': '例如：150',
    'sell.campusPlaceholder': '例如：主校区', 'sell.descPlaceholder': '描述物品、成色等。',
    'sell.contactNote': '买家将通过以下方式联系你：', 'sell.fromAccount': '（来自你的账户）',
    'sell.post': '发布物品', 'sell.errAll': '请填写所有字段。', 'sell.errPrice': '请输入有效的价格。',
    'sell.needPre': '请', 'sell.needMid': '登录', 'sell.needPost': '后再出售',
    'sell.needText': '你需要一个账户才能发布物品。', 'sell.loginBtn': '登录 / 注册',

    'login.tabLogin': '登录', 'login.tabRegister': '注册',
    'login.welcome1': '欢迎', 'login.welcome2': '回来', 'login.welcomeSub': '登录你的账户',
    'login.email': '邮箱', 'login.password': '密码', 'login.passwordPlaceholder': '你的密码',
    'login.create1': '创建', 'login.create2': '账户', 'login.createSub': '免费加入，开始交换',
    'login.fullName': '全名', 'login.namePlaceholder': '你的名字',
    'login.campusLabel': '大学 / 校区', 'login.campusPlaceholder': '例如：主校区',
    'login.phoneLabel': '电话 / WhatsApp', 'login.createPwPlaceholder': '设置密码',
    'login.loginBtn': '登录', 'login.createBtn': '创建账户',
    'login.errWrong': '邮箱或密码错误。新用户？请创建账户。',
    'login.errAll': '请填写所有字段。', 'login.errEmail': '请输入有效的邮箱。',
    'login.errPw': '密码至少需要 4 个字符。', 'login.errExists': '该邮箱已被注册。',

    'dash.hi': '你好，', 'dash.tabProfile': '个人资料', 'dash.tabItems': '我的物品',
    'dash.tabPartner': '语伴资料', 'dash.tabFavs': '收藏',
    'dash.name': '姓名', 'dash.email': '邮箱', 'dash.campus': '大学 / 校区', 'dash.phone': '电话 / WhatsApp',
    'dash.noItems': '你还没有发布任何物品。', 'dash.postItem': '发布物品',
    'dash.noPartner': '你还没有创建语伴资料。', 'dash.createPartner': '创建一个',
    'dash.noFavs': '还没有收藏。点击任意物品上的爱心来收藏。', 'dash.browseItems': '浏览物品',
    'dash.needLogin': '请登录', 'dash.needLoginText': '登录后查看你的中心。',

    'partners.title1': '语言', 'partners.title2': '伙伴', 'partners.sub': '找人一起练习——同时教对方你的语言',
    'partners.postBtn': '+ 发布你的语伴资料', 'partners.formTitle': '你的语伴资料',
    'partners.teachLabel': '你教的语言', 'partners.teachPlaceholder': '例如：英语',
    'partners.learnLabel': '你想学的语言', 'partners.learnPlaceholder': '例如：中文',
    'partners.contactLabel': '联系方式（电话 / WhatsApp）', 'partners.noteLabel': '简短说明 / 时间安排',
    'partners.notePlaceholder': '例如：晚上和周末有空', 'partners.cancel': '取消', 'partners.postProfile': '发布资料',
    'partners.loginHintPre': '想提供或寻找语伴？', 'partners.loginHintLink': '登录', 'partners.loginHintPost': '后发布你的资料。',
    'partners.searchPlaceholder': '按语言或姓名搜索...', 'partners.errAll': '请填写你教的语言、想学的语言和联系方式。',
    'partners.found': '位语伴', 'partners.noResults': '没有符合搜索的语伴。',

    'about.title1': '关于', 'about.title2': 'Uniswap', 'about.sub': '一个为省钱、减少浪费、连接校园而打造的学生市场',
    'about.problemA': '', 'about.problemB': '问题',
    'about.problemText': '每年，学生来到校园都会买全新的东西——床垫、冰箱、电饭煲、衣柜等等。当他们毕业时，这些东西常常被扔掉或浪费。新生不断买新的，尽管周围有很多闲置的好物。此外，留学生常常因为没有练习对象而难以学习当地语言。',
    'about.solutionA': '我们的', 'about.solutionB': '解决方案',
    'about.solutionText': 'Uniswap 连接学生，让他们可以直接买卖必需品——快速且大多在同一校区内。卖家从不再需要的物品中获得收入，买家省钱，浪费也大大减少。我们还帮助学生寻找语言伙伴，让学习一门新语言成为校园生活的一部分。',
    'about.offersTitle1': 'Uniswap', 'about.offersTitle2': '提供什么',
    'about.buyTitle': '买卖', 'about.buyText': '几秒钟内发布家具、电器和电子产品。买家通过 WhatsApp 直接联系你。简单、快速、学生对学生。', 'about.browseBtn': '浏览物品',
    'about.partnerTitle': '语言伙伴', 'about.partnerText': '提供你会说的语言，找到能帮你学习对方语言的人。友好的交流让校园生活更轻松。', 'about.findPartner': '寻找语伴',
    'about.whyTitle1': '为什么', 'about.whyTitle2': '重要',
    'about.val1Title': '省钱', 'about.val1Text': '从学生那里购买优质二手，而不是花全价买新的。',
    'about.val2Title': '减少浪费', 'about.val2Text': '好物得到重复利用，而不是在学生毕业时被扔掉。',
    'about.val3Title': '连接学生', 'about.val3Text': '与你同校的人快速、安全地交易。',
    'about.val4Title': '共同学习', 'about.val4Text': '找到语言伙伴一起练习，并教授你自己的语言。',
    'about.teamTitle1': '我们的', 'about.teamTitle2': '团队', 'about.teamSub': 'Uniswap 背后的学生们',
    'about.role1': '创意与调研', 'about.role2': '设计', 'about.role3': '开发',
    'about.ctaTitle1': '加入你的校园', 'about.ctaTitle2': '市场', 'about.ctaText': '创建账户，今天就开始交换。', 'about.getStarted': '开始使用',
  },
};

const LangContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem(STORAGE_KEY) || 'en');
  const setLang = (l) => { localStorage.setItem(STORAGE_KEY, l); setLangState(l); };
  const toggleLang = () => setLang(lang === 'en' ? 'zh' : 'en');
  const t = (key) => (translations[lang] && translations[lang][key]) || translations.en[key] || key;
  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useT() {
  return useContext(LangContext);
}