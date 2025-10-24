import { useEffect, useState } from 'react';
import { Product, Segment, getProducts, getProductSegments } from '../services/api';
import { Card, CardContent, CardHeader } from './ui/card';
import { ScrollArea } from './ui/scroll-area';

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, segmentsData] = await Promise.all([
          getProducts(),
          getProductSegments()
        ]);
        setProducts(productsData);
        setSegments(segmentsData);
      } catch (err) {
        setError('Error fetching data from the server');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-[400px]">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Product Catalog</h1>
      <ScrollArea className="h-[600px] rounded-md border p-4">
        {segments.map((segment) => (
          <div key={segment.segment} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{segment.segment}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {segment.products.map((product) => (
                <Card key={product.id}>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}