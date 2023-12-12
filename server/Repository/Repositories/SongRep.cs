using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class SongRep : IRepository<Song>
    {
        private readonly IContext _context;
        public SongRep(IContext context)
        {
            _context = context;
        }
        public async Task<List<Song>> GetAllAsync()
        {
            return await _context.Songs.ToListAsync();
        }

        public async Task<Song> GetByIdAsync(int id)
        {
            return await _context.Songs.FindAsync(id);
        }
    }
}
