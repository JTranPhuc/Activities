using AutoMapper;
using Domain;

namespace Application.ClientModels
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity,Activity>();
        }
    }
}