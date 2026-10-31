/**
 * Cravers | كريفيرز
 * Core Layer: Master Gourmet Menu Dataset
 * 50+ handcrafted gourmet dishes across 8 specialized categories with 100% accurate,
 * verified food photography, rich bilingual descriptions, customizable sizes, and add-ons.
 */

export const CATEGORIES = [
  { id: 'all', name: 'All Dishes', nameAr: 'كل الأصناف', icon: 'bi-grid-fill' },
  { id: 'burgers', name: 'Beef Burgers', nameAr: 'برجر لحم فاخر', icon: 'bi-fire' },
  { id: 'chicken', name: 'Crispy Chicken', nameAr: 'دجاج كرانشي', icon: 'bi-egg-fried' },
  { id: 'pizzas', name: 'Loaded Pizzas', nameAr: 'بيتزا كريفيرز', icon: 'bi-pie-chart-fill' },
  { id: 'appetizers', name: 'Loaded Fries & Sides', nameAr: 'مقبلات وطاسات بطاطس', icon: 'bi-box-seam-fill' },
  { id: 'pasta', name: 'Cravers Pasta & Skillets', nameAr: 'طاسات مكرونة وماك آند تشيز', icon: 'bi-water' },
  { id: 'drinks', name: 'Shakes & Beverages', nameAr: 'ميلك شيك ومشروبات', icon: 'bi-cup-straw' },
  { id: 'desserts', name: 'Decadent Sweets', nameAr: 'حلويات كريفيرز الفاخرة', icon: 'bi-cake2-fill' },
  { id: 'sauces', name: 'Signature Dips', nameAr: 'الصوصات والتغميسات', icon: 'bi-droplet-fill' }
];

