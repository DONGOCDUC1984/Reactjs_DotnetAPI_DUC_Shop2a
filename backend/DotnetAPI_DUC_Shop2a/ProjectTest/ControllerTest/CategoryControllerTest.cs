
namespace ProjectTest.ControllerTest
{
    public class CategoryControllerTest
    {
        [Fact]
        public void GetAllTest_ShouldReturnData()
        {
            // Arrange
            var categoryRepository = new Mock<ICategoryRepository>();
            categoryRepository.Setup(x => x.GetAll())
                 .Returns(CategoryMockData.GetCategories());
            var sut = new CategoryController(categoryRepository.Object);
            // Act
            var result = sut.GetAll();

            // Assert
            result.GetType().Should().Be(typeof(OkObjectResult));
            (result as OkObjectResult).StatusCode.Should().Be(200);
            result.Should().NotBeNull();
            categoryRepository.Verify(x => x.GetAll(), Times.Exactly(1));
        }

        [Theory]
        [InlineData(2)]
        [InlineData(3)]
        public void GetByIdTest_ShouldReturnData(int id)
        {
            // Arrange
            var categoryRepository = new Mock<ICategoryRepository>();
            categoryRepository.Setup(x => x.GetById(id))
                 .Returns(CategoryMockData.GetCategories().FirstOrDefault(x => x.Id == id));
            var sut = new CategoryController(categoryRepository.Object);
            // Act
            var result = sut.GetById(id);
            // Assert
            result.GetType().Should().Be(typeof(OkObjectResult));
            (result as OkObjectResult).StatusCode.Should().Be(200);
            result.Should().NotBeNull();
            categoryRepository.Verify(x => x.GetById(id), Times.Exactly(1));
        }

        [Fact]
        public void AddTest_ShouldReturn200StatusAndCallRepositoryOnce()
        {
            // Arrange
            var categoryRepository = new Mock<ICategoryRepository>();
            var newCategory = CategoryMockData.AddCategory();
            categoryRepository.Setup(x => x.AddUpdate(newCategory))
                 .Returns(true);
            var sut = new CategoryController(categoryRepository.Object);
            // Act
            var result = sut.AddUpdate(newCategory);

            // Assert
            result.GetType().Should().Be(typeof(OkObjectResult));
            (result as OkObjectResult).StatusCode.Should().Be(200);
            categoryRepository.Verify(x => x.AddUpdate(newCategory), Times.Exactly(1));
        }

        [Fact]
        public void UpdateTest_ShouldReturn200StatusAndCallRepositoryOnce()
        {
            // Arrange
            var categoryRepository = new Mock<ICategoryRepository>();
            var newCategory = CategoryMockData.UpdateCategory();
            categoryRepository.Setup(x => x.AddUpdate(newCategory))
                 .Returns(true);
            var sut = new CategoryController(categoryRepository.Object);
            // Act
            var result = sut.AddUpdate(newCategory);

            // Assert
            result.GetType().Should().Be(typeof(OkObjectResult));
            (result as OkObjectResult).StatusCode.Should().Be(200);
            categoryRepository.Verify(x => x.AddUpdate(newCategory), Times.Exactly(1));
        }

        [Theory]
        [InlineData(2)]
        [InlineData(3)]
        public void DeleteTest_ShouldReturn200StatusAndCallRepositoryOnce(int id)
        {
            // Arrange
            var categoryRepository = new Mock<ICategoryRepository>();
            categoryRepository.Setup(x => x.Delete(id))
                 .Returns(true);
            var sut = new CategoryController(categoryRepository.Object);
            // Act
            var result = sut.Delete(id);

            // Assert
            result.GetType().Should().Be(typeof(OkObjectResult));
            (result as OkObjectResult).StatusCode.Should().Be(200);
            categoryRepository.Verify(x => x.Delete(id), Times.Exactly(1));
        }

    }
}
