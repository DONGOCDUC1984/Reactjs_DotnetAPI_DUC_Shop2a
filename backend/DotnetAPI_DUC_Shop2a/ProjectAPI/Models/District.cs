namespace ProjectAPI.Models
{
    public class District
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public ProvinceCity ProvinceCity { get; set; }
    }
}
