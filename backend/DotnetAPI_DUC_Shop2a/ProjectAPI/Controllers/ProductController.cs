using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;

namespace ProjectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepos;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public ProductController(IProductRepository productRepos,
            IWebHostEnvironment webHostEnvironment)
        {
            _productRepos = productRepos;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        // In the following line, there should be "string? searchStr" not "string searchStr".
        // Otherwise, there will be an error.
        public async Task<IActionResult> GetAll(string? searchStr = "",
            int categoryId = 0,
            int provinceCityId = 0, int districtId = 0,
            double minPrice = 0.0, double maxPrice = 0.0)
        {
            var data = await _productRepos.GetAll(searchStr, categoryId,
                provinceCityId, districtId, minPrice, maxPrice);
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var data = await _productRepos.GetById(id);
            return Ok(data);
        }
        [Authorize(Roles = UserRoles.Admin)]
        [HttpPost]
        // In the following line,
        // _there should be "[FromForm]".Otherwise, there will be an error.
        // _I should utilize DocumentFile, not ProductAddUpdateDTO.Otherwise,I will make mistakes easily (The data will not be sent from
        //    frontend to backend).
        public async Task<IActionResult> AddUpdate([FromForm] DocumentFile model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var modelDTO = JsonConvert.DeserializeObject<ProductAddUpdateDTO>(model.Document);
            modelDTO.ImageUrl = await SaveImage(model.ImageFile);
            // Update
            if (modelDTO.Id > 0)
            {
                var product = await _productRepos.GetOnlyProductById(modelDTO.Id);
                // delete the old image
                string RootPath = _webHostEnvironment.ContentRootPath;
                string oldImagePath =
                    Path.Combine(RootPath, product.ImageUrl.TrimStart('\\'));

                if (System.IO.File.Exists(oldImagePath))
                {
                    System.IO.File.Delete(oldImagePath);
                }
            }
            var result = await _productRepos.AddUpdate(modelDTO);
            if (result)
            {
                var data = await _productRepos.GetAll("", 0, 0, 0, 0.0, 0.0);
                return Ok(data);
            }
            else
            {
                return BadRequest();
            }

        }


        [HttpDelete("{id}")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _productRepos.GetById(id);
            // The old image should be deleted before the product.Otherwise,product will be null,
            // product.ImageUrl will be null and the old image will not be deleted .

            // delete the old image
            string RootPath = _webHostEnvironment.ContentRootPath;
            string oldImagePath =
                Path.Combine(RootPath, product.ImageUrl.TrimStart('\\'));

            if (System.IO.File.Exists(oldImagePath))
            {
                System.IO.File.Delete(oldImagePath);
            }
            // Delete Product
            var result = await _productRepos.Delete(id);
            if (result)
            {
                var data = await _productRepos.GetAll("", 0, 0, 0, 0.0, 0.0);
                return Ok(data);
            }
            else
            {
                return BadRequest();
            }
        }
        
        private async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Resources", "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            var folderName = Path.Combine("Resources", "Images");
            var dbPath = Path.Combine(folderName, imageName);
            return dbPath;
        }
    }
}
