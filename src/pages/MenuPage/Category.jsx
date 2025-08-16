
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Item from "./Item";

function Category({ category, items }) {
  return (
    <AccordionItem key={category} value={category}>
      <AccordionTrigger className="text-xl font-semibold capitalize">
        {category}
      </AccordionTrigger>
      <AccordionContent className="space-y-4">
        {items.map((menu) => (
         <Item menu={menu}/>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}

export default Category;
