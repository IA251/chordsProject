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
    public class SingerRep : IRepository<Singer>
    {
        private readonly IContext _context;
        public SingerRep(IContext context)
        {
            _context = context;
        }

        public async Task<List<Singer>> GetAllAsync()
        {
            return await _context.Singers.ToListAsync();
        }

        public async Task<Singer> GetByIdAsync(int id)
        {
            return await _context.Singers.FindAsync(id);

        }
    }
}
