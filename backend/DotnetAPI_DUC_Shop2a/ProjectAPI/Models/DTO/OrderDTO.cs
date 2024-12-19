namespace ProjectAPI.Models.DTO
{
    public class OrderDTO
    {
        [Required]
        public string UserTel { get; set; }
        [Required]
        public string UserAddress { get; set; }
        public double totalCost { get; set; }
    }
}
