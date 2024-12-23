﻿namespace ProjectAPI.Models.DTO
{
    public class ProductAddUpdateDTO
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public double Price { get; set; }
        public int CategoryId { get; set; }
        public int DistrictId { get; set; }
        public string ImageUrl { get; set; } 
       
    }
}
