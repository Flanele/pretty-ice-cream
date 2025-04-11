import { Prisma } from "@prisma/client";
import { categories, ingredients, products } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from 'bcrypt';


const randomDecimalNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
    productId,
    creamType,
    size
} : {
    productId: number;
    creamType?: 1 | 2;
    size?: 20 | 30 | 40;
}) => {
    return {
        productId,
        price: randomDecimalNumber(4, 27),
        creamType,
        size
    } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {

    await prisma.user.createMany({
        data: [
            { 
                fullName: "User Test",
                email: "user1@gmail.com",
                password: hashSync('123456', 10),
                role: 'USER',
                verified: new Date()
             },
             { 
                fullName: "Admin Admin",
                email: "admin1@gmail.com",
                password: hashSync('123456', 10),
                role: 'ADMIN',
                verified: new Date()
             }
        ]
    })

    await prisma.category.createMany({
        data: categories,
    });

    await prisma.ingredient.createMany({
        data: ingredients,
    });

    await prisma.product.createMany({
        data: products,
    });

    const cream1 = await prisma.product.create({
        data: {
          name: 'Deep Sea Treasure',
          imageUrl:
            'https://i0.wp.com/www.perrysicecream.com/wp-content/uploads/2022/06/Deep-Sea-Bowl-Final.webp',
          categoryId: 1,
          ingredients: {
            connect: ingredients.slice(0, 6),
          },
        },
      });
    
      const cream2 = await prisma.product.create({
        data: {
          name: 'Rocky Mountain Raspberry',
          imageUrl:
            'https://i0.wp.com/www.perrysicecream.com/wp-content/uploads/2024/04/Rocky-Mountain-Raspberry-Bowl.webp',
          categoryId: 1,
          ingredients: {
            connect: ingredients.slice(5, 10),
          },
        },
      });
    
      const cream3 = await prisma.product.create({
        data: {
          name: 'Grasshopper Pie',
          imageUrl:
            'https://i0.wp.com/www.perrysicecream.com/wp-content/uploads/2024/04/Grasshopper-Pie-Bowl.webp',
          categoryId: 1,
          ingredients: {
            connect: ingredients.slice(10, 40),
          },
        },
      });

      const cream4 = await prisma.product.create({
        data: {
          name: 'Brownie Batter',
          imageUrl:
            'https://i0.wp.com/www.perrysicecream.com/wp-content/uploads/2024/04/Brownie-Batter-Bowl.webp',
          categoryId: 1,
          ingredients: {
            connect: ingredients.slice(5, 10),
          },
        },
      });

      const cream5 = await prisma.product.create({
        data: {
          name: 'Panda Paws',
          imageUrl:
            'https://i0.wp.com/www.perrysicecream.com/wp-content/uploads/2024/04/Panda-Paws-Bowl.webp',
          categoryId: 1,
          ingredients: {
            connect: ingredients.slice(10, 40),
          },
        },
      });

      const cream6 = await prisma.product.create({
        data: {
          name: 'Piece of Cake',
          imageUrl:
            'https://i0.wp.com/www.perrysicecream.com/wp-content/uploads/2024/04/Piece-of-Cake-Bowl-Final.webp',
          categoryId: 1,
          ingredients: {
            connect: ingredients.slice(0, 6)
          },
        },
      });

      const yogurt1 = await prisma.product.create({
        data: {
          name: 'Peanut Butter Chip',
          imageUrl: 'https://i0.wp.com/www.perrysicecream.com/wp-content/uploads/2024/06/Peanut-Butter-Chip-Frozen-Yogurt.webp',
          categoryId: 2,
          ingredients: {
            connect: ingredients.slice(0, 8)
          },
        },
      });

      const yogurt2 = await prisma.product.create({
        data: {
          name: 'Vanilla frozen yogurt',
          imageUrl: 'https://i0.wp.com/www.perrysicecream.com/wp-content/uploads/2024/06/Vanilla-Frozen-Yogurt.webp',
          categoryId: 2,
          ingredients: {
            connect: ingredients.slice(0, 8)
          },
        },
      });

      const yogurt3 = await prisma.product.create({
        data: {
          name: 'Key Lime Pie',
          imageUrl: 'https://i0.wp.com/www.perrysicecream.com/wp-content/uploads/2024/06/Lemon-Chillo.webp',
          categoryId: 2,
          ingredients: {
            connect: ingredients.slice(0, 8)
          },
        },
      });

      const sorbet1 = await prisma.product.create({
        data: {
          name: 'Rainbow Sherbet',
          imageUrl: 'https://i0.wp.com/www.perrysicecream.com/wp-content/uploads/2024/04/Rainbow-Sherbet-Bowl.webp',
          categoryId: 3,
          ingredients: {
            connect: ingredients.slice(10, 15)
          },
        },
      });

      
      const sorbet2 = await prisma.product.create({
        data: {
          name: 'Super Hero',
          imageUrl: 'https://i0.wp.com/www.perrysicecream.com/wp-content/uploads/2021/07/super-hero-bowl-correct-size.webp',
          categoryId: 3,
          ingredients: {
            connect: ingredients.slice(10, 15)
          },
        },
      });

      
      const sorbet3 = await prisma.product.create({
        data: {
          name: 'Orange Twist',
          imageUrl: 'https://i0.wp.com/www.perrysicecream.com/wp-content/uploads/2024/06/Orange-Twist-Bowl-Final-web.webp',
          categoryId: 3,
          ingredients: {
            connect: ingredients.slice(10, 15)
          },
        },
      });

      
      const sorbet4 = await prisma.product.create({
        data: {
          name: 'Northern Lights',
          imageUrl: 'https://i0.wp.com/www.perrysicecream.com/wp-content/uploads/2024/04/Northern-Light-Bowl-Final.webp',
          categoryId: 3,
          ingredients: {
            connect: ingredients.slice(10, 15)
          },
        },
      });


      await prisma.productItem.createMany({
        data: [
            // ice cream 1
            generateProductItem({ productId: cream1.id, creamType: 1, size: 20 }),
            generateProductItem({ productId: cream1.id, creamType: 1, size: 30 }),
            generateProductItem({ productId: cream1.id, creamType: 1, size: 40 }),
            generateProductItem({ productId: cream1.id, creamType: 2, size: 30 }),
            generateProductItem({ productId: cream1.id, creamType: 2, size: 40 }),

            // ice cream 2
            generateProductItem({ productId: cream2.id, creamType: 1, size: 20 }),
            generateProductItem({ productId: cream2.id, creamType: 1, size: 30 }),
            generateProductItem({ productId: cream2.id, creamType: 1, size: 40 }),
            generateProductItem({ productId: cream2.id, creamType: 2, size: 20 }),
            generateProductItem({ productId: cream2.id, creamType: 2, size: 30 }),
            generateProductItem({ productId: cream2.id, creamType: 2, size: 40 }),

            // ice cream 3
            generateProductItem({ productId: cream3.id, creamType: 1, size: 20 }),
            generateProductItem({ productId: cream3.id, creamType: 2, size: 30 }),
            generateProductItem({ productId: cream3.id, creamType: 2, size: 40 }),

            // ice cream 4
            generateProductItem({ productId: cream4.id, creamType: 1, size: 20 }),
            generateProductItem({ productId: cream4.id, creamType: 2, size: 30 }),
            generateProductItem({ productId: cream4.id, creamType: 2, size: 40 }),

            // ice cream 5
            generateProductItem({ productId: cream5.id, creamType: 1, size: 20 }),
            generateProductItem({ productId: cream5.id, creamType: 1, size: 30 }),
            generateProductItem({ productId: cream5.id, creamType: 1, size: 40 }),
            generateProductItem({ productId: cream5.id, creamType: 2, size: 20 }),
            generateProductItem({ productId: cream5.id, creamType: 2, size: 30 }),
            generateProductItem({ productId: cream5.id, creamType: 2, size: 40 }),
            
            // ice cream 6
            generateProductItem({ productId: cream6.id, creamType: 1, size: 20 }),
            generateProductItem({ productId: cream6.id, creamType: 1, size: 30 }),
            generateProductItem({ productId: cream6.id, creamType: 1, size: 40 }),
            generateProductItem({ productId: cream6.id, creamType: 2, size: 20 }),
            generateProductItem({ productId: cream6.id, creamType: 2, size: 30 }),

            //yogurt 1 
            generateProductItem({ productId: yogurt1.id, creamType: 1, size: 20 }),
            generateProductItem({ productId: yogurt1.id, creamType: 1, size: 30 }),
            generateProductItem({ productId: yogurt1.id, creamType: 2, size: 20 }),
            generateProductItem({ productId: yogurt1.id, creamType: 2, size: 30 }),

            //yogurt 2 
            generateProductItem({ productId: yogurt2.id, creamType: 1, size: 20 }),
            generateProductItem({ productId: yogurt2.id, creamType: 1, size: 30 }),
            generateProductItem({ productId: yogurt2.id, creamType: 2, size: 20 }),
            generateProductItem({ productId: yogurt2.id, creamType: 2, size: 30 }),

            //yogurt 3 
            generateProductItem({ productId: yogurt3.id, creamType: 1, size: 20 }),
            generateProductItem({ productId: yogurt3.id, creamType: 1, size: 30 }),
            generateProductItem({ productId: yogurt3.id, creamType: 2, size: 20 }),
            generateProductItem({ productId: yogurt3.id, creamType: 2, size: 30 }),

            //sorbet 1
            generateProductItem({ productId: sorbet1.id, creamType: 2, size: 20 }),
            generateProductItem({ productId: sorbet1.id, creamType: 2, size: 30 }),

            //sorbet 2
            generateProductItem({ productId: sorbet2.id, creamType: 2, size: 20 }),
            generateProductItem({ productId: sorbet2.id, creamType: 2, size: 30 }),

            //sorbet 3
            generateProductItem({ productId: sorbet3.id, creamType: 2, size: 20 }),
            generateProductItem({ productId: sorbet3.id, creamType: 2, size: 30 }),

            //sorbet 4
            generateProductItem({ productId: sorbet4.id, creamType: 2, size: 20 }),
            generateProductItem({ productId: sorbet4.id, creamType: 2, size: 30 }),

            // shakes and drinks
            generateProductItem({ productId: 1 }),
            generateProductItem({ productId: 2 }),
            generateProductItem({ productId: 3 }),
            generateProductItem({ productId: 4 }),
            generateProductItem({ productId: 5 }),
            generateProductItem({ productId: 6 }),
            generateProductItem({ productId: 7 }),
            generateProductItem({ productId: 8 }),
            generateProductItem({ productId: 9 }),
            generateProductItem({ productId: 10 }),
            generateProductItem({ productId: 11 }),
        ]
      });

      await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                totalAmount: 0,
                token: '111111'
            },
            {
                userId: 2,
                totalAmount: 0,
                token: '222222'
            },
        ]
      });

      await prisma.cartItem.create({
        data: 
            {
                productItemId: 1,
                cartId: 1,
                quantity: 2,
                ingredients: {
                    connect: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
                }
            }
      })

      await prisma.story.createMany({
    data: [
      {
        previewImageUrl:
          'https://i.pinimg.com/736x/76/ad/5a/76ad5a29cb84d9f4077249ecc30ee650.jpg',
      },
      {
        previewImageUrl:
          'https://i.pinimg.com/736x/d9/ad/ae/d9adae59a2c735cee235fd94f97227d9.jpg',
      },
      {
        previewImageUrl:
          'https://i.pinimg.com/736x/c5/4c/d4/c54cd488ef6a1e4a87e0151f5e4b6d01.jpg',
      },
      {
        previewImageUrl:
          'https://i.pinimg.com/736x/fc/9d/3a/fc9d3aa9d7e19df0dacfa11bd9c12827.jpg',
      },
      {
        previewImageUrl:
          'https://i.pinimg.com/736x/4a/e4/ef/4ae4ef3ffd00b715fe9f00cf55bd1236.jpg',
      },
      {
        previewImageUrl:
          'https://i.pinimg.com/736x/62/f9/81/62f9819936cafdb53087fcf4bf6b7bf6.jpg',
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl:
          'https://i.pinimg.com/736x/8c/d1/51/8cd151a18091e51f23d71138cae1b96c.jpg',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://i.pinimg.com/736x/de/65/74/de6574b168b2367587e5ad710726d898.jpg',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://i.pinimg.com/736x/51/d1/ec/51d1ec791fa925b3abb0a4b0ffb47828.jpg',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://i.pinimg.com/736x/ef/8f/1d/ef8f1d07233b23a4a5ecd0fa9543779c.jpg',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://i.pinimg.com/736x/4a/d8/3b/4ad83bae78b03cbb57a52ccbd390c148.jpg',
      },
      {
        storyId: 2,
        sourceUrl:
          'https://i.pinimg.com/736x/7b/30/83/7b30834b847a4bae4241cf98a9cd4c42.jpg',
      },
      {
        storyId: 2,
        sourceUrl:
          'https://i.pinimg.com/736x/b3/1d/ec/b31dec60cc66caafebfa8b3363eb7fa9.jpg',
      },
      {
        storyId: 2,
        sourceUrl:
          'https://i.pinimg.com/736x/a4/d3/dd/a4d3dd996d3260a2d11e0fbd01e5e07e.jpg',
      },
      {
        storyId: 2,
        sourceUrl:
          'https://i.pinimg.com/736x/5d/37/e2/5d37e28cccdf51ce3ec4c04cfc1a42d8.jpg',
      },
    ],
  });
};


async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE`;

}

async function main() {
    try {
        await down ();
        await up()
    } catch(e) {
        console.log(e);
    }
}

main()
.then(async () => {
    await prisma.$disconnect();
})
.catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})