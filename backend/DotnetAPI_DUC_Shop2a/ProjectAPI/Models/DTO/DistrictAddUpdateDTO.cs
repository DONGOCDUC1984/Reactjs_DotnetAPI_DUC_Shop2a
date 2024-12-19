namespace ProjectAPI.Models.DTO
{
    public class DistrictAddUpdateDTO
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int ProvinceCityId { get; set; }
    }
}
