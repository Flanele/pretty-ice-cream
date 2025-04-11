import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
    query?: string;
    sortBy?: string;
    sizes?: string;
    creamTypes?: string;
    ingredients?: string;
    priceFrom?: string;
    priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 100;

export const findProducts = async (params: GetSearchParams) => {
    const sizes = params.sizes?.split(',').map(Number);
    const creamTypes = params.creamTypes?.split(',').map(Number);
    const ingredientsIdsArr = params.ingredients?.split(',').map(Number);

    const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
    const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

      const categories = await prisma.category.findMany({
        include: {
          products: {
            orderBy: {
                id: 'desc',
            },
            where: {
                ingredients: ingredientsIdsArr ? {
                    some: {
                        id: {
                            in: ingredientsIdsArr
                        }
                    }
                }
                : undefined,
                items: {
                    some: {
                        size: {
                            in: sizes
                        },
                        creamType: {
                            in: creamTypes
                        },
                        price: {
                            gte: minPrice, //больше либо равно
                            lte: maxPrice, //меньше либо равно
                        }
                    },
                },
            },
            include: {
              items: {
                where: {
                    price: {
                        gte: minPrice,
                        lte: maxPrice,
                    }
                },
                orderBy: {
                    price: 'asc',
                }
              },
              ingredients: true
            },
          },
        },
      });

      return categories;

}