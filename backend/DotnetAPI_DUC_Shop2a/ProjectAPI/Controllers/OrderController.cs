
namespace ProjectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepos;
        public OrderController(IOrderRepository orderRepos)
        {
            _orderRepos = orderRepos;
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Add(OrderDTO modelDTO)
        {
            string UserId = User.Claims.First(x => x.Type == "Id").Value;
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var result = await _orderRepos.Add(UserId, modelDTO.UserTel, modelDTO.UserAddress, modelDTO.totalCost);
            if (result)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
        // [Authorize(Roles = "Admin")]
        // The following line is equivalent to the above line
        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var result = await _orderRepos.Delete(id);
            if (result)
            {
                var data = await GetAll();
                return Ok(data);
            }
            else
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("GetAllOrders")]
        public async Task<IActionResult> GetAll()
        {
            var data = await _orderRepos.GetAllOrders();
            return Ok(data);
        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetOrdersByUserId()
        {
            string UserId = User.Claims.First(x => x.Type == "Id").Value;
            var data = await _orderRepos.GetOrdersByUserId(UserId);
            return Ok(data);
        }
    }
}
