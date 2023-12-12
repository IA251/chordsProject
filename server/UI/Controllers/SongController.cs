using Common.DTO_s;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Interfaces;
using Servies.Interfaces;
using System;

namespace UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongController : ControllerBase
    {
        private readonly IServices<SongDto> services;

        public SongController(IServices<SongDto> services)
        {
            this.services = services;
        }
        [HttpGet]
        public async Task<List<SongDto>> GetAll()
        {
            return await services.GetAllAsync();
        }

        [HttpGet("{id}/{transpose}")]
        public async Task<SongDto> Get(int id, string transpose)
        {
            string orderWords = Request.Query["order"];
            return await services.GetByIdAsync(id, transpose, orderWords);
        }

        [HttpGet("{id}/easy")]
        public async Task<string> GetEasy(int id)
        {
            return await services.GetEasyByIdAsync(id);
        }

        [HttpPost]
        public IActionResult Post(SongDto songDto)
        {
            services.AddAsync(songDto);
            return Ok();
        }

        [HttpPut("{id}")]
        public void Put(int id,SongDto song)
        {
            services.UpdateAsync(id, song);
        }
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            services.DeleteAsync(id);
        }
    }
}
