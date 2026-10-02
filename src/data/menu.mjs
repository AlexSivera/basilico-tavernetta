// Carta extraída de la web actual del cliente (oct. 2026).
// n = nombre del plato (se mantiene el original en ambos idiomas)
// p = precio en euros (número) · u = nota de unidad · d = descripción
// tags: 'gf' = indicado "sin gluten" en la carta original

export const tavernetta = [
  {
    id: 'antipastos',
    title: { es: 'Antipastos', en: 'Antipasti' },
    items: [
      { n: 'Crujiente de pollo', p: 12, d: { es: 'Rebozadas en panko y maíz con salsa barbacoa y patatas de boniato', en: 'Chicken coated in panko and corn, barbecue sauce and sweet-potato fries' } },
      { n: 'Pan de pizza y gambas', p: 15, d: { es: 'Pan de pizza, gambitas, mozzarella gratinada, mantequilla y picaeta', en: 'Pizza bread, baby prawns, grilled mozzarella, butter and Valencian garlic-parsley picaeta' } },
      { n: 'Albóndigas al estilo Basilico', p: 14, d: { es: 'Salsa de mostaza, nata vegetal, setas, pimienta y mozzarella', en: 'Mustard sauce, plant-based cream, mushrooms, pepper and mozzarella' } },
      { n: 'Parmigiana de melanzane', p: 15, d: { es: 'Burrata, tomate, berenjenas, mozzarella, cebolla y pimientos', en: 'Burrata, tomato, aubergine, mozzarella, onion and peppers' } },
      { n: 'Pulpo', p: 20, d: { es: 'Pata de pulpo con crema de patatas, huevo a baja temperatura, pimientos del padrón y crujiente de boniato', en: 'Octopus leg, potato cream, slow-cooked egg, padrón peppers and sweet-potato crisp' } },
      { n: 'Vitello Tonnato', p: 13.5, d: { es: 'Redondo de ternera, salsa Basilico, alcaparras, rúcula y pimienta', en: 'Veal round, Basilico sauce, capers, rocket and pepper' } },
      { n: 'Alcachofas confitadas', p: 13.5, d: { es: 'Corazón de alcachofas, salsa Basilico, jamón serrano, tomate seco y burrata', en: 'Confit artichoke hearts, Basilico sauce, serrano ham, sun-dried tomato and burrata' } },
      { n: 'Calamares a la andaluza', p: 11.5, d: { es: 'Calamares con salsa tártara, sobre una base de pan italiano y rúcula', en: 'Fried squid with tartare sauce on Italian bread and rocket' } },
      { n: 'Bravas de berenjenas', p: 12.5, d: { es: 'Con salsa picante casera, pimientos del padrón, salsa de soja y teriyaki', en: 'Aubergine “bravas” with house hot sauce, padrón peppers, soy and teriyaki' } },
      { n: 'Calamares a la romana', p: 12.5, d: { es: 'Acompañado de patatas de boniato y salsa Basilico', en: 'Battered squid rings with sweet-potato fries and Basilico sauce' } },
      { n: 'Mini burger de figatells de sepia', p: 12, u: { es: '3 ud.', en: '3 pcs' }, d: { es: 'Con crujiente de cacahuetes, tomate seco, rúcula, mayonesa japonesa y patatas de boniato', en: 'Cuttlefish figatells (a Valencian patty) with peanut crunch, sun-dried tomato, rocket, Japanese mayo and sweet-potato fries' } },
      { n: 'Gambas al ajillo', p: 12, d: { es: 'En aceite de oliva, ajos tiernos, tomate cherry y pimientos del padrón', en: 'Prawns in olive oil with young garlic, cherry tomatoes and padrón peppers' } },
    ],
  },
  {
    id: 'croquetas',
    title: { es: 'Croquetas caseras', en: 'Homemade croquetas' },
    note: { es: 'Precio por unidad', en: 'Price per piece' },
    items: [
      { n: 'Jamón ibérico', p: 1.9 },
      { n: 'Boletus y trufa', p: 1.9 },
      { n: 'Gamba roja', p: 1.9 },
      { n: 'Bacalao', p: 1.9 },
    ],
  },
  {
    id: 'panes',
    title: { es: 'Panes artesanales', en: 'Breads' },
    items: [
      { n: 'Pan de pueblo', p: 4.5, d: { es: 'Con tomate, alioli y aceitunas', en: 'Village loaf with tomato, alioli and olives' } },
      { n: 'Focaccia burrata', p: 7, d: { es: 'Con aceitunas, tomate seco, burrata y serrano', en: 'With olives, sun-dried tomato, burrata and serrano ham' } },
      { n: 'Pan italiano', p: 6.5, d: { es: 'Relleno de mozzarella, ajos y aceite picante. Con picaeta de ajo y perejil', en: 'Filled with mozzarella, garlic and chilli oil, topped with garlic-parsley picaeta' } },
    ],
  },
  {
    id: 'ensaladas',
    title: { es: 'Ensaladas', en: 'Salads' },
    items: [
      { n: 'Del César', p: 12.5, d: { es: 'Pollo rebozado, tomate cherry, tomate seco, salsa césar y parmigiano', en: 'Crispy chicken, cherry and sun-dried tomato, Caesar dressing and parmigiano' } },
      { n: 'Basilico', p: 12.5, d: { es: 'Queso semicurado, tomate seco, rúcula, almendras y jamón serrano', en: 'Semi-cured cheese, sun-dried tomato, rocket, almonds and serrano ham' } },
      { n: 'Burrata', p: 14, d: { es: 'Queso burrata, tostas de pan con tomate, cebolla morada, pesto, vinagre de Módena y rúcula', en: 'Burrata, toast with tomato, red onion, pesto, Modena vinegar and rocket' } },
    ],
  },
  {
    id: 'patatas',
    title: { es: 'Nuestras patatas', en: 'Our potatoes' },
    items: [
      { n: 'Patatas llama a los bomberos', p: 15, d: { es: 'Con salsa casera picante, pimientos del padrón y alioli', en: '“Call the fire brigade”: house hot sauce, padrón peppers and alioli' } },
      { n: 'Patatas a los 4 quesos', p: 16, d: { es: 'Queso scamorza, queso azul, nata vegetal, parmigiano y mozzarella de búfala', en: 'Scamorza, blue cheese, plant-based cream, parmigiano and buffalo mozzarella' } },
      { n: 'Huevos rotos', p: 15.5, d: { es: 'Jamón serrano, huevos fritos, patatas caseras y pimientos del padrón', en: 'Serrano ham, fried eggs, homemade chips and padrón peppers' } },
      { n: 'Que morro', p: 16, d: { es: 'Patata casera, morro de cerdo, huevos fritos, pimientos del padrón y salsa gaucha', en: 'Homemade chips, pork snout, fried eggs, padrón peppers and gaucha sauce' } },
    ],
  },
  {
    id: 'romanas',
    title: { es: 'Pizzas romanas', en: 'Roman pizzas' },
    items: [
      { n: 'Arrabbiata', p: 13.5, d: { es: 'Pimiento italiano asado, tomate cherry, cebolla asada, pepperoni, chile y aceite picante', en: 'Roasted Italian pepper, cherry tomato, roasted onion, pepperoni, chilli and hot oil' } },
      { n: 'Basilico', p: 14, d: { es: 'Jamón serrano, rúcula y mermelada de higos', en: 'Serrano ham, rocket and fig jam' } },
      { n: 'Barbacoa', p: 13, d: { es: 'Carne picada y salsa barbacoa', en: 'Minced meat and barbecue sauce' } },
      { n: 'Calzone', p: 13.5, d: { es: 'Tomate cherry, huevo, champiñones, york y tomate seco', en: 'Cherry tomato, egg, mushrooms, cooked ham and sun-dried tomato' } },
      { n: 'Carbonara', p: 14, d: { es: 'Setas, nata, huevo, pimienta, parmigiano y bacón', en: 'Mushrooms, cream, egg, pepper, parmigiano and bacon' } },
      { n: 'Contorná', p: 14, d: { es: 'Sobrasada, cebolla, dátiles y scamorza', en: 'Sobrasada, onion, dates and scamorza' } },
      { n: '4 Quesos', p: 14.5, d: { es: 'Scamorza, queso azul, mozzarella y parmigiano', en: 'Scamorza, blue cheese, mozzarella and parmigiano' } },
      { n: 'Frutos del mar', p: 15.5, d: { es: 'Calamar, mejillones, atún y gambas', en: 'Squid, mussels, tuna and prawns' } },
      { n: 'Fugazzetta', p: 15, d: { es: 'Masa doble rellena de mozzarella y una capa de cebolla con ajos', en: 'Double crust filled with mozzarella, topped with onion and garlic' } },
      { n: 'Hawaiiana', p: 13, d: { es: 'Jamón york y piña', en: 'Cooked ham and pineapple' } },
      { n: 'Horta', p: 14, d: { es: 'Calabacín, berenjena, tomate fresco, pimiento verde y rojo y pesto', en: 'Courgette, aubergine, fresh tomato, green and red pepper and pesto' } },
      { n: 'Margherita', p: 11.5, d: { es: 'Mozzarella y albahaca', en: 'Mozzarella and basil' } },
      { n: 'Pepperoni', p: 13, d: { es: 'Pepperoni y aceite picante', en: 'Pepperoni and hot oil' } },
      { n: 'Pollo', p: 14.5, d: { es: 'Pollo, cebolla, tomate cherry, pimientos y salsa barbacoa', en: 'Chicken, onion, cherry tomato, peppers and barbecue sauce' } },
      { n: 'Prosciutto', p: 12.5, d: { es: 'Mozzarella y jamón york cocido', en: 'Mozzarella and cooked ham' } },
      { n: 'Pulpo', p: 17, d: { es: 'Pulpo, crema de patatas, sal y pimentón de la Vera', en: 'Octopus, potato cream, salt and smoked La Vera paprika' } },
      { n: 'Roma', p: 13, d: { es: 'Jamón york cocido y champiñones', en: 'Cooked ham and mushrooms' } },
      { n: 'Rúcula', p: 14, d: { es: 'Rúcula y jamón serrano', en: 'Rocket and serrano ham' } },
      { n: 'Salmón', p: 15, d: { es: 'Salmón, aceitunas, cebolla, atún y anchoas', en: 'Salmon, olives, onion, tuna and anchovies' } },
      { n: 'Sicilia', p: 14, d: { es: 'Alcaparras, aceitunas y anchoas', en: 'Capers, olives and anchovies' } },
      { n: 'Sorrento', p: 14, d: { es: 'Jamón york cocido, champiñones, cebolla y salami', en: 'Cooked ham, mushrooms, onion and salami' } },
      { n: 'Toscana', p: 14, d: { es: 'Huevo, bacón y espinacas', en: 'Egg, bacon and spinach' } },
      { n: 'Valdostana', p: 14, d: { es: 'Bacón, huevo y jamón york cocido', en: 'Bacon, egg and cooked ham' } },
      { n: 'Pizza kebab picante', p: 15, d: { es: 'Pollo estilo kebab, guacamole, cebolla morada, rúcula, tomate fresco, salsa de yogur, salsa picante y cheddar', en: 'Kebab-style chicken, guacamole, red onion, rocket, fresh tomato, yoghurt sauce, hot sauce and cheddar' } },
      { n: 'Pizza kebab de ternera', p: 15, d: { es: 'Ternera estilo kebab, guacamole, bacón, cebolla morada, tomate fresco, rúcula, queso gouda y salsa de yogur', en: 'Kebab-style beef, guacamole, bacon, red onion, fresh tomato, rocket, gouda and yoghurt sauce' } },
    ],
  },
  {
    id: 'napolitanas',
    title: { es: 'Pizzas napolitanas', en: 'Neapolitan pizzas' },
    items: [
      { n: 'Carciofi', p: 17, d: { es: 'Alcachofas, huevo cocido, jamón serrano y pimientos del padrón', en: 'Artichokes, boiled egg, serrano ham and padrón peppers' } },
      { n: 'Guanciale', p: 18, d: { es: 'Gorgonzola, cebolla morada, tomate fresco, guanciale, scamorza, rúcula y mozzarella', en: 'Gorgonzola, red onion, fresh tomato, guanciale, scamorza, rocket and mozzarella' } },
      { n: 'Bianca', p: 17, d: { es: 'Mozzarella, tomate seco, vitello tonnato, salsa Basilico, alcaparras y rúcula', en: 'Mozzarella, sun-dried tomato, vitello tonnato, Basilico sauce, capers and rocket' } },
      { n: 'Campera', p: 18, d: { es: 'Lomo de chuletón gallego, mozzarella, salsa Basilico, tomate, bacón, huevos, alcachofas y pimientos del padrón', en: 'Galician rib-steak, mozzarella, Basilico sauce, tomato, bacon, eggs, artichokes and padrón peppers' } },
    ],
  },
  {
    id: 'pinsas',
    title: { es: 'Pinsas italovalencianas', en: 'Italo-Valencian pinsas' },
    items: [
      { n: 'Pinsa de chuletón', p: 19, d: { es: 'Chuletón gallego, patata laminada, tomate, mozzarella, pimientos del padrón y chimichurri', en: 'Galician rib-steak, sliced potato, tomato, mozzarella, padrón peppers and chimichurri' } },
      { n: 'Pinsa de búfala', p: 18, d: { es: 'Mozzarella de búfala, tomate seco, scamorza y dátiles', en: 'Buffalo mozzarella, sun-dried tomato, scamorza and dates' } },
      { n: 'Pinsa de pato', p: 17, d: { es: 'Alcachofas, cebolla, pimiento verde y rojo, magret de pato y setas', en: 'Artichokes, onion, green and red pepper, duck magret and mushrooms' } },
      { n: 'Pinsa de costilla de cerdo', p: 16.5, d: { es: 'Cerdo a baja temperatura en su salsa, cebolla, pimientos del padrón, cilantro y lima', en: 'Slow-cooked pork rib in its sauce, onion, padrón peppers, coriander and lime' } },
    ],
  },
  {
    id: 'pasta',
    title: { es: 'Pasta casera', en: 'Homemade pasta' },
    kind: 'pasta',
    groups: [
      {
        title: { es: 'Canelones', en: 'Cannelloni' },
        items: [
          { n: 'Canelones de espinacas', p: 16, d: { es: 'Rellenos de espinacas, queso azul, mozzarella y nata vegetal', en: 'Filled with spinach, blue cheese, mozzarella and plant-based cream' } },
          { n: 'Canelones de salmón', p: 16, d: { es: 'Rellenos de salmón, burrata, tomate seco y bechamel', en: 'Filled with salmon, burrata, sun-dried tomato and béchamel' } },
          { n: 'Canelones de pollo', p: 16, d: { es: 'Rellenos de pollo, serrano, tomate, queso scamorza y bechamel', en: 'Filled with chicken, serrano ham, tomato, scamorza and béchamel' } },
        ],
      },
      {
        title: { es: 'Lasagna', en: 'Lasagna' },
        items: [
          { n: 'Lasagna', p: 16, d: { es: 'Rellena de boloñesa, bechamel, mozzarella y tomate', en: 'Layered with bolognese, béchamel, mozzarella and tomato' } },
        ],
      },
    ],
    shapes: {
      huevo: ['Spaghetti', 'Tagliatelli', 'Casarecce', 'Maccheroni', 'Zitone', 'Fusilotti'],
      rellena: ['Ravioli al tartufo', 'Ravioloni ricotta y espinacas', 'Ravioli de setas'],
    },
  },
  {
    id: 'salsas',
    title: { es: 'Salsas caseras', en: 'Homemade sauces' },
    note: { es: 'Para acompañar la pasta que elijas', en: 'To go with the pasta of your choice' },
    items: [
      { n: 'Arrabbiata', p: 15.5, d: { es: 'Salsa picante casera, tomate cherry y pimientos del padrón', en: 'House hot sauce, cherry tomato and padrón peppers' } },
      { n: 'Boloñesa', p: 16, d: { es: 'Carne picada de ternera, cebolla, pimientos, zanahoria y tomate', en: 'Minced beef, onion, peppers, carrot and tomato' } },
      { n: 'Trufa', p: 17.5, d: { es: 'Trufa negra y blanca con aceite de albahaca', en: 'Black and white truffle with basil oil' } },
      { n: 'Carbonara bacón', p: 15, d: { es: 'Bacón con parmigiano, yema de huevo y pimienta', en: 'Bacon with parmigiano, egg yolk and pepper' } },
      { n: 'Carbonara guanciale', p: 16, d: { es: 'Guanciale con parmigiano, yema de huevo y pimienta', en: 'Guanciale with parmigiano, egg yolk and pepper' } },
      { n: 'Salmón', p: 17.5, d: { es: 'Salmón, atún, olivas, ajos, tomate cherry y bechamel', en: 'Salmon, tuna, olives, garlic, cherry tomato and béchamel' } },
      { n: 'Queso azul', p: 16.5, d: { es: 'Pollo, nata vegetal, nueces, queso azul y pimienta', en: 'Chicken, plant-based cream, walnuts, blue cheese and pepper' } },
      { n: 'Pesto verde', p: 15.5, d: { es: 'Aceite de oliva, albahaca y parmigiano', en: 'Olive oil, basil and parmigiano' } },
      { n: 'Frutos del mar', p: 18, d: { es: 'Gambas, mejillones, almejas, caldo de pescado y cebolla', en: 'Prawns, mussels, clams, fish stock and onion' } },
    ],
  },
  {
    id: 'risottos',
    title: { es: 'Risottos', en: 'Risottos' },
    items: [
      { n: 'Del mar', p: 18, d: { es: 'Gambas, ajos, mejillones, cebolla, cava y parmigiano', en: 'Prawns, garlic, mussels, onion, cava and parmigiano' } },
      { n: 'Del corral', p: 17, d: { es: 'Pollo, cebolla, pimientos, cava, parmigiano, tomate cherry y guisantes', en: 'Chicken, onion, peppers, cava, parmigiano, cherry tomato and peas' } },
      { n: 'Boletus', p: 16, d: { es: 'Setas, parmigiano, cebolla, nata vegetal y cava', en: 'Mushrooms, parmigiano, onion, plant-based cream and cava' } },
      { n: 'Trufa', p: 17.5, d: { es: 'Trufa blanca y negra, alcachofas, cebolla, tomate seco y burrata', en: 'White and black truffle, artichokes, onion, sun-dried tomato and burrata' } },
    ],
  },
  {
    id: 'granja',
    title: { es: 'De la granja', en: 'From the farm' },
    items: [
      { n: 'Solomillo', p: 25, d: { es: 'Solomillo de ternera, patatas fritas y pimientos del padrón', en: 'Beef tenderloin, chips and padrón peppers' } },
      { n: 'Magret de pato', p: 22, d: { es: 'Con salsa de miel casera, puré trufado y sus verduritas', en: 'With house honey sauce, truffled mash and vegetables' } },
      { n: 'Costillas de cerdo', p: 20, d: { es: 'A baja temperatura, con patatas fritas, salsa barbacoa al whisky y miel', en: 'Slow-cooked, with chips and whisky-honey barbecue sauce' } },
    ],
  },
  {
    id: 'mar',
    title: { es: 'Del mar', en: 'From the sea' },
    items: [
      { n: 'Bacalao', p: 18, d: { es: 'Acompañado de puré de patatas, verduras y alioli tostado', en: 'Cod with mashed potato, vegetables and toasted alioli' } },
      { n: 'Salmón', p: 17, d: { es: 'Acompañado de puré, verduras y salsa tártara', en: 'Salmon with mash, vegetables and tartare sauce' } },
    ],
  },
  {
    id: 'postres',
    title: { es: 'Para los más golosos', en: 'For the sweet-toothed' },
    items: [
      { n: 'Torrija', p: 7, d: { es: 'Con helado de vainilla, crema inglesa, canela y crujiente de almendras', en: 'Spanish-style French toast with vanilla ice cream, custard, cinnamon and almond crunch' } },
      { n: 'Un mal día en la playa', p: 7.5, d: { es: 'Helado de vainilla, chocolate, fresa, dulce de leche, chocolate caliente y arena de galleta maría', en: '“A bad day at the beach”: vanilla, chocolate and strawberry ice cream, dulce de leche, hot chocolate and biscuit “sand”' } },
      { n: 'Brownie de chocolate', p: 6.5, d: { es: 'Con chocolate caliente y helado de fresa', en: 'With hot chocolate and strawberry ice cream' } },
      { n: 'Tarta de queso', p: 6, tags: ['gf'], d: { es: 'Con mermelada de higos, helado de pistacho y dulce de leche', en: 'With fig jam, pistachio ice cream and dulce de leche' } },
    ],
  },
];

