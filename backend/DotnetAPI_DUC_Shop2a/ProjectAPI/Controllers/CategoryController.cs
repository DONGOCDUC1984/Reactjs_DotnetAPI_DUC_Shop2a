
namespace ProjectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepos;
        public CategoryController(ICategoryRepository catRepo)
        {
            _categoryRepos = catRepo;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var data = _categoryRepos.GetAll();
            return Ok(data);
        }

        [HttpGet("{id}")] // api/category/getbyid/1
        public IActionResult GetById(int id)
        {
            var data = _categoryRepos.GetById(id);
            return Ok(data);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult AddUpdate(Category model)
        {
            var result=_categoryRepos.AddUpdate(model);
            if (result)
            {
                var data = _categoryRepos.GetAll();
                return Ok(data);
            }
            else
            {
                return BadRequest();
            }
           
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = _categoryRepos.Delete(id);
            if (result)
            {
                var data = _categoryRepos.GetAll();
                return Ok(data);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
