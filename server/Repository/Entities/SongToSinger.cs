using System;
using System.Collections.Generic;

namespace Repository.Entities;

public partial class SongToSinger
{
    public int Id { get; set; }

    public int? SongId { get; set; }

    public int? SingerId { get; set; }

    public virtual Singer? Singer { get; set; }

    public virtual Song? Song { get; set; }
}
