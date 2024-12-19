
namespace ProjectTest.MockData
{
    public class ProductMockData
    {
        public static List<Category> listCategory = CategoryMockData.GetCategories();
        public static List<District> listDistrict = DistrictMockData.GetDistricts();
        public static List<Product> GetProducts()
        {
            return new List<Product>
            {
                  new Product { Id=1,Name= "Apple 1",Description= "Sweet.Made in Germany",Price= 3,Category= listCategory[0],District=listDistrict[0],ImageUrl= "Resources\\Images\\Apple1.jpg"},
                  new Product { Id=2,Name= "Apple 2",Description= "Good.Made in Sweden",Price= 8, Category= listCategory[0], District=listDistrict[1],ImageUrl= "Resources\\Images\\Apple2.jpg"},
                  new Product { Id=3,Name= "Apricot",Description= "Sweet.Made in Vietnam",Price= 6, Category= listCategory[0], District=listDistrict[2],ImageUrl= "Resources\\Images\\Apricot.jpg"},
                  new Product { Id=4,Name= "Banana",Description= "Sweet.Made in Vietnam",Price= 2, Category= listCategory[0], District=listDistrict[3],ImageUrl= "Resources\\Images\\Banana.jpg"},
                  new Product { Id=5,Name= "Bell Pepper",Description= "Made in Vietnam",Price= 5, Category= listCategory[0], District=listDistrict[4],ImageUrl= "Resources\\Images\\Bell Pepper.jpg"},
                  new Product { Id=6,Name= "Bread 1",Description= "Sweet.Made in Germany",Price= 4, Category= listCategory[1], District=listDistrict[5],ImageUrl= "Resources\\Images\\Bread1.jpg"},
                  new Product { Id=7,Name= "Broccoli",Description= "Made in Vietnam",Price= 6, Category= listCategory[0], District=listDistrict[6],ImageUrl= "Resources\\Images\\Broccoli.jpg"},
                  new Product { Id=8,Name= "Cabbage",Description= "High quality, made in Germany",Price= 9, Category= listCategory[0],  District=listDistrict[7],ImageUrl= "Resources\\Images\\Cabbage.jpg"},
                  new Product { Id=9,Name= "Carrot",Description= "Delicious, made in Britain",Price= 2, Category= listCategory[0],  District=listDistrict[8],ImageUrl= "Resources\\Images\\Carrot.jpg"},
                  new Product { Id=10,Name= "Cauliflower",Description= "High quality, made in Denmark",Price= 11, Category= listCategory[0], District=listDistrict[9],ImageUrl= "Resources\\Images\\Cauliflower.jpg"},
                  new Product { Id=11,Name= "Cherry",Description= "High quality.Made in Denmark",Price= 12, Category= listCategory[0],  District=listDistrict[0],ImageUrl= "Resources\\Images\\Cherry.jpg"},
                  new Product { Id=12,Name= "Cow Milk",Description= "With sugar.Made in Germany",Price= 8, Category= listCategory[2],  District=listDistrict[1],ImageUrl= "Resources\\Images\\Cow Milk.jpg"},
                  new Product { Id=13,Name= "Croissant",Description= "Made in Finland",Price= 3, Category= listCategory[1],  District=listDistrict[2],ImageUrl= "Resources\\Images\\Croissant.jpg"},
                  new Product { Id=14,Name= "Cucumber 1",Description= "Made in Germany",Price= 2, Category= listCategory[0],  District=listDistrict[3],ImageUrl= "Resources\\Images\\Cucumber1.jpg"},
                  new Product { Id=15,Name= "Cucumber 2",Description= "Made in Laos",Price= 4, Category= listCategory[0], District=listDistrict[4],ImageUrl= "Resources\\Images\\Cucumber2.jpg"},
                  new Product { Id=16,Name= "French loaf",Description= "Made in Vietnam",Price= 5, Category= listCategory[1], District=listDistrict[5],ImageUrl= "Resources\\Images\\French loaf.jpg"},
                  new Product { Id=17,Name= "Ginger",Description= "Made in Poland",Price= 1, Category= listCategory[0], District=listDistrict[6],ImageUrl= "Resources\\Images\\Ginger.jpg"},
                  new Product { Id=18,Name= "Grapefruit",Description= "High quality, made in Sweden",Price= 4, Category= listCategory[0], District=listDistrict[7],ImageUrl= "Resources\\Images\\Grapefruit.jpg"},
                  new Product { Id=19,Name= "Grapes 1",Description= "Good.Made in Finland",Price= 3, Category= listCategory[0], District=listDistrict[8],ImageUrl= "Resources\\Images\\Grapes1.jpg"},
                  new Product { Id=20,Name= "Grapes 2",Description= "Good.Made in Norway",Price= 7, Category= listCategory[0], District=listDistrict[9],ImageUrl= "Resources\\Images\\Grapes2.jpg"},
                  new Product { Id=21,Name= "Soy Milk",Description= "Good.Made in Poland",Price= 5, Category= listCategory[2], District=listDistrict[0],ImageUrl= "Resources\\Images\\Soy Milk.jpg"},
                  new Product { Id=22,Name= "Tommaso",Description= "Good.Made in Norway",Price= 2, Category= listCategory[1], District=listDistrict[1],ImageUrl= "Resources\\Images\\Tommaso.jpg"}

            };
        }

        public static ProductAddUpdateDTO AddProduct()
        {
            return new ProductAddUpdateDTO { Id = 0, Name = "Kiwi", Description = "Good.Made in Poland", Price = 2.5, CategoryId = 1, ProvinceCityId = 1, DistrictId = 1, ImageUrl = "Resources\\Images\\Kiwi.jpg" };
        }

        public static ProductAddUpdateDTO UpdateProduct()
        {
            return new ProductAddUpdateDTO { Id = 23, Name = "Kiwi", Description = "Good.Made in Poland", Price = 2.5, CategoryId = 1, ProvinceCityId = 1, DistrictId = 1, ImageUrl = "Resources\\Images\\Kiwi.jpg" };
        }
    }
}
