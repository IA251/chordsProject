using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO_s
{
    public class SongDto
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Lyrics { get; set; }

        public string? ImageURL { get; set; }

        public List<SingerDto> Singers { get; set; } = new List<SingerDto>();
    }
}
