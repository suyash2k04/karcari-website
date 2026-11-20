import Navigation from "@/components/Navigation";
import KarcariExperience from "@/components/KarcariExperience";
import Footer from "@/components/Footer";
import { publishedCatalog } from "@/lib/catalog-store";
export const dynamic = "force-dynamic";
export default async function Home() {
  const {premixes, ingredients} = await publishedCatalog();
  return <><Navigation/><main id="main-content"><KarcariExperience premixProducts={premixes} ingredientProducts={ingredients}/></main><Footer/></>;
}
