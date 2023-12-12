using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IContext
    {
        DbSet<Song> Songs { get; set; }
        DbSet<Singer> Singers { get; set; }
        DbSet<SongToSinger> SongToSingers { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken));

    }
}
