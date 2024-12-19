using Microsoft.AspNetCore.Hosting;

namespace ProjectTest.ControllerTest
{
    public class ProductControllerTest
    {
        [Fact]
        public async Task GetAllTest_ShouldReturnData()
        {
            // Arrange
            var productRepository = new Mock<IProductRepository>();
            var webHostEnvironment = new Mock<IWebHostEnvironment>();
            productRepository.Setup(x => x.GetAll("", 0, 0, 0, 0.0, 0.0))
                 .ReturnsAsync(ProductMockData.GetProducts());
            var sut = new ProductController(productRepository.Object, webHostEnvironment.Object);
            // Act
            var result = await sut.GetAll("", 0, 0, 0, 0.0, 0.0);

            // Assert
            result.GetType().Should().Be(typeof(OkObjectResult));
            (result as OkObjectResult).StatusCode.Should().Be(200);
            result.Should().NotBeNull();
            productRepository.Verify(x => x.GetAll("", 0, 0, 0, 0.0, 0.0), Times.Exactly(1));
        }

        [Theory]
        [InlineData(2)]
        [InlineData(3)]
        public async Task GetByIdTest_ShouldReturnData(int id)
        {
            // Arrange
            var productRepository = new Mock<IProductRepository>();
            var webHostEnvironment = new Mock<IWebHostEnvironment>();
            productRepository.Setup(x => x.GetById(id))
                 .ReturnsAsync(ProductMockData.GetProducts().FirstOrDefault(x => x.Id == id));
            var sut = new ProductController(productRepository.Object, webHostEnvironment.Object);
            // Act
            var result = await sut.GetById(id);
            // Assert
            result.GetType().Should().Be(typeof(OkObjectResult));
            (result as OkObjectResult).StatusCode.Should().Be(200);
            result.Should().NotBeNull();
            productRepository.Verify(x => x.GetById(id), Times.Exactly(1));
        }

        [Fact]
        public async Task AddTest_ShouldReturn200StatusAndCallRepositoryOnce()
        {
            // Arrange
            var productRepository = new Mock<IProductRepository>();
            var webHostEnvironment = new Mock<IWebHostEnvironment>();
            var newProductDTO = ProductMockData.AddProduct();
            productRepository.Setup(x => x.AddUpdate(newProductDTO))
                 .ReturnsAsync(true);
            var sut = new ProductController(productRepository.Object, webHostEnvironment.Object);
            // Act
            var result = await sut.AddUpdate(newProductDTO);

            // Assert
            result.GetType().Should().Be(typeof(OkObjectResult));
            (result as OkObjectResult).StatusCode.Should().Be(200);
            productRepository.Verify(x => x.AddUpdate(newProductDTO), Times.Exactly(1));
        }

        [Fact]
        public async Task UpdateTest_ShouldReturn200StatusAndCallRepositoryOnce()
        {
            // Arrange
            var productRepository = new Mock<IProductRepository>();
            var webHostEnvironment = new Mock<IWebHostEnvironment>();
            var newProductDTO = ProductMockData.UpdateProduct();
            productRepository.Setup(x => x.AddUpdate(newProductDTO))
                 .ReturnsAsync(true);
            var sut = new ProductController(productRepository.Object, webHostEnvironment.Object);
            // Act
            var result = await sut.AddUpdate(newProductDTO);

            // Assert
            result.GetType().Should().Be(typeof(OkObjectResult));
            (result as OkObjectResult).StatusCode.Should().Be(200);
            productRepository.Verify(x => x.AddUpdate(newProductDTO), Times.Exactly(1));
        }

        [Theory]
        [InlineData(2)]
        [InlineData(3)]
        public async Task DeleteTest_ShouldReturn200StatusAndCallRepositoryOnce(int id)
        {
            // Arrange
            var productRepository = new Mock<IProductRepository>();
            var webHostEnvironment = new Mock<IWebHostEnvironment>();
            productRepository.Setup(x => x.Delete(id))
                 .ReturnsAsync(true);
            var sut = new ProductController(productRepository.Object, webHostEnvironment.Object);
            // Act
            var result = await sut.Delete(id);

            // Assert
            result.GetType().Should().Be(typeof(OkObjectResult));
            (result as OkObjectResult).StatusCode.Should().Be(200);
            productRepository.Verify(x => x.Delete(id), Times.Exactly(1));
        }
    }
}
