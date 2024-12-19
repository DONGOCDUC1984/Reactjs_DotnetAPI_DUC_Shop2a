
using Microsoft.AspNetCore.Identity;

namespace ProjectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly ICartRepository _cartRepos;
        
        public CartController(ICartRepository cartRepos)
        {
            _cartRepos = cartRepos;
           
        }

        [HttpGet]
        public async Task<IActionResult> GetCartByUserId()
        {
            string UserId = GetUserId();
            var cart = await _cartRepos.GetCartByUserId(UserId);
            return Ok(cart);
        }

        [HttpGet("AddCartItem/{ProductId}")]
        public async Task<IActionResult> AddCartItem(int ProductId)
        {
            string UserId = GetUserId();
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var result = await _cartRepos.AddCartItem(UserId, ProductId);
            if (result)
            {
                var cart = await GetCartByUserId();
                return Ok(cart);
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpGet("DecreaseCartItem/{ProductId}")]
        public async Task<IActionResult> DecreaseCartItem(int ProductId)
        {
            string UserId = GetUserId();
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var result = await _cartRepos.DecreaseCartItem(UserId, ProductId);
            if (result)
            {
                var cart = await GetCartByUserId();
                return Ok(cart);
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpDelete("RemoveCartItem/{ProductId}")]
        public async Task<IActionResult> RemoveCartItem( int ProductId)
        {
            string UserId = GetUserId();
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var result = await _cartRepos.RemoveCartItem(UserId, ProductId);
            if (result)
            {
                var cart = await GetCartByUserId();
                return Ok(cart);
            }
            else
            {
                return BadRequest();
            }

        }

        private string GetUserId()
        {
            string UserId = User.Claims.First(x => x.Type == "Id").Value;
            return UserId;
        }
    }
}
