
namespace ProjectTest.RepositoryTest
{
    public class ProvinceCityRepositoryTest
    {
        private readonly AppDbContext _ctx;

        public ProvinceCityRepositoryTest()
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
            _ctx.ProvinceCities.AddRange(ProvinceCityMockData.GetProvinceCities());
            await _ctx.SaveChangesAsync();
            var newProvinceCity = ProvinceCityMockData.AddProvinceCity();
            var sut = new ProvinceCityRepository(_ctx);
            // Act
            await sut.AddUpdate(newProvinceCity);

            // Assert
            int expectedCount = ProvinceCityMockData.GetProvinceCities().Count + 1;
            _ctx.ProvinceCities.Count().Should().Be(expectedCount);

        }

        [Fact]
        public async Task UpdateTest()
        {
            // Arrange
            _ctx.Database.EnsureDeleted();
            _ctx.ProvinceCities.AddRange(ProvinceCityMockData.GetProvinceCities());
            await _ctx.SaveChangesAsync();
            var newProvinceCity = ProvinceCityMockData.UpdateProvinceCity();
            var sut = new ProvinceCityRepository(_ctx);
            // Act
            await sut.AddUpdate(newProvinceCity);

            // Assert
            int expectedCount = ProvinceCityMockData.GetProvinceCities().Count;
            _ctx.ProvinceCities.Count().Should().Be(expectedCount);
        }

        [Theory]
        [InlineData(2)]
        [InlineData(3)]

        public async Task DeleteTest_ShouldReturnOK(int id)
        {
            // Arrange
            _ctx.Database.EnsureDeleted();
            _ctx.ProvinceCities.AddRange(ProvinceCityMockData.GetProvinceCities());
            await _ctx.SaveChangesAsync();
            var sut = new ProvinceCityRepository(_ctx);
            // Act
            await sut.Delete(id);

            // Assert
            int expectedCount = ProvinceCityMockData.GetProvinceCities().Count - 1;
            //_ctx.ProvinceCities.Count().Should().Be(expectedCount);
            // The above line is equivalent to the following line
            Assert.Equal(_ctx.ProvinceCities.Count(), expectedCount);
        }

        [Theory]
        [InlineData(12)]
        [InlineData(14)]

        public async Task DeleteTest_ShouldReturnFalse(int id)
        {
            // Arrange
            _ctx.Database.EnsureDeleted();
            _ctx.ProvinceCities.AddRange(ProvinceCityMockData.GetProvinceCities());
            await _ctx.SaveChangesAsync();
            var sut = new ProvinceCityRepository(_ctx);
            // Act
            var result = await sut.Delete(id);

            // Assert
            Assert.Equal(result, false);
        }

        [Fact]
        public async Task GetAllTest_ReturnProvinceCityCollection()
        {
            // Arrange
            _ctx.Database.EnsureDeleted();
            _ctx.ProvinceCities.AddRange(ProvinceCityMockData.GetProvinceCities());
            await _ctx.SaveChangesAsync();
            var sut = new ProvinceCityRepository(_ctx);
            // Act
            var result = await sut.GetAll();
            // Assert
            // result.Should().HaveCount((ProvinceCityMockData.GetProvinceCities().Count));
            // The above line is equivalent to the following line
            Assert.Equal(result.Count(), ProvinceCityMockData.GetProvinceCities().Count);
        }

        [Theory]
        [InlineData(2)]
        [InlineData(3)]
        public async Task GetByIdTest(int id)
        {
            // Arrange
            _ctx.Database.EnsureDeleted();
            _ctx.ProvinceCities.AddRange(ProvinceCityMockData.GetProvinceCities());
            await _ctx.SaveChangesAsync();
            var sut = new ProvinceCityRepository(_ctx);
            // Act
            var result = await sut.GetById(id);
            var resultMock = ProvinceCityMockData.GetProvinceCities().FirstOrDefault(x => x.Id == id);
            // Assert
            // If I write here  Assert.Equal(result, resultMock); ,there will be an error.
            Assert.Equal(result.Id, resultMock.Id);
            Assert.Equal(result.Name, resultMock.Name);
        }
    }
}
