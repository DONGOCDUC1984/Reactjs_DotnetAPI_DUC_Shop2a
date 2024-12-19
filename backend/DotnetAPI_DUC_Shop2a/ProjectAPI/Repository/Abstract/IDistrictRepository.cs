using ProjectAPI.Models.DTO;

namespace ProjectAPI.Repository.Abstract
{
    public interface IDistrictRepository
    {
        Task<bool> AddUpdate(DistrictAddUpdateDTO modelDTO);
        Task<bool> Delete(int id);
        Task<District> GetById(int id);
        Task<IEnumerable<District>> GetAll();
    }
}
