import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RestaurantCard({ image, name, cuisines, rating }) {
  return (
    <Card className="w-full sm:w-[350px] shadow-md hover:shadow-xl transition-shadow py-0 pb-5">
      <CardHeader className="p-0">
        <img
          src={image}
          alt={name}
          className="w-full h-[180px] object-cover rounded-t-md"
        />
      </CardHeader>
      <CardContent className="space-y-1">
        <CardTitle className="text-lg">{name}</CardTitle>
        <p className="text-muted-foreground text-sm">
          {cuisines.slice(0, 4).join(" • ")}
        </p>
        <div className="pt-1">
          <span
            className="
              inline-flex items-center gap-1.5 text-sm font-medium
              text-emerald-700 bg-emerald-50
              px-2.5 py-1 rounded-full
              ring-1 ring-emerald-100
            "
          >
            <span aria-hidden>⭐</span>
            {rating}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
