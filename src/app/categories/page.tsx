
import { getCategories } from '@/api/allCategory';
import { Category } from '@/types/Product.type';
import Image from 'next/image';
import Link from 'next/link';

export default async function Categories() {
  const categories = await getCategories();
  console.log(categories);
  

  return (
<section className="py-10 bg-white dark:bg-slate-900 transition-colors duration-300">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
      Category
    </h2>
    
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {categories.map((category:Category) => (
        <Link 
          key={category._id} 
          href={`/categories/${category._id}`}
          className="group block bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm dark:shadow-md hover:shadow-lg dark:hover:shadow-gray-700/40 transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center"
        >
          <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-xl">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
            />
          </div>
          <h3 className="font-bold text-gray-700 dark:text-gray-200 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors truncate">
            {category.name}
          </h3>
        </Link>
      ))}
    </div>
  </div>
</section>

  );
}