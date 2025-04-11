import { Container, Filters, ProductsGroupList, Title, TopBar, Stories } from "@/shared/components/shared";
import { Suspense } from "react";
import { findProducts } from "@/shared/lib";
import { GetSearchParams } from "@/shared/lib/find-products";

export default async function Home({ searchParams }: { searchParams: Promise<GetSearchParams> }) {
  const params = await searchParams;

  const categories = await findProducts(params);

  return (
    <>
      <Container className="mt-10">
        <Title text="All products" size="lg" className="font-extrabold" />
      </Container>

      <TopBar categories={categories.filter((category) => category.products.length > 0)} />

      <Stories />

      <Container className="mt-10 bp-14">
        <div className="flex gap-[80px]">
            <div className="w-[250px]">
              <Suspense>
                <Filters />
              </Suspense>
            </div>

            <div className="flex-1">
              <div className="flex flex-col gap-16">
                {
                  categories.map((category) => (
                    category.products.length > 0 && (
                      <ProductsGroupList 
                        key={category.id}
                        title={category.name}
                        categoryId={category.id}
                        items={category.products}
                      />
                    )
                  ))
                }
              </div>
            </div>
        </div>
      </Container>
    </>
    
  );
}
