/* ==========================================================================
   Hostera — Guest segment mock data
   Front-end-only demo dataset. No backend calls. Replace with real API
   responses when wiring up the guest cabinet.
   ========================================================================== */
(function () {

  var IMG = [
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop&sat=-30',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop&blend=multiply',
    'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop'
  ];
  function img(i) { return IMG[i % IMG.length]; }

  /* ---- Raw restaurant list -------------------------------------------- */
  var RAW = [
    // id, name, city, neighborhood, cuisine, type, tags, price, rating, reviews, blurb, hours, address, menu, revs
    ['ny-verjus','Verjus','New York, NY','West Village','Contemporary','Tasting menu',['Tasting menu','Wine pairing'],'$$$$',4.9,341,
      'A nine-course tasting room built around a single wood-fired hearth — quiet, exact, and unmistakably downtown.',
      '5:30 PM – 10:30 PM · Wed–Sun','204 W 10th St, New York, NY',
      [['Snacks',[['Oyster, green apple mignonette','Cold, bright, one bite',14],['Cured kanpachi, yuzu kosho','Thin-sliced, citrus heat',18],['Milk bread, cultured butter','Warm, laminated, sea salt',9]]],
       ['Tasting courses',[['Hearth-roasted carrot, brown butter','Charred, whole, family recipe',22],['Dry-aged duck, plum, sansho','Rested 21 days',48],['Handmade agnolotti, brown butter sage','Ricotta, nutmeg',34]]],
       ['To finish',[['Burnt honey custard','Torched, soft-set',14],['Chocolate, olive oil, flake salt','Dark, glossy, thin',13],['Digestif flight','Three pours, chosen nightly',24]]]],
      [['R. Whitfield',5,'2 weeks ago','Every course had a point of view — nothing on the plate was there by accident.'],['J. Okafor',5,'1 month ago','Service paced the night perfectly. Worth the wait for a table.']]],
    ['ny-koji','Kōji','New York, NY','Lower East Side','Japanese','Omakase',['Omakase','Sushi counter'],'$$$$',4.8,198,
      'Eight seats at a hinoki counter, one seating a night, fish flown in twice weekly from Toyosu.',
      '6:00 PM & 8:30 PM seatings · Tue–Sat','88 Rivington St, New York, NY',
      [['Counter',[['Otoro, aged 4 days','Torched edge, house soy',0],['Uni, quail egg, nori','Hokkaido, seasonal',0],['Wagyu, charcoal, ponzu','A5, thin-sliced',0]]],
       ['Soup & rice',[['Miso, clam, scallion','Made fresh each seating',0],['Tamago, dashi rice','Traditional close',0]]],
       ['To finish',[['Yuzu sorbet','Palate reset',0],['Matcha soft-serve, red bean','House-churned',0]]]],
      [['S. Park',5,'3 weeks ago','As precise as any counter I have sat at, and warmer than most.']]],
    ['la-nightjar','Nightjar','Los Angeles, CA','Silver Lake','Wine bar','Natural wine',['Natural wine','Small plates'],'$$$',4.8,214,
      'A hundred-bottle natural wine list poured under low amber light, with a kitchen built around whatever the coast brought in that morning.',
      '5:30 PM – 11:00 PM · Tue–Sun','2140 Sunset Blvd, Los Angeles, CA',
      [['Snacks',[['Marcona almonds, rosemary salt','Warm, oil-slicked',9],['Grilled bread, cultured butter','Sourdough, Maldon salt',7],['White anchovy toast','Lemon, chili oil',12]]],
       ['Small plates',[['Grilled octopus, salsa verde','Charred, smoky',22],['Burrata, blood orange, pistachio','Whipped, citrus',17],['Lamb belly, harissa yogurt','Slow-roasted',19]]],
       ['Mains',[['Whole branzino, herb salsa','Market fish, table-side',38],['Cast-iron mushroom, farro','Wild mushroom, thyme',26]]]],
      [['D. Reyes',5,'1 week ago','The wine list alone is worth the trip — staff talk you through every glass.'],['A. Kim',4,'2 weeks ago','Loud on weekends but the small plates keep coming perfectly paced.']]],
    ['la-tallow','Tallow & Salt','Los Angeles, CA','Arts District','Contemporary','California fine dining',['Tasting menu','Seasonal'],'$$$$',4.9,176,
      'Seasonal California cooking in a converted warehouse — an open hearth, a rotating six-course format, no printed menu.',
      '6:00 PM – 10:00 PM · Wed–Sun','890 E 3rd St, Los Angeles, CA',
      [['To start',[['Heirloom tomato, stone fruit','Peak-season only',16],['Chilled pea soup, mint oil','Bright green, cold',12]]],
       ['Hearth',[['Whole roasted cauliflower, tahini','Charred, nutty',24],['Dry-aged ribeye, bone marrow','45-day aged',58]]],
       ['To finish',[['Brown butter cake, stone fruit','Warm, seasonal',13],['Goat cheese, honeycomb','Local dairy',11]]]],
      [['T. Brennan',5,'5 days ago','No menu, all trust — and it paid off with every course.']]],
    ['la-copal','Copal House','Los Angeles, CA','Downtown','Mexican','Modern Mexican',['Mezcal','Regional Mexican'],'$$$',4.7,289,
      'Regional Oaxacan technique meets a sixty-bottle mezcal list — mole built over three days, tortillas pressed to order.',
      '5:00 PM – 11:00 PM · Daily','412 S Spring St, Los Angeles, CA',
      [['Antojitos',[['Blue corn tlayuda','Black beans, quesillo',15],['Tuna tostada, chile oil','Raw, citrus-cured',16]]],
       ['Mains',[['Mole negro, roast duck','20+ ingredients, 3-day process',32],['Wood-grilled skirt steak','Salsa macha',29]]],
       ['Bar',[['Mezcal flight, three regions','Guided pour',28],['Smoked pineapple margarita','House infusion',15]]]],
      [['C. Vasquez',5,'4 days ago','The mole is worth building a night around.']]],
    ['la-maree','Marée','Los Angeles, CA','Venice','Seafood','Fine dining seafood',['Raw bar','Coastal'],'$$$$',4.8,152,
      'A raw bar and seafood tower program a block from the boardwalk, sourced daily from the same three boats.',
      '5:00 PM – 10:00 PM · Tue–Sun','66 Windward Ave, Los Angeles, CA',
      [['Raw bar',[['Daily oyster selection','Six varieties',24],['Scallop crudo, citrus, chili','Thin-sliced',19]]],
       ['Mains',[['Whole grilled turbot','For two, market price',0],['Lobster risotto','Butter-poached',42]]],
       ['To finish',[['Meyer lemon tart','House-made curd',12]]]],
      [['N. Okoye',4,'2 weeks ago','Oysters were the best I have had on the west side.']]],
    ['sd-sablepoint','Sable Point','San Diego, CA','La Jolla','Seafood','Coastal fine dining',['Ocean view','Tasting menu'],'$$$$',4.8,164,
      'Cliffside dining room built around the day boat catch, with a glass-walled kitchen facing the Pacific.',
      '5:30 PM – 10:00 PM · Wed–Mon','1250 Prospect St, San Diego, CA',
      [['Raw',[['Local uni, brioche','Sea urchin, butter toast',22],['Yellowtail crudo, yuzu','Line-caught',18]]],
       ['Mains',[['Whole roasted rockfish','Herb crust',36],['Santa Barbara spot prawns','Garlic butter',31]]],
       ['To finish',[['Passion fruit pavlova','Torched meringue',12]]]],
      [['L. Marsh',5,'1 week ago','Sunset seating is unbeatable — book it two weeks out.']]],
    ['sd-cuenca','La Cuenca','San Diego, CA','Little Italy','Mexican','Baja-Mexican',['Baja seafood','Wine list'],'$$$',4.7,201,
      'Baja coastal cooking with a Mexican-wine-only list, built around a wood grill and a daily ceviche board.',
      '4:30 PM – 10:30 PM · Daily','1830 India St, San Diego, CA',
      [['Ceviche board',[['Rotating daily ceviche','Ask your server',17],['Aguachile verde, shrimp','Chile, lime',16]]],
       ['Grill',[['Wood-grilled branzino','Whole, table-filleted',34],['Carne asada, salsa roja','Grass-fed',27]]],
       ['Bar',[['Valle de Guadalupe flight','Three Mexican wines',26]]]],
      [['P. Duarte',5,'3 weeks ago','The ceviche board changes constantly and it is always the best thing on the table.']]],
    ['sd-emberrye','Ember & Rye','San Diego, CA','North Park','Steakhouse','Modern steakhouse',['Dry-aged','Whiskey list'],'$$$$',4.6,138,
      'A dry-aging room visible from the dining floor and a hundred-bottle American whiskey list.',
      '5:00 PM – 11:00 PM · Tue–Sun','3005 University Ave, San Diego, CA',
      [['To start',[['Beef tartare, egg yolk','Hand-cut',18],['Charred bone marrow','Herb gremolata',16]]],
       ['Steaks',[['45-day dry-aged ribeye','Cast-iron seared',62],['Filet, peppercorn jus','Center-cut',48]]],
       ['Sides',[['Smoked potato gratin','Gruyère',14],['Charred broccolini, chili','Lemon',11]]]],
      [['G. Hall',4,'2 weeks ago','The dry-aged ribeye is the reason to come back.']]],
    ['sf-fogline','Fogline','San Francisco, CA','Hayes Valley','Pastry & cafe','Brunch',['Brunch','Bakery'],'$$',4.9,267,
      'A glass-fronted bakery-cafe with a laminated-pastry program and a short, precise brunch menu.',
      '7:30 AM – 2:30 PM · Daily','450 Gough St, San Francisco, CA',
      [['Bakery',[['Brown butter croissant','Baked twice daily',6],['Fig & honey danish','Seasonal fruit',7]]],
       ['Brunch',[['Soft scramble, chive, brioche','Farm eggs',15],['Buckwheat pancakes, cultured cream','Whole grain',14]]],
       ['To drink',[['Cortado','House-roasted',5],['Fresh citrus press','Rotating',7]]]],
      [['E. Sato',5,'6 days ago','Line moves fast, croissants are worth every minute of it anyway.']]],
    ['sf-saltcellar','Salt Cellar','San Francisco, CA','Mission','Wine bar','Natural wine',['Natural wine','Cheese program'],'$$$',4.7,143,
      'A below-street wine cellar with a rotating natural list and a serious European cheese program.',
      '5:00 PM – 12:00 AM · Wed–Sun','2200 Mission St, San Francisco, CA',
      [['Snacks',[['Marinated olives','House blend',6],['Cheese board, three selections','Rotating',22]]],
       ['Small plates',[['Grilled sardines, lemon','Whole, bone-in',16],['Beef tartare, rye crisps','Hand-cut',18]]],
       ['Bar',[['Natural wine flight','Sommelier-chosen',24]]]],
      [['B. Chu',5,'1 month ago','Best cheese board in the neighborhood, and the staff know every bottle by heart.']]],
    ['mi-bravacosta','Brava Costa','Miami, FL','Design District','Steakhouse','Steakhouse & seafood',['Steakhouse','Seafood tower'],'$$$$',4.7,312,
      'A dual steak-and-seafood room with a raw bar up front and a dry-aging locker along the back wall.',
      '6:00 PM – 12:00 AM · Daily','140 NE 39th St, Miami, FL',
      [['Raw bar',[['Seafood tower, for two','Chilled, market catch',68],['Stone crab claws','Seasonal, mustard sauce',0]]],
       ['Steaks',[['Tomahawk, for two','Dry-aged, wood-fired',96],['Filet mignon','Center-cut',52]]],
       ['Sides',[['Truffle mac and cheese','Aged gruyère',16],['Charred asparagus','Lemon oil',12]]]],
      [['V. Ramos',5,'2 weeks ago','The seafood tower is a show in itself — great for a celebration table.']]],
    ['mi-cane','Cane & Citrus','Miami, FL','Wynwood','Latin fusion','Latin fusion',['Rum bar','Latin fusion'],'$$$',4.6,178,
      'Pan-Latin small plates built around a house rum-aging program and a citrus garden on the patio.',
      '5:30 PM – 1:00 AM · Tue–Sun','225 NW 26th St, Miami, FL',
      [['Small plates',[['Yuca fritters, mojo','Crisp, garlicky',9],['Ceviche mixto','Three-citrus cure',17]]],
       ['Mains',[['Churrasco, chimichurri','Grass-fed skirt steak',28],['Arroz con mariscos','Seafood paella-style',26]]],
       ['Bar',[['House rum flight','Barrel-aged, three pours',22]]]],
      [['F. Delgado',4,'3 weeks ago','Patio at sunset is the move — order the rum flight.']]],
    ['ch-thequarry','The Quarry','Chicago, IL','River North','Bar & lounge','Cocktail lounge',['Cocktails','Late night'],'$$$',4.8,224,
      'A subterranean cocktail lounge in a converted limestone vault, with a rotating seasonal menu and live low jazz on weekends.',
      '6:00 PM – 2:00 AM · Wed–Sat','40 W Kinzie St, Chicago, IL',
      [['Bites',[['Smoked trout toast','Rye, dill',13],['Charcuterie board','Rotating selection',24]]],
       ['Cocktails',[['Barrel-aged Manhattan','House-aged 6 weeks',18],['Smoked old fashioned','Tableside smoke',17]]],
       ['Late night',[['Truffle fries','Parmesan, herb',12]]]],
      [['H. Ostrowski',5,'1 week ago','Live jazz on Fridays turns this into the best two hours in River North.']]],
    ['ch-birchwood','Birchwood','Chicago, IL','West Loop','Contemporary','Contemporary American',['Seasonal','Chef counter'],'$$$$',4.7,167,
      'A chef-counter tasting room in West Loop built around Midwestern produce and a wood-fired oven.',
      '5:30 PM – 10:00 PM · Tue–Sat','800 W Randolph St, Chicago, IL',
      [['Snacks',[['Rye crackers, cultured butter','House-cultured',8],['Beet tartare, horseradish','Root vegetable',14]]],
       ['Mains',[['Wood-fired trout, brown butter','Great Lakes catch',34],['Duck breast, cherry gastrique','Door County cherries',38]]],
       ['To finish',[['Sweet corn ice cream','Late-summer corn',11]]]],
      [['K. Lindqvist',5,'2 weeks ago','The chef counter seats book out fast — worth planning around.']]],
    ['au-copperhead','Copperhead','Austin, TX','East Austin','BBQ','Texan fine dining',['Live-fire','Whiskey'],'$$$',4.8,241,
      'Live-fire Texan cooking that goes well beyond brisket, paired with an all-American whiskey list.',
      '5:00 PM – 11:00 PM · Wed–Sun','1515 E 6th St, Austin, TX',
      [['Smokehouse',[['14-hour brisket','Post oak smoked',24],['Beef rib, coffee rub','Whole, table-carved',32]]],
       ['Sides',[['Smoked mac and cheese','Sharp cheddar',10],['Charred green beans','Bacon, shallot',9]]],
       ['Bar',[['Texas whiskey flight','Three distilleries',26]]]],
      [['R. Boone',5,'5 days ago','The beef rib alone justifies the drive from downtown.']]],
    ['au-marfa','Marfa Table','Austin, TX','South Congress','Modern Southwestern','Southwestern',['Wood-fired','Desert-inspired'],'$$$$',4.7,132,
      'Desert-inspired Southwestern cooking over an open wood fire, in a room modeled on West Texas minimalism.',
      '5:30 PM – 10:30 PM · Tue–Sun','1500 S Congress Ave, Austin, TX',
      [['To start',[['Charred corn, cotija, chili','Grilled whole',11],['Prickly pear salad','Desert greens',13]]],
       ['Mains',[['Wood-fired quail, mole amarillo','Whole, glazed',29],['Lamb shoulder, ancho chile','Slow-roasted',33]]],
       ['To finish',[['Cajeta flan','Goat milk caramel',10]]]],
      [['S. Whitfield',4,'1 month ago','Room is stunning at golden hour — request a window table.']]]
  ];

  function buildMenu(cats) {
    return cats.map(function (c) {
      return {
        category: c[0],
        items: c[1].map(function (it) {
          return { name: it[0], desc: it[1], price: it[2] };
        })
      };
    });
  }
  function buildReviews(rs) {
    return rs.map(function (r) {
      return { author: r[0], rating: r[1], date: r[2], text: r[3] };
    });
  }

  var restaurants = RAW.map(function (r, i) {
    return {
      id: r[0], name: r[1], city: r[2], neighborhood: r[3], cuisine: r[4], type: r[5],
      tags: r[6], price: r[7], rating: r[8], reviewCount: r[9], blurb: r[10],
      hours: r[11], address: r[12],
      hero: img(i), gallery: [img(i + 1), img(i + 5), img(i + 9)],
      menu: buildMenu(r[13]), reviewList: buildReviews(r[14])
    };
  });

  function byId(id) {
    for (var i = 0; i < restaurants.length; i++) if (restaurants[i].id === id) return restaurants[i];
    return null;
  }

  var cities = ['Los Angeles, CA','San Diego, CA','New York, NY','San Francisco, CA','Miami, FL','Chicago, IL','Austin, TX'];

  /* ---- Guest profile ---------------------------------------------------- */
  var guest = {
    name: 'Elena Marchetti',
    initials: 'EM',
    email: 'elena.marchetti@gmail.com',
    city: 'Los Angeles, CA',
    memberSince: 'March 2025',
    unreadNotifications: 3,
    subscriptions: ['la-nightjar','la-tallow','sd-sablepoint','la-copal'],
    favorites: ['la-nightjar','sd-sablepoint','ny-verjus']
  };

  /* ---- Events ------------------------------------------------------------ */
  var events = [
    { id:'ev1', restaurantId:'la-nightjar', title:'Natural Wine Tasting: Loire Valley', type:'Tasting', date:'2026-07-08', time:'7:00 PM', desc:'A guided six-glass tasting through Loire producers, led by the beverage director.', price:'$65 / person' },
    { id:'ev2', restaurantId:'la-tallow', title:'Guest Chef Night — Mara Lin (Ember, Portland)', type:'Guest chef', date:'2026-07-12', time:'6:30 PM', desc:'A one-night collaborative tasting menu with visiting chef Mara Lin.', price:'$145 / person' },
    { id:'ev3', restaurantId:'sd-sablepoint', title:'Sunset Oyster Hour', type:'Tasting', date:'2026-07-09', time:'5:30 PM', desc:'Half-price oysters on the cliffside terrace as the sun sets over the Pacific.', price:'$1 / oyster' },
    { id:'ev4', restaurantId:'la-copal', title:'Mezcal & Mole Pairing Dinner', type:'Guest chef', date:'2026-07-15', time:'7:30 PM', desc:'Four courses, four mezcals, guided by a visiting Oaxacan mezcalero.', price:'$120 / person' },
    { id:'ev5', restaurantId:'ch-thequarry', title:'Live Jazz Fridays', type:'Live music', date:'2026-07-10', time:'9:00 PM', desc:'A rotating trio plays low jazz in the limestone vault. No cover with reservation.', price:'Included' },
    { id:'ev6', restaurantId:'sf-saltcellar', title:'Cheese & Natural Wine Masterclass', type:'Tasting', date:'2026-07-17', time:'6:00 PM', desc:'Six pairings, guided by the in-house cheesemonger.', price:'$58 / person' },
    { id:'ev7', restaurantId:'mi-bravacosta', title:'Private Room: Stone Crab Season Opening', type:'Private dining', date:'2026-07-20', time:'7:00 PM', desc:'A seated dinner marking the opening of stone crab season, limited to 20 guests.', price:'$185 / person' },
    { id:'ev8', restaurantId:'au-copperhead', title:'Whiskey & Fire: Distiller Dinner', type:'Guest chef', date:'2026-07-14', time:'6:30 PM', desc:'A five-course live-fire menu paired with a visiting Texas distiller.', price:'$130 / person' }
  ];

  /* ---- Table Moments (guest's dining diary) ------------------------------ */
  var tableMoments = [
    { id:'tm1', restaurantId:'la-nightjar', dish:'Grilled octopus, salsa verde', photo: img(2), date:'2026-06-28', note:'The char on the octopus was exactly right — smoky without losing the sweetness. Went back for the anchovy toast twice.', rating:5, visibility:'public' },
    { id:'tm2', restaurantId:'sd-sablepoint', dish:'Whole roasted rockfish', photo: img(6), date:'2026-06-14', note:'Booked the sunset seating on a whim. The rockfish was simple, herb-crusted, and the view did the rest.', rating:5, visibility:'public' },
    { id:'tm3', restaurantId:'la-copal', dish:'Mole negro, roast duck', photo: img(9), date:'2026-05-30', note:'Three days of work on that mole and you can taste every hour of it. Brought my sister, she is still talking about it.', rating:5, visibility:'public' },
    { id:'tm4', restaurantId:'la-tallow', dish:'Dry-aged ribeye, bone marrow', photo: img(4), date:'2026-05-11', note:'No menu, just trust. The ribeye course alone was worth the six-course commitment.', rating:4, visibility:'private' },
    { id:'tm5', restaurantId:'sf-fogline', dish:'Brown butter croissant', photo: img(3), date:'2026-04-22', note:'Detoured through Hayes Valley just for this. Worth setting an alarm for the first bake.', rating:5, visibility:'public' },
    { id:'tm6', restaurantId:'ny-verjus', dish:'Dry-aged duck, plum, sansho', photo: img(10), date:'2026-03-30', note:'A quiet, exacting kind of cooking. The duck rested 21 days and it showed in every bite.', rating:5, visibility:'public' }
  ];

  /* ---- Bookings ------------------------------------------------------------ */
  var bookings = [
    { id:'bk1', restaurantId:'la-tallow', date:'2026-07-11', time:'7:30 PM', guests:2, status:'upcoming', occasion:'Anniversary', notes:'Window table if possible.' },
    { id:'bk2', restaurantId:'sd-sablepoint', date:'2026-07-19', time:'6:00 PM', guests:4, status:'upcoming', occasion:'Friends dinner', notes:'' },
    { id:'bk3', restaurantId:'la-nightjar', date:'2026-06-28', time:'8:00 PM', guests:2, status:'past', occasion:'', notes:'' },
    { id:'bk4', restaurantId:'la-copal', date:'2026-05-30', time:'7:00 PM', guests:3, status:'past', occasion:'Birthday', notes:'' },
    { id:'bk5', restaurantId:'mi-cane', date:'2026-06-02', time:'9:00 PM', guests:2, status:'cancelled', occasion:'', notes:'' }
  ];

  /* ---- Private dining requests ------------------------------------------- */
  var privateDiningRequests = [
    { id:'pd1', restaurantId:'la-tallow', date:'2026-08-14', guests:14, occasion:'Company dinner', prefs:'Seasonal tasting menu, one vegetarian course minimum, wine pairing for the table.',
      status:'proposed',
      proposal:{ room:'The Hearth Room (private, seats up to 16)', menu:'Five-course seasonal tasting, family-style centerpiece', price:'$165 / person, wine pairing +$70', note:'We can hold the room for you through Friday — let us know if you would like to confirm or adjust the menu.' } },
    { id:'pd2', restaurantId:'sd-sablepoint', date:'2026-09-02', guests:8, occasion:'Birthday', prefs:'Ocean-view table, seafood-forward, one guest with a shellfish allergy.',
      status:'pending', proposal:null }
  ];

  window.HOSTERA_DATA = {
    guest: guest, cities: cities, restaurants: restaurants, byId: byId,
    events: events, tableMoments: tableMoments, bookings: bookings,
    privateDiningRequests: privateDiningRequests
  };

})();
