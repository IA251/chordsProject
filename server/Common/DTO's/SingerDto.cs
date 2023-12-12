using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO_s
{
    public class SingerDto
    {
        public int Id { get; set; }

        public string? Name { get; set; }
        public string? ImageURL { get; set; }

        public List<SongDto> Songs { get; set; } = new List<SongDto>();

    }
}
