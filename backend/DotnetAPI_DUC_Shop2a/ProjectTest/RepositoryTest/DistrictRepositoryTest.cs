
namespace ProjectTest.RepositoryTest
{
    public class DistrictRepositoryTest
    {
        private readonly AppDbContext _ctx;

        public DistrictRepositoryTest()
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
            _ctx.Districts.AddRange(DistrictMockData.GetDistricts());
            await _ctx.SaveChangesAsync();
            var newDistrictDTO = DistrictMockData.AddDistrict();
            var sut = new DistrictRepository(_ctx);
            // Act
            await sut.AddUpdate(newDistrictDTO);

            // Assert
            int expectedCount = DistrictMockData.GetDistricts().Count + 1;
            _ctx.Districts.Count().Should().Be(expectedCount);

        }

        [Fact]
        public async Task UpdateTest()
        {
            // Arrange
            _ctx.Database.EnsureDeleted();
            _ctx.Districts.AddRange(DistrictMockData.GetDistricts());
            await _ctx.SaveChangesAsync();
            var newDistrictDTO = DistrictMockData.UpdateDistrict();
            var sut = new DistrictRepository(_ctx);
            // Act
            await sut.AddUpdate(newDistrictDTO);

            // Assert
            int expectedCount = DistrictMockData.GetDistricts().Count;
            _ctx.Districts.Count().Should().Be(expectedCount);
        }

        [Theory]
        [InlineData(2)]
        [InlineData(3)]

        public async Task DeleteTest_ShouldReturnOK(int id)
        {
            // Arrange
            _ctx.Database.EnsureDeleted();
            _ctx.Districts.AddRange(DistrictMockData.GetDistricts());
            await _ctx.SaveChangesAsync();
            var sut = new DistrictRepository(_ctx);
            // Act
            await sut.Delete(id);

            // Assert
            int expectedCount = DistrictMockData.GetDistricts().Count - 1;
            //_ctx.Districts.Count().Should().Be(expectedCount);
            // The above line is equivalent to the following line
            Assert.Equal(_ctx.Districts.Count(), expectedCount);
        }

        [Theory]
        [InlineData(12)]
        [InlineData(14)]

        public async Task DeleteTest_ShouldReturnFalse(int id)
        {
            // Arrange
            _ctx.Database.EnsureDeleted();
            _ctx.Districts.AddRange(DistrictMockData.GetDistricts());
            await _ctx.SaveChangesAsync();
            var sut = new DistrictRepository(_ctx);
            // Act
            var result = await sut.Delete(id);

            // Assert
            Assert.Equal(result, false);
        }

        [Fact]
        public async Task GetAllTest_ReturnDistrictCollection()
        {
            // Arrange
            _ctx.Database.EnsureDeleted();
            _ctx.Districts.AddRange(DistrictMockData.GetDistricts());
            await _ctx.SaveChangesAsync();
            var sut = new DistrictRepository(_ctx);
            // Act
            var result = await sut.GetAll();
            // Assert
            // result.Should().HaveCount((DistrictMockData.GetDistricts().Count));
            // The above line is equivalent to the following line
            Assert.Equal(result.Count(), DistrictMockData.GetDistricts().Count);
        }

        [Theory]
        [InlineData(2)]
        [InlineData(3)]
        public async Task GetByIdTest(int id)
        {
            // Arrange
            _ctx.Database.EnsureDeleted();
            _ctx.Districts.AddRange(DistrictMockData.GetDistricts());
            await _ctx.SaveChangesAsync();
            var sut = new DistrictRepository(_ctx);
            // Act
            var result = await sut.GetById(id);
            var resultMock = DistrictMockData.GetDistricts().FirstOrDefault(x => x.Id == id);
            // Assert
            // If I write here  Assert.Equal(result, resultMock); ,there will be an error.
            Assert.Equal(result.Id, resultMock.Id);
            Assert.Equal(result.Name, resultMock.Name);
        }
    }
}
