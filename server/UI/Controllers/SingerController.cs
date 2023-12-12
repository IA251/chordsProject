using Common.DTO_s;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Servies.Interfaces;

namespace UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SingerController : ControllerBase
    {
        private readonly IServices<SingerDto> services;

        public SingerController(IServices<SingerDto> services)
        {
            this.services = services;
        }

        [HttpGet]
        public async Task<List<SingerDto>> GetAll()
        {
            return await services.GetAllAsync();
        }
        [HttpGet("{id}")]
        public async Task<SingerDto> Get(int id)
        {
            return await services.GetByIdAsync(id,null,null);
        }
        [HttpPost]
        public IActionResult Post([FromForm] SingerDto singerDto)
        {
            services.AddAsync(singerDto);
            return Ok();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromForm] SingerDto singerDto, IFormFile image)
        {
            services.UpdateAsync(id, singerDto);

            return Ok();
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            services.DeleteAsync(id);
        }
    }
}
