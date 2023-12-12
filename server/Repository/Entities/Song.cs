using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Repository.Entities;

public partial class Song
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Lyrics { get; set; }
    public string? ImageURL { get; set; }

    public virtual ICollection<SongToSinger> SongToSingers { get; set; } = new List<SongToSinger>();

    [NotMapped]
    public List<Singer> Singers { get; set; }

}