export const DEFAULT_MENU_ITEMS = [
  // =========================================================================
  // 1. GOURMET BEEF BURGERS (برجر لحم فاخر)
  // =========================================================================
  {
    id: 'crv-bg-01',
    title: "Craver's Monster Beast",
    titleAr: 'وحش كريفيرز الأسطوري',
    category: 'burgers',
    price: 185,
    calories: '920 kcal',
    prepTime: '15-18 min',
    badge: "Best Seller 🔥",
    rating: 4.9,
    reviewsCount: 480,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=80',
    description: 'Double Angus beef smashed patty, oozing cheddar, crispy caramelized balsamic onions, secret Cravers glaze, inside a toasted butter brioche bun.',
    descriptionAr: 'شريحتان من لحم الأنجوس الفاخر المشوي على الصاج، غارقة في جبن الشيدر الذائب، بصل مكرمل بالبلسميك، وصلصة كريفيرز السرية داخل خبز البريوش المحمص بالزبدة.',
    sizes: [
      { id: 'single', name: 'Single Patty (شريحة واحدة)', priceDiff: 0, default: true },
      { id: 'double', name: 'Double Patty (شريحتين)', priceDiff: 55 },
      { id: 'triple', name: 'Triple Monster (3 شرائح)', priceDiff: 95 }
    ],
    extras: [
      { id: 'ex-cheddar', name: 'Extra Melted Cheddar (شيدر إضافي)', price: 25 },
      { id: 'ex-bacon', name: 'Smoked Beef Bacon (بيكون بقري مدخن)', price: 30 },
      { id: 'ex-jalapeno', name: 'Pickled Jalapeños (هلابينو حار)', price: 15 },
      { id: 'ex-truffle', name: 'Truffle Mayo Drizzle (مايونيز الكمأة)', price: 25 }
    ]
  },
  {
    id: 'crv-bg-02',
    title: 'Smoky BBQ Truffle Angus',
    titleAr: 'برجر الترفل والأنجوس المدخن',
    category: 'burgers',
    price: 195,
    calories: '860 kcal',
    prepTime: '15-20 min',
    badge: "Chef's Special ⭐",
    rating: 4.8,
    reviewsCount: 315,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=700&auto=format&fit=crop&q=80',
    description: 'Fresh black Angus beef, sautéed garlic butter mushrooms, white Swiss cheese, black truffle aioli, and hickory wood smoke glaze.',
    descriptionAr: 'لحم أنجوس طازج مشوي بلهب الحطب، فطر مقلي بصلصة زبدة الثوم، جبنة سويسرية بيضاء فاخرة، صلصة الكمأة السوداء والباربكيو المدخن.',
    sizes: [
      { id: 'single', name: 'Single 180g (180 جرام)', priceDiff: 0, default: true },
      { id: 'double', name: 'Double 360g (360 جرام)', priceDiff: 60 }
    ],
    extras: [
      { id: 'ex-mushrooms', name: 'Extra Garlic Mushrooms (مشروم بالثوم)', price: 25 },
      { id: 'ex-swiss', name: 'Extra Swiss Cheese (جبن سويسري)', price: 25 },
      { id: 'ex-onions', name: 'Crispy Fried Onion Straws (بصل مقرمش)', price: 15 }
    ]
  },
  {
    id: 'crv-bg-03',
    title: 'Double Smash Mushroom Swiss',
    titleAr: 'سماش دبل ماشروم سويس بالجبن السويسري',
    category: 'burgers',
    price: 180,
    calories: '840 kcal',
    prepTime: '12-15 min',
    badge: "Mushroom Lovers 🍄",
    rating: 4.8,
    reviewsCount: 260,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=700&auto=format&fit=crop&q=80',
    description: 'Two smashed patties seared crispy with melted Emmental Swiss cheese, smothered in a creamy rich wild portobello mushroom reduction.',
    descriptionAr: 'شريحتان من البرجر المقرمش على الصاج تعلوهما جبنة إيمنتال سويسرية غنية، مغمورتان في صلصة الفطر البري الكثيفة والغنية بالكريمة.',
    sizes: [
      { id: 'double', name: 'Double Smash (شريحتين)', priceDiff: 0, default: true },
      { id: 'triple', name: 'Triple Smash (3 شرائح)', priceDiff: 50 }
    ],
    extras: [
      { id: 'ex-swiss', name: 'Extra Swiss Cheese (جبن سويسري إضافي)', price: 25 },
      { id: 'ex-bacon', name: 'Crisp Bacon Strips (شرائح بيكون)', price: 30 }
    ]
  },
  {
    id: 'crv-bg-04',
    title: 'Truffle Wagyu Gold Luxury Burger',
    titleAr: 'برجر واجيو بالترفل وورق الذهب الفاخر',
    category: 'burgers',
    price: 240,
    calories: '990 kcal',
    prepTime: '16-20 min',
    badge: "Ultra Premium 👑",
    rating: 5.0,
    reviewsCount: 340,
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=700&auto=format&fit=crop&q=80',
    description: '200g prime Australian Wagyu beef, melted Gruyère cheese, white truffle emulsion, wild foraged mushrooms, and crispy shallots on shiny brioche.',
    descriptionAr: '200 جرام من لحم الواجيو الأسترالي الفاخر، جبنة غرويير المعتقة، مستحلب الكمأة البيضاء، وفطر الغابات المحمص في خبز بريوش لامع.',
    sizes: [
      { id: '200g', name: '200g Wagyu Cut', priceDiff: 0, default: true },
      { id: '400g', name: 'Double 400g Wagyu Monster', priceDiff: 90 }
    ],
    extras: [
      { id: 'ex-truffle-butter', name: 'Extra Truffle Butter Melt (زبدة ترفل)', price: 30 }
    ]
  },
  {
    id: 'crv-bg-05',
    title: 'Smoky Bacon Jam & Cheddar Smash',
    titleAr: 'سماش دبل بمربى البيكون والكراميل والشيدر',
    category: 'burgers',
    price: 185,
    calories: '890 kcal',
    prepTime: '12-15 min',
    badge: "Bacon Jam 🥓",
    rating: 4.9,
    reviewsCount: 395,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=700&auto=format&fit=crop&q=80',
    description: 'Twin seared smash patties, house-made slow-simmered maple bacon onion jam, sharp melted cheddar, and secret garlic mayo.',
    descriptionAr: 'شريحتا لحم مقرمشتان على الصاج، مع مربى البصل والبيكون المطبوخ ببطء بشراب القيقب، جبنة شيدر حادة ذائبة، ومايونيز الثوم الخاص.',
    sizes: [
      { id: 'double', name: 'Double Patty', priceDiff: 0, default: true },
      { id: 'triple', name: 'Triple Patty', priceDiff: 50 }
    ],
    extras: [
      { id: 'ex-jam', name: 'Extra Bacon Jam Scoop (مربى بيكون إضافي)', price: 25 },
      { id: 'ex-cheese', name: 'Extra Aged Cheddar (شيدر إضافي)', price: 20 }
    ]
  },
  {
    id: 'crv-bg-06',
    title: 'Cheesy Volcano Melt Burger',
    titleAr: 'برجر بركان الجبن الذائب الصافي',
    category: 'burgers',
    price: 190,
    calories: '950 kcal',
    prepTime: '14-18 min',
    badge: "Cheese Pull 🧀",
    rating: 4.9,
    reviewsCount: 410,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=700&auto=format&fit=crop&q=80',
    description: 'Crispy fried panko cheese block over an Angus smash patty, served with a separate warm molten cheddar pot to pour directly over your burger!',
    descriptionAr: 'كتلة جبنة مقلية مقرمشة تعلو شريحة لحم الأنجوس، وتقدم مع قدر شيدر دافئ ذائب لتسكبه مباشرة فوق البرجر!',
    sizes: [
      { id: 'single', name: 'Single Patty + Cheese Block', priceDiff: 0, default: true },
      { id: 'double', name: 'Double Patty + Cheese Block', priceDiff: 55 }
    ],
    extras: [
      { id: 'ex-cup', name: 'Extra Molten Cheese Pot (قدر جبن إضافي)', price: 25 }
    ]
  },
  {
    id: 'crv-bg-07',
    title: 'Crispy Cravers Trio Sliders',
    titleAr: 'تريو ميني سلايدرز كريفيرز المشكل',
    category: 'burgers',
    price: 195,
    calories: '880 kcal',
    prepTime: '15-18 min',
    badge: "3 Burgers In 1 🍔",
    rating: 4.8,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=700&auto=format&fit=crop&q=80',
    description: '3 distinct mini gourmet sliders: 1 Classic Angus Smash, 1 Fiery Buffalo Crispy Chicken, and 1 Smoky Truffle Mushroom.',
    descriptionAr: '3 ساندوتشات سلايدرز ميني مميزة لتجربة كل النكهات: واحد برجر أنجوس كلاسيك، وواحد دجاج بافلو مقرمش، وواحد برجر فطر وترفل مدخن.',
    sizes: [
      { id: 'trio', name: 'Trio Box (3 Sliders)', priceDiff: 0, default: true },
      { id: 'sixpack', name: 'Party Pack (6 Sliders)', priceDiff: 170 }
    ],
    extras: [
      { id: 'ex-fries', name: 'Add Seasoned French Fries (بطاطس مقلية)', price: 30 }
    ]
  },

  // =========================================================================
  // 2. CRISPY CHICKEN BURGERS (ساندوتشات دجاج مقرمش)
  // =========================================================================
  {
    id: 'crv-ck-01',
    title: 'Fiery Buffalo Crunchy Chicken',
    titleAr: 'دجاج كرانشي بافلو الحار',
    category: 'chicken',
    price: 165,
    calories: '780 kcal',
    prepTime: '12-15 min',
    badge: "Spicy 🌶️",
    rating: 4.8,
    reviewsCount: 320,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=700&auto=format&fit=crop&q=80',
    description: 'Golden fried buttermilk crispy chicken breast tossed in fiery Nashville buffalo glaze, cooling ranch slaw, dill pickles, and toasted brioche.',
    descriptionAr: 'صدر دجاج مقرمش متبل ومغموس في صلصة البافلو الحارة، سلطة كول سلو رانش المنعشة، ومخلل خيار الشبت في خبز بريوش طازج.',
    sizes: [
      { id: 'regular', name: 'Classic Crispy (مقاس كلاسيك)', priceDiff: 0, default: true },
      { id: 'large', name: 'Mega Giant Fillet (فيليه عملاق)', priceDiff: 45 }
    ],
    extras: [
      { id: 'ex-ranch', name: 'Extra Buttermilk Ranch (رانش صوص)', price: 15 },
      { id: 'ex-cheddar', name: 'Melted American Cheese (جبن أمريكي)', price: 20 },
      { id: 'ex-jalapeno', name: 'Fiery Jalapeño Slices (شرائح هلابينو)', price: 15 }
    ]
  },
  {
    id: 'crv-ck-02',
    title: 'Nashville Hot Honey Crisp',
    titleAr: 'دجاج ناشفيل المقرمش بالعسل الحار',
    category: 'chicken',
    price: 175,
    calories: '810 kcal',
    prepTime: '12-15 min',
    badge: "Sweet & Spicy 🍯",
    rating: 4.9,
    reviewsCount: 410,
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=700&auto=format&fit=crop&q=80',
    description: 'Super crunchy fried chicken dipped in spicy cayenne glaze, generously drizzled with wildflower hot honey, creamy slaw, and crinkle pickles.',
    descriptionAr: 'دجاج فائق القرمشة مغمور بتتبيلة الكايين الحارة، ومغطى برشة كريمة من العسل الجبلي الحار، مع سلطة الكول سلو ومخلل مقرمش.',
    sizes: [
      { id: 'regular', name: 'Standard Fillet (قطعة واحدة)', priceDiff: 0, default: true },
      { id: 'double', name: 'Double Fillet Tower (قطعتين دجاج)', priceDiff: 55 }
    ],
    extras: [
      { id: 'ex-honey', name: 'Extra Hot Honey Cup (كوب عسل حار)', price: 18 },
      { id: 'ex-cheese', name: 'Melted Cheddar Slice (شريحة شيدر)', price: 20 }
    ]
  },
  {
    id: 'crv-ck-03',
    title: 'Garlic Parmesan Crispy Crunch',
    titleAr: 'دجاج مقرمش بصلصة الثوم والبارميزان المعتق',
    category: 'chicken',
    price: 160,
    calories: '750 kcal',
    prepTime: '12-14 min',
    badge: "Garlic Butter 🧄",
    rating: 4.7,
    reviewsCount: 180,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=700&auto=format&fit=crop&q=80',
    description: 'Crispy fried chicken breast drenched in warm roasted garlic butter and aged Italian Parmigiano Reggiano cheese, with fresh garden greens.',
    descriptionAr: 'صدر دجاج مقلي مقرمش مغموس في زبدة الثوم المشوي وجبن البارميزان الإيطالي المعتق، مع أوراق الجرجير والخس الطازجة.',
    sizes: [
      { id: 'single', name: 'Single Fillet (قطعة واحدة)', priceDiff: 0, default: true },
      { id: 'double', name: 'Double Fillet (قطعتين)', priceDiff: 50 }
    ],
    extras: [
      { id: 'ex-parm', name: 'Extra Shaved Parmesan (بارميزان إضافي)', price: 20 },
      { id: 'ex-garlic', name: 'Garlic Aioli Cup (كوب ثومية فاخرة)', price: 15 }
    ]
  },
  {
    id: 'crv-ck-04',
    title: 'Korean Sweet & Spicy Gochujang Crisp',
    titleAr: 'دجاج كوري مقرمش بصوص الجوتشوجانج والسمسم',
    category: 'chicken',
    price: 175,
    calories: '820 kcal',
    prepTime: '14-16 min',
    badge: "Korean Glaze 🥢",
    rating: 4.9,
    reviewsCount: 290,
    image: 'https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?w=700&auto=format&fit=crop&q=80',
    description: 'Crispy fried chicken drenched in sticky spicy Korean gochujang chili honey glaze, pickled radish ribbons, and roasted white sesame seeds.',
    descriptionAr: 'صدر دجاج مقرمش مغلف بطبقة كراميل من صوص الجوتشوجانج الكوري الحار والحلو بالعسل، مع شرائح الفجل المخلل والسمسم المحمص.',
    sizes: [
      { id: 'single', name: 'Single Fillet', priceDiff: 0, default: true },
      { id: 'double', name: 'Double Fillet', priceDiff: 50 }
    ],
    extras: [
      { id: 'ex-sauce', name: 'Extra Korean Glaze (صوص كوري إضافي)', price: 20 }
    ]
  },

  // =========================================================================
  // 3. LOADED PIZZAS (بيتزا كريفيرز المحملة)
  // =========================================================================
  {
    id: 'crv-pz-01',
    title: 'Pepperoni Volcano Inferno',
    titleAr: 'بيتزا بركان البيبروني الناري',
    category: 'pizzas',
    price: 210,
    calories: '1150 kcal',
    prepTime: '18-22 min',
    badge: "Popular 🍕",
    rating: 4.9,
    reviewsCount: 540,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=700&auto=format&fit=crop&q=80',
    description: 'Slow-fermented artisan crust, San Marzano tomato sauce, double aged mozzarella, cup-and-char crispy beef pepperoni cups, hot honey drizzle.',
    descriptionAr: 'عجينة نابولية مخمرة ببطء، صلصة طماطم سان مارزانو، موزاريلا إيطالية مضاعفة، بيبيروني مقرمش فاخر، ولمسة من العسل الحار الخاص.',
    sizes: [
      { id: 'med', name: 'Medium 10" (وسط 10 إنش)', priceDiff: 0, default: true },
      { id: 'large', name: 'Large 14" (كبير 14 إنش)', priceDiff: 70 },
      { id: 'fam', name: 'Craver Monster 16" (عائلي 16 إنش)', priceDiff: 110 }
    ],
    extras: [
      { id: 'ex-crust', name: 'Cheese Stuffed Crust (أطراف محشوة جبن)', price: 35 },
      { id: 'ex-pepperoni', name: 'Double Pepperoni (بيبروني مضاعف)', price: 30 },
      { id: 'ex-honey', name: 'Extra Hot Honey Dip (عسل حار)', price: 15 }
    ]
  },
  {
    id: 'crv-pz-02',
    title: 'Smoked Texas BBQ Chicken Pizza',
    titleAr: 'بيتزا تكساس دجاج باربكيو مدخن',
    category: 'pizzas',
    price: 220,
    calories: '1080 kcal',
    prepTime: '18-22 min',
    badge: "Top Rated ⭐",
    rating: 4.8,
    reviewsCount: 380,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&auto=format&fit=crop&q=80',
    description: 'Wood-fired dough, grilled chicken breast tossed in sweet & smoky barbecue sauce, red onion crisps, smoked gouda, and fresh cilantro.',
    descriptionAr: 'دجاج مشوي على الفحم مغمور بصلصة الباربكيو الحلوة والمدخنة، شرائح البصل الأحمر، جبنة جودا وموزاريلا مع رشة كزبرة خضراء منعشة.',
    sizes: [
      { id: 'med', name: 'Medium 10" (وسط 10 إنش)', priceDiff: 0, default: true },
      { id: 'large', name: 'Large 14" (كبير 14 إنش)', priceDiff: 70 },
      { id: 'fam', name: 'Monster 16" (عائلي 16 إنش)', priceDiff: 110 }
    ],
    extras: [
      { id: 'ex-crust', name: 'Stuffed Garlic Butter Crust (أطراف زبدة الثوم)', price: 35 },
      { id: 'ex-chicken', name: 'Extra Smoky Chicken (دجاج مدخن إضافي)', price: 35 },
      { id: 'ex-cheese', name: 'Triple Cheese Blend (مزيج الأجبان)', price: 30 }
    ]
  },
  {
    id: 'crv-pz-03',
    title: 'Truffle Burrata & Wild Mushroom',
    titleAr: 'بيتزا البوراتا وفطر الترفل البري',
    category: 'pizzas',
    price: 245,
    calories: '980 kcal',
    prepTime: '20-25 min',
    badge: "Gourmet ✨",
    rating: 4.9,
    reviewsCount: 290,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=700&auto=format&fit=crop&q=80',
    description: 'White garlic cream base, roasted wild portobello and cremini mushrooms, whole creamy fresh burrata ball, white truffle drizzle, fresh arugula.',
    descriptionAr: 'قاعدة كريمة الثوم الأبيض، فطر بورتوبيلو بري محمص، كرة جبنة بوراتا طازجة كريمية، زيت الكمأة الإيطالي الفاخر وأوراق الجرجير البري.',
    sizes: [
      { id: 'med', name: 'Medium 10" (وسط)', priceDiff: 0, default: true },
      { id: 'large', name: 'Large 14" (كبير)', priceDiff: 80 }
    ],
    extras: [
      { id: 'ex-burrata', name: 'Extra Burrata Ball (كرة بوراتا إضافية)', price: 55 },
      { id: 'ex-parmesan', name: 'Shaved Parmigiano (بارميزان معتق)', price: 25 }
    ]
  },
  {
    id: 'crv-pz-04',
    title: 'Buffalo Crispy Chicken Ranch Pizza',
    titleAr: 'بيتزا دجاج بافلو كرانشي مع صوص الرانش الغني',
    category: 'pizzas',
    price: 225,
    calories: '1120 kcal',
    prepTime: '18-22 min',
    badge: "Buffalo Ranch 🍗",
    rating: 4.9,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700&auto=format&fit=crop&q=80',
    description: 'Crispy fried chicken bites drenched in spicy cayenne buffalo glaze, layered over mozzarella, sweet red onion, and swirled with herb buttermilk ranch.',
    descriptionAr: 'قطع دجاج مقرمشة مغمورة بصوص البافلو الحار فوق طبقة موزاريلا غنية وبصل أحمر، ومزينة بخطوط حلزونية من صوص الرانش بالأعشاب.',
    sizes: [
      { id: 'med', name: 'Medium 10"', priceDiff: 0, default: true },
      { id: 'large', name: 'Large 14"', priceDiff: 70 }
    ],
    extras: [
      { id: 'ex-ranch', name: 'Extra Ranch Dip (صوص رانش)', price: 15 },
      { id: 'ex-stuffed', name: 'Cheese Crust (أطراف محشوة)', price: 35 }
    ]
  },

  // =========================================================================
  // 4. CRAVERS APPETIZERS & LOADED SKILLETS (مقبلات وطاسات بطاطس)
  // =========================================================================
  {
    id: 'crv-ap-01',
    title: 'Loaded Craver Cheddar Bacon Fries',
    titleAr: 'بطاطس كريفيرز المحملة بالشيدر والبيكون',
    category: 'appetizers',
    price: 110,
    calories: '750 kcal',
    prepTime: '10-12 min',
    badge: "Must Try 🍟",
    rating: 4.9,
    reviewsCount: 650,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=700&auto=format&fit=crop&q=80',
    description: 'Crispy skin-on golden french fries drenched in rich molten cheddar cheese sauce, real crispy bacon bits, jalapeño rings, and Cravers smash sauce.',
    descriptionAr: 'بطاطس مقلية ذهبية مقرمشة مغطاة بصوص جبنة الشيدر الساخنة، قطع لحم البيكون البقري المقرمش، شرائح الهلابينو، وصوص كريفيرز المميز.',
    sizes: [
      { id: 'reg', name: 'Regular Box (علبة عادية)', priceDiff: 0, default: true },
      { id: 'share', name: 'Cravers Share Box (علبة مشاركة عملاقة)', priceDiff: 50 }
    ],
    extras: [
      { id: 'ex-sauce', name: 'Extra Molten Cheddar Cup (كوب شيدر)', price: 20 },
      { id: 'ex-bacon-chips', name: 'Extra Crispy Bacon Crunch (بيكون إضافي)', price: 25 }
    ]
  },
  {
    id: 'crv-ap-02',
    title: 'Philly Steak Loaded Skillet Fries',
    titleAr: 'طاسة بطاطس محملة بستيك فيلي المشوي والجبن الذائب',
    category: 'appetizers',
    price: 135,
    calories: '820 kcal',
    prepTime: '12-15 min',
    badge: "Loaded Skillet 🥩",
    rating: 4.9,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=700&auto=format&fit=crop&q=80',
    description: 'Hot sizzling skillet of crisp fries topped with seared sliced ribeye steak, sautéed peppers and onions, and melted provolone cheese sauce.',
    descriptionAr: 'طاسة ساخنة من البطاطس المقرمشة يعلوها لحم ستيك ريب آي المشوي، فلفل وبصل مكرمل، مع شلال من جبنة البروفولون والشيدر الذائبة.',
    sizes: [
      { id: 'skillet', name: 'Single Skillet', priceDiff: 0, default: true },
      { id: 'giant-skillet', name: 'Sharing Sizzler Skillet', priceDiff: 55 }
    ],
    extras: [
      { id: 'ex-steak', name: 'Extra Sliced Ribeye (لحم ستيك إضافي)', price: 40 },
      { id: 'ex-cheese', name: 'Double Cheese Layer (طبقة جبن مضاعفة)', price: 25 }
    ]
  },
  {
    id: 'crv-ap-03',
    title: 'Sticky Honey-Sriracha Glazed Wings',
    titleAr: 'أجنحة دجاج بالعسل وسيراتشا الحار',
    category: 'appetizers',
    price: 135,
    calories: '680 kcal',
    prepTime: '12-15 min',
    badge: "Glazed & Crisp 🍗",
    rating: 4.8,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=700&auto=format&fit=crop&q=80',
    description: '8 jumbo crispy fried chicken wings glazed in our addictive sweet honey sriracha reduction, sprinkled with toasted sesame seeds and green onions.',
    descriptionAr: '8 قطع أجنحة دجاج مقرمشة ومغطاة بطبقة كراميل من العسل وصوص سيراتشا الحار، مزينة بالسمسم المحمص وشرائح البصل الأخضر.',
    sizes: [
      { id: '8pcs', name: '8 Pieces Wings (8 قطع أجنحة)', priceDiff: 0, default: true },
      { id: '16pcs', name: '16 Pieces Party Wings (16 قطعة بارتي)', priceDiff: 110 }
    ],
    extras: [
      { id: 'ex-blue', name: 'Blue Cheese Dip (صوص الجبنة الزرقاء)', price: 20 },
      { id: 'ex-ranch', name: 'Herb Ranch Dip (صوص رانش)', price: 15 }
    ]
  },
  {
    id: 'crv-ap-04',
    title: 'Golden Mozzarella Cheese Bombs',
    titleAr: 'قنابل الموزاريلا الذهبية المقرمشة',
    category: 'appetizers',
    price: 105,
    calories: '590 kcal',
    prepTime: '8-10 min',
    badge: "Cheesy Pull 🧀",
    rating: 4.7,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=700&auto=format&fit=crop&q=80',
    description: 'Herb and panko-crusted whole mozzarella bites fried to perfection with an epic cheese pull. Served with warm marinara dipping sauce.',
    descriptionAr: 'قطع جبنة موزاريلا إيطالية مغلفة بفتات خبز البانكو والأعشاب، مقلية لقرمشة مثالية مع مطة جبن خرافية. تقدم مع صوص المارينارا الدافئ.',
    sizes: [
      { id: '6pcs', name: '6 Pieces (6 قطع)', priceDiff: 0, default: true },
      { id: '10pcs', name: '10 Pieces (10 قطع)', priceDiff: 45 }
    ],
    extras: [
      { id: 'ex-marinara', name: 'Extra Marinara Cup (مارينارا صوص)', price: 15 },
      { id: 'ex-garlic', name: 'Garlic Butter Dip (صوص زبدة الثوم)', price: 15 }
    ]
  },
  {
    id: 'crv-ap-05',
    title: 'Dynamite Crispy Fried Shrimp',
    titleAr: 'جمبري مقرمش بصوص الديناميت الحار',
    category: 'appetizers',
    price: 165,
    calories: '610 kcal',
    prepTime: '10-12 min',
    badge: "Seafood Treat 🍤",
    rating: 4.9,
    reviewsCount: 390,
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=700&auto=format&fit=crop&q=80',
    description: 'Jumbo tempura batter-fried shrimp tossed generously in sweet & spicy creamy Japanese dynamite aioli, topped with scallions and tobiko.',
    descriptionAr: 'حبات جمبري جامبو مقلية بعجينة التمبورا المقرمشة ومغمورة بصوص الديناميت الحار والكريمي، مزينة بالبصل الأخضر وحبات السمسم.',
    sizes: [
      { id: '8pcs', name: '8 Jumbo Shrimp (8 حبات)', priceDiff: 0, default: true },
      { id: '14pcs', name: '14 Jumbo Feast (14 حبة)', priceDiff: 95 }
    ],
    extras: [
      { id: 'ex-dyn', name: 'Extra Dynamite Sauce Cup (كوب ديناميت)', price: 20 }
    ]
  },
  {
    id: 'crv-ap-06',
    title: 'Cheesy Garlic Herb Breadsticks',
    titleAr: 'أصابع الخبز بالثوم والجبن الذائب الساخن',
    category: 'appetizers',
    price: 85,
    calories: '540 kcal',
    prepTime: '10-12 min',
    badge: "Garlic Crust 🥖",
    rating: 4.8,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=700&auto=format&fit=crop&q=80',
    description: 'Fresh baked pull-apart breadsticks smothered in roasted garlic butter, oregano, and baked with a thick blanket of bubbly golden mozzarella.',
    descriptionAr: 'أصابع خبز طازجة ومحمرة مدهونة بزبدة الثوم والأوريجانو، ومغطاة بطبقة غنية من جبنة الموزاريلا الساخنة والذائبة مع صوص المارينارا.',
    sizes: [
      { id: 'regular', name: '6 Breadsticks + Dip', priceDiff: 0, default: true }
    ],
    extras: [
      { id: 'ex-marinara', name: 'Marinara Dip (مارينارا)', price: 15 }
    ]
  },

  // =========================================================================
  // 5. CRAVERS PASTA & SKILLETS (طاسات مكرونة وماك آند تشيز)
  // =========================================================================
  {
    id: 'crv-ps-01',
    title: 'Smoky Bacon Mac & Cheese Skillet',
    titleAr: 'طاسة ماك آند تشيز بالبيكون والشيدر الساخنة',
    category: 'pasta',
    price: 145,
    calories: '890 kcal',
    prepTime: '12-16 min',
    badge: "Cast Iron Skillet 🧀",
    rating: 4.9,
    reviewsCount: 360,
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=700&auto=format&fit=crop&q=80',
    description: 'Baked in a cast-iron skillet: elbow macaroni drenched in 4 velvety cheeses, crowned with toasted garlic butter panko & crispy beef bacon bits.',
    descriptionAr: 'تُخبز وتقدم في طاسة حديدية ساخنة: مكرونة غارقة في مزيج الأجبان الأربعة الغني، تعلوها طبقة مقرمشة من البانكو المحمص وقطع البيكون البقري المدخن.',
    sizes: [
      { id: 'single', name: 'Single Skillet (طاسة فردية)', priceDiff: 0, default: true },
      { id: 'sharing', name: 'Large Sharing Skillet (طاسة مشاركة)', priceDiff: 60 }
    ],
    extras: [
      { id: 'ex-bacon', name: 'Double Bacon Crunch (بيكون مضاعف)', price: 30 },
      { id: 'ex-jalapeno', name: 'Spicy Jalapeño Slices (هلابينو)', price: 15 }
    ]
  },
  {
    id: 'crv-ps-02',
    title: 'Truffle Alfredo Skillet with Crispy Chicken',
    titleAr: 'طاسة فيتوتشيني ألفريدو بالترفل مع الدجاج المقرمش',
    category: 'pasta',
    price: 175,
    calories: '940 kcal',
    prepTime: '14-18 min',
    badge: "Hot Skillet 🍝",
    rating: 4.8,
    reviewsCount: 290,
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=700&auto=format&fit=crop&q=80',
    description: 'Hot sizzling skillet of fettuccine pasta in rich heavy garlic cream with white truffle oil, sautéed mushrooms, and golden crispy sliced chicken tenders.',
    descriptionAr: 'طاسة باستا ساخنة بصلصة الكريمة الغنية (ألفريدو) وزيت الكمأة الأبيض العطري، مع فطر سوتيه وشرائح صدور الدجاج المقرمشة الذهبية.',
    sizes: [
      { id: 'regular', name: 'Standard Skillet (طاسة وسط)', priceDiff: 0, default: true },
      { id: 'large', name: 'Big Feast Skillet (طاسة كبيرة)', priceDiff: 50 }
    ],
    extras: [
      { id: 'ex-chicken', name: 'Extra Crispy Chicken Cutlet (دجاج إضافي)', price: 40 },
      { id: 'ex-parm', name: 'Extra Parmigiano Reggiano (بارميزان إيطالي)', price: 25 }
    ]
  },
  {
    id: 'crv-ps-03',
    title: 'Spicy Buffalo Chicken Mac Skillet',
    titleAr: 'طاسة ماك آند تشيز بافلو الحار مع كرات الدجاج',
    category: 'pasta',
    price: 155,
    calories: '870 kcal',
    prepTime: '12-15 min',
    badge: "Spicy Cheesy 🌶️",
    rating: 4.7,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=700&auto=format&fit=crop&q=80',
    description: 'Baked mac and cheese infused with cayenne buffalo sauce, crispy buffalo chicken popcorn bites, and a cooling buttermilk ranch swirl.',
    descriptionAr: 'طاسة ماك آند تشيز مخبوزة بصلصة البافلو الحارة، ومغطاة بكرات دجاج بوب كورن المقرمشة ورشة من صوص الرانش الغني بالأعشاب.',
    sizes: [
      { id: 'regular', name: 'Regular Skillet', priceDiff: 0, default: true },
      { id: 'sharing', name: 'Party Skillet', priceDiff: 55 }
    ],
    extras: [
      { id: 'ex-ranch', name: 'Extra Ranch Drizzle (رانش إضافي)', price: 15 },
      { id: 'ex-cheddar', name: 'Double Cheese Layer (طبقة جبن مضاعفة)', price: 25 }
    ]
  },

  // =========================================================================
  // 6. SHAKES & COLD BEVERAGES (ميلك شيك ومشروبات منعشة)
  // =========================================================================
  {
    id: 'crv-dr-01',
    title: 'Lotus Biscoff Freakshake',
    titleAr: 'ميلك شيك لوتس بسكوف الفاخر',
    category: 'drinks',
    price: 85,
    calories: '540 kcal',
    prepTime: '5-7 min',
    badge: "Signature Shake 🥤",
    rating: 4.9,
    reviewsCount: 460,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=700&auto=format&fit=crop&q=80',
    description: 'Creamy vanilla gelato blended with genuine Belgian Biscoff spread, crushed lotus cookies, topped with whipped cream and caramelized biscuit.',
    descriptionAr: 'جيلاتو الفانيليا الفاخر ممزوج بزبدة اللوتس البلجيكية الأصلية وبسكويت اللوتس المطحون، تعلوه كريمة مخفوقة وبسكويت مقرمش.',
    sizes: [
      { id: 'reg', name: 'Regular 400ml (وسط)', priceDiff: 0, default: true },
      { id: 'large', name: 'Giant Craver 600ml (كبير)', priceDiff: 25 }
    ],
    extras: [
      { id: 'ex-drizzle', name: 'Extra Lotus Melt Drizzle (لوتس إضافي)', price: 15 },
      { id: 'ex-whipped', name: 'Extra Whipped Cream (كريمة مضاعفة)', price: 10 }
    ]
  },
  {
    id: 'crv-dr-02',
    title: 'Double Oreo Crunch Freakshake',
    titleAr: 'ميلك شيك أوريو دبل كرانش الكثيف',
    category: 'drinks',
    price: 80,
    calories: '570 kcal',
    prepTime: '5-7 min',
    badge: "Oreo Lovers 🍪",
    rating: 4.8,
    reviewsCount: 390,
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=700&auto=format&fit=crop&q=80',
    description: 'Rich dark chocolate and vanilla cream blended with crushed Oreo cookies, chocolate syrup rim, whipped cream, and a whole Oreo cookie.',
    descriptionAr: 'مزيج آيس كريم الفانيليا والشوكولاتة مع بسكويت الأوريو المطحون، صوص فدج الشوكولاتة، وكريمة مخفوقة مع حبة أوريو عملاقة.',
    sizes: [
      { id: 'reg', name: 'Regular 400ml', priceDiff: 0, default: true },
      { id: 'large', name: 'Giant 600ml', priceDiff: 25 }
    ],
    extras: [
      { id: 'ex-oreo', name: 'Extra Crushed Oreos (أوريو مطحون)', price: 15 }
    ]
  },
  {
    id: 'crv-dr-03',
    title: 'Pistachio White Chocolate Shake',
    titleAr: 'ميلك شيك الفستق الحلبي والشوكولاتة البيضاء',
    category: 'drinks',
    price: 95,
    calories: '580 kcal',
    prepTime: '5-7 min',
    badge: "Pistachio Royal 🥜",
    rating: 4.8,
    reviewsCount: 270,
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=700&auto=format&fit=crop&q=80',
    description: 'Pure roasted Sicilian pistachio paste, melted Swiss white chocolate, cream, and chopped toasted pistachios on top of whipped cream.',
    descriptionAr: 'معجون الفستق الصقلي المحمص الطبيعي، شوكولاتة بيضاء سويسرية مذابة، كريمة غنية، وقطع الفستق الحلبي المقرمشة.',
    sizes: [
      { id: 'reg', name: 'Regular 400ml', priceDiff: 0, default: true },
      { id: 'large', name: 'Giant 600ml', priceDiff: 30 }
    ],
    extras: [
      { id: 'ex-pistachio', name: 'Double Pistachio Dust (فستق مضاعف)', price: 25 }
    ]
  },
  {
    id: 'crv-dr-04',
    title: 'Passion Fruit & Berry Sparkling Mojito',
    titleAr: 'موهيتو باشن فروت وتوت بري منعش',
    category: 'drinks',
    price: 65,
    calories: '180 kcal',
    prepTime: '4-6 min',
    badge: "Refreshing ❄️",
    rating: 4.8,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=700&auto=format&fit=crop&q=80',
    description: 'Muddled fresh mint sprigs, juicy lime wedges, wild blackberry compote, exotic passion fruit puree, and ice-cold sparkling soda.',
    descriptionAr: 'أوراق النعناع الطازجة، شرائح الليمون، هريس الباشن فروت الاستوائي والتوت البري، مع الصودا الفوارة المنعشة والثلج المجروش.',
    sizes: [
      { id: 'reg', name: 'Glass 450ml (كوب منعش)', priceDiff: 0, default: true },
      { id: 'pitcher', name: 'Sharing Pitcher 1L (إبريق مشاركة 1 لتر)', priceDiff: 60 }
    ],
    extras: [
      { id: 'ex-mint-lime', name: 'Double Mint & Lime Burst (نعناع وليمون إضافي)', price: 10 }
    ]
  },

  // =========================================================================
  // 7. DECADENT DESSERTS (حلويات كريفيرز الفاخرة)
  // =========================================================================
  {
    id: 'crv-ds-01',
    title: 'Cinnabon Warm Cinnamon Roll with Cream Cheese',
    titleAr: 'سينابون رول كريفيرز الدافئ بصوص الجبن الكريمي والكراميل',
    category: 'desserts',
    price: 85,
    calories: '580 kcal',
    prepTime: '5-8 min',
    badge: "Fresh Baked 🌀",
    rating: 4.9,
    reviewsCount: 490,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&auto=format&fit=crop&q=80',
    description: 'Giant warm oven-baked sweet cinnamon roll drenched in signature cream cheese vanilla frosting, roasted pecan bits, and golden caramel drizzle.',
    descriptionAr: 'لفة سينابون عملاقة طازجة ودافئة مغمورة في صوص الجبنة الكريمية والفانيليا الغني، قطع عين الجمل المحمصة، وخطوط الكراميل الذهبي.',
    sizes: [
      { id: 'single', name: '1 Giant Roll (حبة عملاقة)', priceDiff: 0, default: true },
      { id: 'box4', name: 'Family Box (4 Rolls)', priceDiff: 190 }
    ],
    extras: [
      { id: 'ex-frosting', name: 'Extra Cream Cheese Frosting (صوص جبن إضافي)', price: 20 },
      { id: 'ex-pecan', name: 'Extra Roasted Pecans (مكسرات بيكان)', price: 25 }
    ]
  },
  {
    id: 'crv-ds-02',
    title: 'Crispy Churros with Warm Nutella & Caramel Dip',
    titleAr: 'تشوروز إسباني مقرمش بصوص النوتيلا ودولسي دي ليتشي',
    category: 'desserts',
    price: 80,
    calories: '520 kcal',
    prepTime: '6-8 min',
    badge: "Twin Dip Pots 🍫",
    rating: 4.8,
    reviewsCount: 380,
    image: 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?w=700&auto=format&fit=crop&q=80',
    description: '6 golden crispy Spanish churros rolled in cinnamon sugar, served with two warm ceramic pots of melted Nutella chocolate and dulce de leche.',
    descriptionAr: '6 أصابع تشوروز إسبانية ذهبية مقرمشة مرشوشة بالسكر والقرفة، تقدم مع قدرين ساخنين من شوكولاتة النوتيلا الذائبة وكراميل الدولسي دي ليتشي.',
    sizes: [
      { id: '6pcs', name: '6 Churros + 2 Dips', priceDiff: 0, default: true },
      { id: '12pcs', name: '12 Churros Feast', priceDiff: 65 }
    ],
    extras: [
      { id: 'ex-nutella-pot', name: 'Extra Warm Nutella Pot (قدر نوتيلا)', price: 20 }
    ]
  },
  {
    id: 'crv-ds-03',
    title: 'Belgian Nutella & Strawberry Waffle Tower',
    titleAr: 'برج الوافل البلجيكي بالنوتيلا والفراولة الطازجة',
    category: 'desserts',
    price: 90,
    calories: '640 kcal',
    prepTime: '8-10 min',
    badge: "Waffle Tower 🍓",
    rating: 4.9,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=700&auto=format&fit=crop&q=80',
    description: 'Freshly pressed golden Belgian waffle squares stacked high, layered with Nutella chocolate, ripe strawberry slices, and sweet vanilla cream.',
    descriptionAr: 'مربعات وافل بلجيكي مقرمشة وذهبية طازجة تعلوها طبقات من شوكولاتة النوتيلا الدافئة، شرائح الفراولة الطازجة، والكريمة المخفوقة.',
    sizes: [
      { id: 'single', name: 'Single Waffle', priceDiff: 0, default: true },
      { id: 'double', name: 'Double Stack Tower', priceDiff: 45 }
    ],
    extras: [
      { id: 'ex-gelato', name: 'Madagascar Vanilla Gelato Scoop (بولة آيس كريم)', price: 20 },
      { id: 'ex-strawberries', name: 'Extra Fresh Strawberries (فراولة إضافية)', price: 15 }
    ]
  },
  {
    id: 'crv-ds-04',
    title: 'Lotus Biscoff Cream Cheesecake',
    titleAr: 'تشيز كيك لوتس بسكوف الكريمية الفاخرة',
    category: 'desserts',
    price: 105,
    calories: '590 kcal',
    prepTime: '4-6 min',
    badge: "Lotus Biscoff 🍪",
    rating: 4.9,
    reviewsCount: 370,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=700&auto=format&fit=crop&q=80',
    description: 'Thick buttery Biscoff cookie crumb crust with velvety cream cheese, topped with a rich layer of warm melted lotus spread and crunchy biscuit.',
    descriptionAr: 'قاعدة بسكويت اللوتس المقرمشة بالزبدة تعلوها طبقة كاسترد تشيز كيك غنية وفائقة النعومة، مغطاة بكريمة اللوتس الساخنة وبسكويت مقرمش.',
    sizes: [
      { id: 'slice', name: 'Generous Slice (قطعة كبيرة)', priceDiff: 0, default: true }
    ],
    extras: [
      { id: 'ex-drizzle', name: 'Extra Warm Biscoff Melt (لوتس ساخن)', price: 20 }
    ]
  },
  {
    id: 'crv-ds-05',
    title: 'S\'mores Campfire Chocolate Skillet Dip',
    titleAr: 'طاسة سمورز المارشميلو والشوكولاتة الساخنة في المقلاة',
    category: 'desserts',
    price: 95,
    calories: '670 kcal',
    prepTime: '8-10 min',
    badge: "Dessert Skillet 🔥",
    rating: 4.8,
    reviewsCount: 310,
    image: 'assets/images/smores_skillet_dip.jpg',
    description: 'Baked in a hot skillet: molten Belgian milk chocolate base topped with giant roasted golden marshmallows, served with crunchy biscuits for dipping!',
    descriptionAr: 'تخبز في مقلاة حديدية ساخنة: قاعدة من شوكولاتة الحليب البلجيكية الذائبة تعلوها حبات المارشميلو المحمرة، مع بسكويت مقرمش للتغميس!',
    sizes: [
      { id: 'skillet', name: 'Hot Skillet + Biscuits', priceDiff: 0, default: true }
    ],
    extras: [
      { id: 'ex-biscuits', name: 'Extra Dipping Biscuits (بسكويت إضافي)', price: 15 }
    ]
  },
  {
    id: 'crv-ds-06',
    title: 'Molten Belgian Lava Cake & Gelato',
    titleAr: 'كيك الشوكولاتة البلجيكية الذائبة مع آيس كريم',
    category: 'desserts',
    price: 95,
    calories: '620 kcal',
    prepTime: '10-12 min',
    badge: "Decadent 🍫",
    rating: 4.9,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=700&auto=format&fit=crop&q=80',
    description: 'Warm rich dark Belgian chocolate sponge with an oozing hot chocolate lava core, served with a scoop of Madagascar vanilla bean gelato.',
    descriptionAr: 'كيك الشوكولاتة البلجيكية الداكنة الدافئة مع قلب الشوكولاتة السائلة المتدفقة، تقدم مع بولة آيس كريم فانيليا مدغشقر الفاخرة.',
    sizes: [
      { id: 'single', name: 'Single Slice + Gelato (قطعة مع آيس كريم)', priceDiff: 0, default: true }
    ],
    extras: [
      { id: 'ex-gelato', name: 'Extra Vanilla Gelato Scoop (بولة آيس كريم إضافية)', price: 20 },
      { id: 'ex-strawberries', name: 'Fresh Strawberries (فراولة طازجة)', price: 15 }
    ]
  },
  {
    id: 'crv-ds-07',
    title: 'San Sebastian Burnt Cheesecake',
    titleAr: 'تشيز كيك سان سيباستيان الإسبانية المحروقة',
    category: 'desserts',
    price: 110,
    calories: '560 kcal',
    prepTime: '5-8 min',
    badge: "Creamy Custard 🍰",
    rating: 4.9,
    reviewsCount: 360,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=700&auto=format&fit=crop&q=80',
    description: 'Traditional Basque burnt cheesecake with a caramelized golden-brown exterior and an ultra-creamy, molten custard center. Served with hot milk chocolate pour.',
    descriptionAr: 'تشيز كيك الباسك الإسبانية التقليدية بسطح مكرمل بني لامع وقلب كاسترد فائق النعومة يذوب في الفم، مع صوص شوكولاتة الحليب الساخن.',
    sizes: [
      { id: 'slice', name: 'Large Generous Slice (قطعة كبيرة)', priceDiff: 0, default: true }
    ],
    extras: [
      { id: 'ex-choc', name: 'Extra Hot Chocolate Pitcher (كوب شوكولاتة)', price: 25 }
    ]
  },

  // =========================================================================
  // 8. SIGNATURE DIPS & SAUCES (الصوصات والتغميسات الصافية)
  // =========================================================================
  {
    id: 'crv-sc-01',
    title: 'Cravers Secret Smash Glaze Dip',
    titleAr: 'صوص كريفيرز السري المميز للتغميس',
    category: 'sauces',
    price: 20,
    calories: '120 kcal',
    prepTime: '1 min',
    badge: "Secret Recipe 🔥",
    rating: 5.0,
    reviewsCount: 780,
    image: 'https://images.unsplash.com/photo-1563865436874-9aef32095fad?w=700&auto=format&fit=crop&q=80',
    description: 'Our proprietary creamy burger sauce dip in a ceramic pot. A zesty blend of smoked paprika, minced sweet relish, and spiced aioli. Perfect for fries and burgers.',
    descriptionAr: 'صوص البرجر الكريمي السري والشهير في طبق تغميس خاص. مزيج رائع من البابريكا المدخنة وريليش المخلل الحلو والمايونيز المتبل لتغميس البرجر والبطاطس.',
    sizes: [
      { id: 'cup', name: 'Dip Cup 60ml (طبق تغميس)', priceDiff: 0, default: true },
      { id: 'bottle', name: 'Big Squeeze Bottle 200ml (زجاجة كبيرة)', priceDiff: 30 }
    ],
    extras: []
  },
  {
    id: 'crv-sc-02',
    title: 'Smoked Garlic Truffle Aioli Dip',
    titleAr: 'مايونيز الثوم والكمأة (الترفل) المدخن الفاخر',
    category: 'sauces',
    price: 25,
    calories: '140 kcal',
    prepTime: '1 min',
    badge: "Black Truffle ✨",
    rating: 4.9,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=700&auto=format&fit=crop&q=80',
    description: 'Pure velvety white garlic aioli infused with Italian black winter truffles, confit roasted garlic purée, and cracked black pepper.',
    descriptionAr: 'أيولي الثوم الكريمي الأبيض الفاخر الممزوج بخلاصة الكمأة السوداء الإيطالية، ثوم مشوي ومطحون وفلفل أسود مجروش.',
    sizes: [
      { id: 'cup', name: 'Dip Cup 60ml', priceDiff: 0, default: true }
    ],
    extras: []
  },
  {
    id: 'crv-sc-03',
    title: 'Warm Molten Cheddar Cheese Pot',
    titleAr: 'قدر الجبنة الشيدر الساخنة الذائبة النقية',
    category: 'sauces',
    price: 30,
    calories: '220 kcal',
    prepTime: '2 min',
    badge: "100% Pure Cheese 🧀",
    rating: 4.9,
    reviewsCount: 610,
    image: 'assets/images/cheddar_cheese_pot.jpg',
    description: 'A steaming pot of smooth, golden, rich melted cheddar cheese dip. Dip your burgers, fries, or wings directly into it!',
    descriptionAr: 'وعاء ساخن من صوص جبنة الشيدر الذهبية الصافية والذائبة بسلاسة. اغمس فيه البرجر، البطاطس، أو الأجنحة واستمتع بالطعم الخرافي!',
    sizes: [
      { id: 'pot', name: 'Cheese Pot 100ml', priceDiff: 0, default: true },
      { id: 'giant-pot', name: 'Giant Cheese Pot 200ml', priceDiff: 25 }
    ],
    extras: []
  },
  {
    id: 'crv-sc-04',
    title: 'Sweet & Fiery Nashville Hot Honey',
    titleAr: 'عسل ناشفيل الحار النقي المتبل بالفلفل الأحمر',
    category: 'sauces',
    price: 20,
    calories: '90 kcal',
    prepTime: '1 min',
    badge: "Hot Honey 🍯",
    rating: 4.8,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=700&auto=format&fit=crop&q=80',
    description: '100% pure golden honey with a wooden honey dipper, infused with fiery crushed red chili flakes and habanero heat. The ultimate pizza and chicken glaze.',
    descriptionAr: 'عسل جبلي طبيعي ذهبي نقي مع عصا العسل الخشبية، منقوع مع رقائق الفلفل الأحمر الحار وفلفل الهابانيرو. إضافة استثنائية لأطراف البيتزا وقطع الدجاج المقرمشة.',
    sizes: [
      { id: 'cup', name: 'Dip Cup 60ml', priceDiff: 0, default: true }
    ],
    extras: []
  }
,
  // =========================================================================
  // 10. B.LABAN ORIGINAL DESSERTS & SPECIALTIES (حلويات بلبن الأصلية)
  // =========================================================================
  {
    id: "crv-blb-01",
    title: "Khalty Matelda Swiss Chocolate Fudge Cake",
    titleAr: "خالتي ماتيلدا - كيكة الفادج والشوكولاتة السويسرية الغارقة",
    category: 'desserts',
    categoryGroup: "desserts",
    price: 155,
    calories: "650 kcal",
    prepTime: "5-7 min",
    badge: "B.Laban Special 🍫",
    rating: 4.9,
    reviewsCount: 520,
    image: 'assets/images/matilda_chocolate_cake.jpg',
    description: "Layers of rich Swiss chocolate fudge cake drenched in velvety warm melted chocolate glaze.",
    descriptionAr: "طبقات من كيكة الفادج والشوكولاتة السويسرية الفاخرة غارقة في صوص الشوكولاتة البلجيكية الساخنة الذائبة.",
    sizes: [
          {
                "id": "reg",
                "name": "Normal Bowl (طبق عادي)",
                "priceDiff": 0,
                "default": true
          },
          {
                "id": "large",
                "name": "Double Chocolate Bowl (طبق مضاعف)",
                "priceDiff": 50
          }
    ],
    extras: [
          {
                "id": "ex-gelato",
                "name": "Vanilla Gelato Scoop (بولا جيلاتو فانيليا)",
                "price": 25
          },
          {
                "id": "ex-choco",
                "name": "Extra Hot Chocolate Sauce (شوكولاتة إضافية)",
                "price": 20
          }
    ]
  },
  {
    id: "crv-blb-02",
    title: "El Metkandra Giant Kinder Bar Cake",
    titleAr: "المتكندرة - قالب الكندر والنوتيلا والوايت شوكليت العملاق",
    category: 'desserts',
    categoryGroup: "desserts",
    price: 175,
    calories: "720 kcal",
    prepTime: "5 min",
    badge: "Kinder Melt 🍫",
    rating: 4.8,
    reviewsCount: 440,
    image: 'https://foodics-console-production.s3.eu-west-1.amazonaws.com/images/756090_1778210939_a1ba3322-d550-47d4-ac4d-d0cc739f8fee.jpeg',
    description: "Your favorite Kinder chocolate bar in a giant size, stuffed with chocolate fudge cake, cream and rich Nutella melt.",
    descriptionAr: "قالب شوكولاتة كندر كرانشي عملاق محشو بكيك الشوكولاتة والكريمة الغنية وصوص النوتيلا الذائب.",
    sizes: [
          {
                "id": "small",
                "name": "Metkandra (قالب المتكندرة)",
                "priceDiff": 0,
                "default": true
          }
    ],
    extras: [
          {
                "id": "ex-gelato",
                "name": "Vanilla Gelato Scoop (بولا جيلاتو فانيليا)",
                "price": 25
          },
          {
                "id": "ex-kinder",
                "name": "Extra Kinder Sauce (صوص كيندر إضافي)",
                "price": 25
          }
    ]
  },
  {
    id: "crv-blb-03",
    title: "Sankorita Nougat & Condensed Milk Cake",
    titleAr: "سنكوريتا - كيك النوجا والكريمة بالحليب المكثف",
    category: 'desserts',
    categoryGroup: "desserts",
    price: 125,
    calories: "580 kcal",
    prepTime: "5 min",
    badge: "Nougat Cream 🍯",
    rating: 4.7,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&auto=format&fit=crop&q=80',
    description: "Rich creamy nougat layer crafted from pure natural milk, whipped cream, and tender sponge cake.",
    descriptionAr: "طبقة النوجا الكريمية المصنوعة من الحليب الصافي مع الفادج والكريمة الغنية ولمسة العسل.",
    sizes: [
          {
                "id": "large",
                "name": "Sankorita Large (سنكوريتا كبيرة)",
                "priceDiff": 0,
                "default": true
          }
    ],
    extras: [
          {
                "id": "ex-nuts",
                "name": "Roasted Almonds & Hazelnuts (مكسرات محمصة)",
                "price": 25
          }
    ]
  },
  {
    id: "crv-blb-04",
    title: "Rice Pudding with Fresh Qeshta & Nuts",
    titleAr: "أرز باللبن بالقشطة البلدي والمكسرات الفاخرة",
    category: 'desserts',
    categoryGroup: "desserts",
    price: 85,
    calories: "490 kcal",
    prepTime: "3 min",
    badge: "Pure Baladi 🥛",
    rating: 4.9,
    reviewsCount: 680,
    image: 'assets/images/rice_pudding_qeshta_nuts.jpg',
    description: "Traditional Egyptian creamy rice pudding prepared with farm-fresh milk, loaded with baladi qeshta and golden roasted nuts.",
    descriptionAr: "أرز باللبن الطبيعي الفلاحي الطازج تعلوه طبقة سميكة من القشطة البلدي وتشكيلة مكسرات محمصة مقرمشة.",
    sizes: [
          {
                "id": "reg",
                "name": "Standard Bowl (طبق فردي)",
                "priceDiff": 0,
                "default": true
          },
          {
                "id": "giant",
                "name": "Giant Bowl (طبق كبير)",
                "priceDiff": 35
          }
    ],
    extras: [
          {
                "id": "ex-qeshta",
                "name": "Extra Baladi Qeshta (قشطة بلدي إضافية)",
                "price": 20
          },
          {
                "id": "ex-honey",
                "name": "Natural Bee Honey (عسل نحل طبيعي)",
                "price": 15
          }
    ]
  },
  {
    id: "crv-blb-05",
    title: "Fresh Mango Rice Pudding Bowl",
    titleAr: "أرز بلبن غارق بقطع المانجو الفريش الطبيعية",
    category: 'desserts',
    categoryGroup: "desserts",
    price: 70,
    calories: "420 kcal",
    prepTime: "3 min",
    badge: "Fresh Mango 🥭",
    rating: 4.8,
    reviewsCount: 540,
    image: 'https://foodics-console-production.s3.eu-west-1.amazonaws.com/images/756090_1733330520_9da53eff-4339-447a-b48b-32e8abd6a496.jpg',
    description: "Chilled creamy rice pudding drenched in fresh mango sauce and heaps of freshly cut sweet mango chunks.",
    descriptionAr: "أرز بلبن حليبي كريمي طازج مغطى بطبقة وفيرة من قطع المانجو الطبيعية المنعشة وبيوريه المانجو المركز.",
    sizes: [
          {
                "id": "reg",
                "name": "Standard Bowl (طبق وسط)",
                "priceDiff": 0,
                "default": true
          },
          {
                "id": "large",
                "name": "Jumbo Bowl (طبق جامبو)",
                "priceDiff": 30
          }
    ],
    extras: [
          {
                "id": "ex-gelato",
                "name": "Mango Gelato Scoop (بولا جيلاتو مانجو)",
                "price": 25
          },
          {
                "id": "ex-qeshta",
                "name": "Baladi Qeshta (قشطة بلدي)",
                "price": 20
          }
    ]
  },
  {
    id: "crv-blb-06",
    title: "Belgian Lotus Biscoff Rice Pudding",
    titleAr: "أرز بلبن بزبدة وبسكويت اللوتس البلجيكي المقرمش",
    category: 'desserts',
    categoryGroup: "desserts",
    price: 75,
    calories: "510 kcal",
    prepTime: "3 min",
    badge: "Biscoff Lotus 🍪",
    rating: 4.8,
    reviewsCount: 460,
    image: 'https://foodics-console-production.s3.eu-west-1.amazonaws.com/images/756090_1733328890_9da53548-4ec9-426a-ba71-ff5cc0cdb5b1.jpg',
    description: "Creamy cold rice pudding draped in molten Belgian Lotus Biscoff butter spread and crunchy biscuit crumbs.",
    descriptionAr: "أرز باللبن الكريمي مغطى بطبقة سميكة من زبدة اللوتس البلجيكية الذائبة وقطع البسكويت المقرمش.",
    sizes: [
          {
                "id": "reg",
                "name": "Standard Bowl (طبق وسط)",
                "priceDiff": 0,
                "default": true
          }
    ],
    extras: [
          {
                "id": "ex-biscuits",
                "name": "Extra Lotus Biscuits (بسكويت لوتس إضافي)",
                "price": 15
          },
          {
                "id": "ex-gelato",
                "name": "Vanilla Gelato Scoop (بولا جيلاتو)",
                "price": 25
          }
    ]
  },
  {
    id: "crv-blb-07",
    title: "El Moadaba Super Special Gourmet Bowl",
    titleAr: "المؤدبة نفر حلو سوبر سبيشيال - مانجو ومكسرات وقشطة",
    category: 'desserts',
    categoryGroup: "desserts",
    price: 150,
    calories: "680 kcal",
    prepTime: "5 min",
    badge: "Super Special ⭐",
    rating: 5,
    reviewsCount: 710,
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop&q=80',
    description: "Heavy dairy cream rice pudding generously loaded with Ismailia fresh mango slices, rich baladi qeshta, cashews, pistachios and almonds.",
    descriptionAr: "أرز باللبن بالكريمة اللباني الغنية مع مانجو إسماعيلاوي فريش، قشطة بلدي، كاجو، فسدق ولوز محمص.",
    sizes: [
          {
                "id": "super",
                "name": "Super Special Bowl (طبق سوبر سبيشيال)",
                "priceDiff": 0,
                "default": true
          }
    ],
    extras: [
          {
                "id": "ex-gelato",
                "name": "Gelato Scoop (بولا جيلاتو)",
                "price": 25
          }
    ]
  },
  {
    id: "crv-blb-08",
    title: "Dubai Trending Pistachio & Crispy Kunafa Crepe",
    titleAr: "كريب دبي تريند - فستق وكنافة كرانشي مقرمشة وشوكولاتة",
    category: 'desserts',
    categoryGroup: "desserts",
    price: 145,
    calories: "620 kcal",
    prepTime: "6-8 min",
    badge: "Dubai Trend 🇦🇪",
    rating: 4.9,
    reviewsCount: 890,
    image: 'assets/images/dubai_crepe_pistachio.jpg',
    description: "Golden French toasted crepe roll stuffed with Dubai viral filling: toasted golden kunafa, pure pistachio cream, and draped in Belgian chocolate.",
    descriptionAr: "عجينة كريب فرنسية محشوة بحشوة دبي الشهيرة: كنافة محمصة ومقرمشة مع زبدة الفستق الحلبي وصوص الشوكولاتة البلجيكية.",
    sizes: [
          {
                "id": "roll",
                "name": "Dubai Crepe Roll (كريب رول دبي)",
                "priceDiff": 0,
                "default": true
          }
    ],
    extras: [
          {
                "id": "ex-pistachio",
                "name": "Extra Pistachio Butter (فستق بيور إضافي)",
                "price": 30
          },
          {
                "id": "ex-gelato",
                "name": "Vanilla Gelato Scoop (بولا جيلاتو)",
                "price": 25
          }
    ]
  },
  {
    id: "crv-blb-09",
    title: "Crepe Bombastic Belgian Chocolate Roll",
    titleAr: "كريب بومباستيك غارق بالشوكولاتة البلجيكية والكريمة",
    category: 'desserts',
    categoryGroup: "desserts",
    price: 155,
    calories: "670 kcal",
    prepTime: "6-8 min",
    badge: "Bombastic 🔥",
    rating: 4.8,
    reviewsCount: 410,
    image: 'assets/images/crepe_bombastic_chocolate.jpg',
    description: "Decadent French crepe layered with premium Belgian milk chocolate, white chocolate drizzles, cream filling and crispy biscuit pearls.",
    descriptionAr: "كريب رول فرنسي محشو بكريمة غنية ومكس مكسرات وغارق في أنهار الشوكولاتة البلجيكية والوايت شوكليت.",
    sizes: [
          {
                "id": "roll",
                "name": "Bombastic Roll (رول بومباستيك)",
                "priceDiff": 0,
                "default": true
          }
    ],
    extras: [
          {
                "id": "ex-choco",
                "name": "Extra Belgian Chocolate (شوكولاتة إضافية)",
                "price": 20
          }
    ]
  },
  {
    id: "crv-blb-10",
    title: "Qashtota Fresh Mango Milk Sponge Cake",
    titleAr: "قشطوطة مانجو - كيكة الحليب المسقسقة بقطع المانجو الفريش",
    category: 'desserts',
    categoryGroup: "desserts",
    price: 105,
    calories: "540 kcal",
    prepTime: "3 min",
    badge: "Best Seller 👑",
    rating: 4.9,
    reviewsCount: 950,
    image: 'assets/images/qashtota_mango_cake.jpg',
    description: "Fluffy sponge cake deeply soaked in sweet vanilla milk and rich dairy cream, topped with generous slices of fresh tropical mango.",
    descriptionAr: "قطعة كيك إسفنجي مسقسقة بالحليب والقشطة الغنية، تعلوها طبقة كريمة لباني وقطع مانجو طبيعية طازجة.",
    sizes: [
          {
                "id": "single",
                "name": "Standard Qashtota (قطعة قشطوطة)",
                "priceDiff": 0,
                "default": true
          },
          {
                "id": "with-rice",
                "name": "With Rice Pudding (مع قاعدة أرز بلبن)",
                "priceDiff": 20
          }
    ],
    extras: [
          {
                "id": "ex-mango",
                "name": "Extra Mango Chunks (قطع مانجو إضافية)",
                "price": 20
          },
          {
                "id": "ex-gelato",
                "name": "Gelato Scoop (بولا جيلاتو)",
                "price": 25
          }
    ]
  },
  {
    id: "crv-blb-11",
    title: "Qashtota Belgian Lotus Biscoff Milk Cake",
    titleAr: "قشطوطة لوتس - كيكة الحليب بزبدة وبسكويت اللوتس",
    category: 'desserts',
    categoryGroup: "desserts",
    price: 115,
    calories: "590 kcal",
    prepTime: "3 min",
    badge: "Lotus Cravings 🍪",
    rating: 4.8,
    reviewsCount: 670,
    image: 'assets/images/qashtota_lotus_cake.jpg',
    description: "Milk-soaked melt-in-the-mouth cake smothered with warm Belgian Lotus Biscoff butter spread and topped with crunchy caramelized biscuit bits.",
    descriptionAr: "كيكة الحليب والقشطة الفاخرة مغطاة بطبقة وفيرة من زبدة اللوتس البلجيكية الأصلية وبسكويت اللوتس المقرمش.",
    sizes: [
          {
                "id": "single",
                "name": "Standard Qashtota (قشطوطة لوتس)",
                "priceDiff": 0,
                "default": true
          },
          {
                "id": "with-rice",
                "name": "With Rice Pudding (مع قاعدة أرز باللبن)",
                "priceDiff": 20
          }
    ],
    extras: [
          {
                "id": "ex-lotus",
                "name": "Extra Lotus Melt (لوتس إضافي)",
                "price": 20
          }
    ]
  },
  {
    id: "crv-blb-12",
    title: "Qashtota Roasted Mixed Nuts & Cream Cake",
    titleAr: "قشطوطة بالمكسرات المحمصة الفاخرة والكريمة الغنية",
    category: 'desserts',
    categoryGroup: "desserts",
    price: 115,
    calories: "560 kcal",
    prepTime: "3 min",
    badge: "Crunchy Nuts 🥜",
    rating: 4.8,
    reviewsCount: 510,
    image: 'assets/images/qashtota_nuts_cake.jpg',
    description: "Delicate milk cake smothered in light dairy whipping cream, piled high with roasted almonds, hazelnuts, cashews and pistachios.",
    descriptionAr: "كيكة الحليب والقشطة المسقسقة تعلوها طبقة كريمة خفيفة وتشكيلة مكسرات ممتازة من البندق، الكاجو، واللوز المحمص.",
    sizes: [
          {
                "id": "single",
                "name": "Standard Plate (طبق قشطوطة مكسرات)",
                "priceDiff": 0,
                "default": true
          },
          {
                "id": "with-rice",
                "name": "With Rice Pudding (مع أرز باللبن)",
                "priceDiff": 20
          }
    ],
    extras: [
          {
                "id": "ex-qeshta",
                "name": "Baladi Qeshta (قشطة بلدي)",
                "price": 20
          },
          {
                "id": "ex-honey",
                "name": "Bee Honey (عسل نحل)",
                "price": 15
          }
    ]
  },
  {
    id: "crv-blb-13",
    title: "Qashtota Super Luxe Triple Treat",
    titleAr: "قشطوطة سوبر لوكس - ميكس المانجو واللوتس والمكسرات",
    category: 'desserts',
    categoryGroup: "desserts",
    price: 145,
    calories: "660 kcal",
    prepTime: "4 min",
    badge: "Super Luxe 🌟",
    rating: 5,
    reviewsCount: 820,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&auto=format&fit=crop&q=80',
    description: "The ultimate royal dessert: milk-soaked Qashtota cake with rice pudding, fresh mango, Belgian Lotus spread, and roasted nuts all in one dish.",
    descriptionAr: "الطبق الملكي: كيكة قشطوطة وأرز بلبن مع ميكس ثلاثي من المانجو الفريش، زبدة اللوتس، والمكسرات المحمصة.",
    sizes: [
          {
                "id": "royal",
                "name": "Royal Super Luxe (طبق سوبر لوكس)",
                "priceDiff": 0,
                "default": true
          }
    ],
    extras: [
          {
                "id": "ex-gelato",
                "name": "Gelato Scoop (بولا جيلاتو)",
                "price": 25
          }
    ]
  },
  {
    id: "crv-blb-14",
    title: "Remontada Mango Qashtota Rice Bowl",
    titleAr: "ريمونتادا مانجو - طبقة أرز بلبن مع قشطوطة ومانجو فريش",
    category: 'desserts',
    categoryGroup: "desserts",
    price: 130,
    calories: "610 kcal",
    prepTime: "4 min",
    badge: "Remontada 🥭",
    rating: 4.9,
    reviewsCount: 760,
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&auto=format&fit=crop&q=80',
    description: "Sensational combination of creamy cold rice pudding, milk-soaked Qashtota cake, and an avalanche of fresh sweet mango cubes.",
    descriptionAr: "طبقة أرز بلبن كريمي مع قطعة قشطوطة مسقسقة بالحليب ومغطاة بطوفان من قطع المانجو الطبيعية والجيلاتو.",
    sizes: [
          {
                "id": "bowl",
                "name": "Remontada Bowl (طبق ريمونتادا)",
                "priceDiff": 0,
                "default": true
          }
    ],
    extras: [
          {
                "id": "ex-gelato",
                "name": "Extra Mango Gelato (بولا جيلاتو مانجو)",
                "price": 25
          }
    ]
  },
  {
    id: "crv-blb-15",
    title: "Sweet Koshari Large with Lotus Biscoff & Crispy Goulash",
    titleAr: "كشري لوتس كبير - كنافة مقرمشة وأرز باللبن وصوص اللوتس والجلاش",
    category: 'desserts',
    categoryGroup: "desserts",
    price: 110,
    calories: "580 kcal",
    prepTime: "3-4 min",
    badge: "Koshari Trend 🥣",
    rating: 4.9,
    reviewsCount: 1120,
    image: 'assets/images/koshari_lotus_sweet.jpg',
    description: "B.Laban world-famous invention: Rice pudding base (rice), golden kunafa crunch (vermicelli), fresh cream, molten Lotus Biscoff, topped with crispy baked goulash flakes (crispy onions!).",
    descriptionAr: "ابتكار بلبن الشهير: طبقة أرز بلبن، كنافة ذهبية مقرمشة، كريمة فريش، لوتس ذائب، ورشة جلاش مقرمش (بديل البصل المقرمش!).",
    sizes: [
          {
                "id": "large",
                "name": "Large Koshari (كشري لوتس كبير)",
                "priceDiff": 0,
                "default": true
          },
          {
                "id": "small",
                "name": "Small Koshari (كشري لوتس صغير)",
                "priceDiff": -35
          }
    ],
    extras: [
          {
                "id": "ex-lotus",
                "name": "Extra Lotus Sauce (صوص لوتس إضافي)",
                "price": 20
          },
          {
                "id": "ex-goulash",
                "name": "Extra Crispy Goulash (جلاش مقرمش إضافي)",
                "price": 10
          }
    ]
  },
  {
    id: "crv-blb-16",
    title: "Sweet Koshari Large with Pistachio Cream & Kunafa",
    titleAr: "كشري بيستاشيو كبير - فستق حلبي وكنافة مقرمشة وجلاش ذهبي",
    category: 'desserts',
    categoryGroup: "desserts",
    price: 115,
    calories: "610 kcal",
    prepTime: "3-4 min",
    badge: "Pistachio Gold 💚",
    rating: 4.9,
    reviewsCount: 880,
    image: 'https://foodics-console-production.s3.eu-west-1.amazonaws.com/images/756090_1738241537_9e1796ef-4f47-4087-9387-26012b66eaee.jpg',
    description: "Layers of rice pudding, roasted kunafa crunch, fresh whipping cream, drenched in pure pistachio spread and topped with crispy goulash flakes.",
    descriptionAr: "طبقة أرز باللبن، كنافة كرانشي، كريمة ناعمة، صوص فستق حلبي أصلي بيور، ومغطاة بشرائح جلاش ذهبية مقرمشة.",
    sizes: [
          {
                "id": "large",
                "name": "Large Koshari (كشري بيستاشيو كبير)",
                "priceDiff": 0,
                "default": true
          },
          {
                "id": "small",
                "name": "Small Koshari (كشري بيستاشيو صغير)",
                "priceDiff": -35
          }
    ],
    extras: [
          {
                "id": "ex-pistachio",
                "name": "Extra Pistachio Sauce (فستق بيور إضافي)",
                "price": 30
          }
    ]
  },
  {
    id: "crv-blb-17",
    title: "Sweet Koshari Large with Fresh Mango Chunks",
    titleAr: "كشري مانجو كبير - كنافة وأرز بلبن ومكعبات مانجو طبيعية",
    category: 'desserts',
    categoryGroup: "desserts",
    price: 105,
    calories: "510 kcal",
    prepTime: "3-4 min",
    badge: "Mango Fresh 🥭",
    rating: 4.8,
    reviewsCount: 790,
    image: 'assets/images/koshari_mango_sweet.jpg',
    description: "Refreshing sweet koshari with crispy toasted kunafa, creamy rice pudding, light cream, fresh mango compote, and golden goulash crisps.",
    descriptionAr: "كشري حلو بطبقات الكنافة والأرز باللبن والكريمة مع مكعبات المانجو الفريش وصوص المانجو الاستوائي والجلاش المحمص.",
    sizes: [
          {
                "id": "large",
                "name": "Large Koshari (كشري مانجو كبير)",
                "priceDiff": 0,
                "default": true
          },
          {
                "id": "small",
                "name": "Small Koshari (كشري مانجو صغير)",
                "priceDiff": -35
          }
    ],
    extras: [
          {
                "id": "ex-mango",
                "name": "Extra Mango Chunks (مانجو إضافي)",
                "price": 20
          }
    ]
  },
  {
    id: "crv-blb-18",
    title: "Sweet Koshari with Molten Nutella Hazelnut Chocolate",
    titleAr: "كشري نوتيلا - أنهار نوتيلا وكنافة مقرمشة وأرز باللبن",
    category: 'desserts',
    categoryGroup: "desserts",
    price: 100,
    calories: "630 kcal",
    prepTime: "3-4 min",
    badge: "Nutella Bomb 🍫",
    rating: 4.8,
    reviewsCount: 650,
    image: 'assets/images/koshari_nutella_sweet.jpg',
    description: "For chocolate die-hards: crispy butter kunafa layered over sweet rice pudding, drenched in endless Nutella chocolate and crunchy goulash crisps.",
    descriptionAr: "عشاق الشوكولاتة: طبقات الكنافة المقرمشة والأرز باللبن مغمورة بشوكولاتة النوتيلا الذائبة والجلاش الذهبي المقرمش.",
    sizes: [
          {
                "id": "large",
                "name": "Large Koshari (كشري نوتيلا كبير)",
                "priceDiff": 0,
                "default": true
          },
          {
                "id": "small",
                "name": "Small Koshari (كشري نوتيلا صغير)",
                "priceDiff": -30
          }
    ],
    extras: [
          {
                "id": "ex-choco",
                "name": "Extra Nutella Melt (نوتيلا إضافية)",
                "price": 20
          }
    ]
  },
  {
    id: "crv-blb-19",
    title: "Sweet Koshari Large with Kinder Chocolate Spread",
    titleAr: "كشري كيندر - صوص كيندر بوينو وكنافة وأرز باللبن",
    category: 'desserts',
    categoryGroup: "desserts",
    price: 110,
    calories: "600 kcal",
    prepTime: "3-4 min",
    badge: "Kinder Bueno 🍫",
    rating: 4.8,
    reviewsCount: 520,
    image: 'https://foodics-console-production.s3.eu-west-1.amazonaws.com/images/756090_1738241504_9e1796bd-dd2d-4d12-8dc1-7b506eeb7ce8.jpg',
    description: "Mouthwatering harmony of Kinder white hazelnut chocolate cream poured over crispy kunafa, fresh milk rice, and crispy goulash.",
    descriptionAr: "طبقة أرز، كنافة كرانشي، كريمة فريش، وصوص كيندر ميلك وشوكولاتة بيضاء غنية مع الجلاش المقرمش.",
    sizes: [
          {
                "id": "large",
                "name": "Large Koshari (كشري كيندر كبير)",
                "priceDiff": 0,
                "default": true
          },
          {
                "id": "small",
                "name": "Small Koshari (كشري كيندر صغير)",
                "priceDiff": -35
          }
    ],
    extras: [
          {
                "id": "ex-kinder",
                "name": "Extra Kinder Sauce (صوص كيندر إضافي)",
                "price": 25
          }
    ]
  },
  {
    id: "crv-blb-20",
    title: "Royal Umm Ali Casserole with Baladi Ghee, Qeshta & Nuts",
    titleAr: "طاجن أم علي الملكي بالسمنة البلدي والقشطة والمكسرات المحمصة",
    category: 'desserts',
    categoryGroup: "desserts",
    price: 100,
    calories: "550 kcal",
    prepTime: "7-10 min",
    badge: "Royal Bram 👑",
    rating: 5,
    reviewsCount: 930,
    image: 'https://foodics-console-production.s3.eu-west-1.amazonaws.com/images/756090_1733329163_9da536e8-7843-45d8-8baa-9932ef8478ce.jpg',
    description: "Piping hot traditional clay casserole: golden baked puff pastry simmered in sweetened farm milk, pure Egyptian baladi ghee, fresh thick qeshta and toasted nuts.",
    descriptionAr: "طاجن برام فخار ساخن من الفرن: رقائق الباف باستري بالحليب الساخن الطبيعي، سمنة بلدي صافية، قشطة غنية، ومكسرات محمصة.",
    sizes: [
          {
                "id": "royal",
                "name": "Clay Pot Bram (برام فخار ملكي)",
                "priceDiff": 0,
                "default": true
          }
    ],
    extras: [
          {
                "id": "ex-qeshta",
                "name": "Extra Farm Qeshta (قشطة بلدي إضافية)",
                "price": 20
          },
          {
                "id": "ex-nuts",
                "name": "Roasted Almonds & Hazelnuts (مكسرات محمصة)",
                "price": 25
          }
    ]
  },
  {
    id: "crv-blb-21",
    title: "Hot Umm Ali Clay Pot with Baladi Ghee & Crunchy Nuts",
    titleAr: "طاجن أم علي بالسمنة البلدي والمكسرات المقرمشة",
    category: 'desserts',
    categoryGroup: "desserts",
    price: 80,
    calories: "480 kcal",
    prepTime: "7-10 min",
    badge: "Hot Bram 🔥",
    rating: 4.8,
    reviewsCount: 640,
    image: 'https://foodics-console-production.s3.eu-west-1.amazonaws.com/images/756090_1733329140_9da536c4-ea7d-4e1d-9e64-28c35a74cb89.jpg',
    description: "Steaming oven-baked puff pastry soaked in rich whole milk infused with authentic Egyptian baladi ghee and generously garnished with nuts.",
    descriptionAr: "أم علي ساخنة في البرام الفخاري بالسمنة البلدي والحليب الطازج مع رشة وفيرة من البندق واللوز والزبيب وجوز الهند.",
    sizes: [
          {
                "id": "pot",
                "name": "Clay Pot Bram (برام فخار ساخن)",
                "priceDiff": 0,
                "default": true
          }
    ],
    extras: [
          {
                "id": "ex-nuts",
                "name": "Extra Crunchy Nuts (مكسرات إضافية)",
                "price": 20
          }
    ]
  },
  {
    id: "crv-blb-22",
    title: "Bambouza Large with Fresh Mango, Greek Yogurt Cream & Nuts",
    titleAr: "بمبوظة كبيرة بالمكسرات والمانجو الفريش والزبادي اليوناني",
    category: 'desserts',
    categoryGroup: "desserts",
    price: 140,
    calories: "530 kcal",
    prepTime: "4 min",
    badge: "Bambouza Trend 🥭",
    rating: 4.9,
    reviewsCount: 810,
    image: 'https://foodics-console-production.s3.eu-west-1.amazonaws.com/images/756090_1756392768_9fbe34b5-3b98-4070-ac3d-8e062d94244e.jpeg',
    description: "Crispy fruit salad chunks floating in concentrated mango puree, layered with whipped dairy cream and Greek yogurt, topped with crunchy nuts.",
    descriptionAr: "قطع فواكه طازجة عائمة في عصير المانجو الفريش مع طبقة كريمة لباني بالزبادي اليوناني ومكسرات محمصة مقرمشة.",
    sizes: [
          {
                "id": "large",
                "name": "Large Box (علبة بمبوظة كبيرة)",
                "priceDiff": 0,
                "default": true
          },
          {
                "id": "small",
                "name": "Small Box (علبة بمبوظة صغيرة)",
                "priceDiff": -40
          }
    ],
    extras: [
          {
                "id": "ex-gelato",
                "name": "Vanilla Gelato Scoop (بولا جيلاتو)",
                "price": 25
          }
    ]
  },
  {
    id: "crv-blb-23",
    title: "Bambouza with Fresh Baladi Qeshta & Mango Puree",
    titleAr: "بمبوظة بالقشطة البلدي والفواكه وعصير المانجو الطبيعي",
    category: 'desserts',
    categoryGroup: "desserts",
    price: 140,
    calories: "560 kcal",
    prepTime: "4 min",
    badge: "Qeshta Lovers 🥛",
    rating: 4.8,
    reviewsCount: 570,
    image: 'https://foodics-console-production.s3.eu-west-1.amazonaws.com/images/756090_1756392833_9fbe3518-5d34-4895-90ad-7d3103a4ab65.jpeg',
    description: "Chilled seasonal fresh fruit pieces immersed in sweet mango nectar, capped with authentic farm baladi qeshta and light yogurt cream.",
    descriptionAr: "قطع الفواكه الطازجة مع عصير المانجو المركز وطبقة من القشطة البلدي الصافية والكريمة اليونانية اللذيذة.",
    sizes: [
          {
                "id": "large",
                "name": "Large Box (علبة بمبوظة قشطة كبيرة)",
                "priceDiff": 0,
                "default": true
          },
          {
                "id": "small",
                "name": "Small Box (علبة بمبوظة صغيرة)",
                "priceDiff": -55
          }
    ],
    extras: [
          {
                "id": "ex-qeshta",
                "name": "Extra Baladi Qeshta (قشطة بلدي إضافية)",
                "price": 20
          }
    ]
  },
  {
    id: "crv-blb-24",
    title: "Bambouza Lotus Caramel Crunch with Fresh Fruits",
    titleAr: "بمبوظة بزبدة اللوتس وعصير المانجو والفواكه المقرمشة",
    category: 'desserts',
    categoryGroup: "desserts",
    price: 140,
    calories: "590 kcal",
    prepTime: "4 min",
    badge: "Lotus Mango 🍪",
    rating: 4.7,
    reviewsCount: 460,
    image: 'https://foodics-console-production.s3.eu-west-1.amazonaws.com/images/756090_1756392890_9fbe356e-ddbc-407a-b997-59765f11f5c4.jpeg',
    description: "Unique fusion of refreshing tropical fruit pieces, sweet mango juice, Greek yogurt cream, drenched in warm Belgian Lotus butter and crushed biscuits.",
    descriptionAr: "ميكس مبتكر يجمع فواكه المانجو الفريش مع كريمة الزبادي اليوناني وطوفان من صوص وزبدة وبسكويت اللوتس.",
    sizes: [
          {
                "id": "large",
                "name": "Large Box (علبة بمبوظة لوتس كبيرة)",
                "priceDiff": 0,
                "default": true
          },
          {
                "id": "small",
                "name": "Small Box (علبة بمبوظة لوتس صغيرة)",
                "priceDiff": -65
          }
    ],
    extras: [
          {
                "id": "ex-lotus",
                "name": "Extra Lotus Biscuits (بسكويت لوتس)",
                "price": 15
          }
    ]
  },
  {
    id: "crv-blb-25",
    title: "Empo Pistachio Gelato Italian Milkshake",
    titleAr: "إمبو فستق حلبي مع الجيلاتو الإيطالي والحليب المكثف",
    category: 'drinks',
    categoryGroup: "blaban",
    price: 115,
    calories: "460 kcal",
    prepTime: "3 min",
    badge: "Empo Shake 🍨",
    rating: 4.9,
    reviewsCount: 680,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop&q=80',
    description: "Irresistible creamy blend of authentic Italian artisanal gelato, condensed sweet milk, and pure rich pistachio drizzle from B.Laban.",
    descriptionAr: "ميكس ساحر بين الجيلاتو الإيطالي الفاخر، الحليب المكثف، وصوص الفستق الحلبي البيور المركز من بلبن.",
    sizes: [
          {
                "id": "reg",
                "name": "Standard Empo Cup 400ml (كوب إمبو 400 مل)",
                "priceDiff": 0,
                "default": true
          },
          {
                "id": "giant",
                "name": "Giant Empo Cup 600ml (كوب جامبو 600 مل)",
                "priceDiff": 30
          }
    ],
    extras: [
          {
                "id": "ex-gelato",
                "name": "Extra Gelato Scoop (بولا جيلاتو إضافية)",
                "price": 25
          },
          {
                "id": "ex-pistachio",
                "name": "Pistachio Crunch (فستق محمص)",
                "price": 25
          }
    ]
  },
  {
    id: "crv-blb-26",
    title: "Empo Fresh Mango Gelato Shake",
    titleAr: "إمبو مانجو فريش مثلج مع الجيلاتو الإيطالي والحليب المكثف",
    category: 'drinks',
    categoryGroup: "blaban",
    price: 105,
    calories: "390 kcal",
    prepTime: "3 min",
    badge: "Pure Mango 🥭",
    rating: 4.8,
    reviewsCount: 590,
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=800&auto=format&fit=crop&q=80',
    description: "Tropical sensation blending 100% natural cold mango puree with creamy Italian milk gelato and condensed milk.",
    descriptionAr: "عصير مانجو طبيعي 100% ممزوج مع جيلاتو الحليب الإيطالي وصوص المانجو المركز لمذاق استوائي منعش.",
    sizes: [
          {
                "id": "reg",
                "name": "Standard Empo Cup 400ml (كوب إمبو 400 مل)",
                "priceDiff": 0,
                "default": true
          },
          {
                "id": "giant",
                "name": "Giant Empo Cup 600ml (كوب جامبو 600 مل)",
                "priceDiff": 25
          }
    ],
    extras: [
          {
                "id": "ex-gelato",
                "name": "Extra Gelato Scoop (بولا جيلاتو إضافية)",
                "price": 25
          }
    ]
  },
  {
    id: "crv-blb-27",
    title: "Empo Wild Berry Gelato Milk Shake",
    titleAr: "إمبو توت مشكل مع الحليب والجيلاتو الإيطالي",
    category: 'drinks',
    categoryGroup: "blaban",
    price: 105,
    calories: "380 kcal",
    prepTime: "3 min",
    badge: "Berry Blast 🫐",
    rating: 4.8,
    reviewsCount: 430,
    image: 'https://images.unsplash.com/photo-1553787499-6f9133860278?w=800&auto=format&fit=crop&q=80',
    description: "Vibrant mix of raspberries, blueberries, blackberries swirled with sweet condensed milk and Italian Fior di Latte gelato.",
    descriptionAr: "ميكس التوت البري والفراولة والبلوبيري مع حليب مكثف وجيلاتو إيطالي كريمي منعش.",
    sizes: [
          {
                "id": "reg",
                "name": "Standard Empo Cup 400ml (كوب إمبو 400 مل)",
                "priceDiff": 0,
                "default": true
          },
          {
                "id": "giant",
                "name": "Giant Empo Cup 600ml (كوب جامبو 600 مل)",
                "priceDiff": 25
          }
    ],
    extras: [
          {
                "id": "ex-gelato",
                "name": "Extra Gelato Scoop (بولا جيلاتو إضافية)",
                "price": 25
          }
    ]
  },
  {
    id: "crv-blb-28",
    title: "Empo Hazelnut Belgian Chocolate Gelato Shake",
    titleAr: "إمبو شوكولاتة بلجيكية بالبندق والجيلاتو الإيطالي",
    category: 'drinks',
    categoryGroup: "blaban",
    price: 105,
    calories: "470 kcal",
    prepTime: "3 min",
    badge: "Hazelnut Choco 🍫",
    rating: 4.8,
    reviewsCount: 510,
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=800&auto=format&fit=crop&q=80',
    description: "Velvety blend of rich Belgian dark chocolate, roasted hazelnut praline, sweet condensed milk and chilled Italian gelato.",
    descriptionAr: "ميكس غني من الشوكولاتة البلجيكية وزبدة البندق المحمص مع الجيلاتو الإيطالي والحليب المكثف.",
    sizes: [
          {
                "id": "reg",
                "name": "Standard Empo Cup 400ml (كوب إمبو 400 مل)",
                "priceDiff": 0,
                "default": true
          },
          {
                "id": "giant",
                "name": "Giant Empo Cup 600ml (كوب جامبو 600 مل)",
                "priceDiff": 25
          }
    ],
    extras: [
          {
                "id": "ex-gelato",
                "name": "Extra Gelato Scoop (بولا جيلاتو إضافية)",
                "price": 25
          },
          {
                "id": "ex-choco",
                "name": "Nutella Drizzle (صوص نوتيلا)",
                "price": 20
          }
    ]
  }
];
