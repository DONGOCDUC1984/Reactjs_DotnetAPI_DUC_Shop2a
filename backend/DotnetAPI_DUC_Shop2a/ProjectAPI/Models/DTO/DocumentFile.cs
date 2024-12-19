namespace ProjectAPI.Models.DTO
{
    public class DocumentFile
    {
        //I should utilize DocumentFile, not ProductAddUpdateDTO.Otherwise,I will make mistakes easily (The data will not be sent from
        // frontend to backend).
        public string Document { get; set; }
        public IFormFile ImageFile { get; set; }
    }
}
