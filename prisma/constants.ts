export const categories = [
    {
        name: 'Ice Cream',
      },
      {
        name: 'Frozen Yogurt',
      },
      {
        name: 'Sorbet',
      },
      {
        name: 'Coctails',
      },
      {
        name: 'Drinks',
      },
]

export const ingredients = [
  {
    name: 'Caramel',
    price: 1,
    imageUrl:
      'https://media.istockphoto.com/id/496657658/photo/ice-cream-with-caramel-sauce.jpg?s=612x612&w=0&k=20&c=7bA2V7Txuw168cHrITnufhVKwmZyjRQEt5fcBUCokNw=',
  },
  {
    name: 'Berry jam',
    price: 1,
    imageUrl:
      'https://media.istockphoto.com/id/496657274/photo/vanilla-ice-cream-with-chocolate-sauce.jpg?s=612x612&w=0&k=20&c=MWPeOecnYrPtoftHPpuMPOKJmISSylHYBWTFcJLD2os=',
  },
  {
    name: 'Chocolate sauce',
    price: 1,
    imageUrl: 'https://media.istockphoto.com/id/511482292/photo/scoop-of-stracciatella-ice-cream-topped-with-chocolate-sauce.jpg?s=612x612&w=0&k=20&c=tPFr42vlIUKEa6ojL8y9CZna9QmnZUT8jlUBUJlMVyU=',
  },
  {
    name: 'Whipped cream',
    price: 1,
    imageUrl:
      'https://static.vecteezy.com/system/resources/thumbnails/036/729/177/small_2x/ai-generated-whipped-cream-isolated-on-white-background-free-png.png',
  },
  {
    name: 'Kiwi sauce',
    price: 1,
    imageUrl: 'https://www.cokoladybb.sk/fotky55798/fotos/1001324.jpg',
  },
  {
    name: 'Mango',
    price: 2,
    imageUrl: 'https://static.vecteezy.com/system/resources/previews/039/105/915/non_2x/ai-generated-mango-ice-cream-isolated-on-background-free-png.png',
  },
  {
    name: 'Strawberry sauce',
    price: 1,
    imageUrl: 'https://media.istockphoto.com/id/496657532/zh/%E7%85%A7%E7%89%87/ice-cream-with-strawberry-sauce.jpg?s=170667a&w=0&k=20&c=iXUG0ymxtbJlPzAm9zISN_DqJqZrBsOj9150BaOllW4=',
  },
  {
    name: 'Blueberry',
    price: 2,
    imageUrl: 'https://fielderschoiceicecream.com/wp-content/uploads/2024/09/Blueberry-Top-Down-600-2.webp',
  },
  {
    name: 'Nestle Crunch',
    price: 3,
    imageUrl: 'https://fielderschoiceicecream.com/wp-content/uploads/2024/09/Nestle-Wind-Up-Top-Down-600-2.webp',
  },
  {
    name: 'M&M',
    price: 3,
    imageUrl: 'https://fielderschoiceicecream.com/wp-content/uploads/2024/09/MM-Top-Down-600-2.webp',
  },
  {
    name: 'Almond',
    price: 2,
    imageUrl: 'https://fielderschoiceicecream.com/wp-content/uploads/2024/09/Almond-Joy-Top-Down-600.webp',
  },
  {
    name: 'Chocolate Sprinkles',
    price: 1,
    imageUrl: 'https://fielderschoiceicecream.com/wp-content/uploads/2024/09/aChocolate-Jimmies-Top-Down-600-2.webp.webp',
  },
  {
    name: 'Crunch Coat',
    price: 1,
    imageUrl: 'https://fielderschoiceicecream.com/wp-content/uploads/2024/09/Crunch-Coat-600-2.webp',
  },
  {
    name: 'Peanuts',
    price: 3,
    imageUrl:
      'https://fielderschoiceicecream.com/wp-content/uploads/2024/09/Peanuts-600.webp',
  },
  {
    name: 'Rainbow Sprinkles',
    price: 1,
    imageUrl: 'https://fielderschoiceicecream.com/wp-content/uploads/2024/09/Rainbow-Sprinkles-600.webp',
  },
  {
    name: 'Skittles',
    price: 3,
    imageUrl: 'https://fielderschoiceicecream.com/wp-content/uploads/2024/09/Skittles-Top-Down-600-2.webp',
  },
  {
    name: 'Chocolate Sprinkles',
    price: 1,
    imageUrl:
      'https://fielderschoiceicecream.com/wp-content/uploads/2024/09/Chocolate-Sprinkles-600.webp',
  },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const productsWithItems = [
  {
    name: 'Peanut Butter Chip',
    imageUrl: 'https://i0.wp.com/www.perrysicecream.com/wp-content/uploads/2024/06/Peanut-Butter-Chip-Frozen-Yogurt.webp',
    categoryId: 2,
  },
  {
    name: 'Vanilla frozen yogurt',
    imageUrl: 'https://i0.wp.com/www.perrysicecream.com/wp-content/uploads/2024/06/Vanilla-Frozen-Yogurt.webp',
    categoryId: 2,
  },
  {
    name: 'Key Lime Pie',
    imageUrl: 'https://i0.wp.com/www.perrysicecream.com/wp-content/uploads/2024/06/Lemon-Chillo.webp',
    categoryId: 2,
  },
  {
    name: 'Super Hero',
    imageUrl: 'https://i0.wp.com/www.perrysicecream.com/wp-content/uploads/2021/07/super-hero-bowl-correct-size.webp',
    categoryId: 3,
  },
  {
    name: 'Orange Twist',
    imageUrl: 'https://i0.wp.com/www.perrysicecream.com/wp-content/uploads/2024/06/Orange-Twist-Bowl-Final-web.webp',
    categoryId: 3,
  },
  {
    name: 'Northern Lights',
    imageUrl: 'https://i0.wp.com/www.perrysicecream.com/wp-content/uploads/2024/04/Northern-Light-Bowl-Final.webp',
    categoryId: 3,
  },
  {
    name: 'Rainbow Sherbet',
    imageUrl: 'https://i0.wp.com/www.perrysicecream.com/wp-content/uploads/2024/04/Rainbow-Sherbet-Bowl.webp',
    categoryId: 3,
  },
];

export const products = [
  {
    name: 'Raspberries & Cream',
    imageUrl: 'https://dairyqueen-prod.dotcdn.io/dA/01007984cd/fileAsset/strawberry-shake.png/webp',
    categoryId: 4,
  },
  {
    name: 'Caramel Shake',
    imageUrl: 'https://dairyqueen-prod.dotcdn.io/dA/14686588ce/fileAsset/caramel-shake.png/webp',
    categoryId: 4,
  },
  {
    name: 'Hot Fudge Shake',
    imageUrl: 'https://dairyqueen-prod.dotcdn.io/dA/a955ab0994/fileAsset/hot-fudge-shake.png/webp',
    categoryId: 4,
  },
  {
    name: 'Orange Cream Flavored Shake',
    imageUrl: 'https://dairyqueen-prod.dotcdn.io/dA/9064fe73dd/fileAsset/OrangeCreamShake.png/webp',
    categoryId: 4,
  },
  {
    name: 'Chocolate Shake',
    imageUrl: 'https://dairyqueen-prod.dotcdn.io/dA/af61aa1956/fileAsset/chocolate-shake.png/webp',
    categoryId: 4,
  },
  {
    name: 'OVanilla Shake',
    imageUrl: 'https://dairyqueen-prod.dotcdn.io/dA/759b18c5d4/fileAsset/vanilla-shake.png/webp',
    categoryId: 4,
  },
  {
    name: 'Caramel Cappuccino',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61AED6B6D4BFDAD4E58D76CF56.webp',
    categoryId: 5,
  },
  {
    name: 'Coconut Latte',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61B19FA07090EE88B0ED347F42.webp',
    categoryId: 5,
  },
  {
    name: 'Americano',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61B044583596548A59078BBD33.webp',
    categoryId: 5,
  },
  {
    name: 'Latte',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
    categoryId: 5,
  },
    {
    name: 'Coca Cola',
    imageUrl: 'https://mcdonalds.com.hk/wp-content/uploads/2020/07/MDS200401_CS_BevG_500-12-1.png',
    categoryId: 5,
  },
]