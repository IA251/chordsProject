using AutoMapper;
using Common.DTO_s;
using GSF.Collections;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servies
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<SongDto, Song>().ReverseMap();
            CreateMap<Singer, SingerDto>().ReverseMap();
        }
    }
}
