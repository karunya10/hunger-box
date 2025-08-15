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
        <p className="text-muted-foreground text-sm">{cuisines.join(" • ")}</p>
        <p className="text-sm font-medium text-yellow-600">⭐ {rating}</p>
      </CardContent>
    </Card>
  );
}
