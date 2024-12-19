
namespace ProjectTest.RepositoryTest
{
    public class CategoryRepositoryTest
    {
        private readonly AppDbContext _ctx;

        public CategoryRepositoryTest()
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
            _ctx.Categories.AddRange(CategoryMockData.GetCategories());
            await _ctx.SaveChangesAsync();
            var newCategory = CategoryMockData.AddCategory();
            var sut = new CategoryRepository(_ctx);
            // Act
            sut.AddUpdate(newCategory);

            // Assert
            int expectedCount = CategoryMockData.GetCategories().Count + 1;
            _ctx.Categories.Count().Should().Be(expectedCount);

        }

        [Fact]
        public async Task UpdateTest()
        {
            // Arrange
            _ctx.Database.EnsureDeleted();
            _ctx.Categories.AddRange(CategoryMockData.GetCategories());
            await _ctx.SaveChangesAsync();
            var newCategory = CategoryMockData.UpdateCategory();
            var sut = new CategoryRepository(_ctx);
            // Act
            sut.AddUpdate(newCategory);

            // Assert
            int expectedCount = CategoryMockData.GetCategories().Count;
            _ctx.Categories.Count().Should().Be(expectedCount);
        }

        [Theory]
        [InlineData(2)]
        [InlineData(3)]

        public async Task DeleteTest_ShouldReturnOK(int id)
        {
            // Arrange
            _ctx.Database.EnsureDeleted();
            _ctx.Categories.AddRange(CategoryMockData.GetCategories());
            await _ctx.SaveChangesAsync();
            var sut = new CategoryRepository(_ctx);
            // Act
            sut.Delete(id);

            // Assert
            int expectedCount = CategoryMockData.GetCategories().Count - 1;
            //_ctx.Categories.Count().Should().Be(expectedCount);
            // The above line is equivalent to the following line
            Assert.Equal(_ctx.Categories.Count(), expectedCount);
        }

        [Theory]
        [InlineData(12)]
        [InlineData(14)]

        public async Task DeleteTest_ShouldReturnFalse(int id)
        {
            // Arrange
            _ctx.Database.EnsureDeleted();
            _ctx.Categories.AddRange(CategoryMockData.GetCategories());
            await _ctx.SaveChangesAsync();
            var sut = new CategoryRepository(_ctx);
            // Act
            var result = sut.Delete(id);

            // Assert
            Assert.Equal(result, false);
        }

        [Fact]
        public async Task GetAllTest_ReturnCategoryCollection()
        {
            // Arrange
            _ctx.Database.EnsureDeleted();
            _ctx.Categories.AddRange(CategoryMockData.GetCategories());
            await _ctx.SaveChangesAsync();
            var sut = new CategoryRepository(_ctx);
            // Act
            var result = sut.GetAll();
            // Assert
            // result.Should().HaveCount((CategoryMockData.GetCategories().Count));
            // The above line is equivalent to the following line
            Assert.Equal(result.Count(), CategoryMockData.GetCategories().Count);
        }

        [Theory]
        [InlineData(2)]
        [InlineData(3)]
        public async Task GetByIdTest(int id)
        {
            // Arrange
            _ctx.Database.EnsureDeleted();
            _ctx.Categories.AddRange(CategoryMockData.GetCategories());
            await _ctx.SaveChangesAsync();
            var sut = new CategoryRepository(_ctx);
            // Act
            var result = sut.GetById(id);
            var resultMock = CategoryMockData.GetCategories().FirstOrDefault(x => x.Id == id);
            // Assert
            // If I write here  Assert.Equal(result, resultMock); ,there will be an error.
            Assert.Equal(result.Id, resultMock.Id);
            Assert.Equal(result.Name, resultMock.Name);
        }
    }
}
