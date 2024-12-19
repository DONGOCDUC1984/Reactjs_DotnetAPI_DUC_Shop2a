using ProjectAPI.InMemoryCache;

namespace ProjectTest.RepositoryTest
{
    public class ProductRepositoryTest
    {
        private readonly AppDbContext _ctx;
        private readonly IInMemoryCacheService _inMemoryCacheService;

        public ProductRepositoryTest()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "DotnetAPI_DUC_Shop2a")
                .Options
                ;
            _ctx = new AppDbContext(options);
            _ctx.Database.EnsureCreated();

        }

        [Fact]
        public async Task AddTest()
        {
            // Arrange
            _ctx.Database.EnsureDeleted();
            _ctx.Products.AddRange(ProductMockData.GetProducts());
            await _ctx.SaveChangesAsync();
            var newProductDTO = ProductMockData.AddProduct();
            var sut = new ProductRepository(_ctx, _inMemoryCacheService);
            // Act
            await sut.AddUpdate(newProductDTO);

            // Assert
            int expectedCount = ProductMockData.GetProducts().Count + 1;
            _ctx.Products.Count().Should().Be(expectedCount);

        }

        [Fact]
        public async Task UpdateTest()
        {
            // Arrange
            _ctx.Database.EnsureDeleted();
            _ctx.Products.AddRange(ProductMockData.GetProducts());
            await _ctx.SaveChangesAsync();
            var newProductDTO = ProductMockData.UpdateProduct();
            var sut = new ProductRepository(_ctx, _inMemoryCacheService);
            // Act
            await sut.AddUpdate(newProductDTO);

            // Assert
            int expectedCount = ProductMockData.GetProducts().Count;
            _ctx.Products.Count().Should().Be(expectedCount);
        }

        [Theory]
        [InlineData(2)]
        [InlineData(3)]

        public async Task DeleteTest_ShouldReturnOK(int id)
        {
            // Arrange
            _ctx.Database.EnsureDeleted();
            _ctx.Products.AddRange(ProductMockData.GetProducts());
            await _ctx.SaveChangesAsync();
            var sut = new ProductRepository(_ctx, _inMemoryCacheService);
            // Act
            await sut.Delete(id);

            // Assert
            int expectedCount = ProductMockData.GetProducts().Count - 1;
            //_ctx.Products.Count().Should().Be(expectedCount);
            // The above line is equivalent to the following line
            Assert.Equal(_ctx.Products.Count(), expectedCount);
        }

        [Theory]
        [InlineData(12)]
        [InlineData(14)]

        public async Task DeleteTest_ShouldReturnFalse(int id)
        {
            // Arrange
            _ctx.Database.EnsureDeleted();
            _ctx.Products.AddRange(ProductMockData.GetProducts());
            await _ctx.SaveChangesAsync();
            var sut = new ProductRepository(_ctx, _inMemoryCacheService);
            // Act
            var result = await sut.Delete(id);

            // Assert
            Assert.Equal(result, false);
        }

        [Fact]
        public async Task GetAllTest_ReturnProductCollection()
        {
            // Arrange
            _ctx.Database.EnsureDeleted();
            _ctx.Products.AddRange(ProductMockData.GetProducts());
            await _ctx.SaveChangesAsync();
            var sut = new ProductRepository(_ctx, _inMemoryCacheService);
            // Act
            var result = await sut.GetAll();
            // Assert
            // result.Should().HaveCount((ProductMockData.GetProducts().Count));
            // The above line is equivalent to the following line
            Assert.Equal(result.Count(), ProductMockData.GetProducts().Count);
        }

        [Theory]
        [InlineData(2)]
        [InlineData(3)]
        public async Task GetByIdTest(int id)
        {
            // Arrange
            _ctx.Database.EnsureDeleted();
            _ctx.Products.AddRange(ProductMockData.GetProducts());
            await _ctx.SaveChangesAsync();
            var sut = new ProductRepository(_ctx, _inMemoryCacheService);
            // Act
            var result = await sut.GetById(id);
            var resultMock = ProductMockData.GetProducts().FirstOrDefault(x => x.Id == id);
            // Assert
            // If I write here  Assert.Equal(result, resultMock); ,there will be an error.
            Assert.Equal(result.Id, resultMock.Id);
            Assert.Equal(result.Name, resultMock.Name);
        }
    }
}
