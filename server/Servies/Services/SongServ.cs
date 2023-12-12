using AutoMapper;
using Common.DTO_s;
using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Interfaces;
using Services;
using Servies.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Servies.Servies
{
    public class SongServ:Scale,IServices<SongDto>
    {
        public IRepository<Song> dataRepository;
        public IMapper mapper;
        IContext context;
        public SongServ(IRepository<Song> dataRepository, IMapper mapper, IContext context)
        {
            this.dataRepository = dataRepository;
            this.mapper = mapper;
            this.context = context;
        }
        ////לוקחת פרמטר מזהה שיר ומחזירה רשימה של הזמרים של השיר הזה
        //public async Task<List<string>> GetSongSingersAsync(int songId)
        //{
        //    var songSingers = await context.SongToSingers
        //        .Where(sts => sts.SongId == songId)
        //        .Join(context.Singers, sts => sts.SingerId, s => s.Id, (sts, s) => s.Name)
        //        .ToListAsync();

        //    return songSingers;
        //}


        public async Task<List<SongDto>> GetAllAsync()
        {
            var songDtos = mapper.Map<List<SongDto>>(await dataRepository.GetAllAsync());

            // Load associated singers for each song
            foreach (var songDto in songDtos)
            {
                songDto.Lyrics = TranSong(songDto.Lyrics, "+0") + "<br/>";
                var song = await context.Songs
                    .Include(s => s.SongToSingers)
                    .ThenInclude(sts => sts.Singer)
                    .FirstOrDefaultAsync(s => s.Id == songDto.Id);

                songDto.Singers = song.SongToSingers.Select(sts => mapper.Map<SingerDto>(sts.Singer)).ToList();

            }

            return songDtos;
        }

        public async Task<SongDto> GetByIdAsync(int id, string transpose, string ordersWords)
        {
            var song = mapper.Map<SongDto>(await dataRepository.GetByIdAsync(id));

            if (song == null)
                return null;

            string tranLyrics = song.Lyrics;
            if (ordersWords != "no")
                tranLyrics = TranSong(song.Lyrics, transpose) + "<br/>";

            var newSong = new SongDto
            {
                Id = song.Id,
                Name = song.Name,
                Lyrics = tranLyrics,
                ImageURL = song.ImageURL,
                Singers=song.Singers
            };
            var songFromCon = await context.Songs
            .Include(s => s.SongToSingers)
            .ThenInclude(sts => sts.Singer)
            .FirstOrDefaultAsync(s => s.Id == newSong.Id);

            newSong.Singers = songFromCon.SongToSingers.Select(sts => mapper.Map<SingerDto>(sts.Singer)).ToList();

            return newSong;
        }

        public async Task<string> GetEasyByIdAsync(int id)
        {
            var song = mapper.Map<SongDto>(await dataRepository.GetByIdAsync(id));

            if (song == null)
                return null;

            return Easy(song.Lyrics);
        }

        public async void AddAsync(SongDto songDto)
        {
            songDto.Id = 0;
            var singers = songDto.Singers;
            songDto.Singers = null;
            var song = mapper.Map<Song>(songDto);
            context.Songs.Add(song);
            foreach (var singer in singers)
            {
                var singerTemp = context.Singers.FirstOrDefault(s => s.Name == singer.Name);
                if (singerTemp == null)
                {
                    singerTemp = new Singer {Id = singer.Id, Name = singer.Name, ImageURL= singer.ImageURL };
                    context.Singers.Add(singerTemp);
                }

                var songToSinger = new SongToSinger { Song = song, Singer = singerTemp };
                context.SongToSingers.Add(songToSinger);
            }

            await context.SaveChangesAsync();
        }

        public async void DeleteAsync(int songId)
        {
            var song = context.Songs.FirstOrDefault(s => s.Id == songId);
            if (song != null)
            {
                var songToSingers = context.SongToSingers.Where(sts => sts.SongId == songId);
                context.SongToSingers.RemoveRange(songToSingers);

                context.Songs.Remove(song);
                await context.SaveChangesAsync();
            }
        }
        public async void UpdateAsync(int id, SongDto songDto)
        {
            var song = context.Songs.Find(id);
            if (song == null)
            {
                return;
            }

            // Update song properties
            song.Name = songDto.Name;
            song.Lyrics = songDto.Lyrics;
            song.ImageURL = songDto.ImageURL;


            var songToSingersToRemove = context.SongToSingers.Where(sts => sts.SongId == id);
            context.SongToSingers.RemoveRange(songToSingersToRemove);

            // Update or add singers.
            foreach (var singerDto in songDto.Singers)
            {
                var singer = await context.Singers.FirstOrDefaultAsync(s => s.Name == singerDto.Name);

                if (singer == null)
                {
                    singer = new Singer
                    {
                        Name = singerDto.Name,
                        ImageURL = singerDto.ImageURL
                    };
                    context.Singers.Add(singer);
                }

                // Create the relationship between the song and singer.
                song.SongToSingers.Add(new SongToSinger
                {
                    Song = song,
                    Singer = singer
                });
            }

                // Save changes
                await context.SaveChangesAsync();
        }

    }
}
