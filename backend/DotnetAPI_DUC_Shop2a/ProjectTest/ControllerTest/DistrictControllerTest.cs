
namespace ProjectTest.ControllerTest
{
    public class DistrictControllerTest
    {
        [Fact]
        public async Task GetAllTest_ShouldReturnData()
        {
            // Arrange
            var districtRepository = new Mock<IDistrictRepository>();
            districtRepository.Setup(x => x.GetAll())
                 .ReturnsAsync(DistrictMockData.GetDistricts());
            var sut = new DistrictController(districtRepository.Object);
            // Act
            var result = await sut.GetAll();

            // Assert
            result.GetType().Should().Be(typeof(OkObjectResult));
            (result as OkObjectResult).StatusCode.Should().Be(200);
            result.Should().NotBeNull();
            districtRepository.Verify(x => x.GetAll(), Times.Exactly(1));
        }

        [Theory]
        [InlineData(2)]
        [InlineData(3)]
        public async Task GetByIdTest_ShouldReturnData(int id)
        {
            // Arrange
            var districtRepository = new Mock<IDistrictRepository>();
            districtRepository.Setup(x => x.GetById(id))
                 .ReturnsAsync(DistrictMockData.GetDistricts().FirstOrDefault(x => x.Id == id));
            var sut = new DistrictController(districtRepository.Object);
            // Act
            var result = await sut.GetById(id);
            // Assert
            result.GetType().Should().Be(typeof(OkObjectResult));
            (result as OkObjectResult).StatusCode.Should().Be(200);
            result.Should().NotBeNull();
            districtRepository.Verify(x => x.GetById(id), Times.Exactly(1));
        }

        [Fact]
        public async Task AddTest_ShouldReturn200StatusAndCallRepositoryOnce()
        {
            // Arrange
            var districtRepository = new Mock<IDistrictRepository>();
            var newDistrictDTO = DistrictMockData.AddDistrict();
            districtRepository.Setup(x => x.AddUpdate(newDistrictDTO))
                 .ReturnsAsync(true);
            var sut = new DistrictController(districtRepository.Object);
            // Act
            var result = await sut.AddUpdate(newDistrictDTO);

            // Assert
            result.GetType().Should().Be(typeof(OkObjectResult));
            (result as OkObjectResult).StatusCode.Should().Be(200);
            districtRepository.Verify(x => x.AddUpdate(newDistrictDTO), Times.Exactly(1));
        }

        [Fact]
        public async Task UpdateTest_ShouldReturn200StatusAndCallRepositoryOnce()
        {
            // Arrange
            var districtRepository = new Mock<IDistrictRepository>();
            var newDistrictDTO = DistrictMockData.UpdateDistrict();
            districtRepository.Setup(x => x.AddUpdate(newDistrictDTO))
                 .ReturnsAsync(true);
            var sut = new DistrictController(districtRepository.Object);
            // Act
            var result = await sut.AddUpdate(newDistrictDTO);

            // Assert
            result.GetType().Should().Be(typeof(OkObjectResult));
            (result as OkObjectResult).StatusCode.Should().Be(200);
            districtRepository.Verify(x => x.AddUpdate(newDistrictDTO), Times.Exactly(1));
        }

        [Theory]
        [InlineData(2)]
        [InlineData(3)]
        public async Task DeleteTest_ShouldReturn200StatusAndCallRepositoryOnce(int id)
        {
            // Arrange
            var districtRepository = new Mock<IDistrictRepository>();
            districtRepository.Setup(x => x.Delete(id))
                 .ReturnsAsync(true);
            var sut = new DistrictController(districtRepository.Object);
            // Act
            var result = await sut.Delete(id);

            // Assert
            result.GetType().Should().Be(typeof(OkObjectResult));
            (result as OkObjectResult).StatusCode.Should().Be(200);
            districtRepository.Verify(x => x.Delete(id), Times.Exactly(1));
        }
    }
}
