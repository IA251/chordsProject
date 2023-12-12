using AutoMapper;
using Common.DTO_s;
using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Interfaces;
using Servies.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servies.Servies
{
    public class SingerServ:IServices<SingerDto>
    {
        private readonly IRepository<Singer> dataRepository;
        private readonly IMapper mapper;
        IContext context;
        public SingerServ(IRepository<Singer> dataRepository, IMapper mapper, IContext context)
        {
            this.dataRepository = dataRepository;
            this.mapper = mapper;
            this.context = context;
        }
        ////לוקחת פרמטר מזהה זמר ומחזירה רשימה של השירים של אותו זמר
        //public async Task<List<string>> GetSingerSongsAsync(int singerId)
        //{
        //    var singerSongs = await context.SongToSingers
        //        .Where(sts => sts.SingerId == singerId)
        //        .Join(context.Songs, sts => sts.SongId, s => s.Id, (sts, s) => s.Name)
        //        .ToListAsync();

        //    return singerSongs;
        //}

        public async Task<List<SingerDto>> GetAllAsync()
        {
            var singerDtos = mapper.Map<List<SingerDto>>(await dataRepository.GetAllAsync());

            // Load associated songs for each singer
            foreach (var singerDto in singerDtos)
            {
                var singer = await context.Singers
                    .Include(s => s.SongToSingers)
                    .ThenInclude(sts => sts.Song)
                    .FirstOrDefaultAsync(s => s.Id == singerDto.Id);

                singerDto.Songs = singer.SongToSingers.Select(sts => mapper.Map<SongDto>(sts.Song)).ToList();
            }

            return singerDtos;
        }

        public async Task<SingerDto> GetByIdAsync(int id, string transpose, string ordersWords)
        {
            var singerDto = mapper.Map<SingerDto>(await dataRepository.GetByIdAsync(id));
            var singer = await context.Singers
            .Include(s => s.SongToSingers)
            .ThenInclude(sts => sts.Song)
            .FirstOrDefaultAsync(s => s.Id == singerDto.Id);

            singerDto.Songs = singer.SongToSingers.Select(sts => mapper.Map<SongDto>(sts.Song)).ToList();
            return singerDto;
        }
        public Task<string> GetEasyByIdAsync(int id)
        {
            throw new NotImplementedException();
        }
        public async void AddAsync(SingerDto singerDto)
        {
            singerDto.Id = 0;
            var singer = mapper.Map<Singer>(singerDto);
            context.Singers.Add(singer);

            await context.SaveChangesAsync();
        }

        public void DeleteAsync(int SingerId)
        {
            var singer = context.Singers.FirstOrDefault(s => s.Id == SingerId);
            if (singer != null)
            {
                var songToSingers = context.SongToSingers.Where(sts => sts.SingerId == SingerId);
                context.SongToSingers.RemoveRange(songToSingers);

                context.Singers.Remove(singer);
                context.SaveChangesAsync();
            }
        }

        public void UpdateAsync(int id, SingerDto entity)
        {
            var singer = context.Singers.Find(id);

            if (singer != null)
            {
                singer.Name = entity.Name;
                context.SaveChangesAsync();
            }
        }
    }
}
