
namespace ProjectTest.ControllerTest
{
    public class ProvinceCityControllerTest
    {
        [Fact]
        public async Task GetAllTest_ShouldReturnData()
        {
            // Arrange
            var provinceCityRepository = new Mock<IProvinceCityRepository>();
            provinceCityRepository.Setup(x => x.GetAll())
                 .ReturnsAsync(ProvinceCityMockData.GetProvinceCities());
            var sut = new ProvinceCityController(provinceCityRepository.Object);
            // Act
            var result = await sut.GetAll();

            // Assert
            result.GetType().Should().Be(typeof(OkObjectResult));
            (result as OkObjectResult).StatusCode.Should().Be(200);
            result.Should().NotBeNull();
            provinceCityRepository.Verify(x => x.GetAll(), Times.Exactly(1));
        }

        [Theory]
        [InlineData(2)]
        [InlineData(3)]
        public async Task GetByIdTest_ShouldReturnData(int id)
        {
            // Arrange
            var provinceCityRepository = new Mock<IProvinceCityRepository>();
            provinceCityRepository.Setup(x => x.GetById(id))
                 .ReturnsAsync(ProvinceCityMockData.GetProvinceCities().FirstOrDefault(x => x.Id == id));
            var sut = new ProvinceCityController(provinceCityRepository.Object);
            // Act
            var result = await sut.GetById(id);
            // Assert
            result.GetType().Should().Be(typeof(OkObjectResult));
            (result as OkObjectResult).StatusCode.Should().Be(200);
            result.Should().NotBeNull();
            provinceCityRepository.Verify(x => x.GetById(id), Times.Exactly(1));
        }

        [Fact]
        public async Task AddTest_ShouldReturn200StatusAndCallRepositoryOnce()
        {
            // Arrange
            var provinceCityRepository = new Mock<IProvinceCityRepository>();
            var newProvinceCity = ProvinceCityMockData.AddProvinceCity();
            provinceCityRepository.Setup(x => x.AddUpdate(newProvinceCity))
                 .ReturnsAsync(true);
            var sut = new ProvinceCityController(provinceCityRepository.Object);
            // Act
            var result = await sut.AddUpdate(newProvinceCity);

            // Assert
            result.GetType().Should().Be(typeof(OkObjectResult));
            (result as OkObjectResult).StatusCode.Should().Be(200);
            provinceCityRepository.Verify(x => x.AddUpdate(newProvinceCity), Times.Exactly(1));
        }

        [Fact]
        public async Task UpdateTest_ShouldReturn200StatusAndCallRepositoryOnce()
        {
            // Arrange
            var provinceCityRepository = new Mock<IProvinceCityRepository>();
            var newProvinceCity = ProvinceCityMockData.UpdateProvinceCity();
            provinceCityRepository.Setup(x => x.AddUpdate(newProvinceCity))
                 .ReturnsAsync(true);
            var sut = new ProvinceCityController(provinceCityRepository.Object);
            // Act
            var result = await sut.AddUpdate(newProvinceCity);

            // Assert
            result.GetType().Should().Be(typeof(OkObjectResult));
            (result as OkObjectResult).StatusCode.Should().Be(200);
            provinceCityRepository.Verify(x => x.AddUpdate(newProvinceCity), Times.Exactly(1));
        }

        [Theory]
        [InlineData(2)]
        [InlineData(3)]
        public async Task DeleteTest_ShouldReturn200StatusAndCallRepositoryOnce(int id)
        {
            // Arrange
            var provinceCityRepository = new Mock<IProvinceCityRepository>();
            provinceCityRepository.Setup(x => x.Delete(id))
                 .ReturnsAsync(true);
            var sut = new ProvinceCityController(provinceCityRepository.Object);
            // Act
            var result = await sut.Delete(id);

            // Assert
            result.GetType().Should().Be(typeof(OkObjectResult));
            (result as OkObjectResult).StatusCode.Should().Be(200);
            provinceCityRepository.Verify(x => x.Delete(id), Times.Exactly(1));
        }
    }
}