export const spritz = [
  {
    id: 'vinos',
    title: { es: 'Carta de vinos', en: 'Wine list' },
    kind: 'wine',
    groups: [
      { title: { es: 'Blancos', en: 'White' }, items: [
        { n: 'Finca Feroz', p: 15, d: { es: 'D.O. Rueda · Verdejo', en: 'D.O. Rueda · Verdejo' } },
        { n: 'Sommos', p: 15, d: { es: 'D.O. Somontano · Chardonnay', en: 'D.O. Somontano · Chardonnay' } },
        { n: 'Tharsys City', p: 15, d: { es: 'D.O. Requena · Macabeo', en: 'D.O. Requena · Macabeo' } },
      ] },
      { title: { es: 'Tintos', en: 'Red' }, items: [
        { n: 'Tharsys City', p: 15, d: { es: 'D.O. Requena · Bobal', en: 'D.O. Requena · Bobal' } },
        { n: 'Marqués de Atrio', p: 15, d: { es: 'D.O. Rioja · Crianza', en: 'D.O. Rioja · Crianza' } },
        { n: 'Olía', p: 15, d: { es: 'D.O. Ribera del Duero · Tempranillo', en: 'D.O. Ribera del Duero · Tempranillo' } },
      ] },
      { title: { es: 'Rosado', en: 'Rosé' }, items: [
        { n: 'Marqués de Atrio', p: 15, d: { es: 'D.O. Rioja · Garnacha', en: 'D.O. Rioja · Garnacha' } },
      ] },
      { title: { es: 'Cava', en: 'Cava' }, items: [
        { n: 'Domino de Requena', p: 15, d: { es: 'D.O. Requena · Brut', en: 'D.O. Requena · Brut' } },
      ] },
    ],
  },
  {
    id: 'panes',
    title: { es: 'Panes caseros', en: 'Homemade bread' },
    items: [
      { n: 'Pan de pueblo', p: 4.5, d: { es: 'Con tomate, alioli y aceitunas', en: 'Village loaf with tomato, alioli and olives' } },
      { n: 'Focaccia', p: 8.5, d: { es: 'Jamón serrano, rúcula, burrata y tomate seco', en: 'Serrano ham, rocket, burrata and sun-dried tomato' } },
    ],
  },
  {
    id: 'ensaladas',
    title: { es: 'Ensaladas', en: 'Salads' },
    items: [
      { n: 'Basilico', p: 11, d: { es: 'Queso semicurado, tomate seco, rúcula, almendras y jamón serrano', en: 'Semi-cured cheese, sun-dried tomato, rocket, almonds and serrano ham' } },
      { n: 'Benimeli', p: 14, d: { es: 'Queso burrata, tostas de pan con tomate, cebolla morada, pesto, vinagre de Módena y rúcula', en: 'Burrata, toast with tomato, red onion, pesto, Modena vinegar and rocket' } },
    ],
  },
  {
    id: 'picar',
    title: { es: 'Algo para picar', en: 'Something to share' },
    items: [
      { n: 'Crujiente de pollo', p: 10, d: { es: 'Rebozado en panko con salsa barbacoa y patatas de boniato', en: 'Panko-coated chicken, barbecue sauce and sweet-potato fries' } },
      { n: 'Gambas al ajillo', p: 15, d: { es: 'Gambas, aceite de oliva, ajos, tomate cherry y pimientos del padrón', en: 'Prawns, olive oil, garlic, cherry tomato and padrón peppers' } },
      { n: 'Albóndigas', p: 13, d: { es: 'Salsa de mostaza, nata vegetal, setas, pimienta y mozzarella', en: 'Mustard sauce, plant-based cream, mushrooms, pepper and mozzarella' } },
      { n: 'Bravas de berenjena', p: 15, d: { es: 'Berenjena, salsa de soja y teriyaki, ajos, cebolla y pimientos', en: 'Aubergine, soy and teriyaki, garlic, onion and peppers' } },
      { n: 'Octopus', p: 20, d: { es: 'Pata de pulpo con crema de patatas, huevo a baja temperatura, pimientos del padrón y crujiente de boniato', en: 'Octopus leg, potato cream, slow-cooked egg, padrón peppers and sweet-potato crisp' } },
      { n: 'Vitello Tonnato', p: 13.5, d: { es: 'Redondo de ternera, salsa Basilico, alcaparras, rúcula y pimienta', en: 'Veal round, Basilico sauce, capers, rocket and pepper' } },
      { n: 'Alcachofas confitadas', p: 13.5, d: { es: 'Corazón de alcachofas, salsa Basilico, jamón serrano, tomate seco y burrata', en: 'Confit artichoke hearts, Basilico sauce, serrano ham, sun-dried tomato and burrata' } },
      { n: 'Que morro', p: 10, d: { es: 'Morro, crema de patatas, huevo poché y pimientos del padrón', en: 'Pork snout, potato cream, poached egg and padrón peppers' } },
      { n: 'Calamar a la andaluza', p: 12, d: { es: 'Calamar rebozado en harina de garbanzos, salsa tártara, pimientos del padrón y rúcula', en: 'Squid fried in chickpea flour, tartare sauce, padrón peppers and rocket' } },
      { n: 'Croquetas caseras', p: 1.9, u: { es: 'unidad', en: 'each' }, d: { es: 'Espinacas, bacalao, boletus y trufa, gamba roja o jamón ibérico', en: 'Spinach, cod, porcini and truffle, red prawn or Iberian ham' } },
    ],
  },
  {
    id: 'patatas',
    title: { es: 'Nuestras patatas', en: 'Our potatoes' },
    items: [
      { n: 'Patatas llama a los bomberos', p: 14.5, d: { es: 'Con salsa casera picante, pimientos del padrón y alioli', en: '“Call the fire brigade”: house hot sauce, padrón peppers and alioli' } },
      { n: 'Huevos rotos', p: 15, d: { es: 'Jamón serrano, huevos fritos, patatas caseras y pimientos del padrón', en: 'Serrano ham, fried eggs, homemade chips and padrón peppers' } },
      { n: 'Patatas a los 4 quesos', p: 15, d: { es: 'Nata vegetal, mozzarella, queso azul y scamorza ahumado', en: 'Plant-based cream, mozzarella, blue cheese and smoked scamorza' } },
    ],
  },
  {
    id: 'burger',
    title: { es: 'Burgers', en: 'Burgers' },
    items: [
      { n: 'Basilico', p: 17, d: { es: 'Carne de wagyu, cebolla, tomate, rúcula, cheddar, huevo, salsa de queso, serrano, mayonesa de trufa y patatas fritas', en: 'Wagyu beef, onion, tomato, rocket, cheddar, egg, cheese sauce, serrano ham, truffle mayo and chips' } },
      { n: 'Benimeli', p: 16, d: { es: 'Pollo rebozado en panko, huevo, rúcula, tomate seco, queso ahumado, salsa gaucha picante, crujiente de bacón y patatas de boniato', en: 'Panko chicken, egg, rocket, sun-dried tomato, smoked cheese, spicy gaucha sauce, bacon crunch and sweet-potato fries' } },
    ],
  },
  {
    id: 'costillas',
    title: { es: 'Costillas', en: 'Ribs' },
    items: [
      { n: 'Costilla de cerdo', p: 20, d: { es: 'Costilla americana a baja temperatura, en salsa barbacoa al whisky, patatas fritas y pimientos del padrón', en: 'Slow-cooked American-style rib in whisky barbecue sauce, chips and padrón peppers' } },
    ],
  },
  {
    id: 'postres',
    title: { es: 'Postres', en: 'Desserts' },
    items: [
      { n: 'Un mal día en la playa', p: 6.5, d: { es: 'Helado de fresa, chocolate, coco y vainilla, cucurucho, chocolate caliente, almendra caramelizada y tierra de galleta', en: 'Strawberry, chocolate, coconut and vanilla ice cream, cone, hot chocolate, caramelised almond and biscuit crumble' } },
      { n: 'Torrijas', p: 6.5, d: { es: 'Torrijas y helado de vainilla', en: 'Spanish-style French toast with vanilla ice cream' } },
      { n: 'Tarta de queso', p: 6, d: { es: 'Mini tarta de queso con helado de vainilla, mermelada de higos y crujiente de almendra', en: 'Mini cheesecake with vanilla ice cream, fig jam and almond crunch' } },
      { n: 'Tiramisú', p: 7, d: { es: 'De mascarpone y pistacho', en: 'Mascarpone and pistachio' } },
    ],
  },
];
